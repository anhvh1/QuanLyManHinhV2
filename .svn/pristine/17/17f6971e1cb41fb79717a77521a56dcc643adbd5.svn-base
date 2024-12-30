import {Form} from 'antd';
const {Item} = Form;
import {checkFieldsValidator} from '../../helpers/utility';
import {MAXLENGTH} from '../../settings/constants';
const customizeItemValidator = (props) => {
  const defaultRules = props.rules ? props.rules : [];
  return (
    <Item
      {...props}
      rules={[
        ...defaultRules,
        {
          validator: (rule, value, callback) =>
            checkFieldsValidator(
              rule,
              value,
              callback,
              MAXLENGTH,
              props?.label,
            ),
        },
      ]}
    />
  );
};

export {customizeItemValidator};
