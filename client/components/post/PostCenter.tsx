import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import { useUserContext } from './../../pages/_app';
import { IPost, PostActEnums } from './../../utils/reducers';
import { errorToast } from '../../utils/toasts';
import axios from 'axios';

const OptionsContainer = styled.article``;
const OptionsWrapper = styled.article``;

interface Props<T> {
  img?: string;
  likes?: T[];
  _id: string;
  postArray: IPost[];
  username: string;
}

const PostCenter = ({
  img,
  likes,
  _id,
  postArray,
  username,
}: Props<object>) => {
  const { postDispatch } = useUserContext();
  const listOfPostIds = postArray.map((post) => post._id);
  const notLiked = listOfPostIds.indexOf(_id) < 0;
  const likeOrDislikePost = async (id: string) => {
    console.log(id);
    try {
      const res = await axios.put(`/api/v1/post/likeOrUnlike/${id}`, {
        userId: localStorage.getItem('userId'),
      });
      postDispatch({
        type: notLiked
          ? PostActEnums.FAVOURITE_POST
          : PostActEnums.UNFAVOURITE_POST,
        payload: res.data.dataPayload.updatedPost,
      });
    } catch (error) {
      const { message } = error as Error;
      errorToast(message);
    }
  };

  return (
    <>
      <img
        src={`${img}??https://avatars.dicebear.com/api/gridy/:seed.svg`}
        alt='post image'
        className='text-center  max-w-full object-cover block'
      ></img>
      <OptionsContainer className='flex justify-between p-4'>
        <OptionsWrapper className='flex' onClick={() => likeOrDislikePost(_id)}>
          {notLiked ? (
            <FavoriteBorderIcon className='w-8 mr-4 select-none cursor-pointer focus:outline-none'></FavoriteBorderIcon>
          ) : (
            <FavoriteIcon
              htmlColor='red'
              className='w-8 mr-4 select-none cursor-pointer focus:outline-none'
            ></FavoriteIcon>
          )}
          {/* <InsertCommentIcon
            htmlColor='lightblue'
            className='w-8 mr-4 select-none cursor-pointer focus:outline-none'
          ></InsertCommentIcon> */}
        </OptionsWrapper>
      </OptionsContainer>
      <div className='p-4 py-0'>
        <p className='font-bold'>
          {`${likes?.length ?? 0} ${likes?.length !== 1 ? 'likes' : 'like'}`}
        </p>
      </div>
    </>
  );
};

export default PostCenter;
