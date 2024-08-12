
import DocumentUpload from '@/components/newDocument/uploadDocument'
import Sidebar from '@/components/sideBar'
import React from 'react'
import Createdocument from './newDocument'
import GetDocuments from '../dashboard/documents'
import Tiptap from '@/components/Tiptap'
import GetProjects from '../projects/getProjects'
import { Navbar } from '@/components/navBar'



function documents() {
  return (
    <div className="w-screen flex bg-white ">
      <Sidebar />
      <Navbar/>
      <div className="w-full pl-20 pt-4">
        {" "}
        <div className="flex flex-col gap-4 mt-12 ml-12">
       <Createdocument/>
        </div>
        <GetProjects/>
      <Tiptap/>
      </div>
     
    </div>
  )
}

export default documents