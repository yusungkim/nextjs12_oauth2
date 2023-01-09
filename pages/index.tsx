import Login from '@components/auth/Login'
import SignoutButton from '@components/auth/SignoutButton'
import useUser, { User } from '@lib/client/useUser'
import type { NextPage, NextComponentType, NextPageContext } from 'next'

const Welcome: NextComponentType<NextPageContext, {}, { user: User }> = ({ user }) => {
  return (
    <>
      <h1 className="text-3xl font-semibold text-center">Welcome back, {user.name}.</h1>
      <img className="w-16 h-16 mx-auto my-5 border border-1 rounded-full p-1" src={user.avatar_url} alt="" />
      <div className="divider"></div>
      <SignoutButton />
    </>
  )
}

const Strong = ({ text }: { text: string }) => {
  return (
    <span className="font-semibold text-info decoration-info">
      {text}
    </span>
  );
};

const Home: NextPage = () => {
  const { user } = useUser()

  return (
    <div className="flex justify-center items-center text-3xl h-[40rem] md:h-[45rem] lg:h-[55rem]">
      <p className="text-center font-serif leading-normal">
        <Strong text="健康" />
        で、
        <Strong text="美味しく" />
        <br />
        <br />
        そして、
        <br />
        <Strong text="ずっと続けられる。" />
        <br />
        <br />
        ヴィーガンライフの
        <br />
        <Strong text="ビギナー" />と<Strong text="その家族" />を<br />
        応援します。
      </p>
    </div>
  )
}

export default Home
