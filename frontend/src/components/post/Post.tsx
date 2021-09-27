import styled from 'styled-components';
// components
import Comments from './Comments';
import PostCenter from './PostCenter';
import PostTop from './PostTop';
import { IPost } from './../../utils/reducers';
import { useUserContext } from '../../App';
import React from 'react';

const PostContainer = styled.article`
  max-width: 700px;
`;
const PostWrapper = styled.div``;

export interface IComment {
  text: string;
  userId: string;
}
interface Props {
  post?: IPost;
  handleLikeOrDislike?: (postId: string, userId: string) => void;
  handlePostComment?: (postId: string, comment: IComment) => void;
}

const Post = ({ post, handleLikeOrDislike, handlePostComment }: Props) => {
  const { _id, img, location, tags, userId, likes, comments, desc } = post!;

  const { avatar, _id: user, username } = userId;
  const { userData } = useUserContext();

  return (
    <PostContainer className='rounded col-span-4 border bg-white border-gray-primary m-12 mx-8'>
      <PostWrapper>
        <PostTop
          avatar={avatar}
          tags={tags}
          username={username}
          location={location}
          _id={user}
        ></PostTop>
        <PostCenter
          likes={likes}
          handleLikeOrDislike={handleLikeOrDislike}
          img={img}
          _id={_id}
          userId={user}
          mainUserId={userData!._id!}
          username={username}
        ></PostCenter>
        <Comments
          caption={desc}
          handlePostComment={handlePostComment}
          comments={comments!}
          username={username}
          userId={userData!._id!}
          postId={_id}
        ></Comments>
      </PostWrapper>
    </PostContainer>
  );
};

export default React.memo(Post);
