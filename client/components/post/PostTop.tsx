import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Header = styled.div``;
const HeaderWrapper = styled.div``;
const LocationBadge = styled.span``;
const TagsBadge = styled.span``;

const PostTop = () => {
  return (
    <Header className='flex border-b items-center border-gray-primary h-4 p-4 py-10'>
      <Link href=''>
        <div className='flex justify-center items-center mr-8'>
          <img
            className='rounded-full h-8 w-8 flex mr-3'
            src='https://avatars.dicebear.com/api/gridy/:a.svg'
            alt={`profile picture`}
          />
          <p className='font-bold m-0 text-2xl'>{`Calvyn`}</p>
        </div>
      </Link>
      <LocationBadge className='inline-block bg-yellow-600 rounded-xl  text-black  p-2  font-bold mr-3'>
        Default
      </LocationBadge>
      <TagsBadge className='inline-block rounded-xl   text-white  p-2  bg-indigo-500 font-bold mr-3'>
        Default
      </TagsBadge>
    </Header>
  );
};

export default PostTop;
