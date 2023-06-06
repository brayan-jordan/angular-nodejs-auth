import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { userRoutes } from './routes/user'

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'angular-nodejs-auth',
})

app.register(userRoutes)

app
  .listen({
    port: 3333,
    // host: '0.0.0.0',
  })
  .then(() => {
    console.log('Server is running on port 3333')
  })
