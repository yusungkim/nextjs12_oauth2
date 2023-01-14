import { v4 as uuidv4 } from 'uuid'

export const currentUnixTime = () => {
  return Math.floor((new Date()).getTime() / 1000)
}

interface tokenProps {
  provider?: string
  expireIn?: number
}

interface TokenInfo {
  payload: string
  expireAt: number
}

export const createToken = ({ provider = "email", expireIn = 60 * 60 }: tokenProps): TokenInfo => {
  const rand1 = uuidv4().replaceAll("-", "")
  const rand2 = Math.floor(100_000 + Math.random() * 900_000)
  const rand3 = uuidv4().replaceAll("-", "")

  return {
    payload: [provider, "-", rand1, rand2, rand3].join(""),
    expireAt: currentUnixTime() + Math.abs(expireIn),
  }
}

export const validateToken = (expireAt: number | bigint): boolean => {
  const currentTime = BigInt(currentUnixTime())
  const expireAtAsBigInt = BigInt(expireAt)
  return currentTime < expireAtAsBigInt
}