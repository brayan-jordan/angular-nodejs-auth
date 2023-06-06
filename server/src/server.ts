import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import bcrypt from 'fastify-bcrypt'
import { userRoutes } from './routes/user'
import { contentRoutes } from './routes/content'

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(bcrypt, {
  saltWorkFactor: 12,
})

app.register(jwt, {
  secret: 'angular-nodejs-auth', // caso for colocar em prod, substituir por uma variável de ambiente
})

app.register(userRoutes)
app.register(contentRoutes)

app
  .listen({
    port: 3333,
    // host: '0.0.0.0',
  })
  .then(() => {
    console.log('Server is running on port 3333')
  })
