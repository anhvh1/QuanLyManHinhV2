import actions from "../../../redux/DanhMuc/GiaoDienKhachHang/actions";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StyledButton, Layout,MenuContent } from "./styled";
import Media from "./Content/Media";
import queryString from "query-string";
import {
  changeUrlFilter,
  exportExcel,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
} from '../../../../helpers/utility';
const QLDiSanTuLieu = (props) => {
  const [selectedButton, setSelectedButton] = useState("Thiết bị");
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );
  const handleClick = (buttonName) => {
    setSelectedButton(buttonName);
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
          <Media filterData={filterData} setFilterData={setFilterData} />
        )}
      </div>
    </Layout>
  );
};

export default QLDiSanTuLieu;
