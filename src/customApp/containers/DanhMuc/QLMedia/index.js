import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import actions from "../../../redux/DanhMuc/QLMedia/actions";
import api, { apiUrl } from "./config";
// import getApi from '../../BaoCao/QLMauPhieu/config';
import Constants from "../../../../settings/constants";
import Select, { Option } from "../../../../components/uielements/select";
import BoxTable from "../../../../components/utility/boxTable";

import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import BoxFilter from "../../../../components/utility/boxFilter";
import { EmptyTable } from "../../../../components/utility/boxTable";
import { useKey } from "../../../CustomHook/useKey";
import ModalEditEdit from "./modalEdit";
import ModalEdit from "./modalAddEdit";
import {
  Modal,
  message,
  Input,
  Tree,
  Menu,
  Dropdown,
  Tooltip,
  Checkbox,
} from "antd";
import Button from "../../../../components/uielements/button";
import {
  changeUrlFilter,
  getFilterData,
  getDefaultPageSize,
} from "../../../../helpers/utility";
import {
  DeleteOutlined,
  EditOutlined,
  FolderOutlined,
  PlusOutlined,
  FolderOpenOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import TreeData from "./treeData";
import { RedTree } from "./styled";
import { getRoleByKey } from "../../../../helpers/utility";
import PageWrap from "../../../../components/utility/PageWrap";
import ModalAddEditMedia from "./modalAddEditMedi";
// import {mapCotIDToDataTable} from '../../BaoCao/Shared/table';
import { useSelector, useDispatch } from "react-redux";
import { InputSearch } from "../../../../components/uielements/input";
import { formDataCaller } from "../../../../api/formDataCaller";
import actionsCoQuan from "../../../redux/DanhMuc/DMCoQuan/actions";
import {
  _debounce,
  getInfoFromToken,
  getLocalKey,
} from "../../../../helpers/utility";
const { DirectoryTree } = Tree;
const { TreeNode } = Tree;
const DMChiTieu = (props) => {
  document.title = "Quản Lý Media";
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );
  const [filterDataMedia, setFilterDataMedia] = useState(
    queryString.parse(props.location.search)
  );
  const [keyState, setKeyState] = useState({
    key: 0,
    treeKey: 0,
  });

  const { DanhSachCoQuan } = useSelector((state) => state.DMCoQuan);

  const [stateModalAddEdit, setStateModalAddEdit] = useState({
    confirmLoading: false,
    visibleModalAddEdit: false,
    action: "",
    dataModalAddEdit: {
      DanhSachTinh: [],
      Data: null,
    },
    modalKey: 0,
  });
  const { DanhSachMedia, TotalRow, DanhSachThuMuc } = props;
  const dispatch = useDispatch();
  const [DanhSachCacCap, setDanhSachCacCap] = useState([]);
  const {
    confirmLoading,
    visibleModalAddEdit,
    action,
    dataModalAddEdit,
    modalKey,
  } = stateModalAddEdit;

  const { treeKey, key } = keyState;
  // get api danhsachcaccap
  const danhSachCacCap = async () => {
    try {
      const res = await api.danhSachCacCapDonVi();
      setDanhSachCacCap(res.data.Data);
    } catch (error) {}
  };

  useEffect(() => {
    props.getInitData(filterData);
    dispatch(actions.getInitData());
    danhSachCacCap();
    dispatch(actionsCoQuan.getInitData());
  }, []);

  const filterTreeNode = (dataRoot) => {
    return dataRoot;
  };

  const DSFilter = filterTreeNode(DanhSachThuMuc);
  useEffect(() => {
    changeUrlFilter(filterData); //change url
    props.getList(filterData);
  }, [filterData]);

  //filter --------------------------------------------------
  const onFilter = (value, property) => {
    //get filter data
    let oldFilterData = { ...filterData };
    let onFilter = { value, property };
    let newFilterData = getFilterData(oldFilterData, onFilter, null);
    //get filter data
    setFilterData(newFilterData);
    changeUrlFilter(newFilterData);
  };
  const onSearch = (value, property) => {
    let oldFilterData = filterData;
    let onFilter = { value, property };
    let newFilterData = getFilterData(oldFilterData, onFilter, null);
    setFilterData(newFilterData);
  };
  const deleteData = (ThuMucID) => {
    Modal.confirm({
      title: "Xóa dữ liệu",
      content: "Bạn có muốn xóa thư mục này không?",
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        api
          .XoaChiTieu(ThuMucID, {})
          .then((response) => {
            if (response.data.Status > 0) {
              props.getInitData(filterData); //get list
              //message success
              message.destroy();
              message.success(response.data.Message);
            } else {
              Modal.error({
                title: "Lỗi",
                content: response.data.Message,
              });
            }
          })
          .catch((error) => {
            Modal.error(Constants.API_ERROR);
          });
      },
    });
    // }
  };

  const findObjectByThuMucID = (arr, ThuMucID) => {
    for (let i = 0; i < arr.length; i++) {
      const currentObject = arr[i];

      if (currentObject.ThuMucID === ThuMucID) {
        // Nếu tìm thấy đối tượng với ThuMucID phù hợp, trả về nó
        return currentObject;
      }

      // Nếu không, kiểm tra children của đối tượng hiện tại bằng cách đệ quy
      if (currentObject.children && currentObject.children.length > 0) {
        const resultInChildren = findObjectByThuMucID(
          currentObject.children,
          ThuMucID
        );

        // Nếu tìm thấy trong children, trả về kết quả
        if (resultInChildren !== null) {
          return resultInChildren;
        }
      }
    }

    // Nếu không tìm thấy đối tượng nào có ThuMucID phù hợp, trả về null
    return null;
  };

  //Modal add -----------------------------------------------------
  const showModalAdd = (ThuMucID, ThuMucChaID, TenThuMuc) => {
    // const objParent = findObjectByThuMucID(DSFilter, ThuMucChaID);
    // !props.role.add
    if (false) {
      message.destroy();
      message.warning("Bạn không có quyền thực hiện chức năng này");
    } else {
      if (!ThuMucChaID) {
        let newModalKey = modalKey + 1;
        setStateModalAddEdit((prevState) => ({
          ...prevState,
          visibleModalAddEdit: true,
          dataModalAddEdit: {
            ThuMucChaID: ThuMucID,
            TenThuMucCha: TenThuMuc,
          },
          confirmLoading: false,
          modalKey: newModalKey,
          action: "add",
        }));
      } else
        api
          .ChiTietChiTieu({ thuMucID: ThuMucID })
          .then((response) => {
            if (response.data.Status > 0) {
              let Data = response.data.Data;
              let newModalKey = modalKey + 1;
              setStateModalAddEdit((prevState) => ({
                ...prevState,
                visibleModalAddEdit: true,
                dataModalAddEdit: {
                  ThuMucChaID: ThuMucID,
                  TenThuMucCha: Data.TenThuMuc,
                },
                confirmLoading: false,
                modalKey: newModalKey,
                action: "add",
              }));
            } else {
              Modal.error({
                title: "Lỗi",
                content: response.data.Message,
              });
            }
          })
          .catch((error) => {
            message.destroy();
            message.warning(error.toString());
          });
    }
  };
  const showModalEdit = (ThuMucID, ThuMucChaID) => {
    const objParent = findObjectByThuMucID(DSFilter, ThuMucChaID);
    api
      .ChiTietChiTieu({ ThuMucID: ThuMucID })
      .then((response) => {
        if (response.data.Status > 0) {
          let Data = response.data.Data;
          let newModalKey = modalKey + 1;
          setStateModalAddEdit((prevState) => ({
            ...prevState,
            visibleModalAddEdit: true,
            dataModalAddEdit: {
              ...Data,
              ThuMucID,
              TenThuMucCha: objParent?.TenThuMuc,
              ThuMucChaID: objParent?.ThuMucID,
            },
            confirmLoading: false,
            modalKey: newModalKey,
            action: "edit",
          }));
        } else {
          Modal.error({
            title: "Lỗi",
            content: response.data.Message,
          });
        }
      })
      .catch((error) => {
        Modal.error(Constants.API_ERROR);
      });
    // }
  };

  const hideModalEdit = () => {
    setStateModalAddEdit((prevState) => ({
      dataModalAddEdit: {},
      visibleModalAddEdit: false,
      action: "",
    }));
  };

  const submitModalEdit = (data) => {
    setStateModalAddEdit((prevState) => ({
      ...prevState,
      confirmLoading: true,
    }));
    if (action === "add") {
      api
        .ThemChiTieu(data)
        .then((response) => {
          setStateModalAddEdit((prevState) => ({
            ...prevState,
            confirmLoading: false,
          }));
          if (response.data.Status > 0) {
            //message success
            message.destroy();
            message.success(response.data.Message);
            //hide modal
            hideModalEdit();
            props.getInitData(filterData); //get list
          } else {
            Modal.error({
              title: "Lỗi",
              content: response.data.Message,
            });
          }
        })
        .catch((error) => {
          Modal.error(Constants.API_ERROR);
        });
    } else {
      api
        .SuaChiTieu(data)
        .then((response) => {
          setStateModalAddEdit((prevState) => ({
            ...prevState,
            confirmLoading: false,
          }));
          if (response.data.Status > 0) {
            //message success
            message.destroy();
            message.success(response.data.Message);
            //hide modal
            hideModalEdit();
            props.getInitData(filterData); //get list
          } else {
            Modal.error({
              title: "Lỗi",
              content: response.data.Message,
            });
          }
        })
        .catch((error) => {
          Modal.error(Constants.API_ERROR);
        });
    }
  };
  const onExpandNode = (selectedKeys, info) => {
    let className = info.nativeEvent.target.outerHTML.toString();
    let parentClassName =
      info.nativeEvent.target.parentElement.className.toString();
    let checkMenu = className.includes("ant-dropdown-menu");
    let checkNearMenu = parentClassName.includes("ant-dropdown-menu");
    if (!checkMenu && !checkNearMenu) {
      //neu dang k click menu drop
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
  };
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
      }, 0); // Use setTimeout with 0 delay to ensure it runs after render
    }
  }, [DSFilter, initialized]);
  const [openMenuKey, setOpenMenuKey] = useState(null);
  const access_token = getLocalKey("access_token");
  const dataUnzip = getInfoFromToken(access_token);
  const ListNguoiDung = dataUnzip?.NguoiDung?.NguoiDungID;
  const hideSelect = ListNguoiDung !== 18;
  const renderTreeNodes = (data) =>
    data?.map((item) => {
      let isMenuOpen = openMenuKey === item.ThuMucID; // Kiểm tra xem menu có nên được mở không
      let isExpanded = expandedKeys.includes(item.ThuMucID.toString());
      let menu = (
        <Menu>
          <Menu.Item
            onClick={() => {
              showModalAdd(item.ThuMucID, item.ThuMucChaID, item.TenThuMuc);
              setOpenMenuKey(null); // Đóng menu khi một mục được nhấp
            }}
          >
            <span>Thêm thư mục</span>
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              showModalEdit(item.ThuMucID, item.ThuMucChaID);
              setOpenMenuKey(null); // Đóng menu khi một mục được nhấp
            }}
          >
            <span>Sửa</span>
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              deleteData(item.ThuMucID);
              setOpenMenuKey(null); // Đóng menu khi một mục được nhấp
            }}
            disabled={ListNguoiDung !== 18} // Thêm điều kiện để disabled khi ListNguoiDung === 18
          >
            <span>Xóa</span>
          </Menu.Item>
        </Menu>
      );

      // Kiểm tra xem menu có nên mở không và thêm className tương ứng
      let titleClassName = isMenuOpen ? "title-tree open-menu" : "title-tree";
      let switcherIcon;
      if (item.ThuMucID === 1) {
        switcherIcon = <HomeOutlined />;
      } else {
        switcherIcon = isExpanded ? <FolderOpenOutlined /> : <FolderOutlined />;
      }
      let title = (
        <div>
          <Dropdown
            overlay={menu}
            placement="bottomLeft"
            trigger={["contextMenu"]}
            visible={isMenuOpen} // Đặt visible của Dropdown
            onVisibleChange={(visible) => {
              if (visible) {
                setOpenMenuKey(item.ThuMucID); // Mở menu khi dropdown mở
              } else {
                setOpenMenuKey(null); // Đóng menu khi dropdown đóng
              }
            }}
          >
            <span className={titleClassName}>{item.TenThuMuc}</span>
          </Dropdown>
        </div>
      );

      if (item.Children) {
        return (
          <TreeNode
            switcherIcon={switcherIcon}
            title={title}
            key={item.ThuMucID}
            // isLeaf={item.isLeaf}
            Children={item.Children}
            dataRef={item}
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
          key={item.ThuMucID}
          // isLeaf={item.isLeaf}
          Children={item.Children}
          dataRef={item}
          defaultExpandAll
        />
      );
    });
  const [checked, setChecked] = useState(false);
  const onSelectTreeNode = (selectedKeys, info) => {
    // Lấy ThuMucID từ dataRef của nút đã chọn
    const selectedNode = info.node.props.dataRef;
    if (selectedNode) {
      // Lưu ThuMucID vào filterData để cập nhật lại giá trị cho InputSearch
      const newFilterData = { ...filterData, ThuMucID: selectedNode.ThuMucID };
      setFilterData(newFilterData);
      // Gọi hàm onFilter để áp dụng bộ lọc mới
      onFilter(selectedNode.ThuMucID, "ThuMucID");
    }
    setChecked(false);
  };
  const onCheckboxChange = (e) => {
    setChecked(e.target.checked);
    if (e.target.checked) {
      onFilter(null, "ThuMucID"); // Call onFilter with value null when checkbox is checked
    }
  };
  const renderContent = () => {
    if (DanhSachThuMuc?.length) {
      return (
        <Tree
          filterTreeNode={(treeNode) => treeNode.props.dataRef.Highlight === 1}
          onSelect={onSelectTreeNode}
          onExpand={onExpandNode}
          multiple
          expandedKeys={filterData.Keyword ? props.expandedKeys : expandedKeys}
        >
          {renderTreeNodes(DSFilter)}
        </Tree>
      );
    } else {
      return <EmptyTable loading={props.TableLoading} />;
    }
  };

  //Render action ---------------------------------------------
  const renderActionAdd = () => {
    return (
      <span>
        <Button
          type="primary"
          onClick={() => showModalAdd("", "", "")}
          className="d-none"
        >
          <PlusOutlined />
          Thêm mới
        </Button>
      </span>
    );
  };

  //Render ----------------------------------------------------
  const { role } = props;
  const columns = [
    {
      title: "STT",
      align: "center",
      width: "5%",
      render: (text, record, index) => (
        <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>
      ),
    },
    {
      title: "Tên",
      dataIndex: "TenFile",
      width: "20%",
    },
    {
      title: "Thumbnail",
      dataIndex: "UrlFile",
      align: "center",
      width: "5%",
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
                  style={{ width: "60%", height: "60px" }}
                  controls
                />
              );
            } else {
              return (
                <img
                  src={url}
                  style={{ width: "60%", height: "60px", objectFit: "cover" }}
                  alt="Thumbnail"
                />
              );
            }
          } else {
            return null; // Handle non-URL cases if needed
          }
        } else {
          return null; // Handle cases where UrlFile is null or undefined
        }
      },
    },
    {
      title: "Loại",
      dataIndex: "Loai",
      align: "center",
      width: "7%",
      render: (Loai) => {
        if (Loai === 1) {
          return <span>Hình ảnh</span>;
        } else if (Loai === 2) {
          return <span>Video</span>;
        }
      },
    },
    {
      title: "Thời lượng trình chiếu",
      dataIndex: "ThoiLuongTrinhChieu",
      align: "center",
      width: "10%",
    },
    {
      title: "Kích thước",
      dataIndex: "KichThuoc",
      align: "center",
      width: "12%",
    },
    {
      title: "Trạng thái sử dụng",
      dataIndex: "TrangThai",
      align: "center",
      width: "12%",
      render: (TrangThai) => {
        if (TrangThai === true) {
          return <span>Đã sử dụng</span>;
        } else if (TrangThai === false) {
          return <span>Không sử dụng</span>;
        } else {
          return <span>Trạng thái khác</span>; // Handle any other values if necessary
        }
      },
    },
    {
      title: "Tags",
      dataIndex: "ListTag",
      width: "10%",
      render: (tags) => (
        <div style={{ padding: "5px", borderRadius: "5px" }}>
          {tags.map((tag, index) => (
            <div
              key={index}
              style={{
                border: "1px solid rgb(242, 242, 242)",
                textAlign: "center",
                marginRight: "5px",
                background: "rgb(242, 242, 242)",
                marginTop: "10px",
                borderRadius: "10px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      ),
    },

    {
      title: "Thao tác",
      width: "10%",
      align: "center",
      margin: "10px",
      render: (text, record) => renderThaoTac(record),
    },
  ];

  const [actionmedia, setActionMedia] = useState("");
  const [visibleModalAddEditMedia, setVisibleModalAddEditMedia] =
    useState(false);
  const [confirmLoadingMedia, setConfirmLoadingMedia] = useState(false);
  const [modalKeyMedia, inceaseModalKeyMedia] = useKey();
  const showModalAddMedia = () => {
    setActionMedia("add");
    setVisibleModalAddEditMedia(true);
    inceaseModalKeyMedia();
  };
  const hideModalAddEdit = () => {
    setVisibleModalAddEditMedia(false);
  };
  const [Status, setStatus] = useState([]);
  const submitModalAddEdit = (data, FileData) => {
    setConfirmLoadingMedia(true);
    if (actionmedia === "add") {
      const formSave = new FormData();
      formSave.append("files", FileData);
      formSave.append("quanlymediastr", JSON.stringify(data));

      formDataCaller(apiUrl.themmedia, formSave)
        .then((response) => {
          setConfirmLoadingMedia(false);
          if (response.data.Status > 0) {
            setStatus(response.data.Status);
            message.success(response.data.Message);
            //hide modal
            // hideModalAddEdit();
            //reset page
            props.getInitData(filterData); //get list
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
  };
  //paging info
  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();
  const onTableChange = (pagination, filters, sorter) => {
    //get filter data
    let oldFilterData = { ...filterData };
    let onOrder = { pagination, filters, sorter };
    let newFilterData = getFilterData(oldFilterData, null, onOrder);
    //get filter data
    setFilterData(newFilterData);
  };
  //modaledit
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [actionedit, setActionEdit] = useState("");
  const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);
  const [modalKeyEdit, inceaseModalKeyEdit] = useKey();
  const [dataModalEdit, setDataModalEdit] = useState({});

  const hideModalEditEdit = () => {
    setVisibleModalEdit(false);
  };
  const submitModalEditEdit = (data) => {
    setConfirmLoadingEdit(true);
    if (actionedit === "editedit") {
      api
        .Sua(data)
        .then((res) => {
          if (res.data.Status > 0) {
            setConfirmLoadingEdit(false);
            message.destroy();
            message.success(res.data.Message);
            hideModalEditEdit();
            props.getList(filterData);
          } else {
            setConfirmLoadingEdit(false);
            message.destroy();
            message.error(res.data.Message);
          }
        })
        .catch((error) => {
          setConfirmLoadingEdit(false);
          message.destroy();
          message.error(error.toString());
        });
    }
  };
  const showModalEditEdit = (id) => {
    const ID = id;
    setActionEdit("editedit");
    api
      .ChiTiet({ ID })
      .then((res) => {
        if (res.data.Status > 0) {
          setDataModalEdit(res.data.Data);
          inceaseModalKeyEdit();
          setVisibleModalEdit(true);
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
  const deleteModalAddEdit = (ID) => {
    Modal.confirm({
      title: "Xóa Dữ Liệu",
      content: "Bạn có muốn xóa media này không?",
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        setConfirmLoadingEdit(true);
        api
          .Xoa(ID, {})
          .then((res) => {
            if (res.data.Status > 0) {
              setConfirmLoadingEdit(false);
              props.getList(filterData);
              message.destroy();
              message.success(res.data.Message);
            } else {
              message.destroy();
              message.error(res.data.Message);
            }
          })
          .catch((error) => {
            message.destroy();
            message.error(error.toString());
          });
      },
    });
  };
  const renderThaoTac = (record) => {
    return (
      <div className={"action-btn"}>
        {/* {role?.edit ? ( */}
        <Tooltip title={"Sửa"}>
          <EditOutlined onClick={() => showModalEditEdit(record.ID)} />
        </Tooltip>
        {/* ) : ( */}
        {/* '' */}
        {/* )} */}
        {/* {role?.delete ? ( */}
        <Tooltip title={"Xóa"}>
          <DeleteOutlined onClick={() => deleteModalAddEdit(record.ID)} />
        </Tooltip>
        {/* ) : (
          ''
        )} */}
      </div>
    );
  };
  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>Quản Lý Media</PageHeader>
        <PageAction>
          <Button type="primary" onClick={showModalAddMedia}>
            <PlusOutlined />
            Thêm mới
          </Button>
        </PageAction>
      </PageWrap>

      <Box style={{ float: "left", width: "15%" }}>
        <div
          style={{
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: "#FFFFFF",
            fontSize: "16px",
            padding: "20px 20px 20px 6px",
          }}
        >
          <Checkbox
            style={{
              color: "#FFFFFF",
              fontSize: "16px",
            }}
            checked={checked}
            onChange={onCheckboxChange}
          >
            Tất cả thư mục
          </Checkbox>
        </div>
        <div
          key={treeKey}
          style={{
            userSelect: "none",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          className="mg-top"
        >
          {renderContent()}
        </div>
      </Box>

      <Box style={{ float: "left", width: "85%" }}>
        <BoxFilter>
          <Select
            defaultValue={filterData.Loai ? filterData.Loai : null}
            placeholder="Loại"
            onChange={(value) => onFilter(value, "Loai")}
            style={{ width: 200 }}
            allowClear
          >
            <Option value={1}>Hình ảnh</Option>
            <Option value={2}>Video</Option>
          </Select>
          <Select
            defaultValue={filterData.Status ? filterData.Status : null}
            placeholder="Trạng thái"
            onChange={(value) => onFilter(value, "Status")}
            style={{ width: 200 }}
          >
            <Option value={true}>Đang sử dụng</Option>
            <Option value={false}>Không sử dụng</Option>
          </Select>
          <InputSearch
            allowClear
            defaultValue={filterData.Keyword}
            placeholder="Tìm kiếm theo tên "
            onSearch={(value) => onFilter(value, "Keyword")}
            style={{ width: 300 }}
          />
        </BoxFilter>
        <BoxTable
          columns={columns}
          dataSource={DanhSachMedia}
          onChange={onTableChange}
          pagination={{
            showSizeChanger: true,
            showTotal: (total, range) =>
              `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
            total: TotalRow,
            current: PageNumber,
            pageSize: PageSize,
          }}
          rowKey={(record) => record.ID}
        />
      </Box>
      <ModalEdit
        confirmLoading={confirmLoading}
        visible={visibleModalAddEdit}
        onCancel={hideModalEdit}
        onCreate={submitModalEdit}
        dataModalEdit={dataModalAddEdit}
        key={modalKey}
        DanhSachMedia={DanhSachMedia}
        action={action}
      />
      <ModalAddEditMedia
        visible={visibleModalAddEditMedia}
        action={actionmedia}
        onCancel={hideModalAddEdit}
        onCreate={submitModalAddEdit}
        key={modalKeyMedia}
        loading={confirmLoading}
        DanhSachThuMuc={DanhSachThuMuc}
        DanhSachCoQuan={DanhSachCoQuan}
        onSearch={onSearch}
        Statuss={Status}
        setStatuss={setStatus}
      />
      <ModalEditEdit
        visible={visibleModalEdit}
        action={actionedit}
        onCancel={hideModalEditEdit}
        onCreate={submitModalEditEdit}
        key={modalKeyEdit}
        loading={confirmLoading}
        dataModalEdit={dataModalEdit}
        DanhSachThuMuc={DanhSachThuMuc}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.DMChiTieu,
  };
}

export default connect(mapStateToProps, actions)(DMChiTieu);
