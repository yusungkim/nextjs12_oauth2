import { SWRConfig } from 'swr'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

const fetcher = (url: string) => fetch(url).then((response) => response.json())

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp