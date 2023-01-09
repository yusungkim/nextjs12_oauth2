import { ReactNode } from 'react'
import { NFC } from './component'
import Icon from './icon'
import { GlobeAsiaAustraliaIcon, CalendarDaysIcon, Bars3Icon, UserCircleIcon, BookOpenIcon } from "@heroicons/react/24/solid";
import Link from 'next/link';
import { useLocale } from '@lib/client/useLocale';
import useUser from '@lib/client/useUser';
import SignoutButton from "@components/auth/SignoutButton"

type LayoutProps = Required<{
  readonly children: ReactNode
}>

const Layout: NFC<LayoutProps> = ({ children }) => {
  const { i18n, locale, otherLocales, changeLocale } = useLocale();
  const { isLoading, user } = useUser()

  return (
    <>
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

      <div className="w-full drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">

          {/* NavBar */}
          <nav className="navbar sticky w-full top-0 z-50 flex items-center shadow-md py-3 md:px-10">
            {/* Left - Menu */}
            <label htmlFor="my-drawer-3" className="md:hidden flex justify-center items-center btn btn-ghost btn-square">
              <Bars3Icon className="h-6 cursor-pointe" />
            </label>

            {/* Middle - AppIcon */}
            <div className="flex justify-center md:justify-start items-center py-2 flex-grow gap-6">
              <Link href="/"><Icon name="leaf" stroke="#3DB868" /></Link>
              <ul className="hidden md:flex gap-6">
                <li><Link href="/recipes">{i18n.NAV.RECIPE}</Link></li>
                <li><Link href="/profile">{i18n.NAV.PROFILE}</Link></li>
                <li><Link href="/development">{i18n.NAV.DEV_SCHEDULE}</Link></li>
              </ul>
            </div>

            {/* Right - Join */}
            <div className="flex items-center space-x-4 justify-end text-gray-500">
              <li className="dropdown dropdown-end dropdown-hover hidden md:block">
                <label>{i18n.LANGUAGE}</label>
                <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32 shadow-slate-600">
                  {otherLocales?.map((other, idx) => (
                    <li key={idx} onClick={() => changeLocale(other.locale)}>
                      <span >{other.name}</span>
                    </li>
                  ))}
                </ul>
              </li>
              {/* <UserCircleIcon className="h-9 cursor-pointe" /> */}
              {isLoading || !Boolean(user)
                ? (
                  <>
                    <Link href="/login" className="btn btn-info w-28 btn-outline hidden md:flex">Login</Link>
                    <Link href="/join" className="btn btn-info w-28">Join</Link>
                  </>
                )
                : (
                  <>
                    <SignoutButton />
                  </>
                )
              }

              {/* <label htmlFor="main-modal" className="btn btn-info w-28">Join</label> */}
              {/* <input type="checkbox" id="main-modal" className="modal-toggle" /> */}
            </div>
          </nav>

          {/* Content */}
          <div className="h-screen flex flex-col justify-center items-center ">
            <div className="w-[414px] h-full flex flex-col justify-center items-center">
              <div className="w-full">
                {children}
              </div>
            </div>
          </div>
        </div >

        {/* Drawer */}
        <div className="drawer-side" >
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 w-60 bg-base-100">
            <li>{process.env.NEXT_PUBLIC_APP_NAME}</li>
            <li><Link href="/recipes"><BookOpenIcon className="h-6 w-6" />{i18n.NAV.RECIPE}</Link></li>
            <li><Link href="/profile"><UserCircleIcon className="h-6 w-6" />{i18n.NAV.PROFILE}</Link></li>
            <li className="dropdown dropdown-right dropdown-hover">
              <label><GlobeAsiaAustraliaIcon className="h-6 w-6" />{i18n.NAV.LANGUAGE} - {i18n.LANGUAGE}</label>
              <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32 shadow-slate-600">
                {otherLocales?.map((other, idx) => (
                  <li key={idx} onClick={() => changeLocale(other.locale)}>
                    <span >{other.name}</span>
                  </li>
                ))}
              </ul>
            </li>
            <li><Link href="/development"><CalendarDaysIcon className="h-6 w-6" />{i18n.NAV.DEV_SCHEDULE}</Link></li>
          </ul>
        </div>
      </div >
    </>
  )
}

export default Layout