import React, {useEffect, useState} from 'react';
import {
  DANHMUCCHUNG,
  ITEM_LAYOUT,
  REQUIRED,
} from '../../../../settings/constants';
import {Form, Input} from 'antd';
import {
  Button,
  DatePicker,
  Modal,
} from '../../../../components/uielements/exportComponent';
import {customizeItemValidator as Item} from '../../../../components/uielements/itemValidator';
import {
  customizeFormValidator as FormValidator,
  useForm,
} from '../../../../components/uielements/formValidator';
import dayjs from 'dayjs';

export default (props) => {
  const [form] = useForm();

  const {dataEdit, loading, visible, action} = props;
  useEffect(() => {
    if (dataEdit && dataEdit.ID) {
      form &&
        form.setFieldsValue({
          ...dataEdit,
          GhiChu: dataEdit?.GhiChu ? dayjs(dataEdit?.GhiChu) : null,
        });
    }
  }, []);

  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
  
    // Trích xuất năm từ giá trị DatePicker
    const selectedYear = value.GhiChu ? value.GhiChu.year().toString() : '';
  
    // Tạo object chỉ chứa năm dưới dạng text để gửi lên API
    const dataToSend = {
      ...value,
      GhiChu: selectedYear, // GhiChu sẽ chỉ chứa năm dưới dạng text
    };
  
    props.onCreate(dataToSend);
  };
  
  return (
    <Modal
      title={`${action === 'edit' ? 'Sửa' : 'Thêm'} thông tin loại mẫu phiếu`}
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
          form="FormLoaiMauPhieu"
          loading={loading}
          onClick={onOk}
        >
          Lưu
        </Button>,
      ]}
    >
      <FormValidator form={form} name={'FormLoaiMauPhieu'}>
        {action === 'edit' ? <Item name={'ID'} hidden /> : ''}
        <Item
          label="Mã Loại Mẫu Phiếu"
          name={'Ma'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item
          label="Tên Loại Mẫu Phiếu"
          name={'Ten'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item label="Năm" name={'GhiChu'} {...ITEM_LAYOUT}>
          <DatePicker
            picker={'year'}
            format={'YYYY'}
            style={{width: '100%'}}
            placeholder=""
            maxLength={4}
          />
        </Item>
      </FormValidator>
    </Modal>
  );
};
