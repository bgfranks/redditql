import type { NextPage } from 'next'
import Head from 'next/head'
import PostBox from '../components/PostBox'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>RedditQL</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/* Post Box */}
      <PostBox />
      <div>{/* Feed */}</div>
    </div>
  )
}

export default Home
