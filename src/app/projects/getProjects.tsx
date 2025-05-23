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
import { useDeleteProject } from "../hooks/useDeleteProject";
import { IconHttpDelete } from "@tabler/icons-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";


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

const GetProjects = ({ session }: { session: any }) => {
  const { toast } = useToast();

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
      toast({
        title: "Document deleted successfully!",
        description: "The document has been removed.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to delete document",
        description: `Error: ${error.message}. Please try again.`,
        variant: "destructive",
      });
    },
  });

  const shareProjectMutation = trpc.Projectshare.addShares.useMutation({
    onSuccess: () => {
      refetch();
      toast({
        title: "Project shared successfully!",
        description: "The project has been shared with the selected user.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to share project",
        description: `Error: ${error.message}. Please try again.`,
        variant: "destructive",
      });
    },
  });

  const handleShareProject = async (
    projectId: string,
    sharedWithUserId: string
  ) => {
    try {
      await shareProjectMutation.mutateAsync({
        projectId,
        sharedWithUserId,
        permission: "view",
      });
    } catch (error) {
      console.error("Error sharing project:", error);
    }
  };

  const {
    data: users,
    isLoading: isLoadingUsers,
    error: errorUsers,
  } = trpc.users.getAll.useQuery();

  const { mutateAsync: deleteProject } = useDeleteProject();

  const {
    data: documents,
    isLoading: isLoadingDocuments,
    error: errorDocuments,
    refetch,
  } = trpc.documents.getDocumentByProject.useQuery(
    { projectId: selectedProjectId! },
    { enabled: !!selectedProjectId }
  );

  const { data: roleName, isLoading: isRoleLoading } =
    trpc.Roles.getMyRole.useQuery(session?.user?.roleId, {
      enabled: !!session?.user?.roleId,
    });

  const handleProjectClick = (projectId: string) => {
    setSelectedProjectId(projectId);
    setSelectedDocument(null);
  };

  const handleDocumentClick = (document: Document) => {
    setSelectedDocument(document);
  };

  const handleDeleteDocument = async () => {
    if (!selectedDocument) return;

    try {
      await deleteDocumentMutation.mutateAsync({ id: selectedDocument.id });
    } catch (error) {
      console.error("Failed to delete document:", error);
    }
  };

  const handleDeleteProject = async () => {
    if (!selectedProjectId) return;

    try {
      await deleteProject({ id: selectedProjectId });
      setSelectedProjectId(null);
      alert("Project deleted successfully!");
    } catch (error) {
      console.error("Failed to delete project:", error);
      alert("Failed to delete project. Please try again.");
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
  const [sharedWithUserId, setSharedWithUserId] = useState<string>("");

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
    <div className="flex ">
      {/* Left Side: Project List */}
      <div className="w-1/3 p-4 border-r border-gray-200 bg-gray-50">
        <h2 className="text-xl font-bold mb-4">Projects</h2>
        <div className="space-y-4 flex-1">
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
           
              <IconHttpDelete
                stroke={2}
                onClick={() => handleDeleteProject()}
                className="mt-2 bg-red-400 hover:bg-red-600 text-white w-full"
              />

              <Popover>
                <PopoverTrigger asChild>
                  <Button className="mt-2 bg-green-400 hover:bg-green-600 text-white w-full">
                    Share
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-2 bg-white rounded-lg shadow-lg w-64">
                  {isLoadingUsers ? (
                    <div>Loading users...</div>
                  ) : errorUsers ? (
                    <div>Error loading users: {errorUsers.message}</div>
                  ) : (
                    <div>
                      <Select
                        onValueChange={(userId) => setSharedWithUserId(userId)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a user to share" />
                        </SelectTrigger>
                        <SelectContent>
                          {users?.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.username}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Button
                        onClick={() =>
                          handleShareProject(project.id, sharedWithUserId)
                        }
                        className="mt-2 bg-green-500 hover:bg-green-600 text-white w-full"
                        disabled={!sharedWithUserId}
                      >
                        Share Project
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
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
                    className="p-2 rounded"
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
                            className="absolute top-2 right-2 p-1 rounded-full bg-gray-300 hover:bg-gray-300"
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
                                  handleDeleteDocument();
                                  setMenuVisible(null);
                                }}
                                className="w-full text-left py-2 px-2 hover:bg-gray-100"
                              >
                                Delete Document
                              </Button>
                              {roleName === "Admin" && (
                                <Button
                                  onClick={() => {
                                    handleAddToResources();
                                    setMenuVisible(null);
                                  }}
                                  className="w-full text-left py-2 px-2 hover:bg-gray-100"
                                >
                                  Add To Resource
                                </Button>
                              )}
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
                <p className="text-red-500">
                  Error loading comments: {errorComments.message}
                </p>
              ) : comments && comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div
                    key={index}
                    className="mt-2 p-2 border border-gray-200 rounded"
                  >
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
