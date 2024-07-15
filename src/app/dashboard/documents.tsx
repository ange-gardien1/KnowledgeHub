


"use client"
import { useState } from "react";
import { trpc } from "../_trpc/client";
import { IconPdf, IconTxt } from "@tabler/icons-react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Document = {
  id: string;
  title: string;
  pdfUrl?: string | null;
  content?: string | null;
};

const GetDocuments = () => {
  const { data, isLoading } = trpc.documents.getDocumentsByUserId.useQuery();
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const addResourceMutation = trpc.resources.addResourceByDocumentId.useMutation();
  const [isAddingResource, setIsAddingResource] = useState(false); // State to manage adding resource status

  const handleDocumentClick = (document: Document) => {
    setSelectedDocument(document);
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
      setIsAddingResource(true); // Set adding resource state to true
      await addResourceMutation.mutateAsync(resource);
      alert("Document added to resources successfully!");
      setSelectedDocument(null);
    } catch (error) {
      console.error("Failed to add document to resources:", error);
      alert("Failed to add document to resources. Please try again.");
    } finally {
      setIsAddingResource(false); // Reset adding resource state
    }
  };

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {isLoading ? (
          <p>Loading documents...</p>
        ) : (
          data?.map((document: Document) => (
            <div
              key={document.id}
              style={{ flex: "0 1 18%", marginBottom: "10px" }}
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
                <CardFooter>{document.title}</CardFooter>
              </Card>
            </div>
          ))
        )}
      </div>
      {selectedDocument && (
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
          <Button
            onClick={handleAddToResources}
            disabled={!selectedDocument || isAddingResource}
          >
            {isAddingResource ? "Adding..." : "Add to Resources"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default GetDocuments;
