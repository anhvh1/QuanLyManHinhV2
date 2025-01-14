import React, {useEffect, useRef, useState} from 'react';
import {
  ITEM_LAYOUT2,
  ITEM_LAYOUT,
  ITEM_LAYOUT_SMALL_2,
  REQUIRED,
} from '../../../../settings/constants';
import {Form, Space, DatePicker, Select} from 'antd';
import {
  Button,
  Modal,
  InputFormatSpecific,
  Input,
  Radio,
} from '../../../../components/uielements/exportComponent';
import {BorderOutlined, CheckSquareOutlined} from '@ant-design/icons';
import DatePickerFormat from '../../../../components/uielements/datePickerFormat';
import {checkInputNumber} from '../../../../helpers/utility';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import api from './config';
import dayjs from 'dayjs';
import {
  _debounce,
  getInfoFromToken,
  getLocalKey,
} from '../../../../helpers/utility';
const {Item, useForm} = Form;

export default (props) => {
  const [form] = useForm();
  // const [isFormSuccess, setIsFormSuccess] = useState(true);
  const {dataEdit, loading, visible, action, DanhSachManHinh} = props;
  const [DanhSachMenu, setDanhSachMenu] = useState([]);
  const [fromTime, setFromTime] = useState('');
  const access_token = getLocalKey('access_token');
  const dataUnzip = getInfoFromToken(access_token);
  const ListChucNang = dataUnzip?.NguoiDung?.CoQuanID;
  useEffect(() => {
    if (dataEdit && dataEdit.NhomManHinhID) {
      const newNgayCongNhan = dayjs(dataEdit.NgayCongNhan).format('DD/MM/YYYY');
      form &&
        form.setFieldsValue({
          ...dataEdit,
          NgayCongNhan:
            dataEdit && dataEdit.NgayCongNhan
              ? dayjs(newNgayCongNhan, 'DD/MM/YYYY')
              : '',
              
        });
    }
  }, []);
  useEffect(() => {
    if (dataEdit && dataEdit.ListManHinh) {
      const listManHinhs = dataEdit.ListManHinh;
      form.setFieldsValue({
        ...dataEdit,
        ListManHinhs: listManHinhs.map(item => item.ManHinhID), // Preselect values if needed
      });
    }
  }, [dataEdit]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await api.danhSachManHinh(/* Tham số */);
      if (res.data.Status > 0) {
        setDanhSachMenu(res.data.Data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách cấp xếp hạng:', error);
    }
  };
  const onOk = async (e) => {
    e.preventDefault();
    try {
      const values = await form.validateFields();
      
      // Assuming ListManHinhs is an array of selected ManHinhIDs
      const selectedManHinhIDs = values.ListManHinhs.map(item => ({
        ManHinhID: item,
        HardwareKey: null,
        TenManHinh: null,
        DiaChiMac: null,
        TrangThai: null,
        
      }));
      if (action === 'add'||action === 'edit') {
        values.CoQuanID = ListChucNang;
      }
      const payload = {
        ...values,
        ListManHinhs: selectedManHinhIDs
      };
  
      props.onCreate(payload);
    } catch (errorInfo) {
    }
  };
  
  return (
    <Modal
      title={`${action === 'edit' ? 'Sửa' : 'Thêm mới'} nhóm màn hình`}
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
          form="formDiSanTuLieu"
          // loading={loading}
          onClick={onOk}
          // disabled={isFormSuccess}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form form={form} name={'formDiSanTuLieu'}>
        {action !== 'add' ? <Item name="NhomManHinhID" hidden {...REQUIRED}></Item> : null}
        <Item
          label="Tên nhóm"
          name={'TenNhom'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item label="Mô tả" name={'Mota'} {...ITEM_LAYOUT}>
          <Input />
        </Item>
        <Item
          label="Thành viên"
          name={'ListManHinhs'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Select
            mode="multiple" // Đặt mode là "multiple" để cho phép chọn nhiều mục
            allowClear
            // style={{width: '200px'}}
            placeholder={'Thành viên'}
          >
            {DanhSachManHinh?.map((item) => (
              <Select.Option key={item.ManHinhID} value={item.ManHinhID}>
                {item.TenManHinh}
              </Select.Option>
            ))}
          </Select>
        </Item>
      </Form>
    </Modal>
  );
};
