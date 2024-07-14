import { trpc } from "@/app/_trpc/client";
import React, { useState, useRef } from "react";
import { IconPlus, IconTrashX, IconPhotoPlus } from "@tabler/icons-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const DocumentUpload: React.FC = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadDocument = trpc.documents.newDocument.useMutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);

    if (!title || !file) {
      setError("Title and file are required");
      setSubmitting(false);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64File = reader.result?.toString().split(",")[1];

      try {
        await uploadDocument.mutateAsync({
          title,
          type: file.type === "application/pdf"  ? "pdf" : "pdf",
          pdfUrl: base64File,
        });
        setTitle("");
        setFile(null);
        setError(null);
        alert("Document uploaded successfully!");
      } catch (err: any) {
        setError(err.message || "Failed to upload document");
      } finally {
        setSubmitting(false);
      }
    };

    reader.onerror = () => {
      setError("Failed to read file");
      setSubmitting(false);
    };
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDelete = () => {
    setFile(null);
    setError(null);
  };

  return (
    <div className="relative flex justify-end p-4">
      <Popover>
        <PopoverTrigger asChild>
          <button className="button gap-2 bg-primary-500 hover:bg-primary-600 text-highlight-300 flex items-center p-2 rounded">
            <IconPlus size={16} stroke={2} strokeLinejoin="miter" />
            Add Document
          </button>
        </PopoverTrigger>
        <PopoverContent className="max-w-lg p-4 bg-white rounded shadow-lg">
          <div className="flex flex-col pb-5">
            <div className="sticky top-0 z-20 flex items-center bg-white py-3 text-xs dark:bg-hc-darkgray-50">
              <h2 className="text-sm font-bold text-hc-gray-800 dark:text-gray-200 xl:text-base">
                Add New Document
              </h2>
              <div className="ml-auto flex gap-4">
                <button
                  className="button text-hc-blue-900 dark:bg-hc-darkgray-200 dark:text-gray-300 bg-hc-blue-50 gap-2 p-2 rounded"
                  onClick={() => setFile(null)}
                >
                  Cancel
                </button>
                <button
                  className={`button w-fit text-highlight-300 bg-primary-500 gap-2 p-2 rounded ${submitting ? 'opacity-50' : ''}`}
                  onClick={handleSubmit}
                  type="submit"
                  disabled={submitting}
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="mt-10">
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter the Title"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50 dark:bg-hc-darkgray-100 dark:border-hc-darkgray-200 dark:text-gray-300"
                />
              </div>
              {error && (
                <p className="my-1 text-xs text-error first-letter:uppercase">
                  {error}
                </p>
              )}
              {!file && (
                <label className="flex h-52 flex-col items-center justify-center rounded-xl border border-dashed border-hc-blue-300 bg-hc-blue-50 py-8 hover:cursor-pointer dark:border-hc-darkgray-100 dark:bg-hc-darkgray-200">
                  <input
                    type="file"
                    hidden
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="application/pdf"
                  />
                  <span className="hover:shadow:sm flex h-20 w-20 items-center justify-center rounded-full bg-white dark:bg-hc-darkgray-300">
                    <IconPhotoPlus
                      size={34}
                      className="text-primary dark:text-gray-100"
                      stroke={2}
                      strokeLinejoin="miter"
                    />
                  </span>
                  <p className="mt-2 text-xs text-hc-gray-800 dark:text-gray-300">
                    Drop your files here or&nbsp;
                    <span className="cursor-pointer text-primary underline dark:text-gray-100">
                      browse
                    </span>
                  </p>
                  <p className="mt-2 text-xsm text-hc-gray-400">
                    Max file size 25MB, PDF file supported.
                  </p>
                </label>
              )}
            </div>
            {file && (
              <div className="mt-6 flex h-24 items-center justify-between rounded-xl border border-hc-blue-50 bg-hc-blue-50 px-4 dark:border-hc-darkgray-200 dark:bg-hc-darkgray-100">
                <div className="flex items-center gap-2">
                  <p className="text-xs text-hc-gray-800 dark:text-gray-200">
                    {file.name}
                  </p>
                </div>
                <button
                  onClick={handleDelete}
                  className="button gap-2 bg-white text-hc-gray-900 dark:bg-hc-darkgray-200 dark:text-gray-300 p-2 rounded"
                  type="button"
                >
                  <IconTrashX
                    size={15}
                    className="text-primary dark:text-gray-300"
                    stroke={2}
                    strokeLinejoin="miter"
                  />
                  Delete
                </button>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DocumentUpload;
