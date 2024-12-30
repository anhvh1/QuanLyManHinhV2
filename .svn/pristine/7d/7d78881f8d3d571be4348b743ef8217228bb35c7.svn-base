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
  DatePicker,
  Space,
  Modal as ModalAnt,
} from 'antd';
import Select, {
  Option,
  OptGroup,
} from '../../../../components/uielements/select';
import Modal from '../../../../components/uielements/modal';
import {getValueConfigLocalByKey} from '../../../../helpers/utility';

import {useDispatch, useSelector} from 'react-redux';
import api from './config';

const {Item} = Form;

const ModalAddEdit = (props) => {
  const [listOption, setListOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ListFileDinhKem, setListFileDinhKem] = useState([]);
  const {ListSideBar} = useSelector((state) => state.ListSideBar);
  const [showSelect, setShowSelect] = useState(false);
  const [DanhSachMenu, setDanhSachMenu] = useState([]);
  const {useForm} = Form;
  const [form] = useForm();
  const dispatch = useDispatch();
  const onChange = (date, dateString) => {
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await api.danhSachDanhMucDiSanVanHoaPhiVatThe(/* Tham số */);
      if (res.data.Status > 0) {
        setDanhSachMenu(res.data.Data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách cấp xếp hạng:', error);
    }
  };

  useEffect(() => {
    const {dataModalAddEdit} = props;
    if (dataModalAddEdit) {
      const {DanhSachBaoVatQuocGia, Data} = dataModalAddEdit;
      form && form.setFieldsValue({...Data});
      let listOption = [];
      if (dataModalAddEdit.Data?.TenFileGoc) {
        const file = {
          TenFileGoc: dataModalAddEdit.Data?.TenFileGoc,
          FileUrl: dataModalAddEdit.Data?.UrlFile,
        };
        setListFileDinhKem([file]);
      }
      if (dataModalAddEdit?.Data?.CapID) {
        GetListMenuByCap(dataModalAddEdit?.Data?.CapID);
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

  const {confirmLoading, visible, onCancel, action} = props;
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
        <Item label="Tên" name={'TenDiSan'} {...ITEM_LAYOUT} rules={[REQUIRED]}>
          <Input />
        </Item>
        <Item
          label="Danh Mục"
          name="DanhMucID"
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Select
            allowClear
            // style={{width: '200px'}}
            placeholder={'Chọn danh mục'}
          >
            {DanhSachMenu?.map((item) => (
              <Option value={item.ID}>{item.Ten}</Option>
            ))}
          </Select>
        </Item>
        <Item label="Thông tin chi tiết" {...ITEM_LAYOUT}  rules={[REQUIRED]}>
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
