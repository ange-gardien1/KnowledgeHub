
import Sidebar from '@/components/sideBar'
import React from 'react'
import { Navbar } from '@/components/navBar'
import Documents from './documentsPage'



function documents() {
  return (
    <div className="w-screen flex bg-white ">
      <Sidebar />
      <Navbar/>
      
      <div>
      <Documents/>
    </div>
    
    </div>
    
  )
}

export default documents