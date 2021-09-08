import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useProtectedRoute = (): [string | null, boolean] => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  console.log('test', process);
  useEffect(() => {
    if (process.browser) {
      console.log(localStorage.getItem('token'));
      if (localStorage.token) {
        console.log(localStorage.token, 'exists');
        setToken(() => localStorage.token);
        setLoaded(() => true);
        return;
      }

      router.push('/login');
    }
  }, [process.browser, token, loaded]);
  return [token, loaded];
};

export default useProtectedRoute;
