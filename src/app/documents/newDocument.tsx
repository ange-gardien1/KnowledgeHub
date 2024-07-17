"use client";

import CreateDocuments from "@/components/newDocument/createDocument";
import DocumentUpload from "@/components/newDocument/uploadDocument";
import React from "react";

function Createdocument() {
  return (
    <div className="flex justify-center items-center  space-x-4">
      <div>
        <DocumentUpload />
      </div>
      <div>
        <CreateDocuments />
      </div>
     
    </div>
  );
}

export default Createdocument;
