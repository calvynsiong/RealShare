import React from 'react';
import Link from 'next/link';

const PostTop = () => {
  return (
    <div className='flex border-b items-center border-gray-primary h-4 p-4 py-8'>
      <div className='flex items-center'>
        <Link href=''>
          <div className='flex justify-center items-center'>
            <img
              className='rounded-full h-8 w-8 flex mr-3'
              src='https://avatars.dicebear.com/api/gridy/:seed.svg'
              alt={`profile picture`}
            />
            <p className='font-bold m-0 text-2xl'>{`Calvyn`}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PostTop;
