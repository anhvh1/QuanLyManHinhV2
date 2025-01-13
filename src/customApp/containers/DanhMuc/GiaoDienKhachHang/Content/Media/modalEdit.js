import React, {useEffect, useState} from 'react';
import {ITEM_LAYOUT, REQUIRED} from '../../../../../../settings/constants';
import {Radio, Space,Select } from 'antd';
import {
  Button,
  Modal,
  Input,
  Textarea,
  TreeSelect 
} from '../../../../../../components/uielements/exportComponent';
// import Select, {
//   Option,
//   OptGroup,
// } from '../../../../../../components/uielements/select';
import {InputFormatSpecific} from '../../../../../../components/uielements/exportComponent';
import {customizeItemValidator as Item} from '../../../../../../components/uielements/itemValidator';
import {
  customizeFormValidator as Form,
  useForm,
} from '../../../../../../components/uielements/formValidator';
import moment from 'moment';
import api from './config';
import DatePicker from '../../../../../../components/uielements/datePickerFormat';
import Switches from '../../../../../../components/uielements/switch';
import dayjs from 'dayjs';
export default (props) => {
  const [form] = useForm();
  // const [isFormSuccess, setIsFormSuccess] = useState(true);
  const {dataModalEdit, loading, visible, action,DanhSachThuMuc} = props;
  useEffect(() => {
    if (dataModalEdit && dataModalEdit.ID) {
      const newNgaySinh = dayjs(dataModalEdit.NgaySinh).format('DD/MM/YYYY');
      const tagValue = dataModalEdit.ListTag.length > 0 ? dataModalEdit.ListTag.join(', ') : '';
      form &&
        form.setFieldsValue({
          ...dataModalEdit,
          NgaySinh:
            dataModalEdit && dataModalEdit.NgaySinh
              ? dayjs(newNgaySinh, 'DD/MM/YYYY')
              : '',
          Tag: tagValue,
        });
    }
  }, [dataModalEdit]);
  
  
  
  const generateTreeSelectData = (data) => {
    return data.map(item => ({
      title: item.TenThuMuc,
      value: item.ThuMucID.toString(), // Ensure value is string
      key: item.ThuMucID.toString(), // Ensure key is string
      children: item.Children.length > 0 ? generateTreeSelectData(item.Children) : undefined,
    }));
  };

  const treeSelectData = generateTreeSelectData(DanhSachThuMuc);
  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    props.onCreate({
      ...value,
      Tag: value.Tag, // Sử dụng trường đã được set từ form
    });
  };
  
  return (
    <Modal
      title={`${action === 'editedit' ? 'Cập nhật' : 'Thêm'} thông tin media`}
      width={750}
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
          form="FormNgheNhan"
          loading={loading}
          onClick={onOk}
          // disabled={isFormSuccess}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form form={form} name={'FormNgheNhan'} >
        {action === 'editedit' ? <Item name={'ID'} hidden /> : ''}
        <Item
          label="Tên file"
          name={'TenFile'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item
          label="Thời lượng trình chiếu"
          name={'ThoiLuongTrinhChieu'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item
          label="Tag"
          name={'Tag'}
          {...ITEM_LAYOUT}
          // rules={[REQUIRED]}
        >
         <Input></Input>
        </Item>
        <Item
          label="Chọn thư mục"
          name={'ThuMucID'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
           <TreeSelect
              treeData={treeSelectData}
              placeholder="Chọn thư mục"
              treeDefaultExpandAll
              onChange={(value) => form.setFieldsValue({ ThuMucID: value })}
            />
        </Item>
        <Item
          label="Trạng thái"
          name={'TrangThai'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Select
            allowClear
            // style={{width: '200px'}}
          >
            <Select.Option value={true}>Đang sử dụng</Select.Option>
            <Select.Option value={false}>Không sử dụng</Select.Option>
          </Select>
        </Item>
      </Form>
    </Modal>
  );
};
