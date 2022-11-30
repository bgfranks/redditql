import Image from 'next/image'

// icons
import {
  HomeIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
} from '@heroicons/react/24/solid'
import {
  BellIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  GlobeAsiaAustraliaIcon,
  VideoCameraIcon,
  PlusIcon,
  MegaphoneIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'

export default function Header() {
  return (
    <div className=' sticky top-0 z-50 flex bg-white px-4 py-4 shadow-sm'>
      <div className='relative h-10 w-20 flex-shrink-0 cursor-pointer'>
        <Image
          objectFit='contain'
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Reddit_logo_new.svg/974px-Reddit_logo_new.svg.png?20220313085316'
          layout='fill'
          alt='reddit logo'
        />
      </div>
      <div className='mx-7 flex items-center xl:min-w-[300px]'>
        <HomeIcon className='h-5 w-5' />
        <p className='flex-1 hidden ml-2 lg:inline'>Home</p>
        <ChevronDownIcon className='h-5 w-5' />
      </div>
      <form className='flex flex-1 items-center space-x-2 border border-gray-200 rounded-sm bg-gray-100 px-3 py-1'>
        <MagnifyingGlassIcon className='h-6 w-6 text-gray-400' />
        <input
          type='text'
          placeholder='Search Reddit'
          className='flex-1 bg-transparent outline-none'
        />
        <button hidden type='submit' />
      </form>
      <div className='flex'>
        <SparklesIcon className='icon' />
        <GlobeAsiaAustraliaIcon className='icon' />
        <VideoCameraIcon />
        <hr className='h-10 border border-gray-100' />
        <ChatBubbleOvalLeftEllipsisIcon className='icon' />
        <BellIcon className='icon' />
        <PlusIcon className='icon' />
        <MegaphoneIcon className='icon' />
      </div>
    </div>
  )
}
