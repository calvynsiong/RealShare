import React from 'react';
import { useParams } from 'react-router';
import { useUserContext } from '../../App';
import useProtectedRoute from '../../hooks/useProtectedRoute';
import MainLayout from '../layouts/MainLayout';
import Modal from 'react-modal';
import { Cancel } from '@material-ui/icons';

interface Props {
  modalStatus: boolean;
  close: () => void;
  open: () => void;
}

const Settings = ({ modalStatus, close }: Props) => {
  const { setUserData, userData } = useUserContext();

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginTop: '2rem',
      marginRight: '-50%',
      maxHeight: '85vh',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <section className='mt-14 top-4'>
      <Modal
        style={customStyles}
        className='max-w-4/5  relative bg-white w-4/5 shadow-xl z-50 ease-linear overflow-y-auto outline-none  px-8 pt-6 pb-8 mb-4'
        isOpen={modalStatus}
        onRequestClose={close}
        shouldCloseOnOverlayClick={true}
        contentLabel="Friend's List"
        ariaHideApp={false}
      >
        <h1>Settings</h1>
        <Cancel
          className='absolute right-2 top-2 z-10 cursor-pointer'
          fontSize='large'
          onClick={close}
        ></Cancel>
        {/* <div className='w-full'> */}
        <form>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='username'
            >
              New username
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='username'
              type='text'
              placeholder='Username'
            ></input>
          </div>
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='password'
            >
              New password
            </label>
            <input
              className='shadow appearance-none borde rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              id='password'
              type='password'
            ></input>
          </div>
          <div className='flex items-center gap-4 justify-between'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='button'
            >
              Edit Account
            </button>
            <button
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='button'
            >
              Delete Account
            </button>
          </div>
        </form>
        {/* </div> */}
      </Modal>
    </section>
  );
};

export default Settings;
