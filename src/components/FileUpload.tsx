'use client'

import React from 'react'
import { type OurFileRouter } from '@/app/api/uploadthing/core'
import '@uploadthing/react/styles.css'
import { UploadDropzone } from '@/lib/uploadthing'
import { X } from 'lucide-react'
import Image from 'next/image'

type FileUploadProps = {
  endpoint: keyof OurFileRouter
  value: string
  onChange: (url?: string) => void
}

function FileUpload({ endpoint, value, onChange }: FileUploadProps) {
  const fileType = value.split('.').pop()

  if (value && fileType !== 'pdf') {
    return (
      <div className="relative h-20 w-20">
        <Image
          fill
          src={value}
          alt={`${endpoint.toUpperCase()}-Upload`}
          className="rounded-full"
        />
        <button
          onClick={() => onChange('')}
          className="absolute right-0 top-0 rounded-full bg-rose-500 p-1 text-white shadow-sm dark:bg-red-700 dark:text-white/70"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (res && res.length) {
          onChange(res[0].url)
        }
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        console.log(`ERROR! ${error.message}`)
      }}
    />
  )
}

export default FileUpload
