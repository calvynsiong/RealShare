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
export const getServerSideProps: GetServerSideProps = async (context) => {
  let token = context.req.cookies.jwt;
  console.log(token, 'cookies');
  const { params } = context;
  const pid = params!.pid;
  return {
    props: { pid, defaultImg: process.env.REACT_APP_DEFAULT_IMG_SOURCE },
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

  const router = useRouter();
  const [token, loaded] = useProtectedRoute();
  console.log(token, loaded, 'token');

  const profileContext: IProfileContext = {
    showFriends,
    openFriends,
    closeFriends,
    datatype,
  };
  console.log(token);
  return !token ? (
    Loader
  ) : (
    <ProfileContext.Provider value={profileContext}>
      <ProfileHeader defaultImg={defaultImg}></ProfileHeader>
      <Photos defaultImg={defaultImg}></Photos>
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => useContext(ProfileContext);

// Profile.layout = Fragment;

export default Profile;
