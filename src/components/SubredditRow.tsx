import Link from 'next/link'

// components
import Avatar from './Avatar'

// icons
import { ChevronUpIcon } from '@heroicons/react/24/outline'

type Props = {
  topic: string
  index: number
}

export default function SubredditRow({ index, topic }: Props) {
  return (
    <div className='flex items-center space-x-2 border-t bg-white px-4 py-2 last:rounded-b'>
      <p>{index + 1}</p>
      <ChevronUpIcon className='h-4 w-4 flex-shrink-0 text-green-400' />
      <Avatar seed={`${topic}`} />
      <p className='flex-1 truncate'>r/{topic}</p>
      <Link
        href={`/subreddit/${topic}`}
        className='cursor-pointer rounded-full bg-blue-500 px-3 text-white'
      >
        View
      </Link>
    </div>
  )
}
