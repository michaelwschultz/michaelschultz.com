import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handle(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  // revalidate cache in the background on each request
  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')

  const posts = await prisma.post.findMany()
  res.json(posts)
}
