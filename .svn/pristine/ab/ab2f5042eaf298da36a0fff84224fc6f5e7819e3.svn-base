import {Input} from 'antd';
import {
  InputWrapper,
  InputGroupWrapper,
  InputSearchWrapper,
  TextAreaWrapper,
} from './styles/input.style';
import WithDirection from '../../settings/withDirection';
import {checkFieldsValidator} from '../../helpers/utility';
import CustomInputSearch from './inputSearch';
const {Search, TextArea, Group} = Input;

const customizeInputValidator = (props) => {
  return <Input {...props} />;
};

const WDStyledInput = InputWrapper(customizeInputValidator);
const StyledInput = WithDirection(WDStyledInput);

const WDInputGroup = InputGroupWrapper(Group);
const InputGroup = WithDirection(WDInputGroup);

const WDInputSearch = InputSearchWrapper(CustomInputSearch);
const InputSearch = WithDirection(WDInputSearch);

const WDTextarea = TextAreaWrapper(TextArea);
const Textarea = WithDirection(WDTextarea);

export default StyledInput;
export {InputSearch, InputGroup, Textarea};
