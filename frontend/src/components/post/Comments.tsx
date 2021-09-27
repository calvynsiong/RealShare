import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// utils
import { ICommentInfo } from '../../utils/reducers';
import { IComment } from './Post';

const AddCommentContainer = styled.form``;

interface Props {
  handlePostComment?: (postId: string, comment: IComment) => void;
  comments: ICommentInfo[];
  userId: string;
  postId: string;
  caption: string;
  username: string;
}

const CreateComment = ({
  handlePostComment,
  userId,
  postId,
}: Pick<Props, 'handlePostComment' | 'userId' | 'postId'>) => {
  const [comment, setComment] = useState({
    userId,
    text: '',
  });
  return (
    <div className='border-t border-gray-primary'>
      <AddCommentContainer className='flex justify-between pl-0'>
        <input
          aria-label='Comment'
          autoComplete='on'
          className=' text-gray-base w-full mr-3 py-5 px-4'
          type='text'
          name='add-comment'
          placeholder='Comment...'
          value={comment.text}
          onChange={(e) => {
            setComment({ ...comment, text: e.target.value });
          }}
        />
        <button
          className={` font-bold text-blue-medium px-8  flex-1  ${
            !comment.text && 'opacity-25'
          }`}
          type='button'
          disabled={!comment.text}
          onClick={() => {
            if (!comment.text) return;
            handlePostComment!(postId, comment);
            setComment({ ...comment, text: '' });
          }}
        >
          Post
        </button>
      </AddCommentContainer>
    </div>
  );
};

const CommentsContainer = styled.div``;
const SeeMore = styled.button``;
const Hide = styled.button``;

const Comments = ({
  handlePostComment,
  comments,
  userId,
  postId,
  caption,
  username,
}: Props) => {
  const [commentLimit, setCommentLimit] = useState<number>(5);
  return (
    <>
      <CreateComment
        handlePostComment={handlePostComment}
        userId={userId}
        postId={postId}
      ></CreateComment>
      <CommentsContainer className='px-6 my-2'>
        <div className=' flex mb-1'>
          <Link to={`/profile/${userId}`}>
            <span className='font-bold md:text-xl mr-4'>{username}</span>
          </Link>
          <span className=' md:text-lg'>{caption}</span>
        </div>
        {comments.slice(0, commentLimit).map((com, index) => {
          return (
            com?.userId && (
              <Fragment key={index}>
                <div className=' flex mb-1'>
                  <Link to={`/profile/${com.userId._id}`}>
                    <span className='font-semibold mr-4  md:text-lg'>
                      {com?.userId?.username}
                    </span>
                  </Link>
                  <span className=' md:text-lg'>{com.text}</span>
                </div>
              </Fragment>
            )
          );
        })}
        <div className='flex flex-wrap justify-around px-4 my-4'>
          <SeeMore
            className='text-gray-base mb-1 cursor-pointer p-4'
            onClick={() => setCommentLimit((pre) => pre + 3)}
          >
            View More Comments
          </SeeMore>
          {commentLimit > 3 && (
            <Hide
              className='text-gray-base mb-1 cursor-pointer p-4'
              onClick={() => setCommentLimit(3)}
            >
              Hide Comments
            </Hide>
          )}
        </div>
        <p className='text-gray-base  mt-2'>Posted 5 mins Ago</p>
      </CommentsContainer>
    </>
  );
};

export default React.memo(Comments);
