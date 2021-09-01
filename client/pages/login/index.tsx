import Head from 'next/head';
import React, { ChangeEvent, Fragment, SyntheticEvent, useState } from 'react';
// components
import Image from 'next/image';
import LogoSVG from '../../public/images/54.svg';
import LoginForm from '../../components/login/LoginForm';
import SignUpLayout from '../../components/layouts/SignUpLayout';

const Login = () => {
  return (
    <>
      <Head>
        <title>Login | RealShare</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1'
        />
      </Head>
      <SignUpLayout>
        <LoginForm />
      </SignUpLayout>
    </>
  );
};

Login.layout = Fragment;

export default Login;
