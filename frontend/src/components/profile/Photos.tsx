import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import { useProfileContext } from './../../pages/profile/Profile';
import { Link } from 'react-router-dom';

const PhotoWrapper = styled.div``;
// const

const Photos = ({ defaultImg }: { defaultImg: string }) => {
  const LoadingPhotos = new Array(10)
    .fill(1)
    .map((_, i) => <Skeleton key={i} />);
  const NoPostsFiller = <p className='text-center text-2xl'>No Posts Yet</p>;
  const { posts, loading } = useProfileContext();

  return (
    <div className='border m-8 p-4'>
      <PhotoWrapper className='grid grid-cols-3 gap-8 my-2'>
        {loading || !posts
          ? LoadingPhotos
          : posts!.length > 0
          ? posts!.map(({ _id, img, likes, comments }, i) => (
              <Link key={_id} to={`/post/${_id}`}>
                <div key={_id} className='relative group cursor-pointer'>
                  <img src={img ?? defaultImg} alt={`Hello World`} />
                  <div className='absolute bottom-0 left-0 bg-gray-200 z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex hidden'>
                    <p className='flex items-center text-white font-bold'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        className='w-8 mr-4'
                      >
                        <path
                          fillRule='evenodd'
                          d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
                          clipRule='evenodd'
                        />
                      </svg>
                      {likes!.length}
                    </p>
                    <p className='flex items-center text-white font-bold'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        className='w-8 mr-4'
                      >
                        <path
                          fillRule='evenodd'
                          d='M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z'
                          clipRule='evenodd'
                        />
                      </svg>
                      {comments!.length}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          : NoPostsFiller}
      </PhotoWrapper>
    </div>
  );
};

export default React.memo(Photos);
