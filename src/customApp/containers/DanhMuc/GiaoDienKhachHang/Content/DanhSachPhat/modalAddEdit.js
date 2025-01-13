import React, {useEffect, useState} from 'react';
import {ITEM_LAYOUT, REQUIRED} from '../../../../../../settings/constants';
import {Radio, Space,Select} from 'antd';
import {
  Button,
  Modal,
  Input,
  Textarea,
} from '../../../../../../components/uielements/exportComponent';
import  {
  Option,
  OptGroup,
} from '../../../../../../components/uielements/select';
import {_debounce,getInfoFromToken,getLocalKey} from '../../../../../../helpers/utility';
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
  const {dataEdit, loading, visible, action, danhSachDMThuVien,DanhSachNguoiDung} = props;
  const [DanhSachMenu, setDanhSachMenu] = useState([]);
  const [fromTime, setFromTime] = useState('');
  useEffect(() => {
    if (dataEdit && dataEdit.DanhSachPhatID) {
      const newNgaySinh = dayjs(dataEdit.NgaySinh).format('DD/MM/YYYY');
      form &&
        form.setFieldsValue({
          ...dataEdit,
          NgaySinh:
            dataEdit && dataEdit.NgaySinh
              ? dayjs(newNgaySinh, 'DD/MM/YYYY')
              : '',
        });
    }
  }, []);
  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    // Set NguoiDungID based on condition
    // if (ListNguoiDung !== 18) {
    //   value.NguoiDungID = ListNguoiDung;
    // }
    if (action === 'add' && ListNguoiDung !== 18) {
      value.CoQuanID = coQuanID;
    }
    props.onCreate({
      ...value,
    });
  };
  const handleChangeNgaySinh = (value, strValue) => {
    setFromTime(value);
  };
  const access_token = getLocalKey('access_token');
  const dataUnzip = getInfoFromToken(access_token);
  const ListNguoiDung = dataUnzip?.NguoiDung?.NguoiDungID;
  const hideSelect = ListNguoiDung !== 18;
  const access_token1 = getLocalKey('access_token');
  const dataUnzip1 = getInfoFromToken(access_token);
  const coQuanID = dataUnzip1?.NguoiDung?.CoQuanID;
  // Default value for NguoiDungID if hideSelect is true
  const defaultNguoiDungID = ListNguoiDung;
  return (
    <Modal
      title={`${action === 'edit' ? 'Cập nhật' : 'Thêm'} Danh Sách Phát`}
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
      <Form form={form} name={'FormNgheNhan'}>
        {action === 'edit' ? <Item name={'DanhSachPhatID'} hidden /> : ''}
        {!hideSelect && (
          <Item
            label="Chọn khách hàng"
            name={'CoQuanID'}
            {...ITEM_LAYOUT}
            rules={[REQUIRED]}
          >
            <Select allowClear>
              {DanhSachNguoiDung?.map((item) => (
                <Option key={item.ID} value={item.ID}>{item.Ten}</Option>
              ))}
            </Select>
          </Item>
        )}
        <Item
          label="Tên danh sách phát"
          name={'TenDanhSachPhat'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>

        <Item
          label="Mô tả"
          name={'Mota'}
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
          >
            <Option value={true}>Đang sử dụng</Option>
            <Option value={false}>Không sử dụng</Option>
          </Select>
        </Item>
      </Form>
    </Modal>
  );
};
