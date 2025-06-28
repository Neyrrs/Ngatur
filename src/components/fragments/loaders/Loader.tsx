import { Loader2Icon } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center gap-5'>
        <Loader2Icon className='animate-spin' size={100}/>
        <h1 className='text-foreground text-5xl font-bold'>Loading content</h1>
    </div>
  )
}

export default Loader