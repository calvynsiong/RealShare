import React, { useState } from 'react';
import styled from 'styled-components';
// components
import { PermMedia, Label, Room } from '@material-ui/icons';
import Select from 'react-select';
import TagSelectBar from './TagSelectBar';

const UploadContainer = styled.div``;
const UploadWrapper = styled.div`
  backdrop-filter: blur(22px) saturate(107%);
  -webkit-backdrop-filter: blur(22px) saturate(107%);
  background-color: rgba(160, 182, 223, 0.19);
  border: 1px solid rgba(255, 255, 255, 0.125);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  border: 1px solid rgba(255, 255, 255, 0.125);
  border-radius: 1em;
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
  border-radius: 1em;
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
const UploadButton = styled.button`
  border: none;
  padding: 7px;
  width: 75%;
  border-radius: 5px;
  background-color: blue;
  font-weight: 500;

  margin-top: 2rem;
  cursor: pointer;
  color: white;
`;
const Options = [
  {
    icon: <PermMedia htmlColor='blue' />,
    label: 'Upload from device',
  },
  {
    icon: <Label />,
    label: 'Tags',
  },
  {
    icon: <Room htmlColor='green' />,
    label: 'Location',
  },
];

const UploadBar = () => {
  const [optionalTags, setOptionalTags] = useState({ tags: [], location: [] });
  const { tags, location } = optionalTags;
  const changeField = (
    e: React.SyntheticEvent,
    custom: string,
    customValues: any[]
  ) => {
    const target = e.target as typeof e.target & {
      name: string;
      value: any;
    };
    if (custom) {
      setOptionalTags({ ...optionalTags, [custom]: customValues });
    } else {
      optionalTags;
      setOptionalTags({
        ...optionalTags,
        [target.name]: target.value!,
      });
    }
  };

  const [tagInput, setTagInput] = useState('');

  const addTags = (e: React.SyntheticEvent) => {
    if (!tagInput) return;
    const event = e as typeof e & {
      key: string;
    };

    switch (event.key) {
      case 'Enter':
      case 'Tab':
        changeField(e, 'tags', [...tags, tagInput]);
        setTagInput('');
        e.preventDefault();
        break;
      default:
        break;
    }
  };
  const handleInputChange = (value: string) => {
    setTagInput(value);
  };
  const onChangeTags = (selectedOption: any) => {
    let changedData = selectedOption
      ? selectedOption?.map?.((item: any) => item.value)
      : [];
    changeField(selectedOption, 'tags', [...changedData]);
  };

  const tagProps = {
    tags,
    handleInputChange,
    addTags,
    tagInput,
    onChangeTags,
    name: 'tags',
  };
  return (
    <UploadContainer className='flex rounded-xl w-full mx-auto mt-4 md:w-3/4'>
      <UploadWrapper className='h-full flex-1 w-full mx-12 my-4 p-4 flex flex-col'>
        <UploadPhoto className='w-full flex justify-center items-center gap-4 '>
          <ProfPic
            src='https://avatars.dicebear.com/api/gridy/:seed.svg'
            className='rounded-full object-cover mr-5'
            alt=''
          />
          <InputText
            placeholder='Type a caption or something here!'
            aria-label='Post Description'
            name='description'
            rows={5}
            className='w-3/4 m-4 mt-0 focus:outline-none'
          ></InputText>
        </UploadPhoto>
        <Divider></Divider>
        <div>
          <UploadOptions className='flex justify-center items-center flex-wrap'>
            {Options.map((option, index) => (
              <SingleOption
                className='flex items-center cursor-pointer mr-4'
                key={index}
              >
                {option.icon}
                <span>{option.label}</span>
              </SingleOption>
            ))}
          </UploadOptions>
        </div>
        <p className='my-2'>Tags</p>
        <TagSelectBar isMulti={true} {...tagProps}></TagSelectBar>
        <p className='mb-2'>Location</p>
        <TagSelectBar {...tagProps}></TagSelectBar>
        <UploadButton className='mx-auto'>Upload</UploadButton>
      </UploadWrapper>
    </UploadContainer>
  );
};

export default UploadBar;
