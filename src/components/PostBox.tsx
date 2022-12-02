import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'

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
  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false)
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData)
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
