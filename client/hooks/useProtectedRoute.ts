import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import setJWTinAxios from '../utils/setJWTinAxios';
import { IUser } from '../pages/_app';
// import { useGetUserQ } from './../queries/authQ';

const useProtectedRoute = (
  setUserData: React.Dispatch<React.SetStateAction<IUser | null>>,
  userData: IUser
): [string | null, boolean] => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  // const [user, setUser] = useState<string | null>(null);
  useEffect(() => {
    if (process.browser && setUserData) {
      console.log(setUserData);
      setUserData(JSON.parse(localStorage.getItem('user') as string));
      console.log(userData, 'user data set');
      const timeOfLogin: number = JSON.parse(
        localStorage.getItem('timeOfLogin')!
      ) as number;
      if (timeOfLogin < new Date().getTime()) {
        ['user', 'token', 'timeOfLogin'].forEach((item) =>
          localStorage.removeItem(item)
        );
        setUserData(null);
        router.push('/login');
        return;
      }

      console.log('axios verification start');
      if (localStorage.token && localStorage.user) {
        setToken(() => localStorage.token);
        setJWTinAxios(localStorage.token);
        setLoaded(() => true);
        return;
      }

      router.push('/login');
    }
  }, []);
  return [token, loaded];
};

export default useProtectedRoute;
