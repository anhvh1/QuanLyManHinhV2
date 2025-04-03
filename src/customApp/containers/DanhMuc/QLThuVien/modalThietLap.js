import React, { useEffect, useState } from "react";
import { Tree, Tooltip } from "antd";
import {
  Button,
  Modal,
  InputSearch,
  Input,
  Select,
} from "../../../../components/uielements/exportComponent";
import { message } from "antd";
import {
  customizeFormValidator as Form,
  useForm,
} from "../../../../components/uielements/formValidator";
import BoxTable from "../../../../components/utility/boxTable";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import Box from "../../../../components/utility/box";
import { EmptyTable } from "../../../../components/utility/boxTable";
import api from "./config";
import {
  DeleteOutlined,
  FolderOutlined,
  FolderOpenOutlined,
  HomeOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoVideo } from "@fortawesome/free-solid-svg-icons";
import BoxFilter from "../../../../components/utility/boxFilter";
import { changeUrlFilter } from "../../../../helpers/utility";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
const { TreeNode } = Tree;
export default (props) => {
  const [form] = useForm();
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const {
    dataThietLap,
    loading,
    visible,
    actionthietlap,
    danhSachDMThuVien,
    filterData,
    TenDanhSachPhat,
  } = props;
  const filterTreeNode = (dataRoot) => {
    return dataRoot;
  };
  const DSFilter = filterTreeNode(danhSachDMThuVien);
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (DSFilter.length && !initialized) {
      setTimeout(() => {
        // Assuming the first item in DSFilter is the root node
        const rootNode = DSFilter[0];
        if (rootNode) {
          const firstNodeKey = rootNode.ThuMucID.toString();
          onExpandNode([firstNodeKey], {
            node: { props: { eventKey: firstNodeKey, isLeaf: false } },
            nativeEvent: {
              target: { outerHTML: "", parentElement: { className: "" } },
            },
          });
        }
        setInitialized(true);
      }, 0);
    }
  }, [DSFilter, initialized]);
  useEffect(() => {
    changeUrlFilter(filterData);
  }, [filterData]);
  useEffect(() => {
    if (dataThietLap && dataThietLap.DanhSachPhatID) {
      form &&
        form.setFieldsValue({
          ...dataThietLap,
        });
    }
  }, []);
  const onExpandNode = (selectedKeys, info) => {
    let className = info.nativeEvent.target.outerHTML.toString();
    let parentClassName =
      info.nativeEvent.target.parentElement.className.toString();
    let checkMenu = className.includes("ant-dropdown-menu");
    let checkNearMenu = parentClassName.includes("ant-dropdown-menu");
    if (!checkMenu && !checkNearMenu) {
      let key = info.node.props.eventKey.toString();
      if (key) {
        if (!info.node.props.isLeaf) {
          let newExpandedKeys = [...expandedKeys];
          let index = newExpandedKeys.indexOf(key);
          if (index > -1) {
            newExpandedKeys.splice(index, 1);
          } else {
            newExpandedKeys = newExpandedKeys.concat([key]);
          }
          setExpandedKeys(newExpandedKeys);
          setKeyState((prevKey) => ({ ...prevKey, key: selectedKeys }));
        }
      }
    }
    return renderContent();
  };
  const [keyState, setKeyState] = useState({
    key: 0,
    treeKey: 0,
  });
  const { treeKey, key } = keyState;
  const renderTreeNodes = (data) =>
    data?.map((item) => {
      let isExpanded = expandedKeys.includes(item.ThuMucID.toString());
      let switcherIcon;
      if (item.ThuMucID === 1) {
        switcherIcon = <HomeOutlined />;
      } else {
        switcherIcon = isExpanded ? <FolderOpenOutlined /> : <FolderOutlined />;
      }
      let title = (
        <div>
          <span>{item.TenThuMuc}</span>
        </div>
      );

      if (item.Children) {
        return (
          <TreeNode
            switcherIcon={switcherIcon}
            title={title}
            Children={item.Children}
            dataRef={item}
            key={item.ThuMucID}
            defaultExpandAll
          >
            {renderTreeNodes(item.Children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          title={title}
          switcherIcon={switcherIcon}
          Children={item.Children}
          dataRef={item}
          key={item.ThuMucID}
          defaultExpandAll
        />
      );
    });
  const [selectAllFolders, setSelectAllFolders] = useState(false);
  const clearAllFoldersSelection = () => {
    setSelectAllFolders(false);
  };
  const onSelectTreeNode = (selectedKeys, info) => {
    const selectedNode = info.node.props.dataRef;
    const ThuMucID = selectedNode.ThuMucID || "";
    setFilterParams((prev) => ({
      ...prev,
      ThuMucID: ThuMucID,
    }));
    clearAllFoldersSelection();
  };
  const renderContent = () => {
    if (danhSachDMThuVien?.length) {
      return (
        <Tree
          filterTreeNode={(treeNode) => treeNode.props.dataRef.Highlight === 1}
          onSelect={onSelectTreeNode}
          onExpand={onExpandNode}
          style={{
            userSelect: "none",
            minHeight: "120px",
            maxHeight: "150px",
            overflowY: "auto",
          }}
          expandedKeys={filterData.Keyword ? props.expandedKeys : expandedKeys}
        >
          {renderTreeNodes(DSFilter)}
        </Tree>
      );
    } else {
      return <EmptyTable loading={props.TableLoading} />;
    }
  };
  const [DanhSachMauPhieuSuggest, setDanhSachMauPhieuSuggest] = useState([]);
  const [TotalRow, setTotalRow] = useState([]);
  const [filterParams, setFilterParams] = useState({
    Loai: "",
    Keyword: "",
    ThuMucID: "",
    PageSize: TotalRow,
    Status: "true",
  });
  useEffect(() => {
    setFilterParams((prevParams) => ({
      ...prevParams,
      PageSize: TotalRow.toString(),
    }));
  }, [TotalRow]);
  useEffect(() => {
    handleGetListSuggest();
  }, [filterParams]);
  const handleGetListSuggest = () => {
    api.DanhSachMedia(filterParams).then((res) => {
      if (res.data.Status > 0) {
        setDanhSachMauPhieuSuggest(res.data.Data);
        setTotalRow(res.data.TotalRow);
      } else {
        message.destroy();
        message.warning(res.data.Message);
      }
    });
  };
  const handleSelectChange = (value) => {
    setFilterParams((prev) => ({ ...prev, Loai: value }));
  };
  const handleSearch = (value) => {
    setFilterParams((prev) => ({ ...prev, Keyword: value }));
  };
  const convertDurationToSeconds = (duration) => {
    const [hours, minutes, seconds] = duration.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };
  const convertSecondsToDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(2, "0")}`;
  };
  const columns = [
    {
      title: "STT",
      align: "center",
      width: "5%",
      render: (text, record, index) => {
        const sttValue = index + 1;
        return sttValue;
      },
    },
    {
      title: "Tên file",
      dataIndex: "TenFile",
      align: "center",
      width: "30%",
    },
    {
      title: "Media",
      dataIndex: "UrlFile",
      align: "center",
      width: "6%",
      render: (url) => {
        if (url) {
          if (url.startsWith("http") || url.startsWith("https")) {
            if (
              url.toLowerCase().endsWith(".mp4") ||
              url.toLowerCase().endsWith(".webm")
            ) {
              return (
                <video
                  src={url}
                  style={{
                    width: "100%",
                    minHeight: "150px",
                    textAlign: "center",
                  }}
                  controls
                />
              );
            } else {
              return (
                <img
                  src={url}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                  alt="Media"
                />
              );
            }
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    },
    {
      title: "Thời gian bắt đầu",
      align: "center",
      width: "15%",
      render: (_, __, index) => {
        if (index === 0) return "00:00:00";
        let totalSeconds = 0;
        for (let i = 0; i < index; i++) {
          totalSeconds += convertDurationToSeconds(
            dataSource[i].ThoiLuongTrinhChieu
          );
        }
        return convertSecondsToDuration(totalSeconds);
      },
    },
    {
      title: "Thời Lượng Trình Chiếu",
      dataIndex: "ThoiLuongTrinhChieu",
      key: "ThoiLuongTrinhChieu",
      width: "15%",
      align: "center",
      render: (_, record) => (
        <TimeInput
          value={record.ThoiLuongTrinhChieu}
          onChange={(value) => handleDurationChange(value, record)}
        />
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "",
      width: "10%",
      align: "center",
      render: (text, record) => renderThaoTac(record),
    },
  ];
  const TimeInput = ({ value, onChange }) => {
    const [inputValue, setInputValue] = useState(value || "00:00:00");
    const handleChange = (e) => {
      const newValue = e.target.value;
      if (!newValue || newValue.trim() === "") {
        setInputValue("00:00:00");
        onChange("00:00:00");
        return;
      }
      setInputValue(newValue);
      if (/^\d{2}:\d{2}:\d{2}$/.test(newValue)) {
        const [hours, minutes, seconds] = newValue.split(":").map(Number);
        const adjustedHours = hours > 23 ? 0 : hours;
        const adjustedMinutes = minutes > 59 ? 0 : minutes;
        const adjustedSeconds = seconds > 59 ? 0 : seconds;
        const correctedValue = `${String(adjustedHours).padStart(
          2,
          "0"
        )}:${String(adjustedMinutes).padStart(2, "0")}:${String(
          adjustedSeconds
        ).padStart(2, "0")}`;
        setInputValue(correctedValue);
        onChange(correctedValue);
      }
    };
    const handleBlur = () => {
      if (!inputValue || !/^\d{2}:\d{2}:\d{2}$/.test(inputValue)) {
        setInputValue("00:00:00");
        onChange("00:00:00");
      }
    };
    return (
      <Input
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{ width: 100 }}
        placeholder="hh:mm:ss"
      />
    );
  };
  const handleDurationChange = (value, record) => {
    const newData = dataSource.map((item) => {
      if (item.ThuTu === record.ThuTu) {
        return { ...item, ThoiLuongTrinhChieu: value };
      }
      return item;
    });
    setDataSource(newData);
  };
  const parseDuration = (durationString) => {
    const [hours, minutes, seconds] = durationString.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  const calculateTotalDuration = (data) => {
    const totalSeconds = data.reduce((total, item) => {
      return total + parseDuration(item.ThoiLuongTrinhChieu);
    }, 0);
    return formatDuration(totalSeconds);
  };
  const renderThaoTac = (record) => {
    return (
      <div className={"action-btn"}>
        <Tooltip title={"Xóa"}>
          <DeleteOutlined onClick={() => handleDelete(record)} />
        </Tooltip>
      </div>
    );
  };
  const handleDelete = (record) => {
    const newData = dataSource.filter((item) => item.ThuTu !== record.ThuTu);
    setDataSource(newData);
  };
  useEffect(() => {
    if (props.dataThietLap && Array.isArray(props.dataThietLap)) {
      const newData = props.dataThietLap.map((item, index) => ({
        ...item,
        STT: index + 1,
      }));
      setDataSource(newData);
    }
  }, [props.dataThietLap]);
  const onOk = async () => {
    try {
      const danhSachPhatID = props.dataModalDanhSachMediaID.DanhSachPhatID;
      const totalDuration = calculateTotalDuration(dataSource);
      const params = {
        DanhSachPhatID: danhSachPhatID,
        DanhSachMediaID: dataSource.map((item, index) => {
          const sttValue = index + 1;
          return {
            ID: item.ID,
            TenFile: item.TenFile,
            ThoiLuongTrinhChieu: item.ThoiLuongTrinhChieu,
            TrangThai: item.TrangThai,
            Tag: null,
            ThuMucID: item.ThuMucID,
            ThuTu: sttValue,
          };
        }),
        TongThoiGianPhat: totalDuration,
        TongSoMedia: dataSource.length,
      };
      const response = await api.themThietLap(params);
      if (response.data.Status > 0) {
        props.onCancel();
        message.success(res.data.Message);
      } else {
        message.error(res.data.Message);
      }
    } catch (error) {
      console.error("Error adding thiet lap:", error);
    }
    const { onCreate } = props;
    onCreate();
    props.getList(filterData);
  };
  const Row = (props) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: props["data-row-key"],
    });
    const style = {
      ...props.style,
      transform: CSS.Translate.toString(transform),
      transition,
      cursor: "move",
      ...(isDragging
        ? {
            position: "relative",
            zIndex: 9999,
          }
        : {}),
    };
    return (
      <tr
        {...props}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      />
    );
  };
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
        distance: 1,
      },
    })
  );
  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setDataSource((prev) => {
        const activeIndex = prev.findIndex((i) => i.ThuTu === active.id);
        const overIndex = prev.findIndex((i) => i.ThuTu === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };
  const handleDragStart = (event, item) => {
    event.dataTransfer.setData("text/plain", JSON.stringify(item));
  };
  const handleDrop = (event, index) => {
    event.preventDefault();
    const item = JSON.parse(event.dataTransfer.getData("text/plain"));
    const newItem = {
      ID: item.ID,
      TenFile: item.TenFile,
      UrlFile: item.UrlFile,
      ThoiLuongTrinhChieu: item.ThoiLuongTrinhChieu,
      ThuTu: index + 1,
    };
    setDataSource((prev) => {
      const updatedDataSource = [...prev];
      updatedDataSource.splice(index, 0, newItem);
      return updatedDataSource.map((item, idx) => ({
        ...item,
        ThuTu: idx + 1,
      }));
    });
  };
  const handleDragOver = (event, index) => {
    event.preventDefault();
  };

  const handleMediaClick = (item) => {
    const newItem = {
      ID: item.ID,
      TenFile: item.TenFile,
      UrlFile: item.UrlFile,
      ThoiLuongTrinhChieu: item.ThoiLuongTrinhChieu,
      ThuTu: dataSource.length + 1,
    };
    setDataSource((prev) => [...prev, newItem]);
  };
  const renderSelectOptions = (folder, level = 0) => {
    const indent = "\u00A0".repeat(level * 4);
    const icon = folder.ThuMucID === 1 ? <HomeOutlined /> : <FolderOutlined />;
    const options = [
      <Option key={folder.ThuMucID} value={folder.ThuMucID}>
        {indent}
        {folder.TenThuMuc}
      </Option>,
    ];
    if (folder.Children && folder.Children.length > 0) {
      folder.Children.forEach((child) => {
        options.push(...renderSelectOptions(child, level + 1));
      });
    }

    return options;
  };
  return (
    <Modal
      title={`${
        actionthietlap === "edit" ? "CẬP NHẬT" : "THIẾT LẬP"
      } DANH SÁCH PHÁT`}
      width={"100%"}
      height={"auto"}
      visible={visible}
      onCancel={props.onCancel}
      maskClosable={false}
      footer={[
        <Button key="back" onClick={props.onCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={onOk}>
          Lưu
        </Button>,
      ]}
    >
      <LayoutWrapper>
        <Box
          style={{
            float: "left",
            width: "28%",
            // minHeight: "740px",
            // maxHeight: "740px",
            borderRadius: "20px",
          }}
        >
          <h3
            style={{
              margin: 0,
              padding: "15px",
              borderBottom: "1px solid #eee",
              fontSize: "1.5rem",
              marginBottom: "10px",
              color: "#333",
            }}
          >
            Media của bạn
          </h3>
          <div
            key={treeKey}
            style={{
              userSelect: "none",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: "gray",
              whiteSpace: "nowrap",
              marginTop: "20px",
            }}
            className="mg-top"
          >
            <Select
              placeholder="Chọn thư mục"
              style={{
                width: "100%",
                marginBottom: "10px",
                color: "#333",
              }}
              onChange={(value) => {
                setFilterParams((prev) => ({
                  ...prev,
                  ThuMucID: value === "all" ? null : value,
                }));
                setSelectAllFolders(value === "all");
              }}
              value={
                selectAllFolders ? "all" : filterParams.ThuMucID || undefined
              }
              allowClear
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            >
              <Option value="all" style={{ fontWeight: "bold" }}>
                Tất cả thư mục
              </Option>
              {DSFilter &&
                DSFilter.map((folder) => renderSelectOptions(folder))}
            </Select>
          </div>
          <div>
            <BoxFilter>
              <InputSearch
                placeholder="Tìm kiếm theo tên"
                onSearch={handleSearch}
                style={{
                  width: "calc(100% - 30px)",
                  marginBottom: "10px",
                  color: "#333",
                }}
                allowClear
              />
              <div style={{ display: "flex"}}>
                <Button
                  type={filterParams.Loai === "" ? "primary" : "default"}
                  onClick={() => handleSelectChange("")}
                  style={{ marginRight: "10px" }}
                >
                  Tất cả
                </Button>
                <Button
                  type={filterParams.Loai === "1" ? "primary" : "default"}
                  onClick={() => handleSelectChange("1")}
                  style={{ marginRight: "10px" }}
                >
                  Ảnh
                </Button>
                <Button
                  type={filterParams.Loai === "2" ? "primary" : "default"}
                  onClick={() => handleSelectChange("2")}
                  style={{ marginRight: "10px" }}
                >
                  Video
                </Button>
              </div>
            </BoxFilter>
            <div
              style={{
                overflowY: "auto",
                marginTop: "20px",
                maxHeight: "480px",
              }}
            >
              {DanhSachMauPhieuSuggest?.map((item, index) => (
                <div
                  key={item.id || index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                    cursor: "pointer",
                    backgroundColor:
                      index % 2 === 0
                        ? "rgba(255, 255, 255, 0.2)"
                        : "transparent",
                    transition: "all 0.3s ease-in-out",
                    borderRadius: "8px",
                  }}
                  draggable="true"
                  onDragStart={(event) => handleDragStart(event, item)}
                  onClick={() => handleMediaClick(item)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0px 4px 12px rgba(0, 0, 0, 0.2)";
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.backgroundColor =
                      index % 2 === 0
                        ? "rgba(255, 255, 255, 0.2)"
                        : "transparent";
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      textAlign: "center",
                      marginRight: "10px",
                      color: "#333",
                    }}
                  >
                    {index + 1}
                  </div>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      marginRight: "15px",
                      flexShrink: 0,
                    }}
                  >
                    {item.UrlFile?.toLowerCase().endsWith(".mp4") ? (
                      <div
                        style={{
                          position: "relative",
                          width: "60px",
                          height: "60px",
                        }}
                      >
                        <video
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          src={item.UrlFile}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "rgba(0,0,0,0.5)",
                            borderRadius: "50%",
                            width: "24px",
                            height: "24px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span style={{ color: "#333", fontSize: "12px" }}>
                            ▶
                          </span>
                        </div>
                      </div>
                    ) : (
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        src={item.UrlFile}
                        alt={item.TenFile}
                      />
                    )}
                  </div>
                  <div style={{ flex: 1, overflow: "hidden" }}>
                    <p
                      style={{
                        color: "#333",
                        margin: 0,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.TenFile}
                    </p>
                    <p
                      style={{
                        color: "#333",
                        margin: "5px 0 0 0",
                        fontSize: "12px",
                      }}
                    >
                      {item.ThoiLuongTrinhChieu || "00:15"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Box>
        <Box
          style={{
            float: "left",
            width: "70%",
            // height: "740px",
            borderRadius: "20px",
            margin: "0 0 0 2%",
          }}
        >
          <h3
            style={{
              margin: 0,
              padding: "15px",
              borderBottom: "1px solid #eee",
              fontSize: "1.5rem",
              color: "#333",
            }}
          >
            Danh sách phát: {TenDanhSachPhat}
          </h3>
          <div
            style={{
              padding: "10px",
              color: "#333",
              display: "flex",
              backgroundColor: "#f5f5f5",
              borderBottom: "1px solid #eee",
              gap: "20px",
              margin: "15px 0px 10px 0px",
            }}
          >
            <span>
              {" "}
              <FontAwesomeIcon
                icon={faPhotoVideo}
                style={{ color: "#4a6cf7" }}
              />{" "}
              {dataSource.length}
            </span>
            <span style={{ marginRight: "30px" }}>
              <ClockCircleOutlined
                style={{ marginRight: "5px", color: "#4a6cf7" }}
              />
              {calculateTotalDuration(dataSource)}
            </span>{" "}
          </div>
          <div>
            <DndContext sensors={sensors} onDragEnd={onDragEnd}>
              <SortableContext
                items={dataSource.map((i) => i.ThuTu)}
                strategy={verticalListSortingStrategy}
              >
                <div
                  style={{ minHeight: "300px" }}
                  onDrop={(event) => {
                    event.preventDefault();
                    if (dataSource.length === 0) {
                      const item = JSON.parse(
                        event.dataTransfer.getData("text/plain")
                      );
                      const newItem = {
                        ID: item.ID,
                        TenFile: item.TenFile,
                        UrlFile: item.UrlFile,
                        ThoiLuongTrinhChieu: item.ThoiLuongTrinhChieu,
                        ThuTu: 1,
                      };
                      setDataSource([newItem]);
                    }
                  }}
                  onDragOver={(event) => event.preventDefault()}
                >
                  <BoxTable
                    components={{
                      body: {
                        row: Row,
                      },
                    }}
                    rowKey="ThuTu"
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                    onRow={(record, index) => ({
                      onDrop: (event) => handleDrop(event, index),
                      onDragOver: (event) => handleDragOver(event, index),
                    })}
                    locale={{
                      emptyText: (
                        <div
                          style={{
                            padding: "40px 0",
                            textAlign: "center",
                            borderRadius: "8px",
                            margin: "20px 0",
                            color: "#999",
                            fontSize: "14px",
                            // border: "3px dashed #ddd",
                            // backgroundColor: "#f9f9f9",
                            cursor: "pointer",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faPhotoVideo}
                            style={{
                              color: "#ddd",
                              fontSize: "3rem",
                              marginBottom: "10px",
                            }}
                          />
                          <p>Kéo và thả media từ danh sách bên trái vào đây</p>
                        </div>
                      ),
                    }}
                  />
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </Box>
      </LayoutWrapper>
    </Modal>
  );
};
