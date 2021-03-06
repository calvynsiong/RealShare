import React, { ChangeEvent, Fragment, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useRegisterUserQ } from '../../queries/AllQueries';
// components

import { capitalize } from '../../utils/functions';
import { errorToast } from '../../utils/toasts';

interface IButtonProps {
  invalid: boolean;
}
const SignUpButton = styled.button<IButtonProps>`
  opacity: ${(props) => (props.invalid ? '0.5' : '1')};
`;

const RegisterForm = () => {
  const { mutate: register } = useRegisterUserQ();
  interface IRegisterInfo {
    username: string;
    password: string;
    passwordConfirmed: string;
    email: string;
  }

  const initialState: IRegisterInfo = {
    username: '',
    password: '',
    passwordConfirmed: '',
    email: '',
  };

  const [registerInfo, setRegisterInfo] = useState<IRegisterInfo>(initialState);

  const { username, password, email, passwordConfirmed } = registerInfo;

  const textFields = [
    { field: username, name: 'username', placeholder: 'Enter your username' },
    { field: email, name: 'email', placeholder: 'Enter your email address' },
    {
      field: password,
      name: 'password',
      placeholder: 'Enter your password',
      type: 'password',
    },
    {
      field: passwordConfirmed,
      name: 'passwordConfirmed',
      placeholder: 'Type youtr password again',
      type: 'password',
      label: 'Confirm your password',
    },
  ];
  const handleTextField = (e: ChangeEvent<HTMLInputElement>): void => {
    const newData: IRegisterInfo = {
      ...registerInfo,
      [e.target.name]: e.target.value,
    };
    setRegisterInfo(newData);
  };

  const [, setError] = useState<string | null>(null);
  const [, setLoading] = useState<boolean>(false);
  const history = useHistory();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    event.preventDefault();
    if (invalid) return;
    // setLoading(true);
    // setError(null);
    const errorCheckList = [
      {
        regex: usernameRegex,
        type: username,
        message:
          'Username must be at least 3 characters long and contain only letters, numbers and underscores',
      },
      {
        regex: passwordRegex,
        type: password,
        message:
          'Password must contain at least 1 character, 1 digit and must be at least 8 characters long',
      },
      {
        regex: emailRegex,
        type: email,
        message: 'Please enter a valid email',
      },
    ];
    for (const field of errorCheckList) {
      if (!field.regex.test(field.type)) {
        setError(() => field.message);
        setLoading(false);
        errorToast(field.message);
        return;
      }
    }
    register({
      username,
      email,
      password,
    });
    history.push('/login');
  };

  const invalid = !(
    username &&
    password &&
    email &&
    passwordConfirmed &&
    password === passwordConfirmed
  );

  return (
    <article className='flex w-full md:w-3/5 flex-wrap m-4 my-20 max h-5/6'>
      <div className='flex flex-col items-center bg-white p-4 px-8 border border-gray-primary m-4 -mt-10 rounded'>
        <h1 className='flex justify-center w-full'>Sign Up for RealShare</h1>
        <h6 className='flex justify-center w-full text-gray-500'>
          A social app made with TypeScript and React
        </h6>
        <form className='w-full min-h-0' onSubmit={handleSubmit}>
          {textFields.map(
            ({ field, name, placeholder, type, label }, index) => (
              <Fragment key={index}>
                <label htmlFor={name}>{label ?? capitalize(name)}</label>
                <input
                  type={type ?? 'text'}
                  placeholder={placeholder}
                  aria-label='Enter your email address'
                  className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border  border-gray-primary rounded mb-2'
                  value={field}
                  name={name}
                  onChange={(e) => handleTextField(e)}
                />
              </Fragment>
            )
          )}
          <SignUpButton
            invalid={invalid}
            disabled={invalid}
            type='submit'
            className='bg-blue-600 text-black w-3/4 rounded h-8 font-bold mt-4 mx-auto text-center flex justify-center items-center text-xs sm:text-base'
          >
            Sign up for a new account
          </SignUpButton>

          <Link to='/login'>
            <button
              disabled={false}
              type='submit'
              className='bg-green-400 p-2  text-black w-3/4 rounded h-8 font-bold mt-4 mx-auto text-center flex justify-center items-center text-xs sm:text-base
            '
            >
              Login to your account
            </button>
          </Link>
        </form>
      </div>
    </article>
  );
};

export default RegisterForm;
