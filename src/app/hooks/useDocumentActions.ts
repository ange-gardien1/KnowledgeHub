import { useState } from "react";
import { trpc } from "../_trpc/client";

export const useDocumentActions = () => {
  const addResourceMutation = trpc.resources.addResourceByDocumentId.useMutation();
  const deleteDocumentMutation = trpc.documents.deleteDocumentById.useMutation();

  const handleDelete = async (documentId: string) => {
    try {
      await deleteDocumentMutation.mutateAsync({ id: documentId });
      return true;
    } catch (error) {
      console.error("Failed to delete document:", error);
      return false;
    }
  };

  const handleAddToResources = async (document: any) => {
    const resource = {
      documentId: document.id,
      title: document.title,
      url: document.pdfUrl || "",
      type: document.pdfUrl ? "pdf" : "text",
      description: document.content || undefined,
    };

    try {
      await addResourceMutation.mutateAsync(resource);
      return true;
    } catch (error) {
      console.error("Failed to add document to resources:", error);
      return false;
    }
  };

  return {
    handleDelete,
    handleAddToResources,
  };
};
