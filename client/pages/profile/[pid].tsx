import React, { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-modal';

const Profile = () => {
  const router = useRouter();
  const { pid } = router.query;

  const [showFriends, setShowFriends] = useState<boolean>(false);
  const openFriends = () => setShowFriends(true);
  const closeFriends = () => setShowFriends(false);

  return (
    <div className='mt-14 top-[16px] outline-[red]'>
      <button onClick={openFriends}>{`Hello asWorld${pid}`}</button>
      <Modal
        className='md:w-[500px] md:left-[calc(50%-250px)] fixed z-[50] bg-white w-[70%] shadow-xl p-4 left-[15%] top-[30%] ease-linear'
        isOpen={showFriends}
        onRequestClose={closeFriends}
        shouldCloseOnOverlayClick={true}
        contentLabel="Friend's List"
        ariaHideApp={false}
      >
        <button onClick={closeFriends} className='bg-[red]'>
          Close Modal
        </button>
        Hello World
      </Modal>
    </div>
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
