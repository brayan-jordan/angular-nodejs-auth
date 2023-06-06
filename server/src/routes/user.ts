import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function userRoutes(app: FastifyInstance) {
  app.post('/user', async (request, reply) => {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
      confirmPassword: z.string(),
    })

    let { email, password, confirmPassword } = bodySchema.parse(request.body)

    if (password !== confirmPassword) {
      return reply.status(400).send({
        message: 'Passwords do not match',
      })
    }

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userAlreadyExists) {
      return reply.status(400).send({
        message: 'User already exists',
      })
    }

    password = await app.bcrypt.hash(password)

    await prisma.user.create({
      data: {
        email,
        password,
      },
    })

    return reply.status(201).send()
  })

  app.post('/login', async (request, reply) => {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    })

    const { email, password } = bodySchema.parse(request.body)

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return reply.status(400).send({
        message: 'User does not exists',
      })
    }

    const passwordMatch = await app.bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return reply.status(400).send({
        message: 'Incorrect password',
      })
    }

    const token = app.jwt.sign({
      id: user.id,
    })

    return reply.status(200).send({
      token,
    })
  })
}
