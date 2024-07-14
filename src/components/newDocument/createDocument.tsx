// Import necessary styles and components
import "./styles.scss";
import React, { useState } from "react";
import { trpc } from "@/app/_trpc/client";
import { IconPlus } from "@tabler/icons-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import MenuBar from "../menuBar";

const CreateDocuments: React.FC = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const createDocument = trpc.documents.newDocument.useMutation();

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight,
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "rounded-md border min-h-[400px] bg-gray-200",
      },
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);

    const content = editor?.getHTML();

    if (!title || !content) {
      setError("Title and content are required");
      setSubmitting(false);
      return;
    }

    try {
      await createDocument.mutateAsync({
        title,
        type: "pdf",
        content,
      });
      setTitle("");
      editor?.commands.setContent("");
      setError(null);
      alert("Document created successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to create document");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex justify-end p-4">
      <Popover>
        <PopoverTrigger asChild>
          <button className="button gap-2 bg-primary-500 hover:bg-primary-600 text-highlight-300 flex items-center p-2 rounded">
            <IconPlus size={16} stroke={2} strokeLinejoin="miter" />
            Create Document
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-[60vw] h-[80vh] p-4 bg-white rounded shadow-lg overflow-auto">
          <div className="flex flex-col pb-5 h-full">
            <div className="sticky top-0 z-20 flex items-center bg-white py-3 text-xs dark:bg-hc-darkgray-50">
              <h2 className="text-sm font-bold text-hc-gray-800 dark:text-gray-200 xl:text-base">
                Create New Document
              </h2>

              <div className="ml-auto flex gap-4">
                <button
                  className="button text-hc-blue-900 dark:bg-hc-darkgray-200 dark:text-gray-300 bg-hc-blue-50 gap-2 p-2 rounded"
                  onClick={() => {
                    setTitle("");
                    editor?.commands.setContent("");
                    setError(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className={`button w-fit text-highlight-300 bg-primary-500 gap-2 p-2 rounded ${
                    submitting ? "opacity-50" : ""
                  }`}
                  onClick={handleSubmit}
                  type="submit"
                  disabled={submitting}
                >
                  Save
                </button>
              </div>
            </div>
            <div className="mt-10 flex-grow">
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full rounded-md border-yellow-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50 dark:bg-hc-darkgray-100 dark:border-hc-darkgray-200 dark:text-gray-300"
                />
              </div>
              <div className="mb-4 flex-grow">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Content
                </label>

                <MenuBar editor={editor} />

                <EditorContent
                  editor={editor}
                  className="tiptap mt-1 block w-full h-[600px] rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50 bg-white dark:bg-hc-darkgray-100 dark:border-hc-darkgray-200 dark:text-gray-300"
                />
              </div>

              {error && (
                <p className="my-1 text-xs text-error first-letter:uppercase">
                  {error}
                </p>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CreateDocuments;
