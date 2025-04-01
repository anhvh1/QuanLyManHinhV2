import { Modal, Table, Tooltip, message, Pagination } from "antd";
import actions from "../../../redux/DanhMuc/QLThuVien/actions";
import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import BoxFilter from "../../../../components/utility/boxFilter";
import {
  Button,
  InputSearch,
} from "../../../../components/uielements/exportComponent";
import {
  changeUrlFilter,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
} from "../../../../helpers/utility";
import { useKey } from "../../../CustomHook/useKey";
import queryString from "query-string";
import api from "./config";
import ModalAddEdit from "./modalAddEdit";
import ModalThietLap from "./modalThietLap";

import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  FieldTimeOutlined,
  FileOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import PageWrap from "../../../../components/utility/PageWrap";
const QLThuVien = (props) => {
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState("");
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [TenDanhSachPhat, setTenDanhSachPhat] = useState("");

  const dispatch = useDispatch();
  document.title = "Quản Lý Danh Sách Phát";

  useEffect(() => {
    changeUrlFilter(filterData);
    props.getList(filterData);
    props.getInitData(filterData);
  }, [filterData]);

  useEffect(() => {
    props.getList(filterData);
    props.getInitData(filterData);
    dispatch(actions.getInitData(filterData));
  }, []);

  const onTableChange = (pagination, filters, sorter) => {
    let oldFilterData = filterData;
    let onOrder = { pagination, filters, sorter };
    let newFilterData = getFilterData(oldFilterData, null, onOrder);

    setFilterData(newFilterData);
    setSelectedRowsKey([]);
  };
  const onFilter = (value, property) => {
    let oldFilterData = filterData;
    let onFilter = { value, property };
    let newfilterData = getFilterData(oldFilterData, onFilter, null);
    //get filter data
    setFilterData(newfilterData);
    setSelectedRowsKey([]);
  };
  const showModalAdd = () => {
    setAction("add");
    setDataModalAddEdit({});
    inceaseModalKey();
    setVisibleModalAddEdit(true);
  };
  const deleteModalAddEdit = (DanhSachPhatID) => {
    Modal.confirm({
      title: "Xóa Dữ Liệu",
      content: "Bạn có muốn xóa danh sách phát này không?",
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        setConfirmLoading(true);
        api
          .xoaQLThuVien(DanhSachPhatID, {})
          .then((res) => {
            if (res.data.Status > 0) {
              setConfirmLoading(false);
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
  const showModalEdit = (danhSachPhatID) => {
    const DanhSachPhatID = danhSachPhatID;
    setAction("edit");
    api
      .chiTietQLThuVien({ DanhSachPhatID })
      .then((res) => {
        if (res.data.Status > 0) {
          setDataModalAddEdit(res.data.Data);
          inceaseModalKey();
          setVisibleModalAddEdit(true);
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

  const hideModalAddEdit = () => {
    setSelectedRowsKey([]);
    setDataModalAddEdit({});
    setVisibleModalAddEdit(false);
  };
  const submitModalAddEdit = (data) => {
    setConfirmLoading(true);
    if (action === "add") {
      api
        .themQLThuVien(data)
        .then((res) => {
          setConfirmLoading(false);
          if (res.data.Status > 0) {
            message.destroy();
            message.success(res.data.Message);
            hideModalAddEdit();
            props.getList(filterData);
          } else {
            setConfirmLoading(false);
            message.destroy();
            message.error(res.data.Message);
          }
        })
        .catch((error) => {
          setConfirmLoading(false);
          message.destroy();
          message.error(error.toString());
        });
    }
    if (action === "edit") {
      api
        .suaQLThuVien(data)
        .then((res) => {
          if (res.data.Status > 0) {
            setConfirmLoading(false);
            message.destroy();
            message.success(res.data.Message);
            hideModalAddEdit();
            props.getList(filterData);
          } else {
            setConfirmLoading(false);
            message.destroy();
            message.error(res.data.Message);
          }
        })
        .catch((error) => {
          setConfirmLoading(false);
          message.destroy();
          message.error(error.toString());
        });
    }
  };
  const [actionthietlap, setActionThietLap] = useState("");
  const [visibleModalThietLap, setVisibleModalThietLap] = useState(false);
  const [confirmLoadingThietLap, setConfirmLoadingThietLap] = useState(false);
  const [modalThietLap, inceaseModalThietLap] = useKey();
  const [dataModalThietLap, setDataModalThietLap] = useState({});
  const [dataModalDanhSachMediaID, setDataModalDanhSachMediaID] = useState({});

  const hideModalThietLap = () => {
    setVisibleModalThietLap(false);
  };
  const submitModalThietLap = (data, FileData) => {
    setConfirmLoadingThietLap(true);
    props.getList(filterData);
    message.success("Thiết lập Media thành công");
  };
  const showModalThietLap = (DanhSachPhatID) => {
    setActionThietLap("thietlap");
    api
      .chiTietThietLap({ DanhSachPhatID })
      .then((res) => {
        if (res.data.Status > 0) {
          setDataModalThietLap(res.data.Data.DanhSachMediaID);
          setDataModalDanhSachMediaID(res.data.Data);
          inceaseModalThietLap();
          setVisibleModalThietLap(true);
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
  const renderThaoTac = (record) => {
    return (
      <div className={"action-btn"}>
        <Tooltip title={"Sửa"}>
          <EditOutlined onClick={() => showModalEdit(record.DanhSachPhatID)} />
        </Tooltip>

        <Tooltip title={"Xóa"}>
          <DeleteOutlined
            onClick={() => deleteModalAddEdit(record.DanhSachPhatID)}
          />
        </Tooltip>
        <Tooltip title={"Thiết lập"}>
          <FieldTimeOutlined
            onClick={() => showModalThietLap(record.DanhSachPhatID)}
          />
        </Tooltip>
      </div>
    );
  };
  const {
    DanhSachQLThuVien,
    DanhSachDMThuVien,
    DanhSachMedia,
    DanhSachNguoiDung,
    TotalRow,
  } = props;
  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();
  //   const responsiveStyles = `
  //   .playlist-card {
  //     width: 100%;
  //     max-width: 100%;
  //     min-width: 300px;
  //   }

  //   @media (min-width: 576px) {
  //     .playlist-card {
  //       width: calc(50% - 20px);
  //     }
  //   }

  //   @media (min-width: 992px) {
  //     .playlist-card {
  //       width: calc(33.33% - 20px);
  //     }
  //   }
  // `;
  return (
    <LayoutWrapper>
      <PageWrap>
        {/* <PageHeader>Quản Lý Danh Sách Phát</PageHeader> */}
      </PageWrap>
      <Box>
        <BoxFilter>
          <InputSearch
            defaultValue={filterData.Keyword}
            placeholder={"Nhập tên danh sách phát"}
            style={{ width: 300 }}
            onSearch={(value) => onFilter(value, "Keyword")}
            allowClear
          />
          <PageAction>
            <Button type="primary" onClick={showModalAdd}>
              <PlusOutlined />
              Thêm mới
            </Button>
          </PageAction>
        </BoxFilter>
        {/* Replace BoxTable with card-based layout */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            padding: "20px 0",
          }}
        >
          {DanhSachQLThuVien &&
            DanhSachQLThuVien.map((item, index) => (
              <div
                key={item.DanhSachPhatID}
                className="playlist-card"
                style={{
                  border: "1px solid #e8e8e8",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.09)",
                  minWidth: "300px",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  ":hover": {
                    boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                    transform: "translateY(-5px)",
                  },
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 16px rgba(0,0,0,0.15)";
                  e.currentTarget.style.transform = "translateY(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(0,0,0,0.09)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    padding: "12px 16px",
                    borderBottom: "1px solid #e8e8e8",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "#f7f7f7",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "calc(100% - 100px)",
                    }}
                  >
                    {item.TenDanhSachPhat}
                  </h3>
                  <div
                    className={"action-btn"}
                    style={{ display: "flex", gap: "10px" }}
                  >
                    <Tooltip title={"Sửa"}>
                      <EditOutlined
                        onClick={() => showModalEdit(item.DanhSachPhatID)}
                      />
                    </Tooltip>
                    <Tooltip title={"Xóa"}>
                      <DeleteOutlined
                        onClick={() => deleteModalAddEdit(item.DanhSachPhatID)}
                      />
                    </Tooltip>
                    <Tooltip title={"Thiết lập"}>
                      <FieldTimeOutlined
                        onClick={() => {
                          showModalThietLap(item.DanhSachPhatID);
                          setTenDanhSachPhat(item.TenDanhSachPhat);
                        }}
                      />
                    </Tooltip>
                  </div>
                </div>

                <div style={{ padding: "12px 16px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                        marginBottom: "8px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          fontSize: "14px",
                        }}
                      >
                        <FileOutlined style={{ marginRight: "5px" }} />
                        {item.TongSoMedia} media
                      </span>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          fontSize: "14px",
                        }}
                      >
                        <ClockCircleOutlined style={{ marginRight: "5px" }} />
                        {item.TongThoiGianPhat}
                      </span>
                    </div>
                    <div
                      style={{
                        padding: "2px 8px",
                        borderRadius: "10px",
                        background: item.TrangThai ? "#e6f7ff" : "#f5f5f5",
                        color: item.TrangThai ? "#1890ff" : "#8c8c8c",
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.TrangThai ? "Đang hoạt động" : "Không hoạt động"}
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: "10px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span style={{ color: "#8c8c8c", fontSize: "13px" }}>
                      Khách hàng: {item.TenNguoiDung}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "16px",
          }}
        >
          <Pagination
            showSizeChanger={true}
            showTotal={(total, range) =>
              `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`
            }
            total={TotalRow}
            current={PageNumber}
            pageSize={PageSize}
            onChange={(page, pageSize) => {
              onTableChange({ current: page, pageSize }, null, null);
            }}
            onShowSizeChange={(current, size) => {
              onTableChange({ current: 1, pageSize: size }, null, null);
            }}
          />
        </div>
      </Box>

      {/* ... existing modal components ... */}
      <ModalAddEdit
        visible={visibleModalAddEdit}
        dataEdit={dataModalAddEdit}
        action={action}
        loading={confirmLoading}
        key={modalKey}
        onCreate={submitModalAddEdit}
        onCancel={hideModalAddEdit}
        danhSachDMThuVien={DanhSachDMThuVien}
        DanhSachNguoiDung={DanhSachNguoiDung}
      />
      <ModalThietLap
        visible={visibleModalThietLap}
        dataThietLap={dataModalThietLap}
        dataModalDanhSachMediaID={dataModalDanhSachMediaID}
        action={actionthietlap}
        loading={confirmLoading}
        key={modalKey}
        onCreate={submitModalThietLap}
        onCancel={hideModalThietLap}
        danhSachDMThuVien={DanhSachDMThuVien}
        DanhSachMedia={DanhSachMedia}
        filterData={filterData}
        onFilter={onFilter}
        TenDanhSachPhat={TenDanhSachPhat}
      />
    </LayoutWrapper>
  );
};
function mapStateToProps(state) {
  return {
    ...state.QLThuVien,
    role: getRoleByKey(state.Auth.role, "danh-muc-chuc-vu"),
  };
}
export default connect(mapStateToProps, actions)(QLThuVien);
