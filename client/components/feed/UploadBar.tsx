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
const UploadButton = styled.button`
  border: none;
  padding: 7px;
  width: 75%;
  background-color: blue;
  font-weight: 500;

  margin-top: 2rem;
  cursor: pointer;
  color: white;
`;

const UploadBar = () => {
  // Both tags + location tag
  const [optionalTags, setOptionalTags] = useState({ tags: [], location: [] });
  const { tags, location } = optionalTags;
  const [showTags, setShowTags] = useState<boolean>(false);
  const [showLocation, setShowLocation] = useState<boolean>(false);
  const Options = [
    {
      icon: <PermMedia htmlColor='blue' />,
      label: 'Upload from device',
    },
    {
      icon: (
        <Label
          className='cursor-pointer'
          onClick={() => setShowTags((prev) => !prev)}
        />
      ),
      label: 'Tags',
    },
    {
      icon: (
        <Room
          className='cursor-pointer'
          onClick={() => setShowLocation((prev) => !prev)}
          htmlColor='green'
        />
      ),
      label: 'Location',
    },
  ];

  // helper function to change field
  const changeField = (
    e: React.SyntheticEvent,
    custom: string,
    customValues: any[]
  ) => {
    if (!e) return;
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

  return (
    <UploadContainer className='flex  w-full mx-auto mt-16 md:w-3/4'>
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
        <UploadButton className='mx-auto'>Upload</UploadButton>
      </UploadWrapper>
    </UploadContainer>
  );
};

export default UploadBar;
