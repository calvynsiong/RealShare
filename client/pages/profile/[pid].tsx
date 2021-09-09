import React, {
  createContext,
  Fragment,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import ProfileHeader from '../../components/profile/ProfileHeader';
import Photos from '../../components/profile/Photos';
import { GetStaticPaths, GetServerSideProps } from 'next';
import useProtectedRoute from '../../hooks/useProtectedRoute';
import Loader from 'react-loader-spinner';
import { IUser, useUserContext } from '../_app';
import { useGetUserByIdQ } from './../../queries/authQ';
import axios from 'axios';

export type IProfileContext = {
  fetchedUser: IUser;
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
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const pid = params!.pid;

  return {
    props: {
      pid,
      defaultImg: process.env.REACT_APP_DEFAULT_IMG_SOURCE,
    },
  };
};

const Profile = ({ pid, defaultImg }: Props) => {
  // console.log(token);
  const [showFriends, setShowFriends] = useState<boolean>(false);
  const [datatype, setDatatype] = useState<string>('followers');
  const openFriends = (type: string): void => {
    setDatatype(() => type);
    setShowFriends(true);
  };
  const closeFriends = (): void => setShowFriends(false);

  const [token, loaded] = useProtectedRoute();

  const { userData } = useUserContext() ?? {};
  const { _id } = userData ?? {};
  const { data: fetchedUser } = useGetUserByIdQ(_id!);
  console.log(fetchedUser, 'fetchedUser');
  const profileContext: IProfileContext = {
    fetchedUser,
    showFriends,
    openFriends,
    closeFriends,
    datatype,
  };

  return !token || !loaded ? (
    Loader
  ) : (
    <ProfileContext.Provider value={profileContext}>
      <ProfileHeader defaultImg={defaultImg}></ProfileHeader>
      <Photos defaultImg={defaultImg}></Photos>
    </ProfileContext.Provider>
  );
};

export const useProfileContext = (): IProfileContext =>
  useContext(ProfileContext)!;

// Profile.layout = Fragment;

export default Profile;
