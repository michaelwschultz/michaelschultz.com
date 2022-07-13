import { Prisma, PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    let posts = {}

    try {
      posts = await prisma.post.create({
        data: req.body,
      })

      res.status(200).json(posts)
    } catch (e) {
      // show readable error in network tab
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(500).send(e.message)
      } else {
        res.status(500).send('Something went wrong')
      }
    }
  } else {
    res.status(400).send('Endpoint only accepts POST requests')
  }
}
