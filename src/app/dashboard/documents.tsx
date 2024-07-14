"use client";

import { useState } from "react";
import { trpc } from "../_trpc/client";
import { IconPdf, IconTxt } from "@tabler/icons-react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

type Document = {
  id: string;
  title: string;
  pdfUrl?: string | null;
  content?: string | null;
};

const GetDocuments = () => {
  const { data, isLoading } = trpc.documents.getdocuments.useQuery();
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );

  const handleDocumentClick = (document: Document) => {
    setSelectedDocument(document);
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading documents...</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {data?.map((document: Document) => (
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
                    <IconTxt stroke={2} size={90}/>
                  )}
                </CardContent>
                <CardFooter>{document.title}</CardFooter>
              </Card>
            </div>
          ))}
        </div>
      )}
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
        </div>
      )}
    </div>
  );
};

export default GetDocuments;
