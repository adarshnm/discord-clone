import React from 'react'
import { redirect } from 'next/navigation'
import { initialProfile } from '@/lib/initialProfile'
import { getInitialServerOfProfile } from '@/lib/server'

async function SetupPage() {
  const profile = await initialProfile()
  const server = await getInitialServerOfProfile(profile)

  if (server) {
    redirect(`servers/${server.id}`)
  }

  return <div>SetupPage</div>
}

export default SetupPage
