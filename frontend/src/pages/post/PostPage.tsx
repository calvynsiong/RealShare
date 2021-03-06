import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router';
import { useUserContext } from '../../App';
import Post from '../../components/post/Post';
import useProtectedRoute from '../../hooks/useProtectedRoute';
import { IPost } from '../../utils/reducers';
import MainLayout from './../../components/layouts/MainLayout';
import { IComment } from './../../components/post/Post';

const SinglePost = () => {
  const { pid } = useParams<{ pid: string }>();
  const [post, setPost] = useState<IPost | null>(null);
  const { setUserData, userData } = useUserContext();
  const [token, loaded] = useProtectedRoute(setUserData, userData!);
  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`/api/v1/post/single/${pid}`);
      setPost(res.data.dataPayload.post);
    };
    fetchPost();
  }, [pid]);

  const handleLikeOrDislike = useCallback(
    async (postId: string, userId: string) => {
      const { data } = await axios.put(`/api/v1/post/likeOrUnlike/${postId}`, {
        userId,
      });
      const updatedPost = data.dataPayload.updatedPost;
      setPost(updatedPost);
    },
    []
  );

  const handlePostComment = async (postId: string, comment: IComment) => {
    const { data } = await axios.put(`/api/v1/post/comment/${postId}`, comment);
    const updatedPost = data.dataPayload.updatedPost;
    setPost(updatedPost);
  };

  return (
    <MainLayout>
      <section className='container mt-24'>
        {post && token && loaded ? (
          <Post
            post={post!}
            handleLikeOrDislike={handleLikeOrDislike}
            handlePostComment={handlePostComment}
          ></Post>
        ) : (
          <div className='w-full h-full grid place-items-center'>
            <Skeleton width={500} height={500} />
          </div>
        )}
      </section>
    </MainLayout>
  );
};

export default SinglePost;
