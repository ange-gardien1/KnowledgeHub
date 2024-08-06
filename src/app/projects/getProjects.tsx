'use client';
import React, { useState } from "react";
import { trpc } from "../_trpc/client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconFolder, IconPdf, IconTxt, IconPlus } from "@tabler/icons-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import DocumentUpload from "@/components/newDocument/uploadDocument";
import CreateDocuments from "@/components/newDocument/createDocument";
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
  const [isCreatingDocument, setIsCreatingDocument] = useState(false);

  const { data: documents, isLoading: isLoadingDocuments, error: errorDocuments } = trpc.documents.getDocumentByProject.useQuery(
    { projectId: selectedProjectId! }, 
    { enabled: !!selectedProjectId } 
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
    <div className="flex">
      {/* Left Side: Project List */}
      <div className="w-1/3 p-4 border-r border-gray-200">
        <h2 className="text-lg font-bold mb-4">Projects</h2>
        <div className="space-y-4">
          {projects.map(project => (
            <div
              key={project.id}
              className="cursor-pointer"
              onClick={() => handleProjectClick(project.id)}
            >
              <Card className="w-60">
                <CardContent>
                  <IconFolder stroke={2} size={60} />
                  <h3 className="text-md font-semibold">{project.name}</h3>
                </CardContent>
                <CardFooter>
                  <p>{project.description}</p>
                  <p>Created at: {new Date(project.createdAt).toLocaleDateString()}</p>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Documents and Document Details */}
      <div className="w-2/3 p-4">
        {selectedProjectId && (
          <div>
            <h2 className="text-lg font-bold mb-4">Documents in this project:</h2>
            
            {/* Document List */}
            <div className="mb-4">
              {isLoadingDocuments ? (
                <div>Loading documents...</div>
              ) : errorDocuments ? (
                <div>Error fetching documents: {errorDocuments.message}</div>
              ) : documents && documents.length > 0 ? (
                <div className="space-y-4">
                  {documents.map((document: Document) => (
                    <div
                      key={document.id}
                      className="cursor-pointer"
                      onClick={() => handleDocumentClick(document)}
                    >
                      <Card className="w-60">
                        <CardContent>
                          {document.pdfUrl ? (
                            <a
                              href={document.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <IconPdf stroke={2} size={60} />
                            </a>
                          ) : (
                            <IconTxt stroke={2} size={60} />
                          )}
                        </CardContent>
                        <CardFooter>
                          {document.title}
                        </CardFooter>
                      </Card>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <p>No documents found for this project</p>
                  <Button
                    onClick={() => setIsCreatingDocument(true)}
                    className="bg-primary-500 hover:bg-primary-600 text-white flex items-center p-2 rounded"
                  >
                    <IconPlus size={16} stroke={2} />
                    Add New Document
                  </Button>
                </div>
              )}
            </div>

            {/* Add Document Popover */}
            <div className="mb-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="bg-primary-500 hover:bg-primary-600 text-white flex items-center p-2 rounded">
                    <IconPlus size={16} stroke={2} />
                    Add Document
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-4 bg-white rounded shadow-lg">
                  {isCreatingDocument ? (
                    <div className="flex flex-col gap-4">
                      <CreateDocuments projectId={selectedProjectId} />
                      <DocumentUpload projectId={selectedProjectId} />
                      <Button
                        onClick={() => setIsCreatingDocument(false)}
                        className="mt-4 bg-red-500 text-white"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => setIsCreatingDocument(true)}
                      className="bg-primary-500 hover:bg-primary-600 text-white flex items-center p-2 rounded"
                    >
                      <IconPlus size={16} stroke={2} />
                      Create or Upload Document
                    </Button>
                  )}
                </PopoverContent>
              </Popover>
            </div>

            {/* Document Preview */}
            <div>
              {selectedDocument && (
                <div>
                  <h2 className="text-lg font-bold mb-4">{selectedDocument.title}</h2>
                  {selectedDocument.pdfUrl ? (
                    <iframe
                      src={selectedDocument.pdfUrl}
                      width="100%"
                      height="600px"
                      title="PDF Document"
                      className="border border-gray-200"
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
          </div>
        )}
      </div>
    </div>
  );
};

export default GetProjects;
