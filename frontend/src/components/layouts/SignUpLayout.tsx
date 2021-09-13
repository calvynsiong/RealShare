import React, { ReactChild } from 'react';
import Logo from '../../assets/images/54.svg';
const SignUpLayout = ({ children }: { children: ReactChild }) => {
  return (
    <section className='container flex  flex-wrap md:flex-nowrap mx-auto items-center justify-center h-screen'>
      <div className='flex w-2/5 p-4'>
        <img src={''} alt='RealShare SVG' />
      </div>
      {/* width is 3/5 */}
      {children}
      <img src={Logo} alt='Login logo'></img>
    </section>
  );
};

export default SignUpLayout;
