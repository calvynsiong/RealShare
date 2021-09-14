import styled from 'styled-components';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IBasicInfo } from '../../utils/reducers';
import React from 'react';

const OptionsContainer = styled.article``;
const OptionsWrapper = styled.article``;

interface Props<T> {
  img?: string;
  likes?: T[];
  _id: string;
  username: string;
  userId: string;
  mainUserId: string;
  handleLikeOrDislike?: (postId: string, userId: string) => void;
}

const PostCenter = ({
  img,
  likes,
  _id,
  userId,
  mainUserId,
  handleLikeOrDislike,
}: Props<IBasicInfo>) => {
  const liked = likes ? likes.find((like) => like._id === mainUserId) : false;
  console.log(liked, 'LIKED OR NOT');
  return (
    <>
      <img
        src={`${img}??https://avatars.dicebear.com/api/gridy/:seed.svg`}
        alt='default'
        className='text-center  max-w-full object-cover block'
      ></img>
      <OptionsContainer
        className='flex justify-between p-4'
        onClick={() => handleLikeOrDislike!(_id, mainUserId)}
      >
        <OptionsWrapper className='flex'>
          {liked ? (
            <FavoriteIcon
              htmlColor='red'
              className='w-8 mr-4 select-none cursor-pointer focus:outline-none'
            ></FavoriteIcon>
          ) : (
            <FavoriteBorderIcon className='w-8 mr-4 select-none cursor-pointer focus:outline-none'></FavoriteBorderIcon>
          )}
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

export default React.memo(PostCenter);
