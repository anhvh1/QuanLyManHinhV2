// src/components/Footer.js
import React from "react";
import { FooterContainer } from "../styled";
import { Link } from "react-router-dom";

const Footer = ({ css }) => {
  const { spaceSection } = css;
  const classWrapList = "flex flex-col gap-2 pt-4 md:pt-8";
  const classWrapItem = "text-sm lg:text-base xl:text-lg";
  const classWrapTitle =
    "text-sm md:text-base lg:text-lg xl:text-xl font-semibold";
  const hoverLink = "hover:text-sky-500 transition-all";
  return (
    <footer
      className={`px-5 sm:px-10 md:px-20 lg:px-10 xl:px-20 pt-8 md:pt-16 py-0 md:py-10 bg-slate-100`}
      id="footer"
    >
      <div className="max-w-screen-xl mx-auto">
        <h3
          className="text-xl lg:text-3xl font-semibold italic"
          style={{ color: "rgb(41, 112, 219)" }}
        >
          Go SmartSignage
        </h3>
        <div className="footer-container grid grid-cols-1 lg:grid-cols-[195px_auto_auto] gap-7 lg:gap-12 pt-5 md:pt-10 justify-items-between sm:px-0">
          <div className="footer-item flex items-center lg:inline-block gap-10">
            <p className={classWrapTitle}>Kết nối với chúng tôi</p>
            <div
              className={`flex gap-2 pt-0 lg:pt-8 flex-row lg:flex-col flex-1 justify-around`}
            >
              <a
                href="https://benhvienthammydonga.vn/wp-content/uploads/2022/09/ve-dep-cuon-hut-cua-cap-ni-khac-tu.jpg"
                target="_blank"
                className={`${classWrapItem} ${hoverLink}`}
              >
                Instagram
              </a>
              <a
                href="https://benhvienthammydonga.vn/wp-content/uploads/2022/09/ve-dep-cuon-hut-cua-cap-ni-khac-tu.jpg"
                target="_blank"
                className={`${classWrapItem} ${hoverLink}`}
              >
                Twitter
              </a>
              <a
                href="https://benhvienthammydonga.vn/wp-content/uploads/2022/09/ve-dep-cuon-hut-cua-cap-ni-khac-tu.jpg"
                target="_blank"
                className={`${classWrapItem} ${hoverLink}`}
              >
                Facebook
              </a>
              <a
                href="https://benhvienthammydonga.vn/wp-content/uploads/2022/09/ve-dep-cuon-hut-cua-cap-ni-khac-tu.jpg"
                target="_blank"
                className={`${classWrapItem} ${hoverLink}`}
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div className="footer-item">
            <p className={classWrapTitle}>Hà nội</p>
            <div className={classWrapList}>
              <p className={classWrapItem}>
                Địa chỉ: Số 18, ngõ 172/ 69 Phú Diễn, P. Phú Diễn, Q. Bắc Từ
                Liêm, Hà Nội
              </p>
              <p className={classWrapItem}>Điện thoại: 098.676.0010</p>
              <p className={classWrapItem}>Email: info@lightjsc.com</p>
            </div>
          </div>
          <div className="footer-item">
            <p className={classWrapTitle}>TP HỒ CHÍ MINH</p>
            <div className={classWrapList}>
              <p className={classWrapItem}>
                Địa chỉ: 01-02C Tầng Trệt, Block B3 - Eratown, Đường D8, Phường
                Phú Mỹ, Quận 7, TP.HCM
              </p>
              <p className={classWrapItem}>Điện thoại: 0799.999.978</p>
              <p className={classWrapItem}>Email: info@lightjsc.com</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
