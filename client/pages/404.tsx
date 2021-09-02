import React from 'react';
import Link from 'next/link';

const ErrorPage = () => {
  return (
    <section className='w-full flex flex-col sticky justify-center items-center mt-[5em] text-center '>
      <h2 className='font-bold text-[1.5em]'>
        Sorry, this page is not available
      </h2>
      <p>
        The page you are looking for is not available.{' '}
        <Link href='/'>
          <a className='font-semibold text-blue-500'>Go back to main page</a>
        </Link>
      </p>
    </section>
  );
};

export default ErrorPage;
