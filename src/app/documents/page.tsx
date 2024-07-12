
import DocumentUpload from '@/components/newDocument/uploadDocument'
import Sidebar from '@/components/sideBar'
import React from 'react'
import Createdocument from './newDocument'
import GetDocuments from '../dashboard/documents'
import CreateDocuments from '@/components/newDocument/createDocnbebt'


function documents() {
  return (
    <div className="w-screen flex bg-white ">
      <Sidebar />
      <div className="w-full pl-20 pt-4">
        {" "}
        <div>
       <Createdocument/>
        </div>
      <GetDocuments/>
      </div>
    </div>
  )
}

export default documents