import styled from "styled-components";
export const ContentTable = styled.div`
  width: 100%;
  height: calc(100vh - 450px);
  .table-columns {
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 50px; /* Khoảng cách giữa các cột */
  }
  .table-columns.two-items {
    justify-content: flex-start; /* Không sử dụng space-between khi có 2 giá trị */
  }
  .table-columns.three-items {
    justify-content: space-evenly; /* Không sử dụng space-between khi có 2 giá trị */
  }

  .column {
    background: #3a59e533;
    max-width: 20%;
    height: calc(100vh - 450px);
    color: #ffffffcc;
  }
  .table-columns-left {
  }

  .custom-pagination {
    display: flex; /* Căn chỉnh các phần tử theo chiều ngang */
    justify-content: center; /* Căn giữa pagination */
    align-items: center; /* Căn giữa theo chiều dọc */
    margin-top: 20px; /* Khoảng cách phía trên */
    gap: 8px; /* Khoảng cách giữa các phần tử pagination */
  }

  .custom-pagination .ant-pagination-item {
    border: 1px solid #ffffff1a; /* Viền nhạt */
    border-radius: 4px; /* Bo góc nhẹ */
    background-color: #ffffff1a; /* Màu nền */
  }

  .custom-pagination .ant-pagination-item:hover {
    border-color: #192168; /* Đổi màu viền khi hover */
    background-color: #192168; /* Đổi màu nền khi hover */
  }

  .custom-pagination .ant-pagination-item-active {
    border-color: #192168; /* Màu viền cho item đang được chọn */
    background-color: #192168; /* Màu nền cho item đang được chọn */
  }

  .custom-pagination .ant-pagination-prev,
  .custom-pagination .ant-pagination-next {
    border: none; /* Xóa viền cho nút trước/sau */
    font-size: 14px; /* Kích thước chữ */
    color: #ffffff; /* Màu chữ */
  }

  .custom-pagination .ant-pagination-prev:hover,
  .custom-pagination .ant-pagination-next:hover {
    color: #ffffff; /* Màu chữ khi hover */
  }
  .ant-pagination .ant-pagination-item a {
    display: block;
    padding: 0 6px;
    color: #ffffff;
  }
  .anticon {
    display: inline-flex;
    align-items: center;
    color: #c5c2c2;
    font-style: normal;
    line-height: 0;
    text-align: center;
    text-transform: none;
    vertical-align: -0.125em;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .table-columns-left-top {
    height: 30px;
    padding: 10px;
  }
  .table-columns-left-img {
    height: 300px;
    padding: 5px;
  }
  .table-columns-left-bottom {
    padding: 15px;
    height: 70px;
    display: flex;
    justify-content: space-between;
  }
  .table-columns-left-no {
    background: #ffffff;
    height: calc(100vh - 500px);
  }
  .ant-switch {
    border-radius: 100px;
  }
  .table-columns-text {
    font-size: 15px;
    padding-top: 2px;
  }
  .table-columns-text-ten {
    font-size: 15px;
    padding-top: 2px;
    overflow: hidden; /* Ẩn phần chữ vượt quá */
    white-space: nowrap; /* Không cho chữ xuống dòng */
    text-overflow: ellipsis; /* Hiệu ứng ba chấm */
    max-width: 90px; /* Giới hạn chiều rộng tối đa */
  }
`;
export const RedTree = styled.div`
  .ant-tree
    .ant-tree-treenode:not(.ant-tree .ant-tree-treenode-disabled).filter-node
    .ant-tree-title {
    color: red;
  }
  span.ant-tree-iconEle.ant-tree-icon__customize {
    display: none !important;
  }
`;

export const StyledModalCoQuan = styled.div`
  @media (min-width: 1024px) {
    .checkbox-coquan {
      width: 88%;
      float: right;
    }
  }
`;

export const StyledBoxDMChiTieu = styled.div`
  width: 100%;
  .mg-top {
    margin-top: 20px;
    height: calc(100vh - 365px);
    overflow: scroll;
  }
`;
const layout = {
  colFull: {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 24,
  },
  colHaft: {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 12,
    xl: 12,
  },
  colThirt: {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 8,
    xl: 8,
  },
  colCustom1: {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 9,
    xl: 9,
  },
  colCustom2: {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 7,
    xl: 7,
  },
  colCustom3: {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 8,
    xl: 8,
  },
  formItem1: {
    labelCol: {
      xs: 3,
      sm: 3,
      md: 3,
      lg: 3,
      xl: 3,
    },
    wrapperCol: {
      xs: 21,
      sm: 21,
      md: 21,
      lg: 21,
      xl: 21,
    },
    labelAlign: "left",
  },
  formItem2: {
    labelCol: {
      xs: 6,
      sm: 6,
      md: 6,
      lg: 6,
      xl: 6,
    },
    wrapperCol: {
      xs: 18,
      sm: 18,
      md: 18,
      lg: 18,
      xl: 18,
    },
    labelAlign: "left",
  },
  formItem3: {
    labelCol: {
      xs: 9,
      sm: 9,
      md: 9,
      lg: 9,
      xl: 9,
    },
    wrapperCol: {
      xs: 16,
      sm: 16,
      md: 16,
      lg: 16,
      xl: 16,
    },
    // labelAlign: "right",
  },
  formItem2_1: {
    labelCol: {
      xs: 6,
      sm: 6,
      md: 6,
      lg: 6,
      xl: 6,
    },
    wrapperCol: {
      xs: 18,
      sm: 18,
      md: 18,
      lg: 18,
      xl: 18,
    },
  },
  formItem3_1: {
    labelCol: {
      xs: 8,
      sm: 8,
      md: 8,
      lg: 8,
      xl: 8,
    },
    wrapperCol: {
      xs: 15,
      sm: 15,
      md: 15,
      lg: 15,
      xl: 15,
    },
  },
  formItem3_3: {
    labelCol: {
      xs: 5,
      sm: 5,
      md: 5,
      lg: 5,
      xl: 5,
    },
    wrapperCol: {
      xs: 18,
      sm: 18,
      md: 18,
      lg: 18,
      xl: 18,
    },
  },
};

export default layout;
