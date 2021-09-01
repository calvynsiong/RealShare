import React from 'react';
import styled from 'styled-components';
// components
import UploadBar from './UploadBar';
import Post from '../post/Post';

const FeedContainer = styled.div``;

const Feed = () => {
  return (
    <div style={{ flex: 5 }}>
      <FeedContainer>
        <UploadBar />
        <Post></Post>
        <Post></Post>
        <Post></Post>
        <Post></Post>
      </FeedContainer>
    </div>
  );
};
export default Feed;
