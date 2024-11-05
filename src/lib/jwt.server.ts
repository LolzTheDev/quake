import * as jwt from "jose"
import { db } from "./server/db.server"
import { verify } from "argon2"

const JWT_SECRET = new TextEncoder().encode(
  "demo"
)

const alg = "HS256"

export namespace auth {
  export async function createToken(data: Object): Promise<string> {
    const token = await new jwt.SignJWT(data as jwt.JWTPayload)
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime("14d")
      .sign(JWT_SECRET)

    return token
  }

  export async function verifyToken(data: string): Promise<boolean> {
    let valid = false
    try {
      await jwt.jwtVerify(data, JWT_SECRET, {
        algorithms: [alg]
      })
      valid = true
    } catch (err) {
      valid = false
    }

    return valid
  }

  export async function decryptToken(data: string): Promise<any> {
    if (!(await verifyToken(data))) {
      return null
    }
    return await jwt.jwtVerify(data, JWT_SECRET, {
      algorithms: [alg]
    })
  }

  export async function login(username: string, password: string): Promise<{
    status: boolean
    token: string
  }> {
    const user = await db.user.findFirst({
      where: {
        username
      }
    })

    if (!user) {
      return { status: false, token: "" }
    }

    if (!(await verify(user.password, password))) {
      return { status: false, token: "" }
    }

    return { status: true, token: await createToken({ user: username, id: user.id }) }
  }
}