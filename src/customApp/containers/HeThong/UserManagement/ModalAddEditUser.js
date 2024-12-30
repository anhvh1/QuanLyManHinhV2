import React, {useEffect, useState} from 'react';
import {
  ITEM_LAYOUT2,
  ITEM_LAYOUT_SMALL,
  REQUIRED,
  ITEM_LAYOUT,
} from '../../../../settings/constants';
import {Form as FormAnt} from 'antd';
import {
  Button,
  Modal,
  Input,
  Select,
  Option,
  TreeSelect,
} from '../../../../components/uielements/exportComponent';
import DatePicker from '../../../../components/uielements/datePickerFormat';
import {Checkbox} from 'antd';
import dayjs from 'dayjs';
import {useSelector} from 'react-redux';
import apiPhanQuyen from '../QLPhanQuyen/config';
import {customizeItemValidator as Item} from '../../../../components/uielements/itemValidator';
import {
  customizeFormValidator as Form,
  useForm,
} from '../../../../components/uielements/formValidator';
import {useStatusButton} from '../../../CustomHook/useStatusButton';
export default (props) => {
  const [form] = useForm();
  const {
    dataEdit,
    loading,
    visible,
    action,
    DanhSachCoQuan = [],
    DanhSachChucVu = [],
  } = props;
  const [fromTime, setFromTime] = useState('');
  const [changeCanBo, setChangeCanBo] = useState(false);
  const [DanhSachNhomNguoiDung, setDanhSachNhomNguoiDung] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  // const [statusButton, onChangeStatusButton] = useStatusButton();
  useEffect(() => {
    if (dataEdit && dataEdit.CanBoID) {
      
      const newNgaySinh = dayjs(dataEdit.NgaySinh).format('DD/MM/YYYY');
      form &&
        form.setFieldsValue({
          ...dataEdit,
          NgaySinh:
            dataEdit && dataEdit.NgaySinh
              ? dayjs(newNgaySinh, 'DD/MM/YYYY')
              : '',
          XemTaiLieuMat:
            dataEdit?.XemTaiLieuMat && dataEdit?.XemTaiLieuMat === 1 ? true : 0,
          QuanTriDonVi:
            dataEdit?.QuanTriDonVi && dataEdit?.QuanTriDonVi === 1 ? true : 0,
          QuyenKy: dataEdit?.QuyenKy && dataEdit?.QuyenKy === 1 ? true : 0,
        });
    }
    apiPhanQuyen.danhSachNhomAll().then((res) => {
      if (res.data.Status > 0) {
        setDanhSachNhomNguoiDung(res.data.Data);
      }
    });
  }, []);

  const handleChangeNgaySinh = (value, strValue) => {
    setFromTime(value);
  };
  const validatePhoneNumber = (value) => {
    const regex = /^[0-9]{0,11}$/; 
    if (!regex.test(value)) {
      setPhoneNumberError('Số điện thoại không hợp lệ');
      return false;
    }
    setPhoneNumberError('');
    return true;
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setIsPhoneNumberValid(validatePhoneNumber(value));
  };

  const onOk = async (e) => {
    e.preventDefault();
    const isPhoneNumberValid = validatePhoneNumber(phoneNumber);
    if (!isPhoneNumberValid) {
      return;
    }
    await form.validateFields().then((value) => {
      value.LaCanBo = changeCanBo;
      value.XemTaiLieuMat = value?.XemTaiLieuMat ? 1 : 0;
      value.QuanTriDonVi = value?.QuanTriDonVi ? 1 : 0;
      value.QuyenKy = value?.QuyenKy ? 1 : 0;
      const newValue = {...value};
      for (const key in newValue) {
        if (!newValue[key]) {
          delete newValue[key];
        }
      }
      props.onCreate(newValue);
    });
  };
  return (
    <Modal
      title={`${action === 'edit' ? 'Sửa' : 'Thêm'} thông tin người dùng`}
      width={700}
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
          form="FormUserManagement"
          loading={loading}
          onClick={onOk}
          disabled={!isPhoneNumberValid} // Disable the button if phone number is invalid
        >
          Lưu
        </Button>,
      ]}
    >
      <Form
        form={form}
        name={'FormUserManagement'}
        initialValues={{TrangThaiID: 0}}
      >
        {action === 'edit' ? <Item name={'CanBoID'} hidden /> : ''}
        {action === 'edit' ? <Item name={'NguoiDungID'} hidden /> : ''}
        <Item
          label="Tên tài khoản"
          name="TenNguoiDung"
          rules={[{...REQUIRED}]}
          {...ITEM_LAYOUT_SMALL}
        >
          <Input
            onChange={(e) =>
              form && form.setFieldsValue({SSOID: e.target.value})
            }
          />
        </Item>

        <Item
          label="Họ và tên"
          name={'TenCanBo'}
          rules={[{...REQUIRED}]}
          {...ITEM_LAYOUT_SMALL}
        >
          <Input />
        </Item>
        <Item
          label="Ngày sinh"
          name={'NgaySinh'}
          // rules={[{...REQUIRED}]}
          {...ITEM_LAYOUT_SMALL}
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
          // rules={[{...REQUIRED}]}
          {...ITEM_LAYOUT_SMALL}
        >
          <Select placeholder={'Chọn giới tính'} style={{width: '100%'}}>
            <Option key={1} value={1}>
              Nam
            </Option>
            <Option key={0} value={0}>
              Nữ
            </Option>
            <Option key={2} value={2}>
              Khác
            </Option>
          </Select>
        </Item>
        <Item
          label="Địa chỉ"
          name={'DiaChi'}
          // rules={[{...REQUIRED}]}
          {...ITEM_LAYOUT_SMALL}
        >
          <Input />
        </Item>
        <Item
          label="Tên cơ quan"
          name={'CoQuanID'}
          rules={[{...REQUIRED}]}
          {...ITEM_LAYOUT_SMALL}
        >
          <TreeSelect
            showSearch
            treeData={DanhSachCoQuan}
            style={{width: '100%'}}
            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
            placeholder="Chọn cơ quan"
            allowClear
            treeDefaultExpandAll
            // onChange={value => this.onSearch(value, "CoQuanID")}
            notFoundContent={'Không có dữ liệu'}
            treeNodeFilterProp={'title'}
            // defaultValue={filterData.CoQuanID}
          />
        </Item>
        <Item
          label="Nhóm người dùng"
          name={'DanhSachNhomNguoiDungID'}
          // rules={[{...REQUIRED}]}
          {...ITEM_LAYOUT_SMALL}
        >
          <Select style={{width: '100%'}} mode="multiple">
            {DanhSachNhomNguoiDung?.map((item) => (
              <Option key={item.NhomNguoiDungID} value={item.NhomNguoiDungID}>
                {item.TenNhom}
              </Option>
            ))}
          </Select>
        </Item>
        <Item
          label="Email"
          name={'Email'}
          rules={[
            // {...REQUIRED},
            {
              type: 'email',
              message: 'Vui lòng nhập đúng định dạng ',
            },
          ]}
          {...ITEM_LAYOUT_SMALL}
        >
          <Input type={'email'} />
        </Item>
        <Item
          label="Điện thoại"
          name={'DienThoai'}
          {...ITEM_LAYOUT_SMALL}
          validateStatus={phoneNumberError ? 'error' : ''}
          help={phoneNumberError}
        >
          <Input onChange={handlePhoneNumberChange} value={phoneNumber} />
        </Item>

        <Item
          label="Trạng thái"
          name={'TrangThaiID'}
          rules={[{...REQUIRED}]}
          {...ITEM_LAYOUT_SMALL}
        >
          <Select style={{width: '100%'}} placeholder={'Chọn trạng thái'}>
            <Option key={1} value={1}>
              Nghỉ hưu
            </Option>
            <Option key={0} value={0}>
              Đang làm
            </Option>
            <Option key={2} value={2}>
              Chuyển công tác
            </Option>
            <Option key={3} value={3}>
              Nghỉ việc
            </Option>
          </Select>
        </Item>
      </Form>
    </Modal>
  );
};
