import { NextComponentType } from "next"

// custom type, NFC: Next Functional Component
export type NFC<ComponentProps = {}, InitialProps = {}> = NextComponentType<NextPageContext, InitialProps, ComponentProps>