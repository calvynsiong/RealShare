import Link from 'next/link';
import React, { ReactElement, ReactNode, useEffect } from 'react';
import styled from 'styled-components';
// components
import SideBar from '../components/layouts/Sidebar';
import axios from 'axios';
import Feed from '../components/feed/Feed';
import useProtectedRoute from '../hooks/useProtectedRoute';
import { useUserContext } from './_app';

const Home = () => {
  const { setUserData, userData } = useUserContext();

  const [token, loaded] = useProtectedRoute(setUserData, userData!);
  return (
    token &&
    loaded && (
      <section className='w-full flex sticky'>
        <SideBar></SideBar>
        <Feed></Feed>
      </section>
    )
  );
};

export default Home;
