import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
// components
import UploadBar from './UploadBar';
import Post, { IComment } from '../post/Post';
import { useUserContext } from '../../App';
import { IPost } from '../../utils/reducers';
import axios from 'axios';
import { useGetFeedPostsQ } from '../../queries/AllQueries';

const FeedContainer = styled.div``;

const Feed = () => {
  const [posts, setPosts] = useState<IPost[]>([] as IPost[]);

  const { userData } = useUserContext();
  const { data: feedPosts, isLoading } = useGetFeedPostsQ(userData!._id);

  useEffect(() => {
    if (!isLoading) {
      setPosts(feedPosts);
    }
  }, [feedPosts, isLoading]);

  const handleLikeOrDislike = useCallback(
    async (postId: string, userId: string) => {
      const { data } = await axios.put(`/api/v1/post/likeOrUnlike/${postId}`, {
        userId,
      });
      const updatedPosts = posts.map((post: IPost) => {
        return post._id === postId ? data.dataPayload.updatedPost : post;
      });
      setPosts(updatedPosts);
    },
    [posts]
  );

  const handlePostComment = async (postId: string, comment: IComment) => {
    const { data } = await axios.put(`/api/v1/post/comment/${postId}`, comment);
    const updatedPosts = posts.map((post: IPost) => {
      return post._id === postId ? data.dataPayload.updatedPost : post;
    });
    setPosts(updatedPosts);
  };
  return (
    <div style={{ flex: 5 }}>
      <FeedContainer>
        <UploadBar />
        {posts?.map?.((item) => (
          <Post
            post={item}
            handleLikeOrDislike={handleLikeOrDislike}
            handlePostComment={handlePostComment}
          />
        ))}
      </FeedContainer>
    </div>
  );
};
export default Feed;
