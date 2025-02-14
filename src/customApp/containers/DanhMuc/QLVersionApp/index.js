import React, { Component, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import queryString from "query-string";
import actions from "../../../redux/DanhMuc/QLVersionApp/actions";
import api, { apiUrl } from "./config";
import Constants from "../../../../settings/constants";
import { Link } from "react-router-dom";
import moment from "moment";

import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import BoxFilter from "../../../../components/utility/boxFilter";
import BoxTable from "../../../../components/utility/boxTable";
import actionsSidebar from "../../../redux/HeThong/Sidebar/actions";
import { ModalAddEdit } from "./modalAddEdit";
import { Modal, message, Input, Switch, Tooltip } from "antd";
import Button from "../../../../components/uielements/button";
import Select, { Option } from "../../../../components/uielements/select";
import {
  changeUrlFilter,
  getFilterData,
  getDefaultPageSize,
  getConfigLocal,
} from "../../../../helpers/utility";
import { formDataCaller } from "../../../../api/formDataCaller";
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  FileAddOutlined,
  PlusOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useKey } from "../../../CustomHook/useKey";
import PageWrap from "../../../../components/utility/PageWrap";
import { InputSearch } from "../../../../components/uielements/input";
const QLVersionApp = (props) => {
  document.title = "Quản lý Version App";
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalKey, increaseKey] = useKey();
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const { ListSideBar } = useSelector((state) => state.ListSideBar);
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [DanhSachCacCap, setDanhSachCacCap] = useState([]);
  const [action, setAction] = useState("");
  const dispatch = useDispatch();

  const getDanhSachCacCap = async () => {
    try {
      const res = await api.danhSachCacCapDonVi();
      setDanhSachCacCap(res.data.Data);
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(actions.getInitData(filterData));
    dispatch(actionsSidebar.getList());
    getDanhSachCacCap();
  }, []);

  useEffect(() => {
    changeUrlFilter(filterData); //change url
    props.getList(filterData); //get list
  }, [filterData]);

  const onFilter = (value, property) => {
    //get filter data
    let oldFilterData = { ...filterData };
    let onFilter = { value, property };
    let newFilterData = getFilterData(oldFilterData, onFilter, null);
    setFilterData(newFilterData);
  };
  //order, paging --------------------------------------------
  const onTableChange = (pagination, filters, sorter) => {
    //get filter data
    let oldFilterData = { ...filterData };
    let onOrder = { pagination, filters, sorter };
    let newFilterData = getFilterData(oldFilterData, null, onOrder);
    //get filter data
    setFilterData(newFilterData);
  };

  //Delete-----------------------------------------------------
  const deleteModalAddEdit = (ID) => {
    Modal.confirm({
      title: "Xóa dữ liệu",
      content: " Bạn có muốn xóa version này không?",
      cancelText: "Không",
      okText: "Có",

      onOk: () => {
        api
          .xoaVersionApp(ID)
          .then((response) => {
            if (response.data.Status > 0) {
              //message success
              message.success("Xóa thành công");
              //reset page
              dispatch(actions.getList(filterData));
              dispatch(actions.getGuild());
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
  };
  const showModalAdd = () => {
    setDataModalAddEdit({});
    setVisibleModalAddEdit(true);
    increaseKey();
    setAction("add");
  };

  const submitModalAddEdit = (data, FileData) => {
    setConfirmLoading(true);

    if (action === "add") {
      const formSave = new FormData();
      formSave.append("files", FileData);
      formSave.append("quanlyVersionstr", JSON.stringify(data));

      formDataCaller(apiUrl.themversionapp, formSave)
        .then((response) => {
          setConfirmLoading(false);
          if (response.data.Status > 0) {
            console.log("formSave", FileData);
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
    } else if (action === "edit") {
      const formSave = new FormData();
      formSave.append("quanlyVersionstr", JSON.stringify(data));
      if (FileData.name) {
        formSave.append("file", FileData);
      }
      formDataCaller(apiUrl.suaversionapp, formSave)
        .then((response) => {
          setConfirmLoading(false);
          if (response.data.Status > 0) {
            //message success
            console.log("formSave", FileData);
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
  const downloadData = async (record) => {
    try {
      const hienvatbaotang = await api.downloadFile({
        ID: record.ID,
      });

      if (hienvatbaotang && hienvatbaotang.data.Status > 0) {
        const Data = hienvatbaotang.data.Data;
        if (Data.UrlFile && Data.UrlFile !== "") {
          const link = document.createElement("a");
          link.href = Data.UrlFile;
          link.download = Data.TenFileGoc;
          link.target = "_blank";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } else {
        message.error("Không có dữ liệu");
      }
    } catch (error) {}
  };
  //Modal edit ------------------------------------------------
  const showModalEdit = (record) => {
    setDataModalAddEdit({
      Data: record,
      DanhSachVersionApp: [],
    });
    setVisibleModalAddEdit(true);
    increaseKey();
    setAction("edit");
  };

  const hideModalAddEdit = () => {
    setVisibleModalAddEdit(false);
    setDataModalAddEdit({});
  };
  const { DanhSachVersionApp, TotalRow, role } = props;

  //paging info
  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();
  //format table
  const iconStyle = { fontSize: 20, cursor: "pointer", margin: "0 10px" };
  const iconStyleDisable = {
    fontSize: 20,
    cursor: "default",
    margin: "0 10px",
    color: "grey",
  };
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
      title: "Tên ứng dụng",
      dataIndex: "Name",
      width: "25%",
      align: "center",
    },
    {
      title: "Version ",
      dataIndex: "Version",
      align: "center",
      width: "20%",
    },
    {
      title: "Ghi chú",
      dataIndex: "GhiChu",
      width: "20%",
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "Status ",
      align: "left",
      width: "10%",
      render: (text, record) => {
        return record.Status ? "Hoạt động" : "Không hoạt động"; // Assuming TrangThai is boolean
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
  const renderThaoTac = (record) => {
    return (
      <div className={"action-btn"}>
        {/* {role.edit ? ( */}

        {/* ) : (
          ''
        )} */}
        {/* {role.edit ? ( */}
        <Tooltip title={"Sửa"}>
          <EditOutlined onClick={() => showModalEdit(record)} />
        </Tooltip>
        {/* ) : (
          ''
        )} */}
        {/* {role.delete ? ( */}
        <Tooltip title={"Xóa"}>
          <DeleteOutlined onClick={() => deleteModalAddEdit(record.Id)} />
        </Tooltip>
        {/* ) : (
          ''
        )} */}
      </div>
    );
  };

  const { FileLimit } = props;
  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>Quản lý Version App</PageHeader>
        <PageAction>
          <Button type="primary" onClick={showModalAdd}>
            <PlusOutlined />
            Thêm mới{" "}
          </Button>
        </PageAction>
      </PageWrap>
      <Box>
        <BoxFilter>
          {/* <InputSearch
            allowClear={true}
            defaultValue={filterData.Keyword}
            placeholder="Nhập tên hiện vật bảo tàng"
            onSearch={(value) => onFilter(value, "Keyword")}
            style={{ width: 300 }}
          /> */}
        </BoxFilter>
        <BoxTable
          columns={columns}
          // rowKey="HuongDanSuDungID"
          dataSource={DanhSachVersionApp}
          loading={props.TableLoading}
          onChange={onTableChange}
          pagination={{
            showSizeChanger: true, //show text: PageSize/page
            showTotal: (total, range) =>
              `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
            total: TotalRow,
            current: PageNumber, //current page
            pageSize: PageSize,
          }}
        />
      </Box>
      <ModalAddEdit
        confirmLoading={confirmLoading}
        visible={visibleModalAddEdit}
        onCancel={hideModalAddEdit}
        onCreate={submitModalAddEdit}
        dataModalAddEdit={dataModalAddEdit}
        action={action}
        key={modalKey}
        FileLimit={FileLimit}
        actions={actions}
        DanhSachVersionApp={DanhSachVersionApp}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.QLVersionApp,
    FileLimit: getConfigLocal("fileLimit", 10),
  };
}

export default connect(mapStateToProps, actions)(QLVersionApp);
