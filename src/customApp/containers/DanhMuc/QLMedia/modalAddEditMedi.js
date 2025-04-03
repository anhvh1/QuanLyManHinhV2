import React, { useEffect, useState } from "react";
import {
  Form,
  Row,
  Col,
  TreeSelect,
  Spin,
  message,
} from "antd";
import { Modal as ModalAnt } from "antd";
import {
  Button,
  Modal,
  Input,
} from "../../../../components/uielements/exportComponent";
import {
  PlusOutlined,
  UploadOutlined,
  CheckCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { REQUIRED } from "../../../../settings/constants";
import "./style.css";

const { Item, useForm } = Form;

export default (props) => {
  const [form] = useForm();
  const {
    dataEdit,
    visible,
    actionmedia,
    DanhSachThuMuc,
    Statuss,
    setStatuss,
  } = props;
  useEffect(() => {
    if (dataEdit && dataEdit.ID) {
      form.setFieldsValue({
        ...dataEdit,
      });
    }
  }, [dataEdit]);
  useEffect(
    () => {
      if (Statuss === 1) {
        handleCancelUpload();
        setStatuss(null);
        setLoading(false);
      }
    },
    [Statuss],
    setStatuss
  );
  useEffect(
    () => {
      if (Statuss === 1) {
        fileList.forEach((fileItem, index) => {
          handleCancelFile(index);
        });
        setStatuss(null);
        setLoading(false);
      }
    },
    [Statuss],
    setStatuss
  );
  const [loading, setLoading] = useState(false);
  const onOk = async (e) => {
    setLoading(true);
    e.preventDefault();
    form.validateFields().then(async (values) => {
      if (fileList.length < 1) {
        message.warning("Chưa chọn file đính kèm");
        setLoading(false);
        return;
      }
      try {
        const files = [];
        const filesInfo = [];
        for (let index = 0; index < fileList.length; index++) {
          const fileItem = fileList[index];
          const maxSize = 300 * 1024 * 1024; // 300MB in bytes
          
          if (fileItem.file.size > maxSize) {
            message.warning(`File ${fileItem.file.name} vượt quá kích thước 300MB`);
            continue;
          }
  
          const isImage = fileItem.file.type.startsWith("image/");
          const durationInSeconds = isImage ? 60 : await getVideoDuration(fileItem.file);
          const formattedDuration = isImage ? "00:01:00" : formatTime(durationInSeconds);
          files.push(fileItem.file);
          const fileInfo = {
            TenFile: fileItem.TenFile || fileItem.TenFilegoc,
            Loai: isImage ? 1 : 2,
            ThoiLuongTrinhChieu: formattedDuration,
            KichThuoc: formatFileSize(fileItem.file.size),
            TrangThai: true,
            Tag: fileItem.ListTag,
            ThuMucID: values.ThuMucID
          };
          filesInfo.push(fileInfo);
        }
        const formData = new FormData();
        files.forEach(file => {
          formData.append('files', file);
        });
        filesInfo.forEach(info => {
          formData.append('filesInfo', JSON.stringify(info));
        });
  
        const { onCreate } = props;
        await onCreate(filesInfo, files);
        console.log("Uploaded successfully",filesInfo, files);
        message.success("Tải lên thành công");
        setLoading(false);
      } catch (error) {
        console.error("Upload failed:", error);
        message.error("Tải lên thất bại");
        setLoading(false);
      }
    });
  };
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  const getVideoDuration = (file) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        resolve(video.duration);
      };
      video.onerror = (error) => {
        reject(error);
      };
      video.src = URL.createObjectURL(file);
    });
  };

  const [fileList, setFileList] = useState([]);
  const handleUpload = (event) => {
    const maxSize = 300 * 1024 * 1024; // 300MB in bytes
    const files = Array.from(event.target.files)
      .map((file) => {
        if (file.size > maxSize) {
          message.warning(`File ${file.name} vượt quá kích thước 300MB`);
          return null;
        }
        return {
          file,
          id: `${file.name}-${file.lastModified}`,
          TenFilegoc: file.name,
          ListTag: "",
          duration: null,
        };
      })
      .filter((file) => file !== null); // Filter out null values from the array

    setFileList([...fileList, ...files]);

    files.forEach((file) => {
      if (file) {
        const video = document.createElement("video");
        video.preload = "metadata";
        video.onloadedmetadata = () => {
          file.duration = video.duration;
          // Cập nhật state hoặc làm các xử lý khác tại đây
        };
        video.src = URL.createObjectURL(file.file);
      }
    });
  };

  const formatFileSize = (size) => {
    if (size < 1024) return `${size} B`;
    else if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    else return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };
  const handleCancelUpload = () => {
    setFileList([]);
    form.resetFields();
    document.getElementById("fileInput").value = null;
  };
  const handleCancelFile = (index) => {
    const updatedFileList = [...fileList];
    updatedFileList.splice(index, 1);
    setFileList(updatedFileList);
    document.getElementById("fileInput").value = null;
  };
  const handleInputChange = (index, field, value) => {
    const updatedFileList = [...fileList];
    updatedFileList[index][field] = value;
    setFileList(updatedFileList);
  };
  const generateTreeSelectData = (data) => {
    return data.map((item) => ({
      title: item.TenThuMuc,
      value: item.ThuMucID.toString(), // Ensure value is string
      key: item.ThuMucID.toString(), // Ensure key is string
      children:
        item.Children.length > 0
          ? generateTreeSelectData(item.Children)
          : undefined,
    }));
  };
  const treeSelectData = generateTreeSelectData(DanhSachThuMuc);
  const handleCancelModal = () => {
    ModalAnt.confirm({
      title: "Hoàn tất",
      content: "Bạn có chắc chắn muốn hoàn tất thêm mới media này không?",
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        props.onCancel();
      },
    });
  };
  const [selectedFolder, setSelectedFolder] = useState(null);
  return (
    <Modal
      title={`${actionmedia === "edit" ? "Sửa" : "Thêm mới"} Media`}
      width={"80%"}
      visible={visible}
      onCancel={handleCancelModal}
      maskClosable={false}
      footer={[
        <Button
          key="back"
          onClick={handleCancelModal}
          style={{
            color: "white",
            background: "rgb(22,119,255)",
            border: "1px solid rgb(22,119,255)",
            borderRadius: "5px",
          }}
        >
          Hoàn tất
        </Button>,
      ]}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            color: "red",
            fontSize: "20px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Chú ý: Mỗi tệp đính kèm có dung lượng tối đa 300MB
        </div>
        <div>
          <input
            type="file"
            multiple
            style={{ display: "none" }}
            id="fileInput"
            onChange={handleUpload}
          />
          <div style={{ display: "flex" }}>
            <Button
              style={{
                color: "white",
                background: "rgb(40,167,69)",
                border: "1px solid rgb(40,167,69)",
                borderRadius: "5px",
                marginRight: "15px",
              }}
              onClick={() => document.getElementById("fileInput").click()}
            >
              <PlusOutlined /> Thêm tệp
            </Button>
            <Button
              style={{
                color: "white",
                background: "rgb(51,122,183)",
                border: "1px solid rgb(51,122,183)",
                borderRadius: "5px",
                marginRight: "15px",
              }}
              onClick={onOk}
              disabled={!selectedFolder}
            >
              <UploadOutlined />
              Tải lên tất cả
            </Button>
            <Button
              style={{
                color: "white",
                background: "rgb(255,193,7)",
                border: "1px solid rgb(255,193,7)",
                borderRadius: "5px",
                marginRight: "15px",
              }}
              onClick={handleCancelUpload}
            >
              <StopOutlined style={{ color: "black" }} />
              Hủy tải lên
            </Button>
            <Button
              style={{
                color: "white",
                background: "rgb(22,119,255)",
                border: "1px solid rgb(22,119,255)",
                borderRadius: "5px",
              }}
              onClick={handleCancelModal}
            >
              <CheckCircleOutlined />
              Hoàn tất
            </Button>
          </div>
        </div>
      </div>

      <Form form={form} name={"formDiSanTuLieu"}>
        {actionmedia !== "add" && <Item name="ID" hidden {...REQUIRED}></Item>}
        <Item label="Chọn thư mục" name={"ThuMucID"} rules={[REQUIRED]}>
          <TreeSelect
            treeData={treeSelectData}
            placeholder="Chọn thư mục"
            style={{ width: "30%" }}
            treeDefaultExpandAll
            onChange={(value) => {
              form.setFieldsValue({ ThuMucID: value });
              setSelectedFolder(value);
            }}
          />
        </Item>
        <Row
          gutter={[20, 20]}
          style={{
            border: "1px solid rgb(230,237,242)",
          }}
        >
          {fileList.map((fileItem, index) => (
            <React.Fragment key={fileItem.id}>
              <Col
                span={3}
                className={index % 2 === 0 ? "odd-row" : "even-row"}
              >
                <Item>
                  <div>
                    {fileItem.file.type.startsWith("image/") ? (
                      <img
                        style={{
                          width: "100px",
                          height: "120px",
                          objectFit: "cover",
                          marginTop: "5px",
                        }}
                        src={URL.createObjectURL(fileItem.file)}
                        alt={fileItem.file.name}
                      />
                    ) : (
                      <video
                        style={{
                          width: "100px",
                          height: "120px",
                          objectFit: "cover",
                          marginTop: "5px",
                        }}
                        src={URL.createObjectURL(fileItem.file)}
                        controls
                      />
                    )}
                  </div>
                </Item>
              </Col>
              <Col
                span={7}
                className={index % 2 === 0 ? "odd-row" : "even-row"}
              >
                <Item label="Tên">
                  <Input
                    value={fileItem.TenFile}
                    onChange={(e) =>
                      handleInputChange(index, "TenFile", e.target.value)
                    }
                  />
                </Item>
              </Col>
              <Col
                span={7}
                className={index % 2 === 0 ? "odd-row" : "even-row"}
              >
                <Item label="ListTag">
                  <Input
                    value={fileItem.ListTag}
                    onChange={(e) =>
                      handleInputChange(index, "ListTag", e.target.value)
                    }
                  />
                </Item>
              </Col>
              <div className={index % 2 === 0 ? "odd-row" : "even-row"}>
                <div key={index}>
                  <div>
                    <span>{formatFileSize(fileItem.file.size)} </span>
                    <div>{loading && <Spin />}</div>
                    <span
                      style={{
                        display: "inline-flex",
                        float: "right",
                        marginRight: "50px",
                      }}
                    >
                      
                      <StopOutlined
                        style={{
                          color: "black",
                          background: "rgb(255,193,7)",
                          border: "1px solid rgb(255,193,7)",
                          borderRadius: "5px",
                          paddingLeft: "5px",
                          height: "30px",
                          width: "30px",
                          marginLeft: "5px",
                        }}
                        onClick={() => handleCancelFile(index)}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </Row>
      </Form>
    </Modal>
  );
};
