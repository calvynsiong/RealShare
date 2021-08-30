import Head from 'next/head';
import React, { ChangeEvent, Fragment, SyntheticEvent, useState } from 'react';
// components
import Image from 'next/image';
import LogoSVG from '../../.next/static/images/54.svg';
import LoginForm from '../../components/login/LoginForm';

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
      <section className='container flex  flex-wrap md:flex-nowrap mx-auto items-center justify-center h-screen'>
        <div className='flex w-2/5 p-4'>
          <Image src={LogoSVG} alt='RealShare SVG' />
        </div>
        {/* width is 3/5 */}
        <LoginForm></LoginForm>
        {/* <Image src='' alt='login image'></Image> */}
      </section>
    </>
  );
};

Login.layout = Fragment;

export default Login;
