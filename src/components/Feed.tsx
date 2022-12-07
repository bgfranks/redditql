import { useQuery } from '@apollo/client'
import { GET_ALL_POSTS, GET_POST_LIST_BY_TOPIC } from '../../graphql/queries'

// components
import Post from './Post'

type Props = {
  topic: string
}

export default function Feed({ topic }: Props) {
  const { data, error } = !topic
    ? useQuery(GET_ALL_POSTS)
    : useQuery(GET_POST_LIST_BY_TOPIC, {
        variables: {
          topic: topic,
        },
      })

  console.log(data)

  const posts: Post[] = !topic ? data?.getPostList : data?.getPostListByTopic

  return (
    <div className='mt-5 space-x-4'>
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}
