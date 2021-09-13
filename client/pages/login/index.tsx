import Head from 'next/head';
import React, { Fragment } from 'react';
// components
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
