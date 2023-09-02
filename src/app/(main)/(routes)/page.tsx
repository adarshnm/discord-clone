import { ModeToggle } from '@/components/ModeToggle'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

function Home() {
  return (
    <div className="flex w-full max-w-7xl flex-col  px-4">
      <div className="flex justify-between">
        <h1>Home</h1>
        <div className="flex gap-2">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" showName />
        </div>
      </div>
    </div>
  )
}

export default Home
