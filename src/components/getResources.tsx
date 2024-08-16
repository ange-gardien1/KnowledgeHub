'use client'
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IconLink } from "@tabler/icons-react"; 
import { format } from "date-fns";
import { trpc } from "@/app/_trpc/client";

type Resource = {
  title: string;
  url: string | null; 
  type: string;
  content: string | null;
  Description: string | null;
  createdAt: string;
  updatedAt: string;
  userName: string | null;
};

const GetAllResources = () => {
  const { data, isLoading, error } = trpc.resources.getResourcesByType.useQuery();
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

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
            {data?.map((resource) => (
              resource.type === "link" && (
                <div>
                  <Card>
                    <CardContent>
                      <a
                        href={resource.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IconLink stroke={2} size={90} />
                      </a>
                      <h3 className="text-lg font-semibold mt-2">{resource.title}</h3>
                      <h1 className="text-lg font-semibold mt-2">{resource.description}</h1>
                    </CardContent>
                    <CardFooter className="text-gray-600">
                      <p>
                        Created at: {format(new Date(resource.createdAt), "PPpp")}
                      </p>
                    </CardFooter>
                  </Card>
                </div>
              )
            ))}
          </div>
        </div>
        {selectedResource && (
          <div className="flex-1">
            <div className="mt-5">
              <h2 className="text-xl font-semibold">{selectedResource.title}</h2>
              <div
                dangerouslySetInnerHTML={{ __html: selectedResource.content || "" }}
                className="prose"
              />
              <p className="text-sm text-gray-500 mt-2">
                Created At: {format(new Date(selectedResource.createdAt), "PPpp")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetAllResources;
