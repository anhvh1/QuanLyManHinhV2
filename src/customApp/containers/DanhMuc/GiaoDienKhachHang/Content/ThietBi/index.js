import { Modal, Table, Tooltip, message, Pagination, Flex } from "antd";
import actions from "../../../../../redux/DanhMuc/ContentThietBi/actions";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import LayoutWrapper from "../../../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../../../components/utility/pageHeader";
import PageAction from "../../../../../../components/utility/pageAction";
import Box from "../../../../../../components/utility/box";
import BoxFilter from "../../../../../../components/utility/boxFilter";
import BoxTable from "../../../../../../components/utility/boxTable";
import {
  Button,
  InputSearch,
  Select,
} from "../../../../../../components/uielements/exportComponent";
import Checkbox from "../../../../../../components/uielements/checkbox";
import {
  changeUrlFilter,
  exportExcel,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
} from "../../../../../../helpers/utility";
import { useKey } from "../../../../../CustomHook/useKey";
import queryString from "query-string";
import api from "./config";
import moment from "moment";
import ModalAddEdit from "./modalAddNhom";
import ModalAddThietBi from "./modalAddThietBi";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import PageWrap from "../../../../../../components/utility/PageWrap";
import { ContentTable } from "./styled";
import PositioningIcon from "../../../../../../components/utility/PositioningIcon";
import NoteIcon from "../../../../../../components/utility/NoteIcon";
import CameraIcon from "../../../../../../components/utility/CameraIcon";
import SettingIcon from "../../../../../../components/utility/SettingIcon";
import SlideViewer from "./SlideViewer";
const QuanLyManHinh = (props) => {
  const { filterData, setFilterData } = props;
  // const [filterData, setFilterData] = useState(
  //   queryString.parse(props.location.search),
  // );
  const [dataModalAddEdit, setDataModalAddEdit] = useState([]);
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [visibleModalAddThietBi, setVisibleModalAddThietBi] = useState(false);

  const [action, setAction] = useState("");
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3; // Number of items per page

  document.title = "Quản Lý Màn Hình";

  useEffect(() => {
    changeUrlFilter(filterData);
    props.getList(filterData);
  }, [filterData]);
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
    setVisibleModalAddEdit(true);
  };
  const showModalAddThietBi = () => {
    setAction("add");
    setVisibleModalAddThietBi(true);
  };
  const hideModalAddEdit = () => {
    setSelectedRowsKey([]);
    setDataModalAddEdit({});
    setVisibleModalAddEdit(false);
  };
  const hideModalAddThietBi = () => {
    setVisibleModalAddThietBi(false);
  };
  const { DanhSachManHinh, TotalRow, role } = props;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const [dataResult, setDataResult] = useState(null);
  console.log("dữ liệu cần hiển thị", dataResult);
  const paginatedData = dataResult?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <LayoutWrapper>
      <PageWrap>
        <PageAction>
          <div style={{ display: "flex" }} onClick={showModalAdd}>
            <SettingIcon />
            <div
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#FFFFFF",
                marginTop: "5px",
                marginLeft: "10px",
                cursor: "context-menu",
              }}
            >
              Quản lý nhóm thiết bị
            </div>
          </div>
        </PageAction>
      </PageWrap>
      <Box>
        <BoxFilter>
          <Select
            allowClear
            style={{ width: "200px" }}
            // defaultValue={filterData.LoaiSuKien}
            placeholder={"Nhóm thiết bị"}
            onChange={(value) => onFilter(value, "Status")}
          >
            <Option value={true}>Đang sử dụng</Option>
            <Option value={false}>Không sử dụng</Option>
          </Select>
          <InputSearch
            defaultValue={filterData?.Keyword}
            placeholder={"Tìm kiếm"}
            style={{ width: 300 }}
            onSearch={(value) => onFilter(value, "Keyword")}
            allowClear
          />
        </BoxFilter>
      </Box>
      <ContentTable>
        <div className="table-content">
          {paginatedData?.length > 0 ? (
            <div
              className={`table-columns ${
                paginatedData.length === 2 ? "two-items" : ""
              }`}
            >
              {paginatedData.map((item, index) => (
                <div className="column" key={index}>
                  <div className="table-columns-left">
                    <div className="table-columns-left-top">
                      {new Date(item.onlineLanCuoi).toLocaleString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </div>

                    <div className="table-columns-left-img">
                      {" "}
                      <div className="table-columns-left-no"></div>
                    </div>
                    <div className="table-columns-left-bottom">
                      {" "}
                      <CameraIcon />
                    </div>
                  </div>
                  <div className="table-columns-right">
                    <div className="table-columns-top">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <h2>{item.tenManHinh}</h2>
                        <Tooltip title={item.nhomManHinhs?.[0]?.TenNhom}>
                          <div>
                            {/* onClick={showModalAddThietBi} */}
                            <NoteIcon Note={item.nhomManHinhs?.[0]?.Mota} />
                          </div>
                        </Tooltip>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <h3 style={{ color: item.trangThai ? "green" : "red" }}>
                          {item.trangThai ? "Hoạt động" : "Tạm ngừng"}
                        </h3>

                        {item.diaChi && item.diaChi.length > 0 && (
                          <h3>
                            {item.diaChi}
                            <PositioningIcon />
                          </h3>
                        )}
                      </div>
                    </div>
                    <div className="table-columns-bottom">
                      <div className="table-columns-content">
                        <strong>Hardwarekey:</strong>
                        <span>{item.hardwareKey || "-"}</span>
                      </div>
                      <div className="table-columns-content">
                        <strong>Địa chỉ mac: </strong>{" "}
                        <span>{item.diaChiMac || "-"}</span>
                      </div>

                      <div className="table-columns-content">
                        <strong>Công suất:</strong> <span>{item.congSuat}</span>
                      </div>
                      <div className="table-columns-content">
                        <strong>Hiệu điện thế:</strong>{" "}
                        <span>{item.hieuDienThe}</span>
                      </div>
                      <div className="table-columns-content">
                        <strong>Dòng điện:</strong> <span>{item.dongDien}</span>
                      </div>
                      <div className="table-columns-content">
                        <strong>Nhiệt độ:</strong> <span>{item.nhietDo}</span>
                      </div>
                      <div className="table-columns-content">
                        <strong>Ram:</strong> <span>{item.ram}</span>
                      </div>
                      <div className="table-columns-content">
                        <strong>SSD:</strong> <span>{item.ssd}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>Không có dữ liệu</div>
          )}
        </div>
        <SlideViewer
          dataResult={dataResult}
          setDataResult={setDataResult}
          filterData={filterData}
        ></SlideViewer>

        <Pagination
          className="custom-pagination"
          current={currentPage}
          pageSize={pageSize}
          total={dataResult?.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </ContentTable>

      <ModalAddEdit
        visible={visibleModalAddEdit}
        dataEdit={dataModalAddEdit}
        action={action}
        loading={confirmLoading}
        onCancel={hideModalAddEdit}
      />
      <ModalAddThietBi
        visible={visibleModalAddThietBi}
        action={action}
        onCancel={hideModalAddThietBi}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.QuanLyManHinh,
    role: getRoleByKey(state.Auth.role, "danh-muc-chuc-vu"),
  };
}

export default connect(mapStateToProps, actions)(QuanLyManHinh);
