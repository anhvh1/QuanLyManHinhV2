import React, {useEffect, useRef, useState} from 'react';
import {
  ITEM_LAYOUT2,
  ITEM_LAYOUT,
  ITEM_LAYOUT_SMALL_2,
  REQUIRED,
} from '../../../../settings/constants';
import {Form,Space,DatePicker} from 'antd';
import {
  Button,
  Modal,
  InputFormatSpecific,
  Input,
  Radio,
  
} from '../../../../components/uielements/exportComponent';
import {checkInputNumber} from '../../../../helpers/utility';
import TextArea from 'antd/lib/input/TextArea';
import dayjs from 'dayjs';
const {Item, useForm} = Form;

export default (props) => {
  const [form] = useForm();
  // const [isFormSuccess, setIsFormSuccess] = useState(true);
  const {dataEdit, loading, visible, action} = props;
  const [fromTime, setFromTime] = useState('');
  const [value1, setValue1] = useState();

  useEffect(() => {
    if (dataEdit && dataEdit.ID) {
      const newNgayQuyetDinh = dayjs(dataEdit.NgayQuyetDinh).format('DD/MM/YYYY');
      form &&
        form.setFieldsValue({
          ...dataEdit,
          NgayQuyetDinh:
          dataEdit && dataEdit.NgayQuyetDinh
            ? dayjs(newNgayQuyetDinh, 'DD/MM/YYYY')
            : '',
      });
    }
  }, []);
  const onChange1 = (e) => {
    setValue1(e.target.value);
  };
  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    props.onCreate({
      ...value,
    });
  };
  const handleChangeNgayQuyetDinh = (value, strValue) => {
    setFromTime(value);
  };
  return (
    <Modal
      title={`${action === 'edit' ? 'Sửa' : 'Thêm'} danh mục di sản văn hóa phi vật thể`}
      width={470}
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
          form="formQLDiSan"
          loading={loading}
          onClick={onOk}
          // disabled={isFormSuccess}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form form={form} name={'formQLDiSan'} >
        {action !== 'add' ? <Item name="ID" hidden {...REQUIRED}></Item> : null}
        <Item label="Tên" name={'Ten'} {...ITEM_LAYOUT} rules={[REQUIRED]}>
          <Input />
        </Item>
        <Item
          label="Loại hình "
          name={'LoaiHinh'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item
          label="Thông tin quyết định"
          name={'ThongTinQuyetDinh'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item
          label="Ngày quyết định"
          name={'NgayQuyetDinh'}
          {...REQUIRED}
          {...ITEM_LAYOUT}
        >
           <DatePicker
            onChange={handleChangeNgayQuyetDinh}
            format={'DD/MM/YYYY'}
            placeholder={''}
            style={{width: '100%'}}
          />
        </Item>
        <Item
          label="Địa phương"
          name={'DiaPhuong'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
      </Form>
    </Modal>
  );
};
