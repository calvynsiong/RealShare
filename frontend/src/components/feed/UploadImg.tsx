import React from 'react';
import { Cancel } from '@material-ui/icons';
interface Props {
  img: string | null;
  deleteImg: () => void;
}

const UploadImg = ({ img, deleteImg }: Props) => {
  return (
    <div className='relative px-5 py-2 flex justify-center'>
      <img
        src={img!}
        className='object-cover w-full max-w-sm'
        alt='To be posted'
      />
      <Cancel
        className='absolute right-2 top-2 z-10 cursor-pointer'
        fontSize='large'
        onClick={deleteImg}
      ></Cancel>
    </div>
  );
};

export default UploadImg;
