export const currentUnixTime = () => {
  return Math.floor((new Date()).getTime() / 1000)
}