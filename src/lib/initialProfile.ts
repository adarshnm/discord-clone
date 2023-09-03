import { currentUser, redirectToSignIn } from '@clerk/nextjs'
import 'server-only'
import { db } from '@/lib/db'
import { Profile } from '@prisma/client'

export const initialProfile = async (): Promise<Profile> => {
  let user
  try {
    user = await currentUser()
  } catch (error) {
    console.log(error)
  }

  if (!user) {
    return redirectToSignIn()
  }

  const profile = await db.profile.findUnique({ where: { userId: user.id } })

  if (profile) return profile

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses.at(0)?.emailAddress!,
    },
  })

  return newProfile
}
