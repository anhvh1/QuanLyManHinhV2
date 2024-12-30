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
const {Item, useForm} = Form;

export default (props) => {
  const [form] = useForm();
  // const [isFormSuccess, setIsFormSuccess] = useState(true);
  const {dataEdit, loading, visible, action} = props;
  const [DanhSachMenu, setDanhSachMenu] = useState([]);
  const [fromTime, setFromTime] = useState('');

  useEffect(() => {
    if (dataEdit && dataEdit.ID) {
      const newNgayCongNhan = dayjs(dataEdit.NgayCongNhan).format(
        'DD/MM/YYYY',
      );
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
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await api.danhSachDMDiSanTuLieu(/* Tham số */);
      if (res.data.Status > 0) {
        setDanhSachMenu(res.data.Data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách cấp xếp hạng:', error);
    }
  };
  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    props.onCreate({
      ...value,
    });
  };
  const handleChangeNgayCongNhan = (value, strValue) => {
    setFromTime(value);
  };
  return (
    <Modal
      title={`${action === 'edit' ? 'Sửa' : 'Thêm mới'} di sản tư liệu`}
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
          loading={loading}
          onClick={onOk}
          // disabled={isFormSuccess}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form form={form} name={'formDiSanTuLieu'}>
        {action !== 'add' ? <Item name="ID" hidden {...REQUIRED}></Item> : null}
        <Item
          label="Tên di sản"
          name={'TenDiSan'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item
          label="Loại di sản "
          name={'LoaiDiSanID'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Select
            allowClear
            // style={{width: '200px'}}
            placeholder={'Chọn loại di sản'}
          >
            {DanhSachMenu?.map((item) => (
              <Option value={item.DiSanTuLieuID}>{item.TenDiSanTuLieu}</Option>
            ))}
          </Select>
        </Item>
        <Item
          label="Nơi lưu trữ"
          name={'NoiLuuTru'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item
          label="Năm công nhận"
          name={'NgayCongNhan'}
          {...REQUIRED}
          {...ITEM_LAYOUT}
        >
          <DatePickerFormat
            onChange={handleChangeNgayCongNhan}
            format={'DD/MM/YYYY'}
            placeholder={''}
            style={{width: '100%'}}
          />
        </Item>
      </Form>
    </Modal>
  );
};
