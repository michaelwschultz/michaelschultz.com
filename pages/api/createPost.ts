import { Prisma, PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    let posts = {}

    // todo: require a post body here to fill in the data
    try {
      posts = await prisma.post.create({
        data: {
          headline: 'First test post',
          description: 'This is just a test',
          body: 'This is the first test post content',
          slug: 'test-post-2',
        },
      })

      res.status(200).json(posts)
    } catch (e) {
      // show readable error in network tab
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(500).send(e.message)
      }
    }
  } else {
    res.status(400).send('Endpoint only accepts POST requests')
  }
}
