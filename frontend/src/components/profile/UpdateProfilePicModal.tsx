import React from 'react';
import Modal from 'react-modal';
import UploadImg from './../feed/UploadImg';
import styled from 'styled-components';
import { PermMedia } from '@material-ui/icons';
import DefaultLoader from '../loader/Loader';

interface uploadImgProps {
  processedImg: string | null;
  deleteImg: () => void;
}
interface updateProfilePicProps extends uploadImgProps {
  modalStatus: boolean;
  close: () => void;
  setImg: React.Dispatch<React.SetStateAction<File | null>>;
  handleUpdateProfilePic: (img: File | null) => Promise<void>;
  isLoading: boolean;
  img: File | null;
}

const UploadOptions = styled.div`
  gap: 2rem;
  flex: 2;
`;

const UpdateProfilePicModal = ({
  modalStatus,
  close,
  processedImg,
  deleteImg,
  setImg,
  isLoading,
  img,
  handleUpdateProfilePic,
}: updateProfilePicProps) => {
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

  const updateProfPicProps = {
    img: processedImg,
    deleteImg: () => {
      deleteImg();
      close();
    },
  };
  return (
    <section className='mt-14 top-4'>
      <Modal
        style={customStyles}
        className='max-w-4/5  fixed bg-white w-4/5 shadow-xl p-4 z-50 ease-linear overflow-y-auto outline-none '
        isOpen={modalStatus}
        onRequestClose={close}
        shouldCloseOnOverlayClick={true}
        contentLabel="Friend's List"
        ariaHideApp={false}
      >
        {isLoading ? (
          <DefaultLoader />
        ) : (
          <UploadImg {...updateProfPicProps}></UploadImg>
        )}
        <label htmlFor='file'>
          <UploadOptions className='flex justify-around items-start'>
            <div className='flex gap-4 items-center cursor-pointer mr-4'>
              <input
                type='file'
                id='file'
                accept='image/png, image/jpeg'
                hidden
                onChange={(e: React.SyntheticEvent) => {
                  const target = e.target as typeof e.target & {
                    files: File[];
                  };

                  setImg(target.files[0]);
                }}
              ></input>
              <PermMedia htmlColor='blue' />

              <span className='text-lg font-semibold mr-6'>
                Choose new picture
              </span>
              <button
                className={`bg-blue-600 text-white w-3/4 rounded h-8 font-bold mt-4 text-center flex justify-center items-center text-xs sm:text-base ${
                  !img && `opacity-75`
                } `}
                disabled={!img}
                onClick={() => handleUpdateProfilePic(img)}
              >
                Update your profile picture
              </button>
            </div>
          </UploadOptions>
        </label>
      </Modal>
    </section>
  );
};

export default UpdateProfilePicModal;
