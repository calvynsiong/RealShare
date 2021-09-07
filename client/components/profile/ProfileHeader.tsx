import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';
import { useProfileContext } from './../../pages/profile/[pid]';
import FriendsList from './FriendsList';

const PhotoSection = styled.div``;
const InfoSection = styled.div``;
const NameSection = styled.div``;
const Statistic = styled.div``;

const ProfileHeader = ({ defaultImg }: { defaultImg: string }) => {
  const { showFriends, closeFriends, openFriends, datatype } =
    useProfileContext()!;

  const listProps = {
    closeFriends: closeFriends!,
    showFriends: showFriends!,
    datatype,
  };
  console.log(datatype);

  return (
    <section className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg mt-24'>
      <PhotoSection className='container flex justify-center items-center col-span-1'>
        {true ? (
          <img
            className='rounded-full h-40 w-40 flex'
            alt={`${`Calvyn's`} profile picture`}
            src={defaultImg}
            onError={(e) => {
              const target = e.target as typeof e.target & {
                src: string;
              };
              target.src = defaultImg!;
            }}
          />
        ) : (
          <Skeleton circle height={150} width={150} count={1} />
        )}
      </PhotoSection>
      <InfoSection className='flex items-center justify-start flex-col col-span-2'>
        <NameSection className='container flex gap-4 marker:items-center mb-4 '>
          <p className='text-2xl mb-0 mr-4'>{`Calvyn Siong `}</p>
        </NameSection>
        <Statistic className='container flex mt-4'>
          {false ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className='mr-10 p-2 '>
                <span className='font-bold'>{23}</span> photos
              </p>

              <p
                className='mr-10 p-2  rounded border cursor-pointer'
                onClick={() => openFriends('followers')!}
              >
                <span className='font-bold'>{23}</span>
                {` `}
                {true ? `follower` : `followers`}
              </p>
              <p
                className='mr-10 p-2 rounded border cursor-pointer'
                onClick={() => openFriends('following')!}
              >
                <span className='font-bold'>3</span> following
              </p>
            </>
          )}
          <FriendsList {...listProps}></FriendsList>
        </Statistic>
        <div className='container mt-4'>
          {true ? (
            <button
              className='bg-blue-600 text-white font-bold text-sm rounded w-20 h-8'
              type='button'
              // onClick={lighthandleToggleFollow}
            >
              {true ? 'Unfollow' : 'Follow'}
            </button>
          ) : (
            <Skeleton width={80} height={32} />
          )}
        </div>
      </InfoSection>
    </section>
  );
};

export default ProfileHeader;
