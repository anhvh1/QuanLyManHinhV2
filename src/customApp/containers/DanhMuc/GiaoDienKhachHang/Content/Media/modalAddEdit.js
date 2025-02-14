import React, {Component, useEffect, useState} from 'react';
import {InputFormatSpecific} from '../../../../../../components/uielements/exportComponent';
import Constants, {
  MODAL_NORMAL,
  ITEM_LAYOUT,
  REQUIRED,
  ITEM_LAYOUT2,
  ITEM_LAYOUT_SMALL,
} from '../../../../../../settings/constants';
import {Row, Col,Select,} from 'antd';
import {
  Button,
  Modal,
  Input,
  Textarea,
} from '../../../../../../components/uielements/exportComponent';
import Checkbox from '../../../../../../components/uielements/checkbox';

import TreeSelect from '../../../../../../components/uielements/treeSelect';
import  {Option} from '../../../../../../components/uielements/select';
import {_debounce,getInfoFromToken,getLocalKey} from '../../../../../../helpers/utility';
import api from './config';
import layout, {StyledModalCoQuan} from './styled';
import {customizeItemValidator as Item} from '../../../../../../components/uielements/itemValidator';
import {
  customizeFormValidator as Form,
  useForm,
} from '../../../../../../components/uielements/formValidator';

const ModalEdit = ({
  visible,
  onCancel,
  dataModalEdit,
  action,
  onCreate,
}) => {
  const [form] = useForm();
  useEffect(() => {
    if (dataModalEdit) {
      form.setFieldsValue({
        ...dataModalEdit,
        CoQuanID: ListChucNang, // Set giá trị CoQuanID từ ListChucNang vào form
      });
    }
  }, [dataModalEdit]);
  const access_token = getLocalKey('access_token');
  const dataUnzip = getInfoFromToken(access_token);
  const ListChucNang = dataUnzip?.NguoiDung?.CoQuanID;
  const onOk = async (e) => {
  e.preventDefault();
  const value = await form.validateFields();
  
  // Xóa các trường có giá trị rỗng để tránh gửi dữ liệu không cần thiết
  for (const key in value) {
    if (!value[key]) {
      delete value[key];
    }
  }

  // Xác định hành động là 'sửa' hoặc 'thêm' và thực hiện điều chỉnh dữ liệu phù hợp
  if (action === 'edit') {
    if (dataModalEdit.ThuMucID) {
      value.ThuMucID = dataModalEdit.ThuMucID;
    }
  } else if (action === 'add') {
    if (dataModalEdit.ThuMucChaID) {
      value.ThuMucChaID = dataModalEdit.ThuMucChaID;
    }
  }
  onCreate(value);
};

  return (
    <>
      <Modal
        open={visible}
        title={action === 'add' ? 'Thêm thư mục' : 'Sửa thư mục'}
        onCancel={onCancel}
        width="700px"
        footer={[
          <Button key="back" onClick={onCancel}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={onOk}
            form="FormDMTieuChi"
          >
            Lưu
          </Button>,
        ]}
      >
        <Form form={form} name="FormDMTieuChi">
        {action === 'add' ?<Item name={'CoQuanID'} hidden></Item>: null}
          <Item
            label="Tên thư mục"
            name={'TenThuMuc'}
            rules={[REQUIRED]}
            {...ITEM_LAYOUT_SMALL}
          >
            <Input />
          </Item>
        </Form>
      </Modal>
    </>
  );
};

export default React.memo(ModalEdit);
