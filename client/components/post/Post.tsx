import React from 'react';
import styled from 'styled-components';
// components
import Comments from './Comments';
import PostBottom from './PostBottom';
import PostCenter from './PostCenter';
import PostTop from './PostTop';
import { IPost } from './../../utils/reducers';

const PostContainer = styled.article`
  max-width: 700px;
`;
const PostWrapper = styled.div``;

interface Props {
  post: IPost;
  postArray: IPost[];
}

const Post = ({ post, postArray }: Props) => {
  const { _id, desc, img, location, tags, userId, likes } = post;

  const { avatar, _id: user, username } = userId;

  return (
    <PostContainer className='rounded col-span-4 border bg-white border-gray-primary m-12 mx-auto'>
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
          img={img}
          _id={_id}
          username={username}
          postArray={postArray}
        ></PostCenter>
        <PostBottom></PostBottom>
        <Comments></Comments>
      </PostWrapper>
    </PostContainer>
  );
};

export default Post;
