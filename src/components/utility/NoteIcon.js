import React from "react";

export default (props) => {
  // Lấy giá trị `fill` dựa trên giá trị của `props`
  const fillColor = (() => {
    switch (props.Note) {
      case '1':  // So sánh giá trị chuỗi '1'
        return "#5A34E3";
      case '2':  // So sánh giá trị chuỗi '2'
        return "#11AD2B";
      case '3':  // So sánh giá trị chuỗi '3'
        return "#E6391A";
      case '4':  // So sánh giá trị chuỗi '4'
        return "#C9D138";
      default:
        return "white"; // Giá trị mặc định nếu không khớp
    }
  })();


  return (
    <svg
      width="11"
      height="17"
      viewBox="0 0 11 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.956999 0.134296C0.772797 0.219315 0.605316 0.341639 0.463571 0.494682C0.316698 0.652624 0.200132 0.840412 0.120576 1.04725C0.0410203 1.25409 4.2936e-05 1.47591 0 1.69994L0 11.8996C0 12.152 0.103714 12.3908 0.282071 12.5532L4.99635 16.803C5.28785 17.0657 5.71135 17.0657 6.00285 16.803L10.7171 12.5532C10.8963 12.3908 11 12.152 11 11.8996L11 1.69994C11.0008 1.47739 10.9608 1.25687 10.8823 1.05116C10.8038 0.845444 10.6884 0.658613 10.5427 0.501482C10.3967 0.342598 10.2231 0.216499 10.0319 0.130438C9.8407 0.0443764 9.63566 4.57764e-05 9.42856 0H1.57143C1.36295 0 1.15814 0.0447655 0.956999 0.134296Z"
        fill={fillColor} // Sử dụng giá trị fillColor
      />
    </svg>
  );
};
