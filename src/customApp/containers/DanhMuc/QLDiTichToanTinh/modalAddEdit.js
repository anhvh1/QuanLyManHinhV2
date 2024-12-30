import React, {Component, useEffect, useState} from 'react';
import {
  MODAL_NORMAL,
  ITEM_LAYOUT,
  REQUIRED,
} from '../../../../settings/constants';
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  Radio,
  Modal as ModalAnt,
} from 'antd';
import Select, {
  Option,
  OptGroup,
} from '../../../../components/uielements/select';
import Modal from '../../../../components/uielements/modal';
// import optionsSidebar from '../../../sidebar';
import {getValueConfigLocalByKey} from '../../../../helpers/utility';
import actionSidebar from '../../../redux/HeThong/Sidebar/actions';
import DatePicker from '../../../../components/uielements/datePickerFormat';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import api from './config';

const {Item} = Form;

const ModalAddEdit = (props) => {
  const [loading, setLoading] = useState(false);
  const [ListFileDinhKem, setListFileDinhKem] = useState([]);
  const [fromTime, setFromTime] = useState('');
  const [showSelect, setShowSelect] = useState(false);
  // const [capXepHang, setCapXepHang] = useState(0);
  const {useForm} = Form;
  const [form] = useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    // Kiểm tra nếu DaDuocXepHang đã được chọn
    if (form.getFieldValue('DaDuocXepHang')) {
      setShowSelect(true); // Hiển thị các trường
    }
  }, [form.getFieldValue('DaDuocXepHang')]);
  useEffect(() => {
  const { dataModalAddEdit } = props;
  if (dataModalAddEdit) {
    const newNgayQuyetDinh = moment(dataModalAddEdit.NgayQuyetDinh).format('DD/MM/YYYY');
    const { DanhSachDiTichToanTinh, Data } = dataModalAddEdit;
    form &&
      form.setFieldsValue({
        ...Data,
        NgayQuyetDinh:
          dataModalAddEdit && Data && Data.NgayQuyetDinh
            ? moment(newNgayQuyetDinh, 'DD/MM/YYYY')
            : '',
      });
    if (dataModalAddEdit.Data?.TenFileGoc) {
      const file = {
        TenFileGoc: dataModalAddEdit.Data?.TenFileGoc,
        FileUrl: dataModalAddEdit.Data?.UrlFile,
      };
      setListFileDinhKem([file]);
    }
  }
}, []);


  const onOk = (e) => {
    e.preventDefault();
    form.validateFields().then((value) => {
      if (ListFileDinhKem.length < 1) {
        message.destroy();
        message.warning('Chưa chọn file đính kèm');
        return;
      }
      const newValue = {
        ...value,
        TenFileGoc: ListFileDinhKem[0].name,
        // CapXepHang: capXepHang 
      };
      const {onCreate} = props;
      onCreate(newValue, ListFileDinhKem[0]);
    });
  };

  const getBase64 = (file, callback, listFile) => {
    // listFile.forEach(file => {
    const reader = new FileReader();
    reader.addEventListener('load', () =>
      callback(reader.result, file, listFile),
    );
    reader.readAsDataURL(file);
    // })
  };

  const genDataFileDinhKem = (base64, file, listFile) => {
    const newListFileDinhKem = [...listFile];
    setListFileDinhKem(newListFileDinhKem);
  };
  const beforeUploadFile = (file, callback, listFile) => {
    const FileLimit = getValueConfigLocalByKey('data_config')?.fileLimit;
    const isLt2M = file.size / 1024 / 1024 < FileLimit;
    const ListFileExist = [];
    listFile?.forEach((file) => {
      const ExistFile = ListFileDinhKem.filter(
        (item) => item.TenFileGoc === file.name,
      );
      if (ExistFile.length) {
        ListFileExist.push(file);
      }
    });
    if (!isLt2M) {
      message.error(`File đính kèm phải nhỏ hơn ${FileLimit}MB`);
    } else {
      getBase64(file, callback, listFile);
    }
    // }
    return false;
  };

  const {confirmLoading, visible, onCancel, action, danhSachLoaiDiTich,DanhSachCapXepHang} = props;
  const handleChangeNgayQuyetDinh = (value, strValue) => {
    setFromTime(value);
  };
  // const onRadioChange = (e) => {
  //   const radioValue = e.target.value;
  //   if (!radioValue) {
  //     // Nếu chọn "Chưa được xếp hạng", đặt CapXepHang về 0
  //     setCapXepHang(0);
  //   }
  // };
  const onRadioChange = (e) => {
    const radioValue = e.target.value;
    setShowSelect(radioValue === true); // Update showSelect based on radio value
  };
  return (
    <Modal
      title={action === 'add' ? 'Thêm mới di tích' : 'Cập nhật di tích'}
      width={MODAL_NORMAL}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Hủy
        </Button>,
        <Button loading={confirmLoading} onClick={onOk} type="primary">
          Lưu
        </Button>,
      ]}
    >
      <Form form={form}>
        {action !== 'add' ? <Item name="ID" hidden {...REQUIRED}></Item> : null}
        <Item
          label="Tên"
          name={'TenDiTich'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item label=" " name={'DaDuocXepHang'} {...ITEM_LAYOUT} >
          <Radio.Group name="radiogroup" onChange={onRadioChange}>
            <Radio value={true}>Đã được xếp hạng</Radio>
            <Radio value={false}>Chưa được xếp hạng</Radio>
          </Radio.Group>
        </Item>
        {showSelect && (
        <Item
          label="Cấp xếp hạng"
          name={'CapXepHang'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Select
            allowClear
            // style={{width: '200px'}}
            placeholder={'Chọn cấp'}
          >
            {DanhSachCapXepHang?.map((item) => (
              <Option value={item.ID}>{item.Ten}</Option>
            ))}
          </Select>
        </Item>
         )}
         {showSelect && (
        <Item
          label="Thông tin quyết định"
          name={'ThongTinQuyetDinh'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        )}
        {showSelect && (
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
   )}
        <Item
          label="Loại di tích"
          name="LoaiDiTich"
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Select
            allowClear
            // style={{width: '200px'}}
            placeholder={'Chọn loại di tích'}
          >
            {danhSachLoaiDiTich?.map((item) => (
              <Option value={item.ID}>{item.Ten}</Option>
            ))}
          </Select>
        </Item>
        <Item
          label="Địa điểm"
          name={'DiaDiem'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item label="Thông tin chi tiết" {...ITEM_LAYOUT}   name={'UrlFile'}>
          <Upload
            showUploadList={false}
            actions={false}
            beforeUpload={(file, listFile) => {
              beforeUploadFile(file, genDataFileDinhKem, listFile);
            }}
            disabled={loading}
          >
            <Button type={'primary'} loading={loading} className="btn-upload">
              Chọn file từ liệu từ máy tính
            </Button>
          </Upload>
          {ListFileDinhKem && ListFileDinhKem?.length
            ? ListFileDinhKem.map((item, index) => (
                <>
                  <p>
                    <a target="_bank" href={item?.FileUrl}>
                      {item?.name || item?.TenFileGoc}
                    </a>
                  </p>
                </>
              ))
            : ''}
        </Item>
        <div></div>
      </Form>
    </Modal>
  );
};
export {ModalAddEdit};
