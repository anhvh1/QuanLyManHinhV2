import React, {useEffect, useState} from 'react';
import {ITEM_LAYOUT, REQUIRED} from '../../../../settings/constants';
import {Radio, Space} from 'antd';
import {
  Button,
  Modal,
  Input,
  Textarea,
} from '../../../../components/uielements/exportComponent';
import Select, {
  Option,
  OptGroup,
} from '../../../../components/uielements/select';
import {customizeItemValidator as Item} from '../../../../components/uielements/itemValidator';
import {
  customizeFormValidator as Form,
  useForm,
} from '../../../../components/uielements/formValidator';
import moment from 'moment';
import DatePicker from '../../../../components/uielements/datePickerFormat';
export default (props) => {
  const [form] = useForm();
  // const [isFormSuccess, setIsFormSuccess] = useState(true);
  const {dataEdit, loading, visible, action,DanhSachAllQLThuVien} = props;
  const [DanhSachMenu, setDanhSachMenu] = useState([]);
  const [fromTime, setFromTime] = useState('');
  useEffect(() => {
    if (dataEdit && dataEdit.NhanVienID) {
      const newNgaySinh = moment(dataEdit.NgaySinh).format('DD/MM/YYYY');
      form &&
        form.setFieldsValue({
          ...dataEdit,
          NgaySinh:
            dataEdit && dataEdit.NgaySinh
              ? moment(newNgaySinh, 'DD/MM/YYYY')
              : '',
        });
    }
  }, []);
  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    props.onCreate({
      ...value,
    });
  };
  const handleChangeNgaySinh = (value, strValue) => {
    setFromTime(value);
  };
  return (
    <Modal
      title={`${action === 'edit' ? 'Cập nhật' : 'Thêm'} thông tin nghệ nhân`}
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
          form="FormNhanLucThuVien"
          loading={loading}
          onClick={onOk}
          // disabled={isFormSuccess}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form form={form} name={'FormNhanLucThuVien'} >
        {action === 'edit' ? <Item name={'NhanVienID'} hidden /> : ''}
        <Item
          label="Họ và tên"
          name={'TenNhanVien'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item
          label="Ngày sinh"
          name={'NgaySinh'}
          {...ITEM_LAYOUT}
          
        >
          <DatePicker
            onChange={handleChangeNgaySinh}
            format={'DD/MM/YYYY'}
            placeholder={''}
            style={{width: '100%'}}
          />
        </Item>
        <Item
          label="Giới tính"
          name={'GioiTinh'}
          {...ITEM_LAYOUT}
         
        >
          <Select
            allowClear
            // style={{width: '200px'}}
          >
            <Option value={1}>Nam</Option>
            <Option value={2}>Nữ</Option>
            <Option value={3}>Khác</Option>
          </Select>
        </Item>
        
        <Item
          label="Thư viện"
          name={'ThuVienID'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
         <Select
            allowClear
            // style={{width: '200px'}}
            placeholder={''}
          >
            {DanhSachAllQLThuVien?.map((item) => (
              <Option value={item.ID}>{item.TenThuVien}</Option>
            ))}
          </Select>
        </Item> 
        <Item
          label="Số điện thoại"
          name={'SoDienThoai'}
          {...ITEM_LAYOUT}
         
        >
          <Input />
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
            <Option value={true}>Đang làm</Option>
            <Option value={false}>Nghỉ việc</Option>
          </Select>
        </Item>
      </Form>
    </Modal>
  );
};
