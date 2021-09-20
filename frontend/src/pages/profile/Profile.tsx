import { createContext, useMemo, useContext, useState, useEffect } from 'react';
import ProfileHeader from '../../components/profile/ProfileHeader';
import Photos from '../../components/profile/Photos';
import useProtectedRoute from '../../hooks/useProtectedRoute';
import { IFollows, IUser, useUserContext } from '../../App';
import {
  useFollowUserByIdQ,
  useGetUserByIdQ,
  useUnfollowUserByIdQ,
} from '../../queries/AllQueries';
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
  handleFollowOrUnfollowUser: (subjectId: string, userId: string) => void;
  isFollowing: boolean;
};

export const ProfileContext = createContext<IProfileContext | null>(null);

const Profile = () => {
  const defaultImg =
    DEFAULT_IMG ?? 'https://avatars.dicebear.com/api/gridy/:seed.svg';
  const { pid } = useParams<{ pid: string }>();
  const { setUserData, userData } = useUserContext();
  const [token, loaded] = useProtectedRoute(setUserData, userData!);
  const [showFriends, setShowFriends] = useState<boolean>(false);
  const [datatype, setDatatype] = useState<string>('followers');
  const openFriends = (type: string): void => {
    setDatatype(() => type);
    setShowFriends(true);
  };
  const { data: fetchedUser } = useGetUserByIdQ(pid);
  const { mutate: handleFollowUser } = useFollowUserByIdQ();
  const { mutate: handleUnfollowUser } = useUnfollowUserByIdQ();

  const [posts, setPosts] = useState<IPost[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const closeFriends = (): void => setShowFriends(false);

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
  const isFollowing = useMemo(
    () =>
      fetchedUser?.followers.some(
        (follower: IFollows) => follower.id === userData?._id
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchedUser]
  );
  const handleFollowOrUnfollowUser = (
    subjectId: string,
    userId: string
  ): void => {
    if (isFollowing) {
      handleUnfollowUser({ subjectId, userId });
    } else {
      handleFollowUser({ subjectId, userId });
    }
  };

  const profileContext: IProfileContext = {
    fetchedUser,
    posts,
    loading,
    showFriends,
    openFriends,
    closeFriends,
    handleFollowOrUnfollowUser,
    datatype,
    isFollowing,
  };
  // console.log('POSTS', posts);
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
