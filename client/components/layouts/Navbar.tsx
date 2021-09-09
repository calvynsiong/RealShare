import React, { Fragment } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import Image from 'next/image';
import { Search, Person, Notifications } from '@material-ui/icons';
import { useRouter } from 'next/router';
import useProtectedRoute from '../../hooks/useProtectedRoute';

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
`;
const SearchBar = styled.div``;
const RightBar = styled.div`
  flex: 5;
`;
const NavLinks = styled.div``;
const NavIcons = styled.div``;
const IconWrapper = styled.div``;
const IconBadge = styled.span`
  width: 15px;
  height: 15px;
  top: -10px;
  right: -10px;
`;

const IconList = [
  {
    children: (
      <>
        <Person fontSize='large'></Person>
        <IconBadge className='absolute bg-red-600 rounded-full flex items-center justify-center p-3 '>
          1
        </IconBadge>
      </>
    ),
  },
  {
    children: (
      <>
        <Notifications fontSize='large'></Notifications>
        <IconBadge className='absolute bg-red-600 rounded-full  flex items-center justify-center p-3 '>
          2
        </IconBadge>
      </>
    ),
  },
];

const Navbar = () => {
  const router = useRouter();
  const [token, loaded] = useProtectedRoute();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('timeOfLogin');
    router.push('/login');
  };
  return token && loaded ? (
    <Section className='flex items-center fixed top-0  w-screen'>
      <Link href='/'>
        <Logo className='hidden sm:flex   cursor-pointer'>
          <span className='font-bold'>RealShare</span>
        </Logo>
      </Link>
      <CenterBar>
        <SearchBar className='z-50 bg-white rounded-full p-2 ml-8 sm:m-2  flex text-black'>
          <Search></Search>
          <input
            type='text'
            className='w-full h-full  focus:outline-none'
            placeholder='Search to find your friends and their posts'
          />
        </SearchBar>
      </CenterBar>
      <RightBar className='flex z-50 items-center justify-end gap-4 mx-8'>
        <NavLinks className='hidden sm:flex gap-8 font-semibold text-lg'>
          <Link href='/'>
            <span className='cursor-pointer'>Feed</span>
          </Link>
          <span className='cursor-pointer' onClick={logout}>
            Logout
          </span>
        </NavLinks>
        {/* <NavIcons className='flex justify-around gap-4'>
          {IconList.map((icon, index) => (
            <IconWrapper className='flex cursor-pointer relative' key={index}>
              {icon.children}
            </IconWrapper>
          ))}
        </NavIcons> */}
        <Link href='/profile/2'>
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
