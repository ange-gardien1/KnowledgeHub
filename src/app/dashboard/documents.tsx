"use client";

import { trpc } from "../_trpc/client";
import { IconPdf } from '@tabler/icons-react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function GetDocuments() {
  const { data, isLoading } = trpc.documents.getdocuments.useQuery();

  return (
    <div>
      {isLoading ? (
        <p>Loading documents...</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {data?.map((document) => (
            <div key={document.id} style={{ flex: "0 1 18%", marginBottom: "10px" }}>
              <Card>
                <CardHeader>
                  {/* <p style={{ marginRight: "10px" }}>{document.title}</p> */}
                </CardHeader>
                <CardContent>
                  {document.pdfUrl && (
                    <a href={document.pdfUrl} target="_blank" rel="noopener noreferrer">
                      <IconPdf stroke={2} size={90} />
                    </a>
                  )}
                </CardContent>
                <CardFooter>
                  {document.title}
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
