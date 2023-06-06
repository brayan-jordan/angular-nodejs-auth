import { FastifyInstance } from 'fastify'
// import { prisma } from '../lib/prisma'
// import { z } from 'zod'

export async function userRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })
}
