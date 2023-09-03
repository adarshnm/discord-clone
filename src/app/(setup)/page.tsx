import React from 'react'
import { redirect } from 'next/navigation'
import dynamic from 'next/dynamic'
import { initialProfile } from '@/lib/initialProfile'
import { getInitialServerOfProfile } from '@/lib/server'
import { ModeToggle } from '@/components/ModeToggle'
import { UserButton } from '@clerk/nextjs'
const InitialModal = dynamic(() => import('@modals/InitialModal'), {
  ssr: false,
})

async function SetupPage() {
  const profile = await initialProfile()
  const server = await getInitialServerOfProfile(profile)

  if (server) {
    redirect(`servers/${server.id}`)
  }

  return (
    <main>
      <header>
        <div className="flex">
          <h2>Welcome</h2>
          <div>
            <ModeToggle />
            <UserButton />
          </div>
        </div>
      </header>
      <InitialModal />
    </main>
  )
}

export default SetupPage
