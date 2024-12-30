import {Input, message} from 'antd';
import {MaxLength} from '../../settings/constants';
import {useEffect, useState} from 'react';
import {regaxSpace} from '../../helpers/utility';
const {Search, TextArea, Group} = Input;

const CustomInputSearch = (props) => {
  const [value, setValue] = useState();
  useEffect(() => {
    setValue(props?.value?.toString()?.replace(regaxSpace, ''));
  }, [props.value]);
  return (
    <Search
      value={value}
      onChange={(e) => {
        if (props?.onChange) {
          props?.onChange(e);
        }
        if (e.target.value.toString().length > MaxLength) {
          message.destroy();
          message.warning(`Vui lòng không nhập quá ${MaxLength} ký tự`);
          const truncatedValue = e.target.value?.slice(0, MaxLength);
          setValue(truncatedValue);
        } else {
          setValue(e.target.value);
        }
      }}
      {...props}
      onSearch={(value) => {
        const trimValue = value
          ?.toString()
          ?.replace(regaxSpace, ' ')
          ?.trimStart()
          ?.trimEnd();
        props.onSearch(trimValue);
        setValue(trimValue);
      }}
    />
  );
};

export default CustomInputSearch;
