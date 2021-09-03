import React, { Fragment } from 'react';
import styled from 'styled-components';

import Image from 'next/image';
import { Search, Person, Notifications } from '@material-ui/icons';

const Logo = styled.div`
  flex: 2;
`;
const Section = styled.nav`
  backdrop-filter: blur(22px) saturate(107%);
  -webkit-backdrop-filter: blur(22px) saturate(107%);
  background-color: rgba(160, 182, 223, 0.19);
  border: 1px solid rgba(255, 255, 255, 0.125);
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
const IconBadge = styled.span``;

const IconList = [
  {
    children: (
      <>
        <Person fontSize='large'></Person>
        <IconBadge className='absolute bg-red-600 rounded-full w-[15px] h-[15px] flex items-center justify-center p-3 top-[-10px] right-[-10px]'>
          1
        </IconBadge>
      </>
    ),
  },
  {
    children: (
      <>
        <Notifications fontSize='large'></Notifications>
        <IconBadge className='absolute bg-red-600 rounded-full w-[15px] h-[15px] flex items-center justify-center p-3 top-[-10px] right-[-10px]'>
          1
        </IconBadge>
      </>
    ),
  },
];

const Navbar = () => {
  return (
    <Section className=' flex items-center fixed top-0 h-[5em] z-[999] w-screen'>
      <Logo className='hidden sm:flex  ml-[2em] text-[2em] cursor-pointer'>
        <span className='font-bold'>RealShare</span>
      </Logo>
      <CenterBar>
        <SearchBar className='z-50 bg-white rounded-full p-2 ml-8 sm:m-2  flex text-black'>
          <Search></Search>
          <input
            type='text'
            className='w-full h-full bg-blue-100 focus:outline-none'
            placeholder='Search to find your friends and their posts'
          />
        </SearchBar>
      </CenterBar>
      <RightBar className='flex z-50 items-center justify-between mx-8'>
        <NavLinks className='hidden sm:flex gap-4 font-semibold text-lg'>
          <span className='cursor-pointer'>Home</span>
        </NavLinks>
        <NavIcons className='flex justify-around gap-4'>
          {IconList.map((icon, index) => (
            <IconWrapper className='flex cursor-pointer relative' key={index}>
              {icon.children}
            </IconWrapper>
          ))}
        </NavIcons>
        <img
          className='h-[2em] rounded-full cursor-pointer'
          src='https://avatars.dicebear.com/api/gridy/:seed.svg'
          alt='avatar'
        ></img>
      </RightBar>
    </Section>
  );
};

export default Navbar;
