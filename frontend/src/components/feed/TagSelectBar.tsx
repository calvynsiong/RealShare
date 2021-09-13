import React from 'react';
import Select, { InputActionMeta, OptionsType } from 'react-select';

interface tagProps {
  label: string;
  field: string;
  placeholder: string;
  value: string;
  size: number;
  type: string;
}
interface TagSelectBarProps {
  isMulti?: boolean;
  name: string;
  tags: tagProps[];
  handleInputChange: (value: string, type: string) => void;
  addTags: (e: React.KeyboardEvent<HTMLElement>, type: string) => void;
  tagInput: string;
  onChangeTags: (selectedOption: any, type: string) => void;
}

const TagSelectBar = ({
  tags,
  handleInputChange,
  addTags,
  tagInput,
  isMulti = false,
  onChangeTags,
  name,
}: TagSelectBarProps) => {
  return (
    <Select
      isClearable
      name={name}
      isMulti={isMulti}
      components={{ DropdownIndicator: null }}
      className='basic-single mb-3 border rounded'
      classNamePrefix='react-select'
      id={name}
      value={tags?.map?.((tag) => {
        return { value: tag, label: tag };
      })}
      onKeyDown={(e) => addTags(e, name)}
      onInputChange={(e) => handleInputChange(e, name)}
      onChange={(e) => onChangeTags(e, name)}
      inputValue={tagInput}
    />
  );
};

export default TagSelectBar;
