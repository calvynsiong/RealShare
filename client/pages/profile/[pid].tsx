import React, { createContext, Fragment, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import ProfileHeader from '../../components/profile/ProfileHeader';
import Photos from '../../components/profile/Photos';
import { GetStaticPaths } from 'next';

export type IProfileContext = {
  showFriends: boolean;
  openFriends: (type: string) => void;
  closeFriends: () => void;
  datatype: string;
};

export const ProfileContext = createContext<IProfileContext | null>(null);

interface Props {
  defaultImg: string;
  pid: string;
}

export const getServerSideProps = async (context: {
  params: { pid: string };
}) => {
  const pid = context.params.pid;
  console.log(pid);
  return {
    props: { pid, defaultImg: process.env.REACT_APP_DEFAULT_IMG_SOURCE },
  };
};

const Profile = ({ pid, defaultImg }: Props) => {
  console.log(defaultImg, pid);
  const [showFriends, setShowFriends] = useState<boolean>(false);
  const [datatype, setDatatype] = useState<string>('followers');
  const openFriends = (type: string): void => {
    setDatatype(() => type);
    setShowFriends(true);
  };
  const closeFriends = (): void => setShowFriends(false);

  const profileContext: IProfileContext = {
    showFriends,
    openFriends,
    closeFriends,
    datatype,
  };
  return (
    <ProfileContext.Provider value={profileContext}>
      <ProfileHeader defaultImg={defaultImg}></ProfileHeader>
      <Photos defaultImg={defaultImg}></Photos>
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => useContext(ProfileContext);

// Profile.layout = Fragment;

export default Profile;
