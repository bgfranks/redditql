import TimeAgo from 'react-timeago'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'

// gql
import { GET_ALL_VOTES_BY_POST_ID } from '../../graphql/queries'
import { ADD_VOTE } from '../../graphql/mutations'

// components
import Avatar from './Avatar'
import Loading from './Loading'

// icons
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatBubbleLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from '@heroicons/react/24/outline'

type Props = {
  post: Post
  postLoading?: boolean
}

export default function Post({ post, postLoading }: Props) {
  const [vote, setVote] = useState<boolean>()
  const { data: session } = useSession()

  const { data, loading, error } = useQuery(GET_ALL_VOTES_BY_POST_ID, {
    variables: {
      post_id: post?.id,
    },
  })
  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_ALL_VOTES_BY_POST_ID, 'getVotesByPostId'],
  })

  const upVote = async (isUpVote: boolean) => {
    // checks for session to vote
    if (!session) {
      toast('You must be signed in to vote!')
      return
    }

    // if you already voted up and try to upvote again, return
    if (vote && isUpVote) return
    // if you downvoted and try to downvote again, return
    if (vote === false && !isUpVote) return

    await addVote({
      variables: {
        post_id: post.id,
        username: session.user?.name,
        upvote: isUpVote,
      },
    })
  }

  useEffect(() => {
    const votes: Vote[] = data?.getVotesByPostId
    const vote = votes?.find(
      (vote) => vote.username == session?.user?.name
    )?.upvote

    setVote(vote)
  }, [data])

  const displayVotes = (data: any) => {
    const votes: Vote[] = data?.getVotesByPostId
    const displayNumber = votes?.reduce(
      (total, vote) => (vote.upvote ? (total += 1) : (total -= 1)),
      0
    )

    if (votes?.length === 0) return 0

    if (displayNumber === 0) {
      return votes[0]?.upvote ? 1 : -1
    }

    return displayNumber
  }

  if (postLoading) return <Loading />

  return (
    <Link href={`/post/${post.id}`}>
      <div className='flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border-gray-600'>
        {/* Votes */}
        <div className='flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-5 text-gray-400'>
          <ArrowUpIcon
            className={`voteButtons hover:text-blue-400 ${
              vote && 'text-blue-400'
            }`}
            onClick={() => upVote(true)}
          />
          <p className='text-xs font-bold text-black'>{displayVotes(data)}</p>
          <ArrowDownIcon
            className={`voteButtons hover:text-red-400 ${
              vote === false && 'text-red-400'
            }`}
            onClick={() => upVote(false)}
          />
        </div>
        {/* Header */}
        <div className='p-3 pb-1'>
          <div className='flex items-center space-x-2'>
            <Avatar seed={post.subreddit[0]?.topic} />
            <p className='text-xs text-gray-400'>
              <Link href={`/subreddit/${post.subreddit[0]?.topic}`}>
                <span className='font-bold text-black hover:text-blue-400 hover:underline'>
                  r/{post.subreddit[0]?.topic}
                </span>
              </Link>{' '}
              • Posted by u/
              {post.username} <TimeAgo date={post.created_at} />
            </p>
          </div>
          {/* Body */}
          <div className='py-4'>
            <h2 className='text-xl font-semibold'>{post.title}</h2>
            <p className='mt-2 text-sm font-light'>{post.body}</p>
          </div>
          {/* Image */}
          {post.image && (
            <img className='w-full' src={post.image} alt={post.title} />
          )}
          {/* Footer */}
          <div className='flex space-x-4 text-gray-400'>
            <div className='postButtons'>
              <ChatBubbleLeftEllipsisIcon className='h-6 w-6' />
              <p className=''>{post.comments.length} Comments</p>
            </div>
            <div className='postButtons'>
              <GiftIcon className='h-6 w-6' />
              <p className='hidden sm:inline'>Award</p>
            </div>
            <div className='postButtons'>
              <ShareIcon className='h-6 w-6' />
              <p className='hidden sm:inline'>Share</p>
            </div>
            <div className='postButtons'>
              <BookmarkIcon className='h-6 w-6' />
              <p className='hidden sm:inline'>Save</p>
            </div>
            <div className='postButtons'>
              <EllipsisHorizontalIcon className='h-6 w-6' />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
