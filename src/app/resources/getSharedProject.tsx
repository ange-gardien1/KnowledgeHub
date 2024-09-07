// components/SharedProjects.tsx
import React from "react";
import { trpc } from "../_trpc/client"; // Adjust path as needed

const SharedProjects = () => {
  const { data: sharedProjects, isLoading, error } = trpc.Projectshare.shareProject.useQuery();

  if (isLoading) {
    return <div>Loading shared projects...</div>;
  }

  if (error) {
    return <div>Error fetching shared projects: {error.message}</div>;
  }

  if (!sharedProjects || sharedProjects.length === 0) {
    return <div>No projects shared with you.</div>;
  }

  return (
    <div>
      <h2>Shared Projects</h2>
      <ul>
        {sharedProjects.map((project) => (
          <li key={project.projectId} className="border p-4 mb-4 rounded shadow-sm">
            <h3 className="text-xl font-semibold">{project.name}</h3>
            <p className="text-gray-700">{project.description}</p>
            <p className="text-gray-500">Created at: {new Date(project.createdAt).toLocaleDateString()}</p>
            <p className="text-gray-500">Permission: {project.permission}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SharedProjects;
