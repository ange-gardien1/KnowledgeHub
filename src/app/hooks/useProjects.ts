import { useState } from "react";
import { trpc } from "../_trpc/client";

export const useProjects = () => {
  const {
    data: projects,
    isLoading: isLoadingProjects,
    error: errorProjects,
  } = trpc.projects.getUserProjects.useQuery();

  return {
    projects,
    isLoadingProjects,
    errorProjects,
  };
};
