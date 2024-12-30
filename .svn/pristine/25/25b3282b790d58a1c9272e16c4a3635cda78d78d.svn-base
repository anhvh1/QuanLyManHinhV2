import React, {Component, useEffect, useState} from 'react';
import {InputFormatSpecific} from '../../../../components/uielements/exportComponent';
import Constants, {
  MODAL_NORMAL,
  ITEM_LAYOUT,
  REQUIRED,
  ITEM_LAYOUT2,
  ITEM_LAYOUT_SMALL,
} from '../../../../settings/constants';
import {Row, Col, Radio} from 'antd';
import {
  Button,
  Modal,
  Input,
  Textarea,
} from '../../../../components/uielements/exportComponent';
import Checkbox from '../../../../components/uielements/checkbox';

import TreeSelect from '../../../../components/uielements/treeSelect';
import Select, {Option} from '../../../../components/uielements/select';
import {_debounce} from '../../../../helpers/utility';
import api from './config';
import layout, {StyledModalCoQuan} from './styled';
import {customizeItemValidator as Item} from '../../../../components/uielements/itemValidator';
import {
  customizeFormValidator as Form,
  useForm,
} from '../../../../components/uielements/formValidator';
import {LOAICOT} from '../../../../settings/constants';
import {LOAIDULIEUCOT} from '../../../../settings/constants';
const ModalEdit = ({visible, onCancel, dataModalEdit, onCreate, action}) => {
  const [form] = useForm();

  useEffect(() => {
    if (dataModalEdit) {
      form &&
        form.setFieldsValue({
          ...dataModalEdit,
          LoaiCot: dataModalEdit.LoaiCot,
        });
    }
  }, []);

  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    for (const key in value) {
      if (!value[key]) {
        delete value[key];
      }
    }
    if (dataModalEdit.CotChaID) {
      value.CotChaID = dataModalEdit.CotChaID;
    }
    onCreate({
      ...value,
    });
  };

  const TenCotCha = dataModalEdit?.TenCotCha;

  return (
    <>
      <Modal
        open={visible}
        title={action === 'add' ? 'Thêm tiêu chí' : 'Sửa tiêu chí'}
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
        <Form form={form} name="FormDMTieuChi" initialValues={{}}>
          {action === 'edit' ? (
            <Item hidden name={'CotID'} {...ITEM_LAYOUT_SMALL}></Item>
          ) : null}
          {TenCotCha ? (
            <Col {...layout.colFull}>
              <Item
                label="Tiêu cột cha"
                name={'TenCotCha'}
                {...ITEM_LAYOUT_SMALL}
              >
                <Input />
              </Item>
            </Col>
          ) : null}
          <Item label="Mã cột" name={'MaCot'} {...ITEM_LAYOUT_SMALL}>
            <Input />
          </Item>
          <Item
            label="Tên cột"
            name={'TenCot'}
            rules={[REQUIRED]}
            {...ITEM_LAYOUT_SMALL}
          >
            <Input />
          </Item>
          <Item
            label="Kiểu dữ liệu"
            name={'KieuDuLieuCot'}
            rules={[REQUIRED]}
            {...ITEM_LAYOUT_SMALL}
          >
            <Select>
              <Option value={LOAIDULIEUCOT.KIEUINT}>Kiểu số</Option>
              <Option value={LOAIDULIEUCOT.KIEUCHU}>Kiểu chữ</Option>
              <Option value={LOAIDULIEUCOT.KIEUSODECIMAL}>Kiểu số thập phân</Option>
              <Option value={LOAIDULIEUCOT.KIEUDUNGSAI}>Kiểu đúng/sai</Option>
              <Option value={LOAIDULIEUCOT.KIEUNGAYTHANG}>
                Kiểu ngày/tháng
              </Option>
            </Select>
          </Item>
          <Item name={'LoaiCot'} {...ITEM_LAYOUT_SMALL}>
            <Radio.Group>
              <Radio value={LOAICOT.PhanDauBaoCao} disabled={TenCotCha}>
                Phần đầu trang
              </Radio>
              <Radio value={LOAICOT.PhanTieuChi} disabled={TenCotCha}>
                Phần thân trang
              </Radio>
              <Radio value={LOAICOT.PhanCuoiBaoCao} disabled={TenCotCha}>
                Phần cuối trang
              </Radio>
            </Radio.Group>
          </Item>
        </Form>
      </Modal>
    </>
  );
};

export default React.memo(ModalEdit);
