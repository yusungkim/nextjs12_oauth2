import '../styles/globals.css'
import Layout from '../components/layout'
import type { AppProps } from 'next/app'
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return <Layout>
    <Head>
      <title>JWT</title>
      <meta name="description" content="JWT Demo" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Component {...pageProps} />
  </Layout>
}

export default MyApp;