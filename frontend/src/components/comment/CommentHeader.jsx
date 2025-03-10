import React from 'react';
import { MessageCircle, ArrowDown01, ArrowDown10 } from 'lucide-react';

const CommentHeader = ({ commentCount, onSortNewest, onSortOldest }) => {
  return (
    <div className='flex flex-row items-stretch justify-center pb-5'>
      <div className='flex-1'>
        <div className="flex items-center gap-1 hover:opacity-80 transition-all">
          <MessageCircle className='text-primary size-5'/>
          <span className="text-md font-semibold">Comments</span>
          <span>({commentCount})</span>
        </div>
      </div>
      <div className='flex flex-row justify-center space-x-10'>
        <button
          className="flex items-center gap-1 hover:opacity-80 transition-all"
          onClick={onSortNewest}
        >
          <span className="hidden text-sm sm:inline">Newest</span>
          <ArrowDown10 className='size-5'/>
        </button>
        <button
          className="flex items-center gap-1 hover:opacity-80 transition-all"
          onClick={onSortOldest}
        >
          <span className="hidden text-sm sm:inline">Oldest</span>
          <ArrowDown01 className='size-5'/>
        </button>
      </div>
    </div>
  );
};

export default CommentHeader;