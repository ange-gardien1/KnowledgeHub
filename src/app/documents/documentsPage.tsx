"use client";
import { useState } from "react";

import Createdocument from "./newDocument";
import Tiptap from "@/components/Tiptap";
import GetProjects from "../projects/getProjects";
import GetAllResources from "@/components/getResources";
import { ResourcePopover } from "@/components/addResources";

function Documents() {
  const [activeTab, setActiveTab] = useState("documents");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-screen flex bg-white">
      <div className="w-full pl-20 pt-4">
        <div className="flex flex-col gap-4 mt-12 ml-12">
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => handleTabClick("documents")}
              className={`py-2 px-4 ${
                activeTab === "documents"
                  ? "border-b-2 border-blue-500 font-semibold"
                  : "text-gray-500"
              }`}
            >
              Documents
            </button>
            <button
              onClick={() => handleTabClick("resources")}
              className={`py-2 px-4 ${
                activeTab === "resources"
                  ? "border-b-2 border-blue-500 font-semibold"
                  : "text-gray-500"
              }`}
            >
              Resources
            </button>
          </div>

          <div className="p-4">
            {activeTab === "documents" && (
              <>
                <Createdocument />
                <GetProjects />
                <Tiptap />
              </>
            )}
            {activeTab === "resources" && (
              <>
                <ResourcePopover />
                <GetAllResources />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Documents;
