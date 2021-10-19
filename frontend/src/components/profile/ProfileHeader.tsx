import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';
import { useProfileContext } from '../../pages/profile/Profile';
import FriendsList from './FriendsList';
import { IUser, useUserContext } from '../../App';
import useModal from './../../hooks/useModal';
import UpdateProfilePicModal from './UpdateProfilePicModal';
import useUploadImg from './../../hooks/useUploadImg';
import { useCallback } from 'react';
import { useUpdateProfilePicQuery } from '../../queries/AllQueries';

const PhotoSection = styled.div``;
const InfoSection = styled.div``;
const NameSection = styled.div``;
const Statistic = styled.div``;

const ProfileHeader = ({ defaultImg }: { defaultImg: string }) => {
  const { userData, setUserData } = useUserContext();
  const { modalStatus, open, close } = useModal();
  const {
    fetchedUser,
    showFriends,
    closeFriends,
    openFriends,
    datatype,
    posts,
    handleFollowOrUnfollowUser,
    isFollowing,
  } = useProfileContext()!;
  const listProps = {
    closeFriends: closeFriends!,
    showFriends: showFriends!,
    datatype,
  };
  const { mutate: updateProfilePicture, isLoading } =
    useUpdateProfilePicQuery();

  const { _id, username, avatar, followers, following } = fetchedUser ?? {};
  const { handleProcessImg, img, deleteImg, setImg, processedImg } =
    useUploadImg(avatar);

  const isAnotherProfile = userData?._id !== _id;

  const handleUpdateProfilePic = useCallback(
    async (img: File | null) => {
      if (!File) return;
      const uploadImg = await handleProcessImg(img as File);
      setUserData({ ...userData, avatar: uploadImg } as IUser);
      await updateProfilePicture({
        avatar: uploadImg!,
        userId: userData!._id,
      });
    },
    [handleProcessImg, userData, updateProfilePicture, setUserData]
  );
  const updateProfilePicProps = {
    modalStatus,
    close,
    // If there is a live img, then display it
    processedImg: img !== null ? URL.createObjectURL(img) : processedImg,
    deleteImg,
    setImg,
    img,
    isLoading,
    handleUpdateProfilePic,
  };

  return (
    <>
      {modalStatus && userData!._id === _id && (
        <UpdateProfilePicModal {...updateProfilePicProps} />
      )}
      <section className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg mt-24'>
        <PhotoSection className='container flex flex-col justify-center items-center col-span-1'>
          {
            <img
              className='rounded-full h-40 w-40 flex'
              alt={`${username}'s profile`}
              src={avatar ?? defaultImg}
              onError={(e) => {
                const target = e.target as typeof e.target & {
                  src: string;
                };
                target.src = defaultImg!;
              }}
            />
          }
          {userData!._id === _id && (
            <button
              className='bg-blue-600 text-white w-3/4 rounded h-8 font-bold mt-4 text-center flex justify-center items-center text-xs sm:text-base'
              onClick={open}
            >
              Update Profile Pic
            </button>
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
                  <span className='font-bold'>{posts?.length ?? 0}</span> photos
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
                onClick={() => handleFollowOrUnfollowUser(_id, userData!._id)}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            ) : null}
          </div>
        </InfoSection>
      </section>
    </>
  );
};

export default ProfileHeader;
