"use client";

import CreateDocuments from "@/components/newDocument/createDocument";
import DocumentUpload from "@/components/newDocument/uploadDocument";
import React from "react";
import ProjectCreate from "../projects/createProject";

function Createdocument() {
  return (
    <div className="flex justify-center items-center  space-x-4">
     <ProjectCreate/>
    </div>
  );
}

export default Createdocument;
