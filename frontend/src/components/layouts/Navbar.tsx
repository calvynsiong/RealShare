import styled from 'styled-components';

import { Search } from '@material-ui/icons';
import useProtectedRoute from '../../hooks/useProtectedRoute';
import { useUserContext } from '../../App';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState, ReactNode } from 'react';
import axios from 'axios';

const Logo = styled.div`
  flex: 2;
  margin-left: 2em;
  font-size: 2em;
`;
const Section = styled.nav`
  backdrop-filter: blur(22px) saturate(107%);
  -webkit-backdrop-filter: blur(22px) saturate(107%);
  background-color: rgba(160, 182, 223, 0.19);
  border: 1px solid rgba(255, 255, 255, 0.125);
  height: 80px;
  z-index: 999;
`;
const CenterBar = styled.div`
  flex: 7;
  flex-direction: column;
  position: relative;
`;
const SearchBar = styled.div``;
const SearchDropdown = styled.div``;
const RightBar = styled.div`
  flex: 5;
`;
const NavLinks = styled.div``;
// const IconBadge = styled.span`
//   width: 15px;
//   height: 15px;
//   top: -10px;
//   right: -10px;
// `;

const Navbar = () => {
  const history = useHistory();
  const { setUserData, userData, allUsers, setAllUsers } = useUserContext()!;

  const fetchUsers = useCallback(async () => {
    const res = await axios.get('/api/v1/user/all');
    const users = res.data.dataPayload.users;
    setAllUsers(users);
  }, [setAllUsers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  const [token, loaded] = useProtectedRoute(setUserData, userData!);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<ReactNode>();

  const searchRef = useRef<HTMLInputElement>(null);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('timeOfLogin');
    history.push('/login');
  };

  const getSearchTerm = useCallback(() => {
    setSearch(searchRef.current!.value);
    setSearchResults(
      <>
        {search &&
          (allUsers ?? [])
            .filter((user) =>
              user.username.toLowerCase().includes(search.toLowerCase())
            )
            .slice(0, 5)
            .map((user) => (
              <Link to={`/profile/${user._id}`}>
                <div className='flex items-center gap-4 p-2 hover:bg-gray-200 '>
                  <img
                    src={
                      `${user.avatar}` ??
                      `https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500`
                    }
                    alt={user.username}
                    className='w-9 h-9 rounded-full object-cover'
                  />
                  <span className='flex items-center h-8 px-3 text-sm '>
                    {user.username}
                  </span>
                </div>
              </Link>
            ))}
      </>
    );
  }, [allUsers, search]);

  return token && loaded ? (
    <Section className='flex items-center fixed top-0  w-screen'>
      <Link to='/'>
        <Logo className='hidden sm:flex   cursor-pointer'>
          <span className='font-bold'>RealShare</span>
        </Logo>
      </Link>
      <CenterBar className='ml-14'>
        <SearchBar className='relative z-50 bg-white rounded-full p-2 flex text-black '>
          <Search></Search>
          <input
            ref={searchRef}
            id='users'
            value={search}
            onChange={getSearchTerm}
            autoComplete='off'
            type='text'
            className='w-full h-full  focus:outline-none'
            placeholder='Search to find your friends and their posts'
          />
        </SearchBar>
        <SearchDropdown className='absolute w-5/6 -top left-4 flex flex-col rounded-lg bg-white shadow-lg'>
          {searchResults}
        </SearchDropdown>
      </CenterBar>
      <RightBar className='flex z-50 items-center justify-end gap-4 mx-8'>
        <NavLinks className='hidden sm:flex gap-8 font-semibold text-lg'>
          <Link to='/'>
            <span className='cursor-pointer'>Feed</span>
          </Link>
          <Link to='/settings'>
            <span className='cursor-pointer'>Settings</span>
          </Link>
          <span className='cursor-pointer' onClick={logout}>
            Logout
          </span>
        </NavLinks>
        <Link to={`/profile/${userData?._id}`}>
          <img
            className='h-8 rounded-full cursor-pointer'
            src='https://avatars.dicebear.com/api/gridy/:seed.svg'
            alt='avatar'
          ></img>
        </Link>
      </RightBar>
    </Section>
  ) : (
    <></>
  );
};

export default Navbar;
