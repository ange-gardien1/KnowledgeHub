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
import { Button } from "../ui/button";

interface CreateDocumentsProps {
  projectId: string;
}

const CreateDocuments: React.FC<CreateDocumentsProps> = ({ projectId }) => {
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
        type: "text",
        content,
        projectId,
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
          <Button className="p-2 bg-blue-500 hover:bg-blue-600 rounded shadow">
            <IconPlus size={16} stroke={2} strokeLinejoin="miter" />
            Create Document
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[30vw] h[40vh] fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[60vw] h[50vh] bg-white rounded-lg p-6 shadow-lg overflow-y-auto">
            <div className="flex flex-col h-full">
              {/* Sticky header for the popover content */}
              <div className="sticky top-0 z-20 flex items-center bg-white py-3 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-800">
                  Create New Document
                </h2>
                <div className="ml-auto flex gap-2">
                  <Button
                    className="bg-red-500 hover:bg-red-600 gap-2 p-2 rounded"
                    onClick={() => {
                      setTitle("");
                      editor?.commands.setContent("");
                      setError(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className={`bg-green-500 hover:bg-green-600 gap-2 p-2 rounded ${
                      submitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={handleSubmit}
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? "Saving..." : "Save"}
                  </Button>
                </div>
              </div>

              {/* Content Section */}
              <div className="mt-4 flex-grow">
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                  />
                </div>

                <div className="mb-4 flex-grow">
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Content
                  </label>

                  <MenuBar editor={editor} />

                  <EditorContent
                    editor={editor}
                    className="tiptap mt-1 block w-full h-[500px] rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50 bg-white"
                  />
                </div>

                {error && (
                  <p className="my-1 text-xs text-red-500">
                    {error}
                  </p>
                )}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CreateDocuments;
