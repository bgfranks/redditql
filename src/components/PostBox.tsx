import { useSession } from 'next-auth/react'
import Avatar from './Avatar'

// icons
import { LinkIcon, PhotoIcon } from '@heroicons/react/24/outline'

export default function PostBox() {
  const { data: session } = useSession()

  return (
    <form className='sticky top-16 z-50 bg-white border rounded-md border-gray-300 p-2'>
      <div className='flex items-center space-x-3'>
        <Avatar seed={session?.user?.name || 'Placeholder '} />
        <input
          type='text'
          className='bg-gray-50 p-2 pl-5 outline-none rounded-md flex-1'
          disabled={!session}
          placeholder={
            session
              ? 'Create a post by entering a title!'
              : 'Please sign in to post'
          }
        />
        <PhotoIcon className={`h-6 text-gray-300 cursor-pointer`} />
        <LinkIcon className='h-6 text-gray-300' />
      </div>
    </form>
  )
}
