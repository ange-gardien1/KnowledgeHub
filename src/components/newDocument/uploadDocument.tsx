import { trpc } from "@/app/_trpc/client";
import React, { useState } from "react";


const DocumentUpload: React.FC = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadDocument = trpc.documents.newDocument.useMutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !file) {
      setError("Title and file are required");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64File = reader.result?.toString().split(",")[1];

      try {
        await uploadDocument.mutateAsync({
          title,
          type: file.type === "application/pdf" ? "pdf" : "pdf",
          pdfUrl: base64File,
        });
        setTitle("");
        setFile(null);
        setError(null);
        alert("Document uploaded successfully!");
      } catch (err: any) {
        setError(err.message || "Failed to upload document");
      }
    };

    reader.onerror = () => {
      setError("Failed to read file");
    };
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="file">File:</label>
        <input type="file" id="file" onChange={handleFileChange} />
      </div>
      <button type="submit">Upload</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default DocumentUpload;
