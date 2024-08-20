"use client";
import React, { useState } from "react";
import { trpc } from "../_trpc/client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  IconFolder,
  IconPdf,
  IconTxt,
  IconPlus,
  IconDotsVertical,
} from "@tabler/icons-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DocumentUpload from "@/components/newDocument/uploadDocument";
import CreateDocuments from "@/components/newDocument/createDocument";
import EditDocument from "@/components/editDocument";
import { useComments } from "../hooks/useComments";

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
  const {
    data: projects,
    isLoading: isLoadingProjects,
    error: errorProjects,
  } = trpc.projects.getUserProjects.useQuery();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  
  const { comments, isLoadingComments, errorComments } = useComments(
    selectedDocument?.id || null
  );
  const [isCreatingDocument, setIsCreatingDocument] = useState(false);
  const [menuVisible, setMenuVisible] = useState<string | null>(null);
  const addResourceMutation =
    trpc.resources.addResourceByDocumentId.useMutation();
  const deleteDocumentMutation = trpc.documents.deleteDocumentById.useMutation({
    onSuccess: () => {
      refetch();
      setSelectedDocument(null);
    },
    onError: (error) => {
      console.error("Failed to delete document:", error);
      alert("Failed to delete document. Please try again.");
    },
  });

  const {
    data: documents,
    isLoading: isLoadingDocuments,
    error: errorDocuments,
    refetch,
  } = trpc.documents.getDocumentByProject.useQuery(
    { projectId: selectedProjectId! },
    { enabled: !!selectedProjectId }
  );

  const handleProjectClick = (projectId: string) => {
    setSelectedProjectId(projectId);
    setSelectedDocument(null);
  };

  const handleDocumentClick = (document: Document) => {
    setSelectedDocument(document);
  };

  const handleDelete = async () => {
    if (!selectedDocument) return;

    try {
      await deleteDocumentMutation.mutateAsync({ id: selectedDocument.id });
      alert("Document deleted successfully!");
    } catch (error) {
      console.error("Failed to delete document:", error);
      alert("Failed to delete document. Please try again.");
    }
  };

  const handleAddToResources = async () => {
    if (!selectedDocument) return;

    const resource = {
      documentId: selectedDocument.id,
      title: selectedDocument.title,
      url: selectedDocument.pdfUrl || "",
      type: selectedDocument.pdfUrl ? "pdf" : "text",
      description: selectedDocument.content || undefined,
    };

    try {
      await addResourceMutation.mutateAsync(resource);
      alert("Document added to resources successfully!");
      setSelectedDocument(null);
    } catch (error) {
      console.error("Failed to add document to resources:", error);
      alert("Failed to add document to resources. Please try again.");
    }
  };

  const toggleMenu = (documentId: string) => {
    setMenuVisible(menuVisible === documentId ? null : documentId);
  };

  if (isLoadingProjects) {
    return <div className="text-center p-4">Loading projects...</div>;
  }

  if (errorProjects) {
    return (
      <div className="text-center p-4 text-red-500">
        Error fetching projects: {errorProjects.message}
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center p-4">
        No projects found. Create New Project
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Left Side: Project List */}
      <div className="w-1/3 p-4 border-r border-gray-200 bg-gray-50">
        <h2 className="text-xl font-bold mb-4">Projects</h2>
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => handleProjectClick(project.id)}
            >
              <Card className="w-full border border-gray-200 bg-white">
                <CardContent>
                  <IconFolder
                    stroke={2}
                    size={60}
                    className="text-primary-500"
                  />
                  <h3 className="text-lg font-semibold mt-2">{project.name}</h3>
                </CardContent>
                <CardFooter className="text-gray-600">
                  <p>{project.description}</p>
                  <p>
                    Created at:{" "}
                    {new Date(project.createdAt).toLocaleDateString()}
                  </p>
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
            <h2 className="text-xl font-bold mb-4">
              Documents in this project:
            </h2>

            {/* Add Document Button */}
            <div className="mb-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    onClick={() => setIsCreatingDocument(true)}
                    className="bg-primary-500 hover:bg-primary-600 text-black flex items-center p-2 rounded-lg shadow-md"
                  >
                   <IconPlus size={16} stroke={2} />
                    <p>Create or Upload Document</p>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-2 bg-white rounded-lg shadow-lg w-64">
                  {isCreatingDocument && (
                    <div className="flex flex-col space-y-2">
                      <CreateDocuments projectId={selectedProjectId} />
                      <DocumentUpload projectId={selectedProjectId} />
                      <Button
                        onClick={() => setIsCreatingDocument(false)}
                        className="bg-red-500 hover:bg-red-600 text-white mt-2"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>

            {/* Document List */}
            <div className="flex overflow-x-auto space-x-4 pb-4">
              {isLoadingDocuments ? (
                <div className="text-center">Loading documents...</div>
              ) : errorDocuments ? (
                <div className="text-center text-red-500">
                  {errorDocuments.message}
                </div>
              ) : documents && documents.length > 0 ? (
                <div className="flex space-x-4">
                  {documents.map((document: Document) => (
                    <div
                      key={document.id}
                      className="relative cursor-pointer"
                      onClick={() => handleDocumentClick(document)}
                    >
                      <Card className="w-60 border border-gray-200 bg-white">
                        <CardContent className="relative">
                          {document.pdfUrl ? (
                            <a
                              href={document.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <IconPdf
                                stroke={2}
                                size={60}
                                className="text-red-500"
                              />
                            </a>
                          ) : (
                            <IconTxt
                              stroke={2}
                              size={60}
                              className="text-blue-500"
                            />
                          )}
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMenu(document.id);
                            }}
                            className="absolute top-2 right-2 p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                            style={{
                              minWidth: "auto",
                            }}
                          >
                            <IconDotsVertical stroke={2} size={24} />
                          </Button>
                          {menuVisible === document.id && (
                            <div className="absolute top-8 right-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-32">
                              {document.pdfUrl ? null : (
                                <Button
                                  onClick={() => {
                                    setSelectedDocument(document);
                                    setIsCreatingDocument(true);
                                    setMenuVisible(null);
                                  }}
                                  className="w-full text-left py-2 px-2 hover:bg-gray-100"
                                >
                                  Edit Document
                                </Button>
                              )}
                              <Button
                                onClick={() => {
                                  handleDelete();
                                  setMenuVisible(null);
                                }}
                                className="w-full text-left py-2 px-2 hover:bg-gray-100"
                              >
                                Delete Document
                              </Button>
                              <Button
                                onClick={() => {
                                  handleAddToResources();
                                  setMenuVisible(null);
                                }}
                                className="w-full text-left py-2 px-2 hover:bg-gray-100"
                              >
                                Add To Resource
                              </Button>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="text-gray-700">
                          {document.title}
                        </CardFooter>
                      </Card>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <p>No documents found for this project.</p>
                  <Button
                    onClick={() => setIsCreatingDocument(true)}
                    className="bg-primary-500 hover:bg-primary-600 text-white mt-4 flex items-center p-2 rounded-lg shadow-lg"
                  >
                    <IconPlus size={20} stroke={2} />
                    <span className="ml-2">Add New Document</span>
                  </Button>
                </div>
              )}
            </div>

            {/* Document Preview */}
            <div>
              {selectedDocument && (
                <div>
                  <h2 className="text-xl font-bold mb-4">
                    {selectedDocument.title}
                  </h2>
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
            {/* Comments Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Comments</h3>
        {isLoadingComments ? (
          <p>Loading comments...</p>
        ) : errorComments ? (
          <p className="text-red-500">Error loading comments: {errorComments.message}</p>
        ) : comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="mt-2 p-2 border border-gray-200 rounded">
              <p>{comment.content}</p>
            </div>
          ))
        ) : (
          <p>No comments available for this document.</p>
        )}
      </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetProjects;
