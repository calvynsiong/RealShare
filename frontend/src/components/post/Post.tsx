import React, { useState } from 'react';
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
  post?: IPost;
  postArray: IPost[];
}

const Post = ({ post, postArray }: Props) => {
  const { _id, img, location, tags, userId, likes } = post!;

  const { avatar, _id: user, username } = userId;
  const [isLiked, setLiked] = useState<boolean>(false);

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
          isLiked={isLiked}
          setLiked={setLiked}
          img={img}
          _id={_id}
          userId={user}
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
