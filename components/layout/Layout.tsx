import { ReactNode } from 'react'
import { NFC } from '../component'
import { useLocale } from '@lib/client/useLocale';
import useUser from '@lib/client/useUser';
import Footer from './Footer';
import NavBar from './NavBar';
import Drawer from './Drawer';
import Head from 'next/head';

type LayoutProps = {
  readonly children: ReactNode
  privatePage?: boolean
  pageTitle?: string
  description?: string
}

const Layout: NFC<LayoutProps> = ({ children, privatePage = false, pageTitle, description }) => {
  const locales = useLocale();
  useUser({ privatePage })

  const appTitle = locales.i18n.TITLE || process.env.NEXT_PUBLIC_APP_NAME
  const title = pageTitle ? `${pageTitle} | ${appTitle}` : appTitle

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description ? description : title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-h-min scrollbar-hide">
        {/* Modal */}
        <input type="checkbox" id="main-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
            <p className="py-4">You&apos;ve been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
            <div className="modal-action">
              <label htmlFor="main-modal" className="btn">Yay!</label>
            </div>
          </div>
        </div>
        {/* <label htmlFor="main-modal" className="btn btn-info w-28">Join</label> */}
        {/* <input type="checkbox" id="main-modal" className="modal-toggle" /> */}

        {/* NavBar */}
        <div className="z-10 sticky">
          <NavBar locales={locales} />
        </div>

        {/* Drawer & Main Content */}
        <div className="w-full drawer z-0 scrollbar-hide">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

          {/* Content */}
          <div className="drawer-content flex flex-col items-center w-full">
            <main className="py-5 md:px-5 w-full flex flex-col items-center">
              {children}
            </main>
            <Footer />
          </div>

          {/* Drawer */}
          <Drawer locales={locales} />
        </div >
      </div>
    </>
  )
}

export default Layout