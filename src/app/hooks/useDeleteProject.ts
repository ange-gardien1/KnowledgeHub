import { useToast } from "@/components/ui/use-toast";
import { trpc } from "../_trpc/client";

export const useDeleteProject = () => {
  const { toast } = useToast(); // Access the toast function

  const deleteProjectMutation = trpc.projects.deleteMyProject.useMutation({
    onSuccess: () => {
      toast({
        title: "Project deleted successfully!",
        description: "The project has been permanently removed.",
        
      });

    },
    onError: (error) => {
      console.error("Failed to delete project:", error);
      toast({
        title: "Failed to delete project",
        description: `Error: ${error.message}. Please try again.`,
        variant: "destructive", 
      });
    },
  });

  return deleteProjectMutation;
};
