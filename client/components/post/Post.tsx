import React from 'react';
import styled from 'styled-components';
// components
import Comments from './Comments';
import PostBottom from './PostBottom';
import PostCenter from './PostCenter';
import PostTop from './PostTop';

const PostContainer = styled.article``;
const PostWrapper = styled.div``;

const Post = () => {
  // const handleLikePost = () => {

  // }

  return (
    <PostContainer className='rounded col-span-4 border bg-white border-gray-primary m-12'>
      <PostWrapper>
        <PostTop></PostTop>
        <PostCenter></PostCenter>
        <PostBottom></PostBottom>
        <Comments></Comments>
      </PostWrapper>
    </PostContainer>
  );
};

export default Post;
