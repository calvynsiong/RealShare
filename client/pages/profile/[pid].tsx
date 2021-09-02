import React, { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import FriendsList from '../../components/profile/FriendsList';
import ProfileHeader from '../../components/profile/ProfileHeader';
import Photos from '../../components/profile/Photos';

interface IProfileContext {
  showFriends: boolean;
  openFriends: () => void;
  closeFriends: () => void;
}
export const ProfileContext = React.createContext<IProfileContext | null>(null);

const Profile = () => {
  const router = useRouter();
  const { pid } = router.query;

  const [showFriends, setShowFriends] = useState<boolean>(false);
  const openFriends = () => setShowFriends(true);
  const closeFriends = () => setShowFriends(false);

  const ProfileProps = { showFriends, openFriends, closeFriends };

  return (
    <ProfileContext.Provider value={ProfileProps}>
      <ProfileHeader></ProfileHeader>
      <Photos></Photos>
      <section className='mt-14 top-[16px] outline-[red]'>
        {/* <button onClick={openFriends}>{`Hello asWorld${pid}`}</button> */}
        <Modal
          className='max-w-[900px] fixed z-[50] min-h-[80vh] bg-white w-[70%] shadow-xl p-4 left-[15%] top-[10%] ease-linear'
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
          <FriendsList />
        </Modal>
      </section>
    </ProfileContext.Provider>
  );
};

Profile.layout = Fragment;

export default Profile;

// interface ISinglePath {
//   pid: string;
// }

// interface IStaticProps {
//   params: ISinglePath;
// }

// export const getStaticPaths = async () => {
//   const paths = Array.from({ length: 400 }).map((value) => {
//     return {
//       params: {
//         pid: `${value}`,
//       },
//     };
//   });

//   return {
//     paths,
//     fallback: true,
//   };
// };

// export const getStaticProps = async ({ params }: IStaticProps) => {
//   return {
//     props: {
//       pid: params.pid,
//     },
//   };
// };
// export const getInitialProps = async ({ params }: StaticProps) => {
//   return {
//     props: {
//       pid: params.pid,
//     },
//   };
// };
