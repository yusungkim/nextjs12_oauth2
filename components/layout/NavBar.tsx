import { Bars3Icon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { NFC } from "../component"
import Icon from "../common/Icon"
import { useLocale } from '@lib/client/useLocale'
import useUser from '@lib/client/useUser'
import SignoutButton from "../auth/SignoutButton"

interface NavBarProps {
  locales: ReturnType<typeof useLocale>
}

const NavBar: NFC<NavBarProps> = ({ locales }) => {
  const { i18n, otherLocales, changeLocale } = locales
  const { isLoading, user } = useUser()

  return (
    <nav className="navbar w-full top-0 z-50 flex items-center shadow-md py-3 md:px-10">
      {/* Left - Menu */}
      <label htmlFor="my-drawer-3" className="md:hidden flex justify-center items-center btn btn-ghost btn-square">
        <Bars3Icon className="h-8 cursor-pointe" />
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

      {/* Right - Language/Auth */}
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

        {isLoading || !Boolean(user)
          ? (
            <>
              <Link href="/login" className="btn btn-neutral w-28 btn-outline hidden md:flex">Login</Link>
              <Link href="/join" className="btn btn-neutral w-28">Join</Link>
            </>
          )
          : (
            <div className="dropdown dropdown-end dropdown-hover">
              {user?.avatar_url
                ? (
                  <label className="avatar ">
                    <div className="mask mask-squircle w-10">
                      <img src={user.avatar_url} />
                    </div>
                  </label>

                )
                : (
                  <div className="avatar placeholder">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                      <span className="text-3xl">{user?.name.charAt(0).toUpperCase()}</span>
                    </div>
                  </div>
                )
              }
              <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 shadow-slate-600">
                <li><Link href="/profile">{i18n.NAV.PROFILE}</Link></li>
                <li><SignoutButton /></li>
              </ul>
            </div>
          )
        }
      </div>
    </nav >
  )
}

export default NavBar