"use client";
import { useState } from "react";
import { trpc } from "../_trpc/client";
import { IconPdf, IconTxt } from "@tabler/icons-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

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

const GetResources = () => {
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
        userId:selectedResource.userName || ""
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
    <div style={{ display: "flex", gap: "20px" }}>
      <div style={{ flex: "1 1 50%", marginRight: "20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {data?.map((resource: Resource, index: number) => (
            <div
              key={resource.resourceId}
              style={{
                flex: "0 1 18%",
                marginBottom: "10px",
                cursor: "pointer",
              }}
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
        <div style={{ flex: "1 1 50%" }}>
          <div style={{ marginTop: "20px" }}>
            <h2>{selectedResource.title}</h2>
            {selectedResource.type === "pdf" ? (
              <iframe
                src={selectedResource.pdfUrl || "#"}
                width="100%"
                height="500px"
                title="PDF Document"
              ></iframe>
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: selectedResource.content || "",
                }}
              />
            )}
            <p className="text-sm text-gray-500">Created At : 
            {format(new Date (selectedResource.createdAt), "PPpp")}
             </p>
            <Popover>
              <PopoverTrigger asChild>
                {/* <Button onClick={() => setIsRequestingEdit(true)}>Request Edit</Button> */}
                <Button onClick={handleRequestEdit}>
                  {isRequestingEdit ? "Submitting..." : "Send Edit Request"}
                </Button>
              </PopoverTrigger>
            </Popover>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetResources;
