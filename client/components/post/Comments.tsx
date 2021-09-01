import React from 'react';

const createComment = () => {
  return (
    <div className='border-t border-gray-primary'>
      <form className='flex justify-between pl-0 pr-5'>
        <input
          aria-label='Add a comment'
          autoComplete='off'
          className='text-sm text-gray-base w-full mr-3 py-5 px-4'
          type='text'
          name='add-comment'
          placeholder='Add a comment...'
          value={''}
          onChange={({ target }) => setComment(target.value)}
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
      </form>
    </div>
  );
};

const Comments = () => {
  return <div></div>;
};

export default Comments;
