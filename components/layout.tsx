import { ReactNode } from 'react'
import { NextComponentType, NextPageContext } from "next"

type LayoutProps = Required<{
  readonly children: ReactNode
}>

const Layout: NextComponentType<NextPageContext, {}, LayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-[414px] h-full flex flex-col justify-center items-center">
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout