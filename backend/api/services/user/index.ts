import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'THIS_IS_THE_SECRET'

type UserSignupOptions = {
  Body: {
    input: {
      email: string
      password: string
      firstName: string
      lastName: string
      phone?: number
    }
  }
}

type UserSignInOptions = {
  Body: {
    input: {
      email: string
      password: string
    }
  }
}

const signupRoute: FastifyPluginAsync = async fastify => {
  fastify.post<UserSignupOptions>('/auth/sign_up', {}, async (request, reply) => {
    const hashed = await bcrypt.hash(request.body.input.password, 10)
    const user = await request.prisma.user.create({ data: {
      ...request.body.input,
      password: hashed,
    }})

    const token = jwt.sign({ sub: user.id }, JWT_SECRET)

    return reply.code(201).send({
      user,
      jwt: token,
    })
  })

  fastify.post<UserSignInOptions>('/auth/sign_in', {}, async (request, reply) => {
    const user = await request.prisma.user.findUnique({ where: { email: request.body.input.email }})
    if (!user) return reply.code(400).send('wrong credentials')

    const isMatch = await bcrypt.compare(request.body.input.password, user.password)
    if (!isMatch) return reply.code(400).send('wrong credentials')

    const token = jwt.sign({ sub: user.id }, JWT_SECRET)

    return reply.code(201).send({
      user,
      jwt: token,
    }) 
  })
}

export default fp(signupRoute)