import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

declare module 'fastify' {
  interface FastifyRequest {
    prisma: PrismaClient
  }
}

const prismaPlugin: FastifyPluginAsync<{}> = async fastify => {
  fastify.decorateRequest('prisma', prisma)
}

export default fp(prismaPlugin)
