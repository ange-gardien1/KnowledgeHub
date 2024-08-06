import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IconFolder } from "@tabler/icons-react";

type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};

interface ProjectListProps {
  projects: Project[];
  onProjectClick: (projectId: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onProjectClick }) => (
  <div className="w-1/3 p-4 border-r border-gray-200 bg-gray-50">
    <h2 className="text-xl font-bold mb-4">Projects</h2>
    <div className="space-y-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => onProjectClick(project.id)}
        >
          <Card className="w-full border border-gray-200 bg-white">
            <CardContent>
              <IconFolder stroke={2} size={60} className="text-primary-500" />
              <h3 className="text-lg font-semibold mt-2">{project.name}</h3>
            </CardContent>
            <CardFooter className="text-gray-600">
              <p>{project.description}</p>
              <p>
                Created at: {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  </div>
);

export default ProjectList;
