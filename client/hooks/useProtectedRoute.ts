import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import setJWTinAxios from '../utils/setJWTinAxios';
import {} from '../pages/_app';
// import { useGetUserQ } from './../queries/authQ';

const useProtectedRoute = (): [string | null, boolean] => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  // const [user, setUser] = useState<string | null>(null);
  useEffect(() => {
    if (process.browser) {
      console.log('axios verification start');
      if (localStorage.token && localStorage.user ) {
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
