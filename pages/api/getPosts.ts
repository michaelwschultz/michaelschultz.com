import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handle(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const posts = await prisma.post.findMany()
  res.json(posts)
}
