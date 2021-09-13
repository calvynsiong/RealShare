// components
import SideBar from '../../components/layouts/Sidebar';
import Feed from '../../components/feed/Feed';
import useProtectedRoute from '../../hooks/useProtectedRoute';
import { useUserContext } from '../App';

const Home = () => {
  const { setUserData, userData } = useUserContext();

  const [token, loaded] = useProtectedRoute(setUserData, userData!);
  return token && loaded ? (
    <section className='w-full flex sticky'>
      <SideBar></SideBar>
      <Feed></Feed>
    </section>
  ) : null;
};

export default Home;
