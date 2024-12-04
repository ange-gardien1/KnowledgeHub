import React, { useState } from "react";
import { trpc } from "../_trpc/client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IconFolder, IconPdf, IconTxt } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import DOMPurify from "dompurify";

const SharedProjects = () => {
  const {
    data: sharedProjects,
    isLoading: isLoadingProjects,
    error: errorProjects,
  } = trpc.Projectshare.shareProject.useQuery();

  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  // Toggle project expansion
  const toggleProject = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  const sanitizeContent = (content: string) => {
    return DOMPurify.sanitize(
      content.replace(/<bold>/g, "<strong>").replace(/<\/bold>/g, "</strong>")
    );
  };

  if (isLoadingProjects) {
    return (
      <div className="text-center p-4 animate-pulse">
        Loading shared projects...
      </div>
    );
  }

  if (errorProjects) {
    return (
      <div className="text-center p-4 text-red-500">
        Error fetching shared projects: {errorProjects.message}
      </div>
    );
  }

  if (!sharedProjects || sharedProjects.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500">
        No projects shared with you.
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Left Side: Project List */}
      <div className="w-1/3 p-4 border-r border-gray-200 bg-gray-50">
        <h2 className="text-xl font-bold mb-4">Shared Projects</h2>
        <div className="space-y-4">
          {sharedProjects.map((project) => (
            <div
              key={project.projectId}
              className="cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Card className="w-full border border-gray-200 bg-white">
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <IconFolder
                      stroke={2}
                      size={40}
                      className="text-primary-500"
                    />
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                  </div>
                </CardContent>
                <CardFooter className="text-gray-600">
                  <p className="truncate">{project.description}</p>
                  <p className="text-sm text-gray-500">
                    Created at: {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Permission: {project.permission}
                  </p>
                  <Button
                    variant="link"
                    onClick={() => toggleProject(project.projectId)}
                    className="text-blue-500 hover:underline"
                  >
                    {expandedProject === project.projectId
                      ? "Hide Documents"
                      : "Show Documents"}
                  </Button>
                </CardFooter>

                {/* Documents List */}
                {expandedProject === project.projectId && (
                  <div className="mt-4 px-4">
                    {project.documents && project.documents.length > 0 ? (
                      <ul className="space-y-3">
                        {project.documents.map((doc) => (
                          <li key={doc.documentId}>
                            <Card className="border border-gray-200 p-3">
                              <div className="flex items-center space-x-2">
                                {doc.pdfUrl ? (
                                  <IconPdf
                                    stroke={1.5}
                                    size={30}
                                    className="text-red-500"
                                  />
                                ) : (
                                  <IconTxt
                                    stroke={1.5}
                                    size={30}
                                    className="text-blue-500"
                                  />
                                )}
                                <h4 className="font-semibold text-lg">
                                  {doc.title}
                                </h4>
                              </div>
                              {doc.content && (
                                <div
                                  className="text-gray-600 mt-2 text-sm"
                                  dangerouslySetInnerHTML={{
                                    __html: sanitizeContent(doc.content),
                                  }}
                                />
                              )}
                              {doc.pdfUrl && (
                                <a
                                  href={doc.pdfUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 underline mt-2 block"
                                >
                                  View PDF
                                </a>
                              )}
                            </Card>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">
                        No documents available for this project.
                      </p>
                    )}
                  </div>
                )}
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Project Details (Optional: Additional Info Here) */}
      <div className="w-2/3 p-4 text-center">
        <p className="text-gray-500">Select a project to view its documents.</p>
      </div>
    </div>
  );
};

export default SharedProjects;
