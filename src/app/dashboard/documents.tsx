'use client'
import React, { useState } from "react";
import { trpc } from "../_trpc/client";
import { IconPdf, IconTxt } from "@tabler/icons-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EditDocument from "@/components/editDocument";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Document = {
  id: string;
  title: string;
  pdfUrl?: string | null;
  content?: string | null;
};

const GetDocuments = () => {
  const { data, isLoading } = trpc.documents.getDocumentsByUserId.useQuery();
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const addResourceMutation = trpc.resources.addResourceByDocumentId.useMutation();
  const [isAddingResource, setIsAddingResource] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const deleteDocumentMutation = trpc.documents.deleteDocumentById.useMutation();

  const handleDocumentClick = (document: Document) => {
    setSelectedDocument(document);
    setIsEditing(false); 
  };
  const handleDelete = async () => {
    if (!selectedDocument) return;

    try {
      const response = await deleteDocumentMutation.mutateAsync({ id: selectedDocument.id });
      if (response.document) {
        alert("Document deleted successfully!");
        setSelectedDocument(null); // Clear the selected document after deletion
        // refetch(); // Refetch documents to update the list
      } else {
        alert("Failed to delete document.");
      }
    } catch (error) {
      console.error("Failed to delete document:", error);
      alert("Failed to delete document. Please try again.");
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
      alert("Document added to resources successfully!");
      setSelectedDocument(null);
    } catch (error) {
      console.error("Failed to add document to resources:", error);
      alert("Failed to add document to resources. Please try again.");
    } finally {
      setIsAddingResource(false);
    }
  };

  const handleEditDocument = () => {
    setIsEditing(true);
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
                      <a
                        href={document.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IconPdf stroke={2} size={90} />
                      </a>
                    ) : (
                      <IconTxt stroke={2} size={90} />
                    )}
                  </CardContent>
                  <CardFooter>
                    {document.title}
                  </CardFooter>
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
                  __html: selectedDocument.content || "",
                }}
              />
            )}
            {!selectedDocument.pdfUrl && (
              <>
                
                  <EditDocument
                    documentId={selectedDocument.id}
                    initialTitle={selectedDocument.title}
                    initialContent={selectedDocument.content || ""}
                  />
                
              </>
            )}
            <Button
              onClick={handleDelete}
              disabled={!selectedDocument}
            >
              Delete Document
            </Button>
            <Button
              onClick={handleAddToResources}
              disabled={!selectedDocument || isAddingResource}
            >
              {isAddingResource ? "Adding..." : "Add to Resources"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetDocuments;

