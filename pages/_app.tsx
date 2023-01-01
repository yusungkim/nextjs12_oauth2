import '../styles/globals.css'
import Layout from '@components/layout'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { SWRConfig } from 'swr';

const fetcher = (url: string) => fetch(url).then((response) => response.json());

function MyApp({ Component, pageProps }: AppProps) {
  return <Layout>
    <Head>
      <title>Oauth2.0</title>
      <meta name="description" content="Oauth2.0 Demo" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <SWRConfig value={{ fetcher }}>
      <Component {...pageProps} />
    </SWRConfig>
  </Layout>
}

export default MyApp;