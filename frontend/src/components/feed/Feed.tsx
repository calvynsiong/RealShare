import React, { useEffect } from 'react';
import styled from 'styled-components';
// components
import UploadBar from './UploadBar';
import Post from '../post/Post';
import { useUserContext } from '../../App';
import { PostActEnums } from '../../utils/reducers';
import axios from 'axios';

const FeedContainer = styled.div``;

const Feed = () => {
  const { userData, postDispatch, postState } = useUserContext();
  const { feedPosts } = postState;
  console.log(feedPosts, postState, 'feed');
  useEffect(() => {
    const fetchFeed = async () => {
      if (!userData) return;
      const { data } = await axios.get(`/api/v1/post/feed/${userData._id}`);
      postDispatch({
        type: PostActEnums.GET_FEED,
        payload: data.dataPayload.feedPosts,
      });
    };
    fetchFeed();
  }, [postDispatch, userData]);
  return (
    <div style={{ flex: 5 }}>
      <FeedContainer>
        <UploadBar />
        {feedPosts?.map?.((item) => (
          <Post post={item} postArray={feedPosts} />
        ))}
      </FeedContainer>
    </div>
  );
};
export default Feed;
