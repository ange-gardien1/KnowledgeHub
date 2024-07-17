"use client"

import FeatureSection from '@/components/featureSection'
import InformationSection from '@/components/informationSection'
import WelcomeSection from '@/components/welcomeSection'
import React from 'react'
import GetNotifications from './notifications'



function ProfilePage() {
    
  return (
   <div>
    {/* <Sidebar/> */}
    {/* <WelcomeSection/>
    <FeatureSection/>
   <InformationSection/> */}
   <GetNotifications/>
  
   </div>
  )
}

export default ProfilePage
