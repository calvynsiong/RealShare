import { createContext, useMemo, useContext, useState } from 'react';
import ProfileHeader from '../../components/profile/ProfileHeader';
import Photos from '../../components/profile/Photos';
import useProtectedRoute from '../../hooks/useProtectedRoute';
import { IUser, useUserContext } from '../../App';
import { useGetUserByIdQ } from '../../queries/authQ';
import { useParams } from 'react-router';
import { DEFAULT_IMG } from '../../utils/constants';
import MainLayout from '../../components/layouts/MainLayout';

export type IProfileContext = {
  fetchedUser: IUser;
  showFriends: boolean;
  openFriends: (type: string) => void;
  closeFriends: () => void;
  datatype: string;
};

export const ProfileContext = createContext<IProfileContext | null>(null);

const Profile = () => {
  // console.log(token);
  console.log(process.env, 'PROCESS');
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
  const closeFriends = (): void => setShowFriends(false);

  const [token, loaded] = useProtectedRoute(setUserData, userData!);

  const { data: fetchedUser } = useGetUserByIdQ(pid);
  console.log(fetchedUser, 'fetchedUser');
  const profileContext: IProfileContext = useMemo(
    () => ({
      fetchedUser,
      showFriends,
      openFriends,
      closeFriends,
      datatype,
    }),
    [fetchedUser, showFriends, datatype]
  );

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
