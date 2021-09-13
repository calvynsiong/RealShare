import React from 'react';
import styled from 'styled-components';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useUserContext } from '../../App';
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
  isLiked: boolean;
  userId: string;
  setLiked: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostCenter = ({
  img,
  likes,
  _id,
  postArray,
  username,
  userId,
  isLiked,
  setLiked,
}: Props<object>) => {
  const { postDispatch } = useUserContext();
  // const listOfPostIds = postArray.map((post) => post._id);

  const likeOrDislikePost = async (id: string) => {
    console.log(userId);
    try {
      const res = await axios.put(`/api/v1/post/likeOrUnlike/${id}`, {
        userId,
      });
      postDispatch({
        type: isLiked
          ? PostActEnums.UNFAVOURITE_POST
          : PostActEnums.FAVOURITE_POST,
        payload: res.data.dataPayload.updatedPost,
      });
      setLiked(!isLiked);
    } catch (error) {
      const { message } = error as Error;
      errorToast(message);
    }
  };

  return (
    <>
      <img
        src={`${img}??https://avatars.dicebear.com/api/gridy/:seed.svg`}
        alt='default'
        className='text-center  max-w-full object-cover block'
      ></img>
      <OptionsContainer className='flex justify-between p-4'>
        <OptionsWrapper className='flex' onClick={() => likeOrDislikePost(_id)}>
          {isLiked ? (
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
