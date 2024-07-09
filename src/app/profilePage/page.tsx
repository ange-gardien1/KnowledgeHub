"use client"
import React from 'react'
import { trpc } from '../_trpc/client'

function ProfilePage() {
    const {data, isLoading} = trpc.users.getAll.useQuery();
  return (
    <div>{data && JSON.stringify(data)}</div>
  )
}

export default ProfilePage