import { useState } from "react";
import { trpc } from "../_trpc/client";

export const useDocuments = (projectId: string | null) => {
  const {
    data: documents,
    isLoading: isLoadingDocuments,
    error: errorDocuments,
    refetch,
  } = trpc.documents.getDocumentByProject.useQuery(
    { projectId: projectId! },
    { enabled: !!projectId }
  );

  return {
    documents,
    isLoadingDocuments,
    errorDocuments,
    refetch,
  };
};
