import React from 'react';
import Modal from 'react-modal';
import UploadImg from './../feed/UploadImg';
import styled from 'styled-components';
import { PermMedia } from '@material-ui/icons';

interface uploadImgProps {
  processedImg: string | null;
  deleteImg: () => void;
}
interface updateProfilePicProps extends uploadImgProps {
  modalStatus: boolean;
  close: () => void;
  setImg: React.Dispatch<React.SetStateAction<File | null>>;
}

const UploadOptions = styled.div`
  gap: 2rem;
  flex: 2;
`;
const SingleOption = styled.div`
  display: flex;
  gap: 1rem;
`;

const UpdateProfilePicModal = ({
  modalStatus,
  close,
  processedImg,
  deleteImg,
  setImg,
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
    deleteImg,
  };
  return (
    <section className='mt-14 top-4'>
      <Modal
        style={customStyles}
        className='max-w-3/4  fixed bg-white w-3/4 shadow-xl p-4 z-50 ease-linear overflow-y-auto outline-none '
        isOpen={modalStatus}
        onRequestClose={close}
        shouldCloseOnOverlayClick={true}
        contentLabel="Friend's List"
        ariaHideApp={false}
      >
        <UploadImg {...updateProfPicProps}></UploadImg>
        <label htmlFor='file'>
          <UploadOptions className='flex justify-center items-start'>
            <SingleOption className='flex items-center cursor-pointer mr-4'>
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

              <span className='text-lg font-semibold'>
                Update your profile picture
              </span>
            </SingleOption>
          </UploadOptions>
        </label>
      </Modal>
    </section>
  );
};

export default UpdateProfilePicModal;
