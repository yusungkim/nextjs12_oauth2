import { v4 as uuidv4 } from 'uuid'

export const currentUnixTime = () => {
  return Math.floor((new Date()).getTime() / 1000)
}

export const createToken = (provider: string): string => {
  const rand1 = uuidv4().replaceAll("-", "")
  const rand2 = Math.floor(100_000 + Math.random() * 900_000)
  const rand3 = uuidv4().replaceAll("-", "")

  return [provider, "-", rand1, rand2, rand3].join("")
}