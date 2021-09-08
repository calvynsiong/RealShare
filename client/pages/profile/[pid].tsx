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
  // let token = context.req.cookies.jwt;
  // console.log(token);
  const { params } = context;
  // console.log(token, context.req.cookies);
  // console.log('initial');
  // if (!token) {
  //   return {
  //     redirect: {
  //       destination: '/login',
  //       permanent: false,
  //     },
  //   };
  // } else {
  //   console.log('hello');
  //   // router.push('/');
  // }
  const pid = params!.pid;
  console.log(pid);
  return {
    props: { pid, defaultImg: process.env.REACT_APP_DEFAULT_IMG_SOURCE },
  };
};

const Profile = ({ pid, defaultImg }: Props) => {
  const router = useRouter();
  let token: any | null = null;
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (typeof window !== undefined) {
      token = localStorage.token;
      if (localStorage && !token) {
        router.push('/login');
      } else {
        setLoaded(true);
      }
    }
  }, [token]);

  console.log(token);
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
    loaded && (
      <ProfileContext.Provider value={profileContext}>
        <ProfileHeader defaultImg={defaultImg}></ProfileHeader>
        <Photos defaultImg={defaultImg}></Photos>
      </ProfileContext.Provider>
    )
  );
};

export const useProfileContext = () => useContext(ProfileContext);

// Profile.layout = Fragment;

export default Profile;
