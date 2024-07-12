import { trpc } from "@/app/_trpc/client";
import React, { useState, useRef } from "react";
import { IconPlus } from "@tabler/icons-react";

const DocumentUpload: React.FC = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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
        <input
          type="file"
          id="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <IconPlus
          size={34}
          className="text-primary dark:text-gray-100"
          stroke={2}
          strokeLinejoin="miter"
          onClick={handleIconClick}
          style={{ cursor: "pointer" }}
        />
      </div>
      <button type="submit">Add New Document</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default DocumentUpload;
