import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { protectedProcedure } from "../../trpc";
import { documents } from "@/db/schema";
import { db } from "@/db";
import { s3Client } from "@/config/aws";

export const uploadDocument = protectedProcedure
  .input(
    z.object({
      title: z.string(),
      content: z.string().optional(),
      type: z.enum(["pdf", "text"]),
      pdfUrl: z.string().optional(),
      projectId: z.string(), // Add projectId to the input schema
    })
  )
  .mutation(
    async ({ input: { title, content, type, pdfUrl, projectId }, ctx: { session } }) => {
      if (!session?.user?.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to upload a document",
        });
      }

      try {
        let fileUrl = pdfUrl;

        if (type === "pdf" && pdfUrl) {
          const pdfBuffer = Buffer.from(pdfUrl, "base64");

          const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: `documents/${Date.now()}-${title}.pdf`,
            Body: pdfBuffer,
            ContentType: "application/pdf",
          };

          const command = new PutObjectCommand(uploadParams);
          const uploadResult = await s3Client.send(command);

          fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${uploadParams.Key}`;
        }

        const newDocument = await db.insert(documents).values({
          userId: session.user.id,
          title,
          content,
          type,
          pdfUrl: fileUrl,
          projectId, // Include projectId in the document creation
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        return { document: newDocument };
      } catch (err: any) {
        console.log(err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to upload document",
          cause: err,
        });
      }
    }
  );
