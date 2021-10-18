import React, { useState } from 'react';
import styled from 'styled-components';
// components
import { PermMedia, Label, Room } from '@material-ui/icons';
import TagSelectBar from './TagSelectBar';
import { useUserContext } from '../../App';
import { useCreatePostQ } from '../../queries/AllQueries';
import { UPLOAD_IMG_URL } from '../../utils/constants';
import { errorToast } from '../../utils/toasts';
import UploadImg from './UploadImg';

interface IButtonProps {
  invalid: boolean;
}

const UploadContainer = styled.div``;
const UploadWrapper = styled.div`
  backdrop-filter: blur(22px) saturate(107%);
  -webkit-backdrop-filter: blur(22px) saturate(107%);
  background-color: rgba(160, 182, 223, 0.19);
  border: 1px solid rgba(255, 255, 255, 0.125);
  box-shadow: 0px 0px 16px -4px rgba(0, 0, 0, 0.68);
  border: 1px solid rgba(255, 255, 255, 0.125);
`;
const UploadPhoto = styled.div`
  height: 50%;
  flex: 15;
`;
const ProfPic = styled.img`
  width: 3rem;
  height: 3rem;
`;
const Divider = styled.hr`
  margin: 0.5rem 0;
  flex: 1;
`;
const InputText = styled.textarea`
  margin-top: 1rem;

  height: 100%;
  padding: 1.5em;
  flex: 10;
`;
const UploadOptions = styled.div`
  gap: 2rem;
  flex: 2;
`;
const SingleOption = styled.div`
  display: flex;
  gap: 1rem;
`;
const UploadButton = styled.button<IButtonProps>`
  border: none;
  background-color: blue;
  opacity: ${(props) => (props.invalid ? '0.5' : '1')};
  font-weight: 500;
  margin-top: 2rem;
  cursor: pointer;
  color: white;
`;

interface IUploadInfo {
  desc: string;
  img: File | null;
  userId: string;
  tags: any[];
  location: any[];
}

const UploadBar = () => {
  // Both tags + location tag
  const { userData } = useUserContext();
  const { mutate: uploadPost } = useCreatePostQ();
  const initialState = {
    desc: '',
    img: null,
    userId: userData!._id,
    tags: [],
    location: [],
  };
  const [uploadInfo, setUploadInfo] = useState<IUploadInfo>(initialState);
  const { tags, location, desc, img } = uploadInfo;
  // console.log(uploadInfo);
  const [showTags, setShowTags] = useState<boolean>(false);
  const [showLocation, setShowLocation] = useState<boolean>(false);
  const Options = [
    {
      onClick: () => setShowTags((prev) => !prev),
      icon: <Label className='cursor-pointer' />,
      label: 'Tags',
    },
    {
      onClick: () => setShowLocation((prev) => !prev),
      icon: <Room className='cursor-pointer' htmlColor='green' />,
      label: 'Location',
    },
  ];

  // helper function to change field
  const changeField = (
    e: React.SyntheticEvent,
    custom?: string,
    customValues?: any[]
  ) => {
    if (!e) return;
    console.log(e);
    const target = e.target as typeof e.target & {
      name: string;
      value: any;
    };
    if (custom) {
      setUploadInfo({ ...uploadInfo, [custom]: customValues });
    } else {
      setUploadInfo({
        ...uploadInfo,
        [target.name]: target.value!,
      });
    }
  };

  const isUploadDisabled = !desc || !img;

  const [tagInput, setTagInput] = useState('');
  const [locationInput, setLocationInput] = useState('');

  // Changes current value for "future" tag
  const handleInputChange = (value: string, type: string) => {
    switch (type) {
      case 'tags':
        setTagInput(value);
        break;
      case 'location':
        setLocationInput(value);
        break;
      default:
        break;
    }
  };
  // console.log('render', tags);
  // Converts "future" tag to proper tag + adds it to tag list
  const addTags = (e: React.SyntheticEvent, type: string) => {
    if (!e) return;
    const event = e as typeof e & {
      key: string;
    };

    switch (event.key) {
      case 'Enter':
      case 'Tab':
        if (type === 'tags' && tagInput) {
          changeField(e, 'tags', [...tags, tagInput]);
          setTagInput('');
        }
        if (type === 'location' && locationInput) {
          changeField(e, 'location', [...location, locationInput]);
          setLocationInput('');
        }
        e.preventDefault();
        break;
      default:
        break;
    }
  };
  // Handles clear out tags
  const onChangeTags = (selectedOption: any, type: string) => {
    const changedData = selectedOption
      ? selectedOption?.map?.((item: any) => item.value)
      : [];
    changeField(selectedOption, type, [...changedData]);
  };

  const handleUploadPost = async () => {
    const { userId, desc, img, location, tags } = uploadInfo;
    const fileImage = new FormData();
    fileImage.append('upload_preset', 'realshare');
    fileImage.append('file', img as File);
    fileImage.append('cloud_name', 'spedwagon');
    let processedImage: string = '';
    // console.log('Image', UPLOAD_IMG_URL, fileImage.entries());
    await fetch(UPLOAD_IMG_URL, {
      method: 'post',
      body: fileImage,
    })
      .then((res) => res.json())
      .then((data) => {
        processedImage = data.secure_url;
      })
      .catch(() => {
        errorToast('Image was not processed!');
      });

    const processedData = {
      userId,
      desc,
      img: processedImage,
      tags,
      location,
    };
    if (img !== null) {
      await uploadPost(processedData);
    }
  };
  const deleteImg = () => {
    setUploadInfo({ ...uploadInfo, img: null });
  };

  // ! Props
  const tagProps = {
    tags,
    handleInputChange,
    addTags,
    tagInput,
    onChangeTags,
    name: 'tags',
  };

  // overwritting tags, name and tagInput props for location instead
  const locationProps = {
    ...tagProps,
    tags: location,
    name: 'location',
    tagInput: locationInput,
  };

  // console.log(img, 'IMAGE');
  return (
    <UploadContainer className='flex w-5/6 mt-24'>
      <UploadWrapper className='h-full flex-1 mx-8 my-4 p-4 flex flex-col'>
        <UploadPhoto className='w-full flex justify-center items-center gap-4 '>
          <ProfPic
            src='https://avatars.dicebear.com/api/gridy/:seed.svg'
            className='rounded-full object-cover mr-5'
            alt=''
          />
          <InputText
            placeholder='Type a caption or something here!'
            aria-label='Post Description'
            name='desc'
            rows={5}
            value={desc}
            onChange={(e) => changeField(e)}
            className='w-3/4 m-4 mt-0 focus:outline-none'
          ></InputText>
        </UploadPhoto>
        <Divider></Divider>
        {img && (
          <UploadImg img={URL.createObjectURL(img)!} deleteImg={deleteImg} />
        )}
        <div className='flex flex-wrap px-3'>
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
                    setUploadInfo({
                      ...uploadInfo,
                      img: target.files[0],
                    });
                  }}
                ></input>
                <PermMedia htmlColor='blue' />

                <span className='text-lg font-semibold'>Upload a picture</span>
              </SingleOption>
            </UploadOptions>
          </label>
          {Options.map((option, index) => (
            <UploadOptions
              className='flex justify-center items-start flex-wrap'
              onClick={option.onClick}
            >
              <SingleOption className=' cursor-pointer mr-4' key={index}>
                {option.icon}
                <span className='text-lg font-semibold'>{option.label}</span>
              </SingleOption>
            </UploadOptions>
          ))}
        </div>
        <>
          {showTags && (
            <>
              <p className='my-2'>Tags</p>
              <TagSelectBar isMulti={true} {...tagProps}></TagSelectBar>
            </>
          )}
          {showLocation && (
            <>
              <p className='mb-2'>Location</p>
              <TagSelectBar isMulti={true} {...locationProps}></TagSelectBar>
            </>
          )}
        </>
        <UploadButton
          disabled={isUploadDisabled}
          invalid={isUploadDisabled}
          className='mx-auto rounded-full p-4 px-8'
          onClick={handleUploadPost}
        >
          Upload
        </UploadButton>
      </UploadWrapper>
    </UploadContainer>
  );
};

export default UploadBar;
