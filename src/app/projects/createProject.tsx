'use client';
import { trpc } from "@/app/_trpc/client";
import React, { useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";

const ProjectCreate: React.FC = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const createProject = trpc.projects.createNewProject.useMutation();
  const { toast } = useToast(); 

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);

    if (!name) {
      setError("Project name is required");
      setSubmitting(false);
      return;
    }

    try {
      await createProject.mutateAsync({ name });
      setName("");
      setError(null);
      toast({
        description: "Project created successfully!",
      });
    } catch (err: any) {
      setError(err.message || "Failed to create project");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex justify-end p-4">
      <Popover>
        <PopoverTrigger asChild>
          <button className="button gap-2 bg-primary-500 hover:bg-primary-600 text-highlight-300 flex items-center p-2 rounded">
            <IconPlus size={16} stroke={2} strokeLinejoin="miter" />
            Create New Project
          </button>
        </PopoverTrigger>
        <PopoverContent className="max-w-lg p-4 bg-white rounded shadow-lg">
          <div className="flex flex-col pb-5">
            <div className="sticky top-0 z-20 flex items-center bg-white py-3 text-xs dark:bg-hc-darkgray-50">
              <h2 className="text-sm font-bold text-hc-gray-800 dark:text-gray-200 xl:text-base">
                Create New Project
              </h2>
              <div className="ml-auto flex gap-4">
                <button
                  className="button text-hc-blue-900 dark:bg-hc-darkgray-200 dark:text-gray-300 bg-hc-blue-50 gap-2 p-2 rounded"
                  onClick={() => setName("")}
                >
                  Cancel
                </button>
                <button
                  className={`button w-fit text-highlight-300 bg-primary-500 gap-2 p-2 rounded ${submitting ? 'opacity-50' : ''}`}
                  onClick={handleSubmit}
                  type="submit"
                  disabled={submitting}
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="mt-10">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Project Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter the Project Name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50 dark:bg-hc-darkgray-100 dark:border-hc-darkgray-200 dark:text-gray-300"
                />
              </div>
              {error && (
                <p className="my-1 text-xs text-error first-letter:uppercase">
                  {error}
                </p>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ProjectCreate;
