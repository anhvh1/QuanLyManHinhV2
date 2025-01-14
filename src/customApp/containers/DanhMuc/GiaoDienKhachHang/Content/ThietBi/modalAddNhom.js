import React, { useEffect, useRef, useState } from "react";
import { Form, message } from "antd";
import { Modal } from "../../../../../../components/uielements/exportComponent";
import { _debounce } from "../../../../../../helpers/utility";
import api, { apiUrl } from "./config";
import { ContentModal } from "./styled";
import NoteIcon from "../../../../../../components/utility/NoteIcon";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import ModalAddPhanLoai from "./modalAddPhanLoai";
const { Item, useForm } = Form;

export default (props) => {
  const [form] = useForm();
  const { visible, onCancel } = props;
  const [nhomManHinhData, setNhomManHinhData] = useState([]);
  // Fetch the data when the modal is visible
  useEffect(() => {
    if (visible) {
      const danhSachNhomManHinh = async () => {
        try {
          const res = await api.danhSachNhomManHinh({
            PageNumber: 1,
            PageSize: 10,
          });
          if (res.data.Status > 0) {
            setNhomManHinhData(res.data.Data);
          } else {
            message.destroy();
            message.warning(res.data.Message);
          }
        } catch (error) {
          message.destroy();
          message.error("An error occurred while fetching data");
        } finally {
        }
      };
      danhSachNhomManHinh();
    }
  }, [visible]);
  const [visibleModalAddPhanLoai, setVisibleModalAddPhanLoai] = useState(false);
  const [actionPhanLoai, setActionPhanLoai] = useState("");
  const showModalAdd = () => {
    setActionPhanLoai("add");
    setVisibleModalAddPhanLoai(true);
  };
  const hideModalAddPhanLoai = () => {
    setVisibleModalAddPhanLoai(false);
  };
  const danhSachNhomManHinh = async () => {
    try {
      const res = await api.danhSachNhomManHinh({
        PageNumber: 1,
        PageSize: 10,
      });
      if (res.data.Status > 0) {
        setNhomManHinhData(res.data.Data);
        setVisibleModalAddPhanLoai(false);
      } else {
        message.destroy();
        message.warning(res.data.Message);
      }
    } catch (error) {
      message.destroy();
      message.error("An error occurred while fetching data");
    } finally {
    }
  };
  const xoaNhomManHinh = async (id) => {
    try {
      const res = await api.xoaNhomManHinh(id);
      if (res.data.Status > 0) {
        message.success(res.data.Message);
        danhSachNhomManHinh();
      } else {
        message.destroy();
        message.error(res.data.Message);
      }
    } catch (error) {
      message.destroy();
      message.error("An error occurred while fetching data");
    } finally {
    }
  };
  return (
    <Modal
      title="Quản lý nhóm thiết bị"
      width={600}
      visible={visible}
      onCancel={onCancel}
      footer={false}
    >
      <Form form={form} name="formDiSanTuLieu">
        <ContentModal>
          <div>
            <div>
              {nhomManHinhData.map((item) => (
                <div className="conten-group" key={item.NhomManHinhID}>
                  <div className="conten-group-left">
                    <div>
                      <NoteIcon Note={item?.Mota} />
                    </div>
                    <div className="conten-group-left-text">{item.TenNhom}</div>
                  </div>
                  <div className="conten-group-delete">
                    <DeleteOutlined
                      onClick={() => xoaNhomManHinh(item.NhomManHinhID)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="add-phan-loai" onClick={showModalAdd}>
            <PlusOutlined /> Thêm phân loại
          </div>
          <ModalAddPhanLoai
            visible={visibleModalAddPhanLoai}
            action={actionPhanLoai}
            onCancel={hideModalAddPhanLoai}
            danhSachNhomManHinh={danhSachNhomManHinh}
          />
        </ContentModal>
      </Form>
    </Modal>
  );
};
