
import Sidebar from '@/components/sideBar'
import React from 'react'

import Documents from './documentsPage'
import Navbar from '@/components/navBar'
import { auth } from '../auth';



async function documents() {
  const session = await auth();
  return (
    <div className="w-screen flex bg-white ">
      <Sidebar />
      <Navbar session={session}/>
      
      <div>
    <Documents />;
    </div>
    
    </div>
    
  )
}

export default documents