import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { IPost } from './../../utils/reducers';

const Header = styled.div``;
const LocationBadge = styled.span``;
const TagsBadge = styled.span``;

const PostTop = ({
  avatar,
  tags,
  username,
  location,
  _id,
}: { avatar: string; username: string; _id: string } & Partial<
  Pick<IPost, 'tags' | 'location'>
>) => {
  return (
    <Header className='flex border-b items-center border-gray-primary h-4 p-4 py-10'>
      <Link href={`/profile/${_id}`}>
        <div className=' cursor-pointer flex justify-center items-center mr-8'>
          <img
            className='rounded-full h-8 w-8 flex mr-3'
            src={`${avatar}??https://avatars.dicebear.com/api/gridy/:a.svg`}
            alt={username}
          />
          <p className='font-bold m-0 text-2xl'>{username}</p>
        </div>
      </Link>
      {location?.map?.((loc, index) => (
        <LocationBadge
          key={index}
          className='inline-block bg-yellow-600 rounded-xl  text-black  p-2  font-bold mr-3'
        >
          {loc}
        </LocationBadge>
      ))}
      {tags?.map?.((item, index) => (
        <TagsBadge
          key={index}
          className='inline-block rounded-xl   text-white  p-2  bg-indigo-500 font-bold mr-3'
        >
          {item}
        </TagsBadge>
      ))}
    </Header>
  );
};

export default PostTop;
