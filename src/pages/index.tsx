import { useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import Head from 'next/head'

// gql
import { GET_SUBREDDITS_WITH_LIMIT } from '../../graphql/queries'

// components
import Feed from '../components/Feed'
import PostBox from '../components/PostBox'
import SubredditRow from '../components/SubredditRow'

const Home: NextPage = () => {
  const { data } = useQuery(GET_SUBREDDITS_WITH_LIMIT, {
    variables: {
      limit: 10,
    },
  })

  const subreddits: Subreddit[] = data?.getSubredditsWithLimit

  return (
    <div className='max-w-5xl my-7 mx-auto'>
      <Head>
        <title>RedditQL</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/* Post Box */}
      <PostBox />
      <div className='flex'>
        <Feed />
        <div className='sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline'>
          <p className='text-md mb-1 p-4 pb-3 font-bold'>Top Communities</p>
          <div className=''>
            {/* list subreddits limit to 10 */}
            {subreddits?.map((subreddit, i) => (
              <SubredditRow
                key={subreddit.id}
                index={i}
                topic={subreddit.topic}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
