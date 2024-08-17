"use client";
import { useState } from "react";
import { trpc } from "../_trpc/client";
import { IconPdf, IconTxt } from "@tabler/icons-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import Link from "next/link";

type Resource = {
  resourceId: string;
  documentId: string | null;
  title: string;
  pdfUrl: string | null;
  type: string;
  content: string | null;
  createdAt: string;
  updatedAt: string;
  userName: string | null;
};

const GetResourcesDoc = () => {
  const { data, isLoading, error } =
    trpc.resources.getResourcesWithDocuments.useQuery();
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  );
  const createEditRequestMutation = trpc.editRequest.useMutation();
  const [isRequestingEdit, setIsRequestingEdit] = useState(false);

  const handleResourceClick = (resource: Resource) => {
    setSelectedResource(resource);
  };

  const handleRequestEdit = async () => {
    if (!selectedResource) return;

    try {
      setIsRequestingEdit(true);
      await createEditRequestMutation.mutateAsync({
        documentId: selectedResource.documentId || "",
        userId: selectedResource.userName || ""
      });
      alert("Edit request submitted successfully!");

      setIsRequestingEdit(false);
    } catch (error) {
      console.error("Failed to submit edit request:", error);
      alert("Failed to submit edit request. Please try again.");
      setIsRequestingEdit(false);
    }
  };

  if (isLoading) {
    return <p>Loading resources...</p>;
  }

  if (error) {
    return <p>Error fetching resources: {error.message}</p>;
  }

  return (
    <div className="flex flex-col gap-4 mt-16 ml-12">
      <div className="flex gap-20">
        <div className="flex-1">
          <div className="flex flex-wrap gap-2.5">
            {data?.map((resource: Resource) => (
              <div
                key={resource.resourceId}  
                className="flex-1 min-w-[18%] mb-2.5 cursor-pointer"
                onClick={() => handleResourceClick(resource)}
              >
                <Card>
                  <CardContent>
                    {resource.type === "pdf" ? (
                      <a
                        href={resource.pdfUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IconPdf stroke={2} size={90} />
                      </a>
                    ) : (
                      <IconTxt stroke={2} size={90} />
                    )}
                  </CardContent>
                  <CardFooter>{resource.title}</CardFooter>
                  <p>{resource.userName}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
        {selectedResource && (
          <div className="flex-1">
            <div className="mt-5">
              <h2 className="text-xl font-semibold">{selectedResource.title}</h2>
              {selectedResource.type === "pdf" ? (
                <iframe
                  src={selectedResource.pdfUrl || "#"}
                  className="w-full h-[600px]"
                  title="PDF Document"
                ></iframe>
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: selectedResource.content || "",
                  }}
                  className="prose"
                />
              )}
              <p className="text-sm text-gray-500 mt-2">
                Created At: {format(new Date(selectedResource.createdAt), "PPpp")}
              </p>
              {selectedResource.type === "text" && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button onClick={handleRequestEdit}>
                      {isRequestingEdit ? "Submitting..." : "Send Edit Request"}
                    </Button>
                  </PopoverTrigger>
                </Popover>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetResourcesDoc;
