import { Modal, Table, Tooltip, message } from "antd";
import actions from "../../../redux/DanhMuc/QuanLyNhomManHinh/actions";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import BoxFilter from "../../../../components/utility/boxFilter";
import BoxTable from "../../../../components/utility/boxTable";
import {
  Button,
  InputSearch,
  Select,
} from "../../../../components/uielements/exportComponent";
import Checkbox from "../../../../components/uielements/checkbox";
import {
  changeUrlFilter,
  exportExcel,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
} from "../../../../helpers/utility";
import { useKey } from "../../../CustomHook/useKey";
import { useDispatch } from "react-redux";
import queryString from "query-string";
import api from "./config";
import moment from "moment";
import ModalAddEdit from "./modalAddEdit";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import PageWrap from "../../../../components/utility/PageWrap";
import actionsManHinh from "../../../redux/DanhMuc/QuanLyManHinh/actions";
const QuanLyNhomManHinh = (props) => {
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );
  // const {DanhSachManHinh} = useSelector((state) => state.QuanLyManHinh);
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState("");
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);

  document.title = "Quản Lý Nhóm Màn Hình";
  const dispatch = useDispatch();

  useEffect(() => {
    changeUrlFilter(filterData);
    props.getList(filterData);
  }, [filterData]);

  useEffect(() => {
    props.getList(filterData);
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

  const deleteModalAddEdit = (NhomManHinhID) => {
    Modal.confirm({
      title: "Xóa Dữ Liệu",
      content: "Bạn có muốn xóa nhóm này không?",
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        setConfirmLoading(true);
        api
          .xoaNhomManHinh(NhomManHinhID, {})
          .then((res) => {
            if (res.data.Status > 0) {
              setConfirmLoading(false);
              props.getList({
                ...filterData,
                PageNumber:
                  Math.ceil((TotalRow - 1) / filterData.PageSize) <
                  filterData.PageNumber
                    ? Math.ceil((TotalRow - 1) / filterData.PageSize)
                    : filterData.PageNumber,
              });
              message.destroy();
              message.success(res.data.Message);
              setFilterData({
                ...filterData,
                PageNumber:
                  Math.ceil((TotalRow - 1) / filterData.PageSize) <
                  filterData.PageNumber
                    ? Math.ceil((TotalRow - 1) / filterData.PageSize)
                    : filterData.PageNumber,
              });
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

  const showModalEdit = (nhomManHinhID) => {
    const NhomManHinhID = nhomManHinhID;
    setAction("edit");
    api
      .chiTietNhomManHinh({ NhomManHinhID })
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
        .themNhomManHinh(data)
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
        .suaNhomManHinh(data)
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

  const renderThaoTac = (record) => {
    return (
      <div className={"action-btn"}>
        {/* {role?.edit ? ( */}
        <Tooltip title={"Sửa"}>
          <EditOutlined onClick={() => showModalEdit(record.NhomManHinhID)} />
        </Tooltip>
        {/* ) : ( */}
        {/* '' */}
        {/* )} */}
        {/* {role?.delete ? ( */}
        <Tooltip title={"Xóa"}>
          <DeleteOutlined
            onClick={() => deleteModalAddEdit(record.NhomManHinhID)}
          />
        </Tooltip>
        {/* ) : (
          ''
        )} */}
      </div>
    );
  };
  const { DanhSachNhomManHinh, TotalRow, role, DanhSachManHinh } = props;
  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();

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
      title: "Tên nhóm",
      dataIndex: "TenNhom",
      align: "center",
      width: "28%",
    },
    {
      title: "Mô tả",
      dataIndex: "Mota",
      align: "center",
      width: "28%",
    },
    {
      title: "Thành viên",
      dataIndex: "ListManHinh",
      align: "center",
      width: "28%",
      render: (text, record) => {
        if (record.ListManHinh && record.ListManHinh.length > 0) {
          const Ten = record.ListManHinh.filter(
            (item) => item.TenManHinh !== null
          ).map((item) => item.TenManHinh);
          return Ten.join(", ");
        } else {
          return ""; // Handle case where there are no items in the array or handle accordingly
        }
      },
    },
    {
      title: "Thao tác",
      width: "10%",
      align: "center",
      margin: "10px",
      render: (text, record) => renderThaoTac(record),
    },
  ];

  return (
    <LayoutWrapper>
      <PageWrap>
        {/* <PageHeader>Quản Lý Nhóm Màn Hình</PageHeader> */}
        <PageAction>
          {/* {role ? (
            role.add ? ( */}
          <Button type="primary" onClick={showModalAdd}>
            <PlusOutlined />
            Thêm mới
          </Button>
          {/* ) : (
              ''
            )
          ) : (
            ''
          )} */}
        </PageAction>
      </PageWrap>
      <Box>
        <BoxFilter>
          <InputSearch
            defaultValue={filterData.Keyword}
            placeholder={"Nhập tên nhóm"}
            style={{ width: 300 }}
            onSearch={(value) => onFilter(value, "Keyword")}
            allowClear
          />
        </BoxFilter>
        <BoxTable
          columns={columns}
          dataSource={DanhSachNhomManHinh}
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
      <ModalAddEdit
        visible={visibleModalAddEdit}
        dataEdit={dataModalAddEdit}
        action={action}
        loading={confirmLoading}
        key={modalKey}
        onCreate={submitModalAddEdit}
        onCancel={hideModalAddEdit}
        DanhSachNhomManHinh={DanhSachNhomManHinh}
        DanhSachManHinh={DanhSachManHinh}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.QuanLyNhomManHinh,
    role: getRoleByKey(state.Auth.role, "danh-muc-chuc-vu"),
  };
}

export default connect(mapStateToProps, actions)(QuanLyNhomManHinh);
