import {BookOpenIcon, CalendarDaysIcon, GlobeAsiaAustraliaIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { NFC } from "../component";
import { useLocale } from '@lib/client/useLocale';

interface DrawerProps {
  locales: ReturnType<typeof useLocale>
}

const Drawer: NFC<DrawerProps> = ({
  locales
}) => {
  const { i18n, otherLocales, changeLocale } = locales

  return (
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
  )
}

export default Drawer;