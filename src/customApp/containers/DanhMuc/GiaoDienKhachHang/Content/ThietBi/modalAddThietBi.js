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
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <Checkbox></Checkbox>
                  <div style={{width:"95%"}} className="conten-group" key={item.NhomManHinhID}>
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
