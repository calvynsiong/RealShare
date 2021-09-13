// components
import RegisterForm from '../../components/register/RegisterForm';
import SignUpLayout from '../../components/layouts/SignUpLayout';
import { Fragment } from 'react';

const RegisterPage = () => {
  return (
    <Fragment>
      <SignUpLayout>
        <>
          <RegisterForm></RegisterForm>
        </>
      </SignUpLayout>
    </Fragment>
  );
};
export default RegisterPage;
