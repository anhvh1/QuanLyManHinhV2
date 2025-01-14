import actions from "../../../redux/DanhMuc/GiaoDienKhachHang/actions";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StyledButton, Layout, MenuContent } from "./styled";
import ThietBi from "./Content/ThietBi";
import Media from "./Content/Media";
import LichPhat from "./Content/LichPhat";
import DanhSachPhat from "./Content/DanhSachPhat";
import queryString from "query-string";
import {
  changeUrlFilter,
  exportExcel,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
} from "../../../../helpers/utility";
const QLDiSanTuLieu = (props) => {
  const [selectedButton, setSelectedButton] = useState(() => {
    const savedButtonName = localStorage.getItem("buttonName"); // Lấy giá trị từ localStorage
    return savedButtonName || "Thiết bị"; // Sử dụng giá trị từ localStorage hoặc giá trị mặc định
  });

  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );

  const handleClick = (buttonName) => {
    setSelectedButton(buttonName);
    localStorage.setItem("buttonName", buttonName);
    setFilterData(queryString.parse(props.location.search));
  };

  return (
    <Layout>
      <MenuContent>
        <StyledButton
          isSelected={selectedButton === "Thiết bị"}
          onClick={() => handleClick("Thiết bị")}
        >
          Thiết bị
        </StyledButton>

        <StyledButton
          isSelected={selectedButton === "Media"}
          onClick={() => handleClick("Media")}
        >
          Media
        </StyledButton>

        <StyledButton
          isSelected={selectedButton === "Danh sách phát"}
          onClick={() => handleClick("Danh sách phát")}
        >
          Danh sách phát
        </StyledButton>

        <StyledButton
          isSelected={selectedButton === "Lịch phát"}
          onClick={() => handleClick("Lịch phát")}
        >
          Lịch phát
        </StyledButton>
      </MenuContent>
      <div>
        {selectedButton === "Thiết bị" && (
          <ThietBi filterData={filterData} setFilterData={setFilterData} />
        )}
      </div>
      <div>
        {selectedButton === "Media" && (
          <Media filterData={filterData} setFilterData={setFilterData} />
        )}
      </div>
      <div>
        {selectedButton === "Lịch phát" && (
          <LichPhat filterData={filterData} setFilterData={setFilterData} />
        )}
      </div>
      <div>
        {selectedButton === "Danh sách phát" && (
          <DanhSachPhat filterData={filterData} setFilterData={setFilterData} />
        )}
      </div>
    </Layout>
  );
};

export default QLDiSanTuLieu;
