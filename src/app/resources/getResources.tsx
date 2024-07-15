"use client";

import { useState } from "react";
import { trpc } from "../_trpc/client";
import { IconPdf, IconTxt } from "@tabler/icons-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Resource = {
  resourceId: string;
  documentId: string | null;
  title: string;
  pdfUrl: string | null;
  type: string;
  content: string | null;
  createdAt: string; 
  updatedAt: string; 
};

const GetResources = () => {
  const { data, isLoading } = trpc.resources.getResourcesWithDocuments.useQuery();
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const handleResourceClick = (resource: Resource) => {
    setSelectedResource(resource);
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div style={{ flex: "1 1 50%", marginRight: "20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {isLoading ? (
            <p>Loading resources...</p>
          ) : (
            data?.map((resource: Resource, index: number) => (
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
                </Card>
              </div>
            ))
          )}
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
            <p>Created At: {selectedResource.createdAt}</p>

          </div>
        </div>
      )}
    </div>
  );
};

export default GetResources;
