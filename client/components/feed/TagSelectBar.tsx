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
  handleInputChange: (newValue: string, actionMeta: InputActionMeta) => void;
  addTags: (e: React.KeyboardEvent<HTMLElement>) => void;
  tagInput: string;
  onChangeTags:
    | ((
        value:
          | { value: tagProps; label: tagProps }
          | OptionsType<{ value: tagProps; label: tagProps }>
          | null
      ) => void)
    | undefined;
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
      id='tags'
      value={tags?.map?.((tag) => {
        return { value: tag, label: tag };
      })}
      onKeyDown={(e) => addTags(e)}
      onInputChange={handleInputChange}
      onChange={onChangeTags}
      inputValue={tagInput}
    />
  );
};

export default TagSelectBar;
