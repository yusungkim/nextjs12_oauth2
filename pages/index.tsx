import Layout from '@components/layout/Layout';
import { useLocale } from '@lib/client/useLocale';
import type { NextPage } from 'next'

const Strong = ({ text }: { text: string }) => {
  return (
    <span className="font-semibold text-primary-focus decoration-primary-focus">
      {text}
    </span>
  );
};

const Home: NextPage = () => {
  const { i18n: { PAGE: { ROOT } } } = useLocale()

  return (
    <Layout pageTitle={ROOT.TITLE} >
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
    </Layout>
  )
}

export default Home
