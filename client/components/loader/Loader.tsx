import React from 'react';
import Loader from 'react-loader-spinner';

const DefaultLoader = () => {
  return (
    <div className='flex justify-center m-auto mt-12'>
      <Loader type='Watch' color='#ADD8E6' height={70} width={70} />
    </div>
  );
};

export default DefaultLoader;
