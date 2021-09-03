import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
// utils
import { shorten } from '../../utils/functions';

const AddCommentContainer = styled.form``;

const CreateComment = () => {
  return (
    <div className='border-t border-gray-primary'>
      <AddCommentContainer className='flex justify-between pl-0 pr-5'>
        <input
          aria-label='Comment'
          autoComplete='on'
          className='text-sm text-gray-base w-full mr-3 py-5 px-4'
          type='text'
          name='add-comment'
          placeholder='Comment...'
          value={''}
          onChange={() => {}}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${
            !true && 'opacity-25'
          }`}
          type='button'
          disabled={false}
          // onClick={handleSubmitComment}
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

const Comments = () => {
  const [commentLimit, setCommentLimit] = useState<number>(5);
  return (
    <>
      <CreateComment></CreateComment>
      <CommentsContainer className='px-6 my-2'>
        {Array.from({ length: 10 })
          .slice(0, commentLimit)
          .map((_, index) => (
            <Fragment key={index}>
              <div className=' flex mb-1'>
                <span className='font-semibold mr-4'>Calvyn Siong</span>
                <span>{'lor25lor25             className=a'}</span>
              </div>
            </Fragment>
          ))}
        <div className='flex flex-wrap justify-around px-4 my-4'>
          <SeeMore
            className='text-gray-base mb-1 cursor-pointer'
            onClick={() => setCommentLimit((pre) => pre + 3)}
          >
            View More Comments
          </SeeMore>
          {commentLimit > 3 && (
            <Hide
              className='text-gray-base mb-1 cursor-pointer'
              onClick={() => setCommentLimit(3)}
            >
              Hide Comments
            </Hide>
          )}
        </div>
        <p className='text-gray-base text-sm mt-2'>Posted 5 mins Ago</p>
      </CommentsContainer>
    </>
  );
};

export default Comments;
