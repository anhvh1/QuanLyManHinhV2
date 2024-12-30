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
import Select, {Option} from '../../../../components/uielements/select';
import Modal from '../../../../components/uielements/modal';

import {getValueConfigLocalByKey} from '../../../../helpers/utility';

import {useDispatch, useSelector} from 'react-redux';
import api from './config';

const {Item} = Form;

const ModalAddEdit = (props) => {
  const [loading, setLoading] = useState(false);
  const [ListFileDinhKem, setListFileDinhKem] = useState([]);
  const {ListSideBar} = useSelector((state) => state.ListSideBar);
  const [showSelect, setShowSelect] = useState(false);
  const {useForm} = Form;
  const [form] = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    // props.checkKeKhai();
    // dispatch(actionSidebar.getList());
  }, []);
  useEffect(() => {
    const {dataModalAddEdit} = props;
    if (
      dataModalAddEdit &&
      dataModalAddEdit.Data &&
      typeof dataModalAddEdit.Data.LaBaoTang !== 'undefined'
    ) {
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
      setShowSelect(Data.LaBaoTang); // Set showSelect based on the value of LaBaoTang
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
    const reader = new FileReader();
    reader.addEventListener('load', () =>
      callback(reader.result, file, listFile),
    );
    reader.readAsDataURL(file);
  };

  const genDataFileDinhKem = (base64, file, listFile) => {
    const newListFileDinhKem = [...listFile];
    setListFileDinhKem(newListFileDinhKem);
  };

  const deteleFile = (item, index) => {
    if (item.FileDinhKemID) {
      ModalAnt.confirm({
        title: 'Thông báo',
        content: 'Bạn có muốn xóa file đính kèm này không ?',
        okText: 'Có',
        cancelText: 'Không',
        onOk: () => {
          item.TrangThai = 0;
          const newArr = [...ListFileDinhKem];
          const index = newArr.indexOf(item);
          newArr.splice(index, 1);
          setListFileDinhKem(newArr);
        },
      });
    } else {
      const newArr = [...ListFileDinhKem];
      newArr.splice(index, 1);
      setListFileDinhKem(newArr);
    }
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
    return false;
  };

  const {confirmLoading, visible, onCancel, action, danhSachBaoTang} = props;

  const onRadioChange = (e) => {
    const radioValue = e.target.value;
    setShowSelect(radioValue); // Update showSelect based on radio value
  };

  return (
    <Modal
      title={`${action === 'edit' ? 'SỬA' : 'THÊM'} BẢO VẬT QUỐC GIA`}
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
        {action !== 'add' ? (
          <Item name="IDBaoVat" hidden {...REQUIRED}></Item>
        ) : null}
        <Item
          label="Tên"
          name={'TenBaoVat'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item
          label="Số hiệu"
          name={'SoHieu'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item
          label="Niên đại"
          name={'NienDai'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item
          label="Đơn vị quản lý"
          name={'LaBaoTang'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Radio.Group onChange={onRadioChange}>
            <Radio value={true}>Bảo tàng</Radio>
            <Radio value={false}>Khác</Radio>
          </Radio.Group>
        </Item>
        {showSelect && (
          <Item label=" " name={'BaoTangID'} {...ITEM_LAYOUT}>
            <Select allowClear placeholder={'Chọn bảo tàng'}>
              {danhSachBaoTang?.map((item) => (
                <Option key={item.ID} value={item.ID}>
                  {item.TenBaoTang}
                </Option>
              ))}
            </Select>
          </Item>
        )}
        <Item
          label="Địa phương"
          name="DiaPhuong"
          {...REQUIRED}
          {...ITEM_LAYOUT}
        >
          <Input />
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
                <p key={index}>
                  <a target="_bank" href={item?.FileUrl}>
                    {item?.name || item?.TenFileGoc}
                  </a>
                </p>
              ))
            : ''}
        </Item>
        <div></div>
      </Form>
    </Modal>
  );
};

export {ModalAddEdit};
