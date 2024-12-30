import React, {Component, useEffect, useState} from 'react';
import {ITEM_LAYOUT_SMALL_2, REQUIRED} from '../../../../settings/constants';
import {message} from 'antd';
import Modal from '../../../../components/uielements/modal';
import Button from '../../../../components/uielements/button';
import apiCoQuan from '../../DanhMuc/DMCoQuan/config';
import {
  Select,
  OptionSelect,
} from '../../../../components/uielements/exportComponent';
import api from './config';
import {TreeSelect} from '../../../../components/uielements/exportComponent';
import {formatTreeDataCoQuan} from '../../../../helpers/utility';
import {customizeItemValidator as Item} from '../../../../components/uielements/itemValidator';
import {
  customizeFormValidator as Form,
  useForm,
} from '../../../../components/uielements/formValidator';

const ModalAddUser = (props) => {
  const [form] = useForm();
  const {confirmLoading, visible, onCancel, dataModalAddUser, NhomNguoiDungID} =
    props;
  const [DanhSachCoQuan, setDanhSachCoQuan] = useState([]);
  const [DanhSachNguoiDung, setDanhSachNguoiDung] = useState([]);

  useEffect(() => {
    form && form.setFieldsValue({NhomNguoiDungID});
    apiCoQuan
      .AllCoQuan()
      .then((res) => {
        if (res.data.Status > 0) {
          const result = formatTreeDataCoQuan(res.data.Data);
          setDanhSachCoQuan(result.ListData);
        } else {
          message.destroy();
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        message.destroy();
        message.warning(err.toString());
      });
  }, []);

  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    const {onCreate} = props;
    onCreate(value);
  };

  const changeCoQuan = (value) => {
    if (value) {
      if (NhomNguoiDungID) {
        api
          .danhSachNguoiDung({NhomNguoiDungID, CoQuanID: value})
          .then((response) => {
            if (response.data.Status > 0) {
              setDanhSachNguoiDung(response.data.Data);
            } else {
              message.destroy();
              message.error(response.data.Message);
            }
          })
          .catch((error) => {
            message.destroy();
            message.error(error.toString());
          });
      }
    } else {
      setDanhSachNguoiDung([]);
    }
    form && form.setFieldsValue({NguoiDungID: []});
  };

  return (
    <Modal
      title="Thêm người dùng vào nhóm"
      width={600}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          htmlType="submit"
          type="primary"
          form="FormAddUser"
          loading={confirmLoading}
          onClick={onOk}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form form={form} name="FormAddUser">
        <Item name={'NhomNguoiDungID'} hidden />
        <Item
          label="Chọn cơ quan"
          name={'CoQuanID'}
          rules={[{...REQUIRED}]}
          {...ITEM_LAYOUT_SMALL_2}
        >
          <TreeSelect
            showSearch
            treeData={DanhSachCoQuan}
            onChange={(value) => changeCoQuan(value)}
            style={{width: 400}}
            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
            placeholder="Chọn cơ quan"
            allowClear
            treeDefaultExpandAll
            // onChange={value => this.onSearch(value, "CoQuanID")}
            notFoundContent={'Không có dữ liệu'}
            treeNodeFilterProp={'title'}
          />
          {/* <Select
            showSearch
            noGetPopupContainer
            placeholder="Chọn cơ quan"
            // mode={'multiple'}
            onChange={(value) => changeCoQuan(value)}
          >
            {DanhSachCoQuan.map((value) => (
              <OptionSelect key={value.CoQuanID} value={value.CoQuanID}>
                {`${value.TenCoQuan}`}
              </OptionSelect>
            ))}
          </Select> */}
        </Item>
        <Item
          label="Chọn người dùng"
          name={'NguoiDungID'}
          rules={[{...REQUIRED}]}
          {...ITEM_LAYOUT_SMALL_2}
        >
          <Select
            showSearch
            noGetPopupContainer
            placeholder="Chọn người dùng"
            mode={'multiple'}
          >
            {DanhSachNguoiDung.map((value) => (
              <OptionSelect key={value.NguoiDungID} value={value.NguoiDungID}>
                {`${value.TenNguoiDung} (${value.TenCanBo})`}
              </OptionSelect>
            ))}
          </Select>
        </Item>
      </Form>
    </Modal>
  );
};

export {ModalAddUser};
