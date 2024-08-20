import { useState } from "react";
import { trpc } from "../_trpc/client";

export const useComments = (documentId: string | null) => {
  const {
    data: comments,
    isLoading: isLoadingComments,
    error: errorComments,
    refetch,
  } = trpc.comments.getCommentFromDocumentId.useQuery(
    { documentId: documentId! },
    { enabled: !!documentId }
  );

  return {
    comments,
    isLoadingComments,
    errorComments,
    refetch,
  };
};
