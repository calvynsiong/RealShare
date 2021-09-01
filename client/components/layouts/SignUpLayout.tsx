import React, { ReactChild } from 'react';
import Image from 'next/image';
import LogoSVG from '../../public/images/54.svg';

const SignUpLayout = ({ children }: { children: ReactChild }) => {
  return (
    <section className='container flex  flex-wrap md:flex-nowrap mx-auto items-center justify-center h-screen'>
      <div className='flex w-2/5 p-4'>
        <Image src={LogoSVG} alt='RealShare SVG' />
      </div>
      {/* width is 3/5 */}
      {children}
      {/* <Image src='' alt='login image'></Image> */}
    </section>
  );
};

export default SignUpLayout;
