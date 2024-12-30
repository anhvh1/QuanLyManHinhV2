import React, {useEffect, useState} from 'react';
import {ITEM_LAYOUT, REQUIRED} from '../../../../settings/constants';
import {Radio} from 'antd';
import {
  Button,
  Modal,
  Input,
  Textarea,
} from '../../../../components/uielements/exportComponent';
import {InputFormatSpecific} from '../../../../components/uielements/exportComponent';
import {customizeItemValidator as Item} from '../../../../components/uielements/itemValidator';
import {
  customizeFormValidator as Form,
  useForm,
} from '../../../../components/uielements/formValidator';
export default (props) => {
  const [form] = useForm();
  const [isFormSuccess, setIsFormSuccess] = useState(true);
  const {dataEdit, loading, visible, action} = props;
  useEffect(() => {
    if (dataEdit && dataEdit.ID) {
      form &&
        form.setFieldsValue({
          ...dataEdit,
          TrangThai: dataEdit.TrangThai ? 1 : 0,
        });
    }
  }, []);
  const onChange = (e) => {
  };
  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    props.onCreate({
      ...value,
      Loai: 5,
      TrangThai: Boolean(value.TrangThai),
    });
  };
  const handleChangedFields = async (changedValues, allValues) => {
    const value = await form.getFieldsValue();
    const {Ten} = value;
    if (Ten) {
      setIsFormSuccess(false);
    } else {
      setIsFormSuccess(true);
    }
  };
  return (
    <Modal
      title={`${action === 'edit' ? 'SỬA' : 'THÊM'} CẤP DI TÍCH XẾP HẠNG`}
      width={450}
      visible={visible}
      onCancel={props.onCancel}
      footer={[
        <Button key="back" onClick={props.onCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          htmlType="submit"
          type="primary"
          form="FormCapDiTich"
          loading={loading}
          onClick={onOk}
          disabled={isFormSuccess}
        >
          Lưu
        </Button>,
      ]}
    >
       <Form form={form} name={'FormCapDiTich'} onChange={handleChangedFields}>
        {action === 'edit' ? <Item name={'ID'} hidden /> : ''}
        <Item
          label="Tên"
          name={'Ten'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item
          label="Thứ tự hiển thị"
          name={'GhiChu'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
      </Form>
    </Modal>
  );
};
