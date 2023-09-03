'use client'
import React from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@ui/dialog'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/form'

import { Input } from '@ui/input'
import { Button } from '@ui/button'
import { ModeToggle } from '@/components/ModeToggle'

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Server name is required' })
    .min(3, { message: 'Name must be at least 3 characters.' }),
  imageUrl: z.string().min(2, { message: 'Image URL is required.' }),
})

type CreateServerFormType = z.infer<typeof formSchema>

function InitialModal() {
  const form = useForm<CreateServerFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
    },
  })

  const { isSubmitting: isLoading } = form.formState

  const onSubmit = async (values: CreateServerFormType) => {
    console.log(values)
  }

  return (
    <Dialog open>
      <DialogContent className="overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center text-base text-zinc-600">
            Give your server a personality with a name and an image. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-end justify-end">
          <ModeToggle />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 p-6 ">
              <div className="flex items-center justify-center text-center">
                TODO: Upload Image
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-zinc-200">
                      Server Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-100/80 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-zinc-500/10"
                        placeholder="Enter server name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className=" px-6 py-4">
              <Button disabled={isLoading} variant="primary">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default InitialModal
