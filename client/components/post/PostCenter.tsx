import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InsertCommentIcon from '@material-ui/icons/InsertComment';

const OptionsContainer = styled.article``;
const OptionsWrapper = styled.article``;

const PostCenter = () => {
  return (
    <>
      <img
        src='https://avatars.dicebear.com/api/gridy/:seed.svg'
        alt='post image'
        className='max-h-[400px] mx-auto max-w-full object-cover block'
      ></img>
      <OptionsContainer className='flex justify-between p-4'>
        <OptionsWrapper className='flex'>
          {false ? (
            <FavoriteBorderIcon className='w-8 mr-4 select-none cursor-pointer focus:outline-none'></FavoriteBorderIcon>
          ) : (
            <FavoriteIcon
              htmlColor='red'
              className='w-8 mr-4 select-none cursor-pointer focus:outline-none'
            ></FavoriteIcon>
          )}
          <InsertCommentIcon
            htmlColor='lightblue'
            className='w-8 mr-4 select-none cursor-pointer focus:outline-none'
          ></InsertCommentIcon>
        </OptionsWrapper>
      </OptionsContainer>
      <div className='p-4 py-0'>
        <p className='font-bold'>5 likes</p>
      </div>
    </>
  );
};

export default PostCenter;
