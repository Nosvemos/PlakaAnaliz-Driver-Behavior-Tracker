import { ArrowDown01, ArrowDown10, MessageCircle } from 'lucide-react'
import React from 'react'
import CommentForm from './forms/CommentForm.jsx'

const PlateComments = ({ plateData }) => {
  return (
    <>
      <div className='flex flex-row items-stretch justify-center pb-5'>
        <div className='flex-1'>
          <div className="flex items-center gap-1 hover:opacity-80 transition-all">
            <MessageCircle className='size-5'/>
            <span className="text-md font-semibold">Comments</span>
            <span>(?)</span>
          </div>
        </div>
        <div className='flex flex-row justify-center space-x-10'>
          <button className="flex items-center gap-1 hover:opacity-80 transition-all">
            <span className="hidden text-sm sm:inline">Newest</span>
            <ArrowDown10 className='size-5'/>
          </button>
          <button className="flex items-center gap-1 hover:opacity-80 transition-all">
            <span className="hidden text-sm sm:inline">Oldest</span>
            <ArrowDown01 className='size-5'/>
          </button>
        </div>
      </div>
      <CommentForm plateData={plateData}/>
      {plateData && console.log('Plate Data:', plateData)} //TODO Comments array should be displayed here and also create new plate on db if its not created yet.
    </>
  )
}

export default PlateComments