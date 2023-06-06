import { FastifyInstance } from 'fastify'

export async function contentRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get('/content', async (request) => {
    return request.user
  })
}
