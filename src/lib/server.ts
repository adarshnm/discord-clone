import 'server-only'
import { Profile } from '@prisma/client'
import { db } from '@/lib/db'

export const getInitialServerOfProfile = async (profile: Profile) => {
  const servers = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  return servers
}
