'use client';
import React, { useState } from "react";
import { trpc } from "../_trpc/client";
import { IconPdf, IconTxt } from "@tabler/icons-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EditDocument from "@/components/editDocument";
import { useToast } from "@/components/ui/use-toast";
import DOMPurify from "dompurify";

type Document = {
  id: string;
  title: string;
  pdfUrl?: string | null;
  content?: string | null;
};

const GetDocuments = () => {
  const { data, isLoading, refetch } = trpc.documents.getDocumentsByUserId.useQuery();
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const addResourceMutation = trpc.resources.addResourceByDocumentId.useMutation();
  const deleteDocumentMutation = trpc.documents.deleteDocumentById.useMutation();
  const [isAddingResource, setIsAddingResource] = useState(false);
  const { toast } = useToast();

  const handleDocumentClick = (document: Document) => {
    setSelectedDocument(document);
  };

  const handleDelete = async () => {
    if (!selectedDocument) return;

    try {
      await deleteDocumentMutation.mutateAsync({ id: selectedDocument.id });
      refetch();
      setSelectedDocument(null);
      toast({ description: "Document deleted successfully!" });
    } catch {
      toast({ description: "Failed to delete document. Please try again.", variant: "destructive" });
    }
  };

  const handleAddToResources = async () => {
    if (!selectedDocument) return;

    const resource = {
      documentId: selectedDocument.id,
      title: selectedDocument.title,
      url: selectedDocument.pdfUrl || "",
      type: selectedDocument.pdfUrl ? "pdf" : "text",
      description: selectedDocument.content || undefined,
    };

    try {
      setIsAddingResource(true);
      await addResourceMutation.mutateAsync(resource);
      toast({ description: "Document added to resources successfully!" });
      setSelectedDocument(null);
    } catch {
      toast({ description: "Failed to add document to resources. Please try again.", variant: "destructive" });
    } finally {
      setIsAddingResource(false);
    }
  };

  const sanitizeContent = (content: string) => {
    return DOMPurify.sanitize(
      content.replace(/<bold>/g, "<strong>").replace(/<\/bold>/g, "</strong>")
    );
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div style={{ flex: "1 1 50%", marginRight: "20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {isLoading ? (
            <p>Loading documents...</p>
          ) : (
            data?.map((document: Document) => (
              <div
                key={document.id}
                style={{ flex: "0 1 18%", marginBottom: "10px", cursor: "pointer" }}
                onClick={() => handleDocumentClick(document)}
              >
                <Card>
                  <CardContent>
                    {document.pdfUrl ? (
                      <a href={document.pdfUrl} target="_blank" rel="noopener noreferrer">
                        <IconPdf stroke={2} size={90} />
                      </a>
                    ) : (
                      <IconTxt stroke={2} size={90} />
                    )}
                  </CardContent>
                  <CardFooter>{document.title}</CardFooter>
                </Card>
              </div>
            ))
          )}
        </div>
      </div>
      {selectedDocument && (
        <div style={{ flex: "1 1 50%" }}>
          <div style={{ marginTop: "20px" }}>
            <h2>{selectedDocument.title}</h2>
            {selectedDocument.pdfUrl ? (
              <iframe
                src={selectedDocument.pdfUrl}
                width="100%"
                height="500px"
                title="PDF Document"
              ></iframe>
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeContent(selectedDocument.content || ""),
                }}
              />
            )}
            <Button onClick={handleDelete} disabled={!selectedDocument}>
              Delete Document
            </Button>
            <Button onClick={handleAddToResources} disabled={!selectedDocument || isAddingResource}>
              {isAddingResource ? "Adding..." : "Add to Resources"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetDocuments;
