import React from 'react';
import { useParams } from 'react-router';
import Post from '../../components/post/Post';

const SinglePost = () => {
  const { pid } = useParams<{ pid: string }>();
  return (
    <section className='container mt-20'>
      <Post></Post>
    </section>
  );
};

export default SinglePost;
