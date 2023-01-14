import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { Children, ReactElement } from 'react'
import { ReactNode } from 'react'
import { NFC } from '@components/component'

interface ActiveLinkProps {
  readonly children: ReactElement
  activeClassName?: string
  href: string
  [key: string]: any
}


const ActiveLink: NFC<ActiveLinkProps> = ({
  children,
  activeClassName = "text-primary-focus", //shadow-bottom pb-2 shadow-primary/50 
  href,
  ...props
}) => {
  const { asPath } = useRouter()
  const child = Children.only(children)
  const childClassName = child.props.className || ''

  // pages/index.js will be matched via props.href
  // pages/about.js will be matched via props.href
  // pages/[slug].js will be matched via props.as
  const className =
    asPath === href || asPath === props.as
      ? `${childClassName} ${activeClassName} fill`.trim()
      : childClassName

  return (
    <Link href={href} {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  )
}

export default ActiveLink