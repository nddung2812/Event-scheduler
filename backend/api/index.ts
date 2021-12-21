import { PrismaClient } from '.prisma/client'
import fastify from 'fastify'
import fastifyCors from 'fastify-cors'
import userRoutes from './services/user'

const app = fastify({ logger: true })
declare module 'fastify' {
  interface FastifyRequest {
    prisma: PrismaClient
  }
}

app.register(fastifyCors)

const prisma = new PrismaClient()
app.decorateRequest('prisma', prisma)

app.register(userRoutes)

app.listen(3000).then(url => console.log(url))
