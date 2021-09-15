import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';
import { useProfileContext } from '../../pages/profile/Profile';
import FriendsList from './FriendsList';
import { useUserContext } from '../../App';

const PhotoSection = styled.div``;
const InfoSection = styled.div``;
const NameSection = styled.div``;
const Statistic = styled.div``;

const ProfileHeader = ({ defaultImg }: { defaultImg: string }) => {
  const { userData } = useUserContext();
  const { fetchedUser, showFriends, closeFriends, openFriends, datatype } =
    useProfileContext()!;
  const listProps = {
    closeFriends: closeFriends!,
    showFriends: showFriends!,
    datatype,
  };

  const { _id, username, avatar, followers, following } = fetchedUser ?? {};

  const isAnotherProfile = userData?._id !== _id;

  return (
    <section className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg mt-24'>
      <PhotoSection className='container flex justify-center items-center col-span-1'>
        {true ? (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img
            className='rounded-full h-40 w-40 flex'
            alt={`${username} profile picture`}
            src={avatar ?? defaultImg}
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
          <p className='text-2xl mb-0 mr-4'>{username}</p>
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
                <span className='font-bold'>{followers!?.length}</span>
                {` `}
                {followers!?.length > 1 ? `followers` : `follower`}
              </p>
              <p
                className='mr-10 p-2 rounded border cursor-pointer'
                onClick={() => openFriends('following')!}
              >
                <span className='font-bold'>{following!?.length}</span>{' '}
                following
              </p>
            </>
          )}
          <FriendsList {...listProps}></FriendsList>
        </Statistic>
        <div className='container mt-4'>
          {isAnotherProfile ? (
            <button
              className='bg-blue-600 text-white font-bold text-sm rounded w-20 h-8'
              type='button'
              // onClick={lighthandleToggleFollow}
            >
              {true ? 'Unfollow' : 'Follow'}
            </button>
          ) : null}
        </div>
      </InfoSection>
    </section>
  );
};

export default ProfileHeader;
