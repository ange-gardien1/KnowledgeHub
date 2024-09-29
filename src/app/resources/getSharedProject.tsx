import React, { useState } from "react";
import { trpc } from "../_trpc/client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IconFolder, IconPdf, IconTxt } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

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

  if (isLoadingProjects) {
    return <div className="text-center p-4">Loading shared projects...</div>;
  }

  if (errorProjects) {
    return (
      <div className="text-center p-4 text-red-500">
        Error fetching shared projects: {errorProjects.message}
      </div>
    );
  }

  if (!sharedProjects || sharedProjects.length === 0) {
    return <div className="text-center p-4">No projects shared with you.</div>;
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
                  <p>Permission: {project.permission}</p>
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
                      <ul className="pl-4 list-disc space-y-3">
                        {project.documents.map((doc) => (
                          <li key={doc.documentId} className="mb-4">
                            <Card className="border border-gray-200 p-3">
                              <div className="flex items-center">
                                {doc.pdfUrl ? (
                                  <IconPdf
                                    stroke={1.5}
                                    size={30}
                                    className="text-red-500 mr-2"
                                  />
                                ) : (
                                  <IconTxt
                                    stroke={1.5}
                                    size={30}
                                    className="text-blue-500 mr-2"
                                  />
                                )}
                                <h4 className="font-semibold text-lg">
                                  {doc.title}
                                </h4>
                              </div>
                              {doc.content && (
                                <p className="text-gray-600 mt-1">
                                  {doc.content}
                                </p>
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
      <div className="w-2/3 p-4">
        {/* You can place additional project details or instructions here if needed */}
        <div className="text-center">
          Select a project to view its documents.
        </div>
      </div>
    </div>
  );
};

export default SharedProjects;
