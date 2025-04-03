import { Modal, Table, Tooltip, message } from "antd";
import actions from "../../../redux/DanhMuc/DMKhachHang/actions";
import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
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
import { formDataCaller } from "../../../../api/formDataCaller";

import Checkbox from "../../../../components/uielements/checkbox";
import Switches from "../../../../components/uielements/switch";
import {
  changeUrlFilter,
  exportExcel,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
} from "../../../../helpers/utility";
import { useKey } from "../../../CustomHook/useKey";
import queryString from "query-string";
import api, { apiUrl } from "./config";
import moment from "moment";
import ModalAddEdit from "./modalAddEdit";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import PageWrap from "../../../../components/utility/PageWrap";
const DMKhachHang = (props) => {
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState("");
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();
  document.title = "Danh Mục Khách Hàng";

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

  const deleteModalAddEdit = (CoQuanID) => {
    Modal.confirm({
      title: "Xóa Dữ Liệu",
      content: "Bạn có muốn xóa khách hàng này không?",
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        setConfirmLoading(true);
        api
          .xoaCoQuan(CoQuanID)
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

  const showModalEdit = (ID) => {
    setAction("edit");
    api
      .chiTietQLThuVien({ ID })
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

  const submitModalAddEdit = (data, FileData) => {
    setConfirmLoading(true);
    if (action === "add") {
      const formSave = new FormData();
      formSave.append("files", FileData);
      formSave.append("coQuanStr", JSON.stringify(data));

      formDataCaller(apiUrl.themqlthuvien, formSave)
        .then((response) => {
          setConfirmLoading(false);
          if (response.data.Status > 0) {
            //message success
            message.success("Thêm thành công");
            //hide modal
            hideModalAddEdit();
            //reset page
            dispatch(actions.getList(filterData));
            dispatch(actions.getGuild());
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
    if (action === "edit") {
      const formSave = new FormData();
      formSave.append("updateCoQuanDonVi", JSON.stringify(data));
      // if (FileData.name) {
      formSave.append("files", FileData);
      // }
      formDataCaller(apiUrl.suaqlthuvien, formSave)
        .then((response) => {
          setConfirmLoading(false);
          if (response.data.Status > 0) {
            //message success
            message.success("Cập nhật thành công");
            //hide modal
            hideModalAddEdit();
            //reset page
            dispatch(actions.getList(filterData));
            dispatch(actions.getGuild());
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

  const renderThaoTac = (record) => {
    return (
      <div className={"action-btn"}>
        {/* {role?.edit ? ( */}
        <Tooltip title={"Sửa"}>
          <EditOutlined onClick={() => showModalEdit(record.ID)} />
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
  const { DanhSachKhachHang, DanhSachDMThuVien, TotalRow, role } = props;
  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();

  const columns = [
    {
      title: "Số thứ tự",
      width: "10%",
      align: "center",
      render: (text, record, index) => (
        <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>
      ),
    },
    {
      title: "Tên khách hàng",
      dataIndex: "Ten",
      align: "left",
      width: "25%",
    },
    {
      title: "Địa chỉ",
      dataIndex: "DiaChi",
      align: "left",
      width: "20%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "DienThoai",
      align: "left",
      width: "15%",
    },
    {
      title: "Email",
      dataIndex: "Email",
      align: "left",
      width: "15%",
    },
    {
      title: "Mã cơ quan",
      dataIndex: "MaCQ",
      align: "left",
      width: "15%",
    },
    {
      title: "Trạng thái",
      dataIndex: "IsStatus",
      align: "center",
      width: "10%",
      render: (IsStatus) => {
        if (IsStatus === true) {
          return <span>Triển khai</span>;
        } else if (IsStatus === false) {
          return <span>Không triển khai</span>;
        } else {
          return <span>Trạng thái khác</span>; // Handle any other values if necessary
        }
      },
    },
    {
      title: "Thao tác",
      width: "10%",
      align: "center",
      margin: "15px",
      render: (text, record) => renderThaoTac(record),
    },
  ];
  return (
    <LayoutWrapper>
      <PageWrap>
        {/* <PageHeader>Danh Mục Khách Hàng</PageHeader> */}
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
            placeholder={"Nhập tên khách hàng"}
            style={{ width: 300 }}
            onSearch={(value) => onFilter(value, "Keyword")}
            allowClear
          />
        </BoxFilter>
        <BoxTable
          columns={columns}
          dataSource={DanhSachKhachHang}
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
        danhSachDMThuVien={DanhSachDMThuVien}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.DMKhachHang,
    role: getRoleByKey(state.Auth.role, "danh-muc-chuc-vu"),
  };
}

export default connect(mapStateToProps, actions)(DMKhachHang);
