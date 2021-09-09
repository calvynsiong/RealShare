import Link from 'next/link';
import React, { ChangeEvent, Fragment, useContext, useState } from 'react';
import { useLoginUserQ } from '../../queries/authQ';
// components

import { capitalize } from '../../utils/functions';
import { useRouter } from 'next/router';

const LoginForm = () => {
  interface ILoginInfo {
    email: string;
    password: string;
  }

  const initialState: ILoginInfo = {
    email: '',
    password: '',
  };

  const [loginInfo, setLoginInfo] = useState(initialState);
  const { email, password } = loginInfo;

  const textFields = [
    { field: email, name: 'email', placeholder: 'Enter your email' },
    {
      field: password,
      name: 'password',
      placeholder: 'Enter your password',
      type: 'password',
    },
  ];
  const handleTextField = (e: ChangeEvent<HTMLInputElement>): void => {
    const newData: ILoginInfo = {
      ...loginInfo,
      [e.target.name]: e.target.value,
    };
    setLoginInfo(newData);
  };
  const { data: userId, mutateAsync: login } = useLoginUserQ();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login({ info: { email, password } });
    const id = userId ?? JSON.parse(localStorage.user)?._id;
    console.log(id, 'fetchedId');
    await router.push(`/profile/${id}`);
  };

  const buttonClass =
    'text-black w-3/4 rounded h-8 font-bold mt-4 mx-auto text-center flex justify-center items-center text-xs sm:text-base';

  const invalid = !(email && password.length >= 8);
  return (
    <article className='flex w-full md:w-3/5 flex-wrap m-4'>
      <div className='flex flex-col items-center bg-white p-8 border border-gray-primary m-4 rounded'>
        <h1 className='flex justify-center w-full'>Welcome to RealShare</h1>
        <h6 className='flex justify-center w-full text-gray-500'>
          A social app made with TypeScript and NextJs
        </h6>
        <form onSubmit={handleSubmit}>
          {textFields.map(({ field, name, placeholder, type }, index) => (
            <Fragment key={index}>
              <label htmlFor={name}>{capitalize(name)}</label>
              <input
                type={type ?? 'text'}
                placeholder={placeholder}
                aria-label={name}
                className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border  border-gray-primary rounded mb-2'
                value={field}
                name={name}
                onChange={(e) => handleTextField(e)}
              />
            </Fragment>
          ))}
          <button
            disabled={false}
            type='submit'
            className={`bg-blue-600 ${buttonClass}
            ${invalid && 'opacity-50'}`}
          >
            Login
          </button>
          <Link href='/register'>
            <button
              disabled={false}
              type='submit'
              className={`bg-green-400 p-2  ${buttonClass}
              `}
            >
              Don't have an account yet? Sign up!
            </button>
          </Link>
          <Link href='/'>
            <p className='text-center text-[#1775ee] mt-2'>Forgot password?</p>
          </Link>
        </form>
      </div>
    </article>
  );
};

export default LoginForm;
