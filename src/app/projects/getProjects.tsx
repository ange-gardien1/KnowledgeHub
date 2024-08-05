'use client'
import React, { useState } from "react";
import { trpc } from "../_trpc/client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconFolder, IconPdf, IconTxt } from "@tabler/icons-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import EditDocument from "@/components/editDocument";

type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};

type Document = {
  id: string;
  title: string;
  pdfUrl?: string | null;
  content?: string | null;
};

const GetProjects = () => {
  const { data: projects, isLoading: isLoadingProjects, error: errorProjects } = trpc.projects.getUserProjects.useQuery();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const { data: documents, isLoading: isLoadingDocuments, error: errorDocuments } = trpc.documents.getDocumentByProject.useQuery(
    { projectId: selectedProjectId! }, // Non-null assertion
    { enabled: !!selectedProjectId } // Only fetch if `selectedProjectId` is not null
  );

  const handleProjectClick = (projectId: string) => {
    setSelectedProjectId(projectId);
    setSelectedDocument(null); // Clear selected document when changing project
  };

  const handleDocumentClick = (document: Document) => {
    setSelectedDocument(document);
  };

  if (isLoadingProjects) {
    return <div>Loading projects...</div>;
  }

  if (errorProjects) {
    return <div>Error fetching projects: {errorProjects.message}</div>;
  }

  if (!projects || projects.length === 0) {
    return <div>No projects found</div>;
  }

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div style={{ flex: "1 1 50%", marginRight: "20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {projects.map(project => (
            <div
              key={project.id}
              style={{ flex: "0 1 23%", marginBottom: "10px", cursor: "pointer" }}
              onClick={() => handleProjectClick(project.id)}
            >
              <Card>
                <CardContent>
                  <IconFolder stroke={2} size={90} />
                  <h3>{project.name} project</h3>
                </CardContent>
                <CardFooter>
                 
                  <p>{project.description}</p>  -
                  <p>Created at: {new Date(project.createdAt).toLocaleDateString()}</p>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {selectedProjectId && (
        <div style={{ flex: "1 1 50%" }}>
          <div style={{ marginTop: "20px" }}>
            <h2>Documents in this project:</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {isLoadingDocuments ? (
                <div>Loading documents...</div>
              ) : errorDocuments ? (
                <div>Error fetching documents: {errorDocuments.message}</div>
              ) : documents && documents.length > 0 ? (
                documents.map((document:any ) => (
                  <div
                    key={document.id}
                    style={{ flex: "0 1 23%", marginBottom: "10px", cursor: "pointer" }}
                    onClick={() => handleDocumentClick(document)}
                  >
                    <Card>
                      <CardContent>
                        {document.pdfUrl ? (
                          <a
                            href={document.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <IconPdf stroke={2} size={90} />
                          </a>
                        ) : (
                          <IconTxt stroke={2} size={90} />
                        )}
                      </CardContent>
                      <CardFooter>
                        {document.title}
                      </CardFooter>
                    </Card>
                  </div>
                ))
              ) : (
                <div>No documents found for this project</div>
              )}
            </div>
          </div>

          {selectedDocument && (
            <div style={{ marginTop: "20px" }}>
              <h2>{selectedDocument.title}</h2>
              {selectedDocument.pdfUrl ? (
                <iframe
                  src={selectedDocument.pdfUrl}
                  width="100%"
                  height="500px"
                  title="PDF Document"
                ></iframe>
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: selectedDocument.content || "",
                  }}
                />
              )}
              {!selectedDocument.pdfUrl && (
                <EditDocument
                  documentId={selectedDocument.id}
                  initialTitle={selectedDocument.title}
                  initialContent={selectedDocument.content || ""}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GetProjects;
