import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

// gql
import { useMutation } from '@apollo/client'
import { ADD_POST, ADD_SUBREDDIT } from '../../graphql/mutations'
import { GET_SUBREDDIT_BY_TOPIC } from '../../graphql/queries'
import { client } from '../../apollo-client'

// components
import Avatar from './Avatar'

// icons
import { LinkIcon, PhotoIcon } from '@heroicons/react/24/outline'

// TS form types
type FormData = {
  postTitle: string
  postBody: string
  subreddit: string
  postImage: string
}

export default function PostBox() {
  const { data: session } = useSession()

  // mutations
  const [addPost] = useMutation(ADD_POST)
  const [addSubreddit] = useMutation(ADD_SUBREDDIT)

  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false)
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = handleSubmit(async (formData) => {
    const notification = toast.loading('Creating new post...')

    try {
      // query subreddit topics
      const {
        data: { getSubredditListByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: formData.subreddit,
        },
      })
      const image = formData.postImage || ''
      const subredditExists = getSubredditListByTopic.length > 0

      if (!subredditExists) {
        // create subreddit
        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        })

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            title: formData.postTitle,
            image: image,
            subreddit_id: newSubreddit.id,
            username: session?.user?.name,
          },
        })

        console.log('new post', newPost)
      } else {
        // use existing subreddit
        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            title: formData.postTitle,
            image: image,
            subreddit_id: getSubredditListByTopic[0].id,
            username: session?.user?.name,
          },
        })

        console.log('new post', newPost)
      }

      // after post has been added
      setValue('postBody', '')
      setValue('postTitle', '')
      setValue('subreddit', '')
      setValue('postImage', '')

      toast.success('New post created!', {
        id: notification,
      })
    } catch (error) {
      toast.error('Something went wrong with creating the post!')
    }
  })

  return (
    <form
      onSubmit={onSubmit}
      className='sticky top-16 z-50 bg-white border rounded-md border-gray-300 p-2'
    >
      <div className='flex items-center space-x-3'>
        <Avatar seed={session?.user?.name || 'Placeholder '} />
        <input
          {...register('postTitle', { required: true })}
          type='text'
          className='bg-gray-50 p-2 pl-5 outline-none rounded-md flex-1'
          disabled={!session}
          placeholder={
            session
              ? 'Create a post by entering a title!'
              : 'Please sign in to post'
          }
        />
        <PhotoIcon
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
          className={`h-6 text-gray-300 cursor-pointer ${
            imageBoxOpen && 'text-blue-300'
          }`}
        />
        <LinkIcon className='h-6 text-gray-300' />
      </div>
      {!!watch('postTitle') && (
        <div className='flex flex-col py-2'>
          <div className='flex items-center px-2'>
            <p className='min-w-[90px]'>Body</p>
            <input
              className='m-2 flex-1 bg-blue-50 p-2 outline-none'
              {...register('postBody')}
              type='text'
              placeholder='Text (optional)'
            />
          </div>
          <div className='flex items-center px-2'>
            <p className='min-w-[90px]'>Subreddit</p>
            <input
              className='m-2 flex-1 bg-blue-50 p-2 outline-none'
              {...register('subreddit', { required: true })}
              type='text'
              placeholder='i.e. reactjs'
            />
          </div>
          {imageBoxOpen && (
            <div className='flex items-center px-2'>
              <p className='min-w-[90px]'>Image URL</p>
              <input
                className='m-2 flex-1 bg-blue-50 p-2 outline-none'
                {...register('postImage')}
                type='text'
                placeholder='optional...'
              />
            </div>
          )}
          {/* errors */}
          {Object.keys(errors).length > 0 && (
            <div className='space-y-2 p-2 text-red-500'>
              {errors.postTitle?.type === 'required' && (
                <p>Please enter a post title!</p>
              )}
              {errors.subreddit?.type === 'required' && (
                <p>Please enter a subreddit!</p>
              )}
            </div>
          )}
          {!!watch('postTitle') && (
            <button
              type='submit'
              className='w-full rounded-full bg-blue-400 p-2 text-white'
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  )
}
