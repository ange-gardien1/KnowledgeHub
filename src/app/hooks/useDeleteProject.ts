import { trpc } from "../_trpc/client";


export const useDeleteProject = () => {
  const deleteProjectMutation = trpc.projects.deleteMyProject.useMutation({
    onSuccess: () => {
      // Optionally refetch or update any relevant data
    },
    onError: (error) => {
      console.error("Failed to delete project:", error);
      alert("Failed to delete project. Please try again.");
    },
  });

  return deleteProjectMutation;
};
