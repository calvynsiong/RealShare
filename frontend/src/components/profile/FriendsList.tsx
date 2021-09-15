import React from 'react';
import Modal from 'react-modal';
import { useProfileContext } from '../../pages/profile/Profile';
import { useUserContext } from '../../App';

interface Props {
  showFriends: boolean;
  closeFriends: () => void;
  datatype: string;
}

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

const FriendsList = ({ showFriends, closeFriends, datatype }: Props) => {
  const { fetchedUser } = useProfileContext();
  const { following, followers } = fetchedUser!;
  const friends = datatype === 'following' ? following : followers;
  return (
    <section className='mt-14 top-4 outline-[red]'>
      <Modal
        style={customStyles}
        className='max-w-3/4  fixed bg-white w-3/4 shadow-xl p-4  ease-linear overflow-y-auto outline-none '
        isOpen={showFriends}
        onRequestClose={closeFriends}
        shouldCloseOnOverlayClick={true}
        contentLabel="Friend's List"
        ariaHideApp={false}
      >
        <button
          type='button'
          onClick={closeFriends}
          className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
        >
          <svg
            className='h-6 w-6'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            aria-hidden='true'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
        <h1 className='text-center'>{datatype}</h1>
        <ul>
          {friends?.map(({ id, username, avatar }) => (
            <li key={id} className='flex items-center justify-between mt-5'>
              <div className='flex gap-4'>
                <img
                  src={
                    `${avatar}` ??
                    `https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500`
                  }
                  alt={username}
                  className='w-9 h-9 rounded-full object-cover'
                />
                <span className='font-semibold'>{username}</span>
              </div>
              <a href={`/profile/${id}`}>
                <button
                  className='flex rounded-3xl cursor-pointer p-3 bg-blue-500 text-white'
                  onClick={closeFriends}
                >
                  Profile
                </button>
              </a>
            </li>
          ))}
        </ul>
      </Modal>
    </section>
  );
};

export default FriendsList;
