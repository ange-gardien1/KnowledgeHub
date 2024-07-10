"use client";
import { trpc } from "../_trpc/client";
import { IconPdf } from '@tabler/icons-react';

export default function GetDocuments() {
  const { data, isLoading } = trpc.documents.getdocuments.useQuery();
  return (
    <div>
        {isLoading ? (
          <p>Loading documents...</p>
        ) : (
          <ul>
           {data?.map((document) => (
        <li key={document.id} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <p style={{ marginRight: "10px" }}>{document.title}</p>
          {document.pdfUrl && (
            <a href={document.pdfUrl} target="_blank" rel="noopener noreferrer">
             <IconPdf stroke={2} />
            </a>
          )}
        </li>
      ))}
          </ul>
        )}
    </div>
  );
}
