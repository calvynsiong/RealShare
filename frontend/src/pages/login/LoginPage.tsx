import { Fragment } from 'react';
// components

import LoginForm from '../../components/login/LoginForm';
import SignUpLayout from '../../components/layouts/SignUpLayout';

const Login = () => {
  return (
    <>
      <SignUpLayout>
        <LoginForm />
      </SignUpLayout>
    </>
  );
};

Login.layout = Fragment;

export default Login;
