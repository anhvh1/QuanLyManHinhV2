import React, {useEffect, useRef, useState} from 'react';
import {
  ITEM_LAYOUT2,
  ITEM_LAYOUT,
  ITEM_LAYOUT_SMALL_2,
  REQUIRED,
} from '../../../../settings/constants';
import {
  Form,
  Space,
  Select,
  DatePicker,
  TimePicker,
  Row,
  Col,
  message,
} from 'antd';
import {
  Button,
  Modal,
  InputFormatSpecific,
  Input,
  Radio,
} from '../../../../components/uielements/exportComponent';
import {
  BorderOutlined,
  CheckSquareOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import DatePickerFormat from '../../../../components/uielements/datePickerFormat';
import {checkInputNumber} from '../../../../helpers/utility';
import TextArea from 'antd/lib/input/TextArea';
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
  const {
    dataEdit,
    loading,
    visible,
    action,
    DanhSachLoaiSuKien,
    DanhSachMediaOrPhat,
  } = props;
  const [DanhSachMenu, setDanhSachMenu] = useState([]);
  const [fromTime, setFromTime] = useState('');
  const [ChiaNgay, setChiaNgay] = useState(false);
  const access_token1 = getLocalKey('access_token');
  const dataUnzip1 = getInfoFromToken(access_token1);
  const ListNguoiDung = dataUnzip1?.NguoiDung?.NguoiDungID;
  const hideSelect = ListNguoiDung !== 18;
  const [DanhSachManHinhOrNhomManHinh, setDanhSachManHinhOrNhomManHinh] =
    useState([]);
  const [License, setLicense] = useState('');
  useEffect(() => {
    if (dataEdit && dataEdit.LicenseID) {
      form &&
        form.setFieldsValue({
          ...dataEdit,
          StartDate:
            dataEdit && dataEdit.NgayDangKy
              ? dayjs(dataEdit.NgayDangKy, 'DD/MM/YYYY')
              : '',
          EndDate:
            dataEdit && dataEdit.NgayHetHan
              ? dayjs(dataEdit.NgayHetHan, 'DD/MM/YYYY')
              : '',
          DisplayName: dataEdit && dataEdit.TenManHinh,
        });
    }
  }, []);

  useEffect(() => {
    handleGetManHinhOrNhomManHinh();
  }, []);

  const handleGetManHinhOrNhomManHinh = async () => {
    try {
      const res = await api.danhSachManHinhOrNhomManHinh({
        coQuanID: form.getFieldValue('CoQuanID'),
      });
      if (res.data.Status > 0) {
        setDanhSachManHinhOrNhomManHinh(res.data.Data);
      } else {
        message.destroy();
        message.warning(res.data.Message);
      }
    } catch (error) {
      message.destroy();
      message.error('An error occurred while fetching data');
    } finally {
    }
  };
  const CreateLicense = async () => {
    try {
      const res = await api.CreateLicense({
        DisplayID: form.getFieldValue('DisplayID'),
        StartDate: form.getFieldValue('StartDate'),
        EndDate: form.getFieldValue('EndDate'),
      });
      if (res.data.Status > 0) {
        setLicense(res.data.Data);
        form.setFieldsValue({LicenseInfo: res.data.Data}); // Set the LicenseInfo field with the returned data
      } else {
        message.destroy();
        message.warning(res.data.Message);
      }
    } catch (error) {
      message.destroy();
      message.error('An error occurred while fetching data');
    } finally {
    }
  };
  const access_token = getLocalKey('access_token');
  const dataUnzip = getInfoFromToken(access_token);
  const ListChucNang = dataUnzip?.NguoiDung?.CoQuanID;
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await api.DanhSachNguoiDung(/* Tham số */);
      if (res.data.Status > 0) {
        setDanhSachMenu(res.data.Data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách cấp xếp hạng:', error);
    }
  };
  const onOk = (e) => {
  e.preventDefault();
  form.validateFields().then((value) => {
    const { StartDate, EndDate } = value;
    if (StartDate && EndDate && StartDate.isAfter(EndDate)) {
      message.error('Ngày bắt đầu không được lớn hơn ngày kết thúc');
      return;
    }
    const { TrangThai, ...rest } = value;
    const newValue = {
      ...rest,
      Status: TrangThai,
    };
    newValue.StartDate = StartDate ? dayjs(StartDate).format('YYYY-MM-DD') : null;
    newValue.EndDate = EndDate ? dayjs(EndDate).format('YYYY-MM-DD') : null;
    const { onCreate } = props;
    onCreate(newValue);
  });
};


  const [danhSachMauPhieuSuggest, setDanhSachMauPhieuSuggest] = useState([]);

  const [selectedLoaiSuKien, setSelectedLoaiSuKien] = useState(null);
  useEffect(() => {
    handleGetListSuggest(selectedLoaiSuKien);
  }, [selectedLoaiSuKien]);

  const handleGetListSuggest = async (LoaiSuKien) => {
    if (!LoaiSuKien) return;
    try {
      const res = await api.danhSachMediaorPhat({
        title: LoaiSuKien,
        coQuanID: form.getFieldValue('CoQuanID'),
      });
      if (res.data.Status > 0) {
        setDanhSachMauPhieuSuggest(res.data.Data);
      } else {
        message.destroy();
        message.warning(res.data.Message);
      }
    } catch (error) {
      message.destroy();
      message.error('An error occurred while fetching data');
    } finally {
    }
  };
  return (
    <Modal
      title={`${action === 'edit' ? 'Sửa' : 'Thêm mới'} License`}
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
        {action !== 'add' ? (
          <Item name="LicenseID" hidden {...REQUIRED}></Item>
        ) : null}
        {action !== 'add' ? (
          <Item name="DisplayID" hidden {...REQUIRED}></Item>
        ) : null}
        {/* <Item name="CoQuanID" hidden {...REQUIRED}></Item> */}
        {!hideSelect && (
          <Item
            label="Chọn khách hàng"
            name={action !== 'add' ? 'TenCoQuan' : 'CoQuanID'}
            {...ITEM_LAYOUT}
            rules={[REQUIRED]}
          >
            <Select
              allowClear
              disabled={action !== 'add'}
              onChange={(value) => {
                form.setFieldsValue({MediaORDanhSachPhat: undefined});
                form.setFieldsValue({DisplayID: undefined});
                handleGetListSuggest(selectedLoaiSuKien);
                handleGetManHinhOrNhomManHinh();
              }}
              // style={{width: '200px'}}
            >
              {DanhSachMenu?.map((item) => (
                <Option value={item.ID}>{item.Ten}</Option>
              ))}
            </Select>
          </Item>
        )}
        <Item
          label="Màn hình/Nhóm màn hình "
          name={action !== 'add' ? 'DisplayName' : 'DisplayID'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Select disabled={action !== 'add'} allowClear>
            {DanhSachManHinhOrNhomManHinh?.map((item) => (
              <Option value={item.ID}>{item.Ten}</Option>
            ))}
          </Select>
        </Item>
        <Item
          label="Ngày bắt đầu"
          name={'StartDate'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <DatePickerFormat format={'DD/MM/YYYY'}></DatePickerFormat>
        </Item>
        <Item
          label="Ngày kết thúc"
          name={'EndDate'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <DatePickerFormat format={'DD/MM/YYYY'}></DatePickerFormat>
        </Item>
        <div style={{textAlign: 'right', marginBottom: '20px'}}>
          <Button onClick={CreateLicense}>Tạo lisence</Button>
        </div>
        <Item label="LicenseInfo" name={'LicenseInfo'} {...ITEM_LAYOUT}>
          <TextArea rows={4} />
        </Item>
        <Item
          label="Trạng thái"
          name={'TrangThai'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Select>
            <Option value={true}>Hoạt động</Option>
            <Option value={false}>Không hoạt</Option>
          </Select>
        </Item>
      </Form>
    </Modal>
  );
};
