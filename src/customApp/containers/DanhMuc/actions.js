import React, { useState } from "react";
import { useKey } from "../../CustomHook/useKey";
import { message, Modal } from "antd";
import { getFilterData, changeUrlFilter } from "../../../helpers/utility";
import moment from "moment";
const actionsGroup = (
  filterData,
  setFilterData,
  api,
  actionProps,
  TotalRow
) => {
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState("");
  const [modalKey, inceaseModalKey] = useKey();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const onTableChange = (pagination, filters, sorter) => {
    let oldFilterData = filterData;
    let onOrder = { pagination, filters, sorter };
    let newFilterData = getFilterData(oldFilterData, null, onOrder);
    setFilterData(newFilterData);
  };
  // const onFilter = (value, property) => {

  //   let oldFilterData = filterData;
  //   let onFilter = {value, property};
  //   let newfilterData = getFilterData(oldFilterData, onFilter, null);
  //   setFilterData(newfilterData);
  // };
  const onFilter = (value, property) => {
    if (property === "GhiChu" && value) {
      value = moment(value).format("YYYY");
    }
    // get filter data
    let oldFilterData = filterData;
    let onFilter = { value, property };
    let newFilterData = getFilterData(oldFilterData, onFilter, null);
    // get filter data
    setFilterData(newFilterData);
    changeUrlFilter(newFilterData); // change url
    // props.getList(newFilterData); // get list
  };

  const deleteModalAddEdit = (ID) => {
    Modal.confirm({
      title: "Xóa Dữ Liệu",
      content: "Bạn có chắc chắn muốn xóa dữ liệu này không?",
      cancelText: "Không",
      okText: "Có",

      onOk: () => {
        setConfirmLoading(true);
        api
          .XoaDanhMucChung({ ListID: [ID] })
          .then((res) => {
            if (res.data.Status > 0) {
              setConfirmLoading(false);
              actionProps.getData({
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
  const showModalAdd = () => {
    setAction("add");
    setDataModalAddEdit({});
    inceaseModalKey();
    setVisibleModalAddEdit(true);
  };
  const showModalEdit = (ID) => {
    setAction("edit");
    api
      .ChiTietDanhMucChung({ ID })
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
    setDataModalAddEdit({});
    setVisibleModalAddEdit(false);
  };
  const submitModalAddEdit = (data) => {
    setConfirmLoading(true);
    if (action === "add") {
      api
        .ThemDanhSachChung(data)
        .then((res) => {
          setConfirmLoading(false);
          if (res.data.Status > 0) {
            message.destroy();
            message.success(res.data.Message);
            hideModalAddEdit();
            actionProps.getData(filterData);
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
        .SuaDanhMucChung(data)
        .then((res) => {
          if (res.data.Status > 0) {
            setConfirmLoading(false);
            message.destroy();
            message.success(res.data.Message);
            hideModalAddEdit();
            actionProps.getData(filterData);
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

  return {
    showModalAdd,
    showModalEdit,
    submitModalAddEdit,
    deleteModalAddEdit,
    onFilter,
    onTableChange,
    dataModalAddEdit,
    confirmLoading,
    visibleModalAddEdit,
    hideModalAddEdit,
    action,
    modalKey,
  };
};

export { actionsGroup };
