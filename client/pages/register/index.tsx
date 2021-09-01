import React, { Fragment } from 'react';
import Head from 'next/head';
// components
import RegisterForm from '../../components/register/RegisterForm';
import SignUpLayout from '../../components/layouts/SignUpLayout';

const RegisterPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Register | RealShare</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1'
        />
      </Head>
      <SignUpLayout>
        <>
          <RegisterForm></RegisterForm>
        </>
      </SignUpLayout>
    </Fragment>
  );
};
RegisterPage.layout = Fragment;
export default RegisterPage;
