import React, { useEffect, useRef, useState } from "react";
import {
  ITEM_LAYOUT2,
  ITEM_LAYOUT,
  ITEM_LAYOUT_SMALL_2,
  REQUIRED,
} from "../../../../../../settings/constants";
import { Form, Space, DatePicker, Select, message, Tooltip } from "antd";
import {
  Button,
  Modal,
  InputFormatSpecific,
  Input,
  Radio,
} from "../../../../../../components/uielements/exportComponent";
import { BorderOutlined, CheckSquareOutlined } from "@ant-design/icons";
import DatePickerFormat from "../../../../../../components/uielements/datePickerFormat";
import { checkInputNumber } from "../../../../../../helpers/utility";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import api from "./config";
import dayjs from "dayjs";
import NoteIcon from "../../../../../../components/utility/NoteIcon";
import {
  _debounce,
  getInfoFromToken,
  getLocalKey,
} from "../../../../../../helpers/utility";
import { ContentModalPhanLoai } from "./styled";
const { Item, useForm } = Form;

export default (props) => {
  const [form] = useForm();
  const [Note, setNote] = useState("1");
  const { loading, visible, action, danhSachNhomManHinh } = props;
  const colors = [
    { id: "1", color: "#5A34E3" },
    { id: "2", color: "#11AD2B" },
    { id: "3", color: "#E6391A" },
    { id: "4", color: "#C9D138" },
  ];
  const handleColorClick = (id) => {
    setNote(id);
  };
  const access_token = getLocalKey("access_token");
  const dataUnzip = getInfoFromToken(access_token);
  const ListChucNang = dataUnzip?.NguoiDung?.CoQuanID;
  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    try {
      const res = await api.themNhomManHinh({
        ...value,
        Mota: Note,
        ListManHinhs: [
          {
            ManHinhID: 0,
            HardwareKey: "string",
            TenManHinh: "string",
            DiaChiMac: "string",
            TrangThai: true,
            CoQuanID: 0,
          },
        ],
        CoQuanID: ListChucNang,
      });
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
      title={`Thêm mới thẻ phân loại`}
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
          form="formDiSanTuLieu"
          loading={loading}
          onClick={onOk}
        >
          Đồng ý
        </Button>,
      ]}
    >
      <Form form={form} name={"formDiSanTuLieu"}>
        <ContentModalPhanLoai>
          {action !== "add" ? (
            <Item name="ID" hidden {...REQUIRED}></Item>
          ) : null}
          <Item
            label="Tên thẻ phân loại"
            name="TenNhom"
            rules={[REQUIRED]}
            labelCol={{ span: 24 }}
          >
            <Input
              placeholder="Nhập tên thẻ phân loại"
              addonAfter={
                <Tooltip
                  color={"white"}
                  title={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderRadius: "5px",
                        backgroundColor: "#fff",
                      }}
                    >
                      {colors.map(({ id, color }) => (
                        <div
                          key={id}
                          onClick={() => handleColorClick(id)}
                          style={{
                            width: "40px",
                            height: "40px",
                            backgroundColor: color,
                            cursor: "pointer",
                            border: "2px solid #000",
                            borderRadius: "4px",
                            transition: "transform 0.2s",
                            margin: "10px",
                            border: color,
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.transform = "scale(1.1)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                          }
                        />
                      ))}
                    </div>
                  }
                  // visible={visibleColors}
                  // onClick={() => setVisibleColors(!visibleColors)}
                >
                  <div
                    style={{
                      width: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <NoteIcon Note={Note} />
                  </div>
                </Tooltip>
              }
            />
          </Item>
        </ContentModalPhanLoai>
      </Form>
    </Modal>
  );
};
