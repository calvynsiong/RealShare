import { createContext, useMemo, useContext, useState, useEffect } from 'react';
import ProfileHeader from '../../components/profile/ProfileHeader';
import Photos from '../../components/profile/Photos';
import useProtectedRoute from '../../hooks/useProtectedRoute';
import { IUser, useUserContext } from '../../App';
import { useGetUserByIdQ } from '../../queries/authQ';
import { useParams } from 'react-router';
import { DEFAULT_IMG } from '../../utils/constants';
import MainLayout from '../../components/layouts/MainLayout';
import { IPost } from '../../utils/reducers';
import axios from 'axios';

export type IProfileContext = {
  fetchedUser: IUser;
  showFriends: boolean;
  openFriends: (type: string) => void;
  closeFriends: () => void;
  datatype: string;
  posts: IPost[] | null;
  loading: boolean;
};

export const ProfileContext = createContext<IProfileContext | null>(null);

const Profile = () => {
  const defaultImg =
    DEFAULT_IMG ?? 'https://avatars.dicebear.com/api/gridy/:seed.svg';
  const { pid } = useParams<{ pid: string }>();
  const { setUserData, userData } = useUserContext();
  const [showFriends, setShowFriends] = useState<boolean>(false);
  const [datatype, setDatatype] = useState<string>('followers');
  const openFriends = (type: string): void => {
    setDatatype(() => type);
    setShowFriends(true);
  };
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const closeFriends = (): void => setShowFriends(false);

  const [token, loaded] = useProtectedRoute(setUserData, userData!);

  const { data: fetchedUser } = useGetUserByIdQ(pid);
  useEffect(() => {
    if (!fetchedUser) return;
    const fetchPosts = async () => {
      const { data } = await axios.get(
        `/api/v1/post/myPosts/${fetchedUser?._id}`
      );
      const profilePosts = await data.dataPayload.myPosts;
      setPosts(() => profilePosts);
    };
    fetchPosts();
    setLoading(false);
  }, [fetchedUser]);

  const profileContext: IProfileContext = {
    fetchedUser,
    posts,
    loading,
    showFriends,
    openFriends,
    closeFriends,
    datatype,
  };
  console.log('POSTS', posts);
  return !token || !loaded || !fetchedUser ? null : (
    <MainLayout>
      <ProfileContext.Provider value={profileContext}>
        <ProfileHeader defaultImg={defaultImg}></ProfileHeader>
        <Photos defaultImg={defaultImg}></Photos>
      </ProfileContext.Provider>
    </MainLayout>
  );
};

export const useProfileContext = (): IProfileContext =>
  useContext(ProfileContext)!;

export default Profile;
