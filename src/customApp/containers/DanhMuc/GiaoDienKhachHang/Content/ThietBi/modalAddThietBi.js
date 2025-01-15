import React, { useEffect, useRef, useState } from "react";
import { Form, message, Checkbox } from "antd";
import { Modal } from "../../../../../../components/uielements/exportComponent";
import { _debounce } from "../../../../../../helpers/utility";
import api, { apiUrl } from "./config";
import { ContentModal } from "./styled";
import NoteIcon from "../../../../../../components/utility/NoteIcon";
const { Item, useForm } = Form;

export default (props) => {
  const [form] = useForm();
  const { visible, onCancel, manHinhID, setNhomManHinhID, NhomManHinhID } =
    props;
  const [nhomManHinhData, setNhomManHinhData] = useState([]);
  // Fetch the data when the modal is visible
  console.log("NhomManHinhID", NhomManHinhID);
  console.log("nhomManHinhData", nhomManHinhData);

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
  useEffect(() => {
    if (NhomManHinhID) {
      const showModalEdit = () => {
        api
          .chiTietNhomManHinh({ NhomManHinhID })
          .then((res) => {
            if (res.data.Status > 0) {
              setNhomManHinhID(res.data.Data.NhomManHinhID);
            } else {
              message.destroy();
              message.error(res.data.Message);
            }
          })
          .catch((error) => {
            message.destroy();
            message.error(error.toString());
          });
      };
      showModalEdit();
      submitModalAddEdit();
    }
  }, [NhomManHinhID]);
  const submitModalAddEdit = () => {
    api
      .UpdateNhomManHinh({
        NhomManHinhID: NhomManHinhID ,
        ListManHinh: [manHinhID],
      })
      .then((res) => {
        if (res.data.Status > 0) {
          message.success(res.data.Message);
        } else {
          message.destroy();
          message.error(res.data.Message);
        }
      })
      .catch((error) => {
        setConfirmLoading(false);
        message.destroy();
        message.error(error.toString());
      });
  };
  const handleCheckboxChange = (id) => {
    setNhomManHinhID(id); // Cập nhật trạng thái
    
  };
  return (
    <Modal
      title="Nhóm thiết bị"
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
                <div
                  key={item.NhomManHinhID}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Checkbox
                    checked={NhomManHinhID === item.NhomManHinhID}
                    onChange={() => handleCheckboxChange(item.NhomManHinhID)}
                  />
                  <div style={{ width: "95%" }} className="conten-group">
                    <div className="conten-group-left">
                      <div>
                        <NoteIcon Note={item?.Mota} />
                      </div>
                      <div className="conten-group-left-text">
                        {item.TenNhom}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ContentModal>
      </Form>
    </Modal>
  );
};
