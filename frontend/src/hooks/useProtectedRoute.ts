import { useEffect, useState, useMemo } from 'react';
import setJWTinAxios from '../utils/setJWTinAxios';
import { IUser } from '../App';
import { useHistory } from 'react-router-dom';
import { useQueryClient } from 'react-query';
// import { useGetUserQ } from './../queries/authQ';

const useProtectedRoute = (
  setUserData: React.Dispatch<React.SetStateAction<IUser | null>>,
  userData: IUser
): [string | null, boolean] => {
  const history = useHistory();
  const QueryClient = useQueryClient();
  const [loaded, setLoaded] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  // const [user, setUser] = useState<string | null>(null);
  const myData = useMemo(
    () => QueryClient.getQueryData(['user', userData?._id]),
    [userData?._id]
  );
  // debugger;
  useEffect(() => {
    if (window !== undefined && localStorage && setUserData) {
      setUserData(
        (myData as IUser) ?? JSON.parse(localStorage.getItem('user') as string)
      );
      // setUserData(JSON.parse(localStorage.getItem('user') as string));
      if (!localStorage.token) {
        console.log('Booted!');
        history.push('/login');
      }
      const timeOfLogin: number = JSON.parse(
        localStorage.getItem('timeOfLogin')!
      ) as number;
      if (timeOfLogin < new Date().getTime()) {
        ['user', 'token', 'timeOfLogin'].forEach((item) =>
          localStorage.removeItem(item)
        );
        setUserData(null);
        history.push('/login');
        return;
      }

      if (localStorage.token && localStorage.user) {
        setToken(() => localStorage.token);
        setJWTinAxios(localStorage.token);
        setLoaded(() => true);
        console.log('axios verified');
        return;
      }

      history.push('/login');
    }
  }, [myData]);
  return [token, loaded];
};

export default useProtectedRoute;
