import React, { Component, useEffect, useState } from "react";
import {
  MODAL_NORMAL,
  ITEM_LAYOUT,
  REQUIRED,
} from "../../../../settings/constants";
import {
  Form,
  Input,
  Upload,
  message,
  Radio,
  Modal as ModalAnt,
  Select,
} from "antd";
import { Option, OptGroup } from "../../../../components/uielements/select";
import Modal from "../../../../components/uielements/modal";
import Button from "../../../../components/uielements/button";
import { getValueConfigLocalByKey } from "../../../../helpers/utility";

import { useDispatch, useSelector } from "react-redux";
import api from "./config";

const { Item } = Form;

const ModalAddEdit = (props) => {
  const [loading, setLoading] = useState(false);
  const [ListFileDinhKem, setListFileDinhKem] = useState([]);
  console.log("ListFileDinhKem", ListFileDinhKem);
  const { useForm } = Form;
  const [form] = useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    const { dataModalAddEdit } = props;
    console.log(dataModalAddEdit);
    if (dataModalAddEdit) {
      const { DanhSachVersionApp, Data } = dataModalAddEdit;
      form && form.setFieldsValue({ ...Data });
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
        message.warning("Chưa chọn file đính kèm");
        return;
      }
      const newValue = {
        ...value,
        TenFileGoc: ListFileDinhKem[0].name,
      };
      const { onCreate } = props;
      onCreate(newValue, ListFileDinhKem[0]);
    });
  };

  const getBase64 = (file, callback, listFile) => {
    // listFile.forEach(file => {
    const reader = new FileReader();
    reader.addEventListener("load", () =>
      callback(reader.result, file, listFile)
    );
    reader.readAsDataURL(file);
    // })
  };

  const genDataFileDinhKem = (base64, file, listFile) => {
    const newListFileDinhKem = [...listFile];
    setListFileDinhKem(newListFileDinhKem);
  };
  const beforeUploadFile = (file, callback, listFile) => {
    const FileLimit = getValueConfigLocalByKey("data_config")?.fileLimit;
    const isLt2M = file.size / 1024 / 1024 < FileLimit;
    const ListFileExist = [];
    listFile?.forEach((file) => {
      const ExistFile = ListFileDinhKem.filter(
        (item) => item.TenFileGoc === file.name
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
  const { confirmLoading, visible, onCancel, action, dataModalAddEdit } = props;
  return (
    <Modal
      title={`${action === "edit" ? "Cập nhật thông tin" : "Thêm"} ứng dụng`}
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
        {action !== "add" ? <Item name="Id" hidden {...REQUIRED}></Item> : null}
        <Item
          label="Tên ứng dụng"
          name={"Name"}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item
          label="Version"
          name={"Version"}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item label="Ghi chú" name={"GhiChu"} {...ITEM_LAYOUT}>
          <Input />
        </Item>
        <Item
          label="Trạng thái"
          name={"Status"}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Select allowClear placeholder={"Chọn bảo tàng"}>
            <Option value={true}>Hoạt động</Option>
            <Option value={false}>Không hoạt động</Option>
          </Select>
        </Item>
        <Item label="File" {...ITEM_LAYOUT} rules={[REQUIRED]}>
          <Upload
            showUploadList={false}
            actions={false}
            beforeUpload={(file, listFile) => {
              beforeUploadFile(file, genDataFileDinhKem, listFile);
            }}
            disabled={loading}
          >
            <Button type={"primary"} loading={loading} className="btn-upload">
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
            : ""}
        </Item>
        <div></div>
      </Form>
    </Modal>
  );
};
export { ModalAddEdit };
