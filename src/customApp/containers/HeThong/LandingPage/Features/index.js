// src/components/Features.js
import React from "react";
import { FeaturesContainer } from "../styled";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Features = ({ infoFeature, css }) => {
  const { cssTitle, spaceSection } = css;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Hiệu ứng chỉ kích hoạt một lần khi vào viewport
  const renderImageStar = (url) => (
    <motion.div
      ref={ref} // Gắn ref để theo dõi
      className="flex justify-center items-center" // Xóa h-screen
    >
      <motion.img
        className="h-[100px] w-[100px] sm:h-[70px] sm:w-[70px] lg:h-[100px] lg:w-[100px] xl:h-[130px] xl:w-[130px]"
        src={url}
        alt="star"
        initial={{ scale: 0.5, rotate: 0, opacity: 0 }} // Trạng thái ban đầu
        animate={
          isInView
            ? {
                scale: [1, 1.5, 1], // Phồng lên và trở lại kích thước ban đầu
                rotate: 1080, // Xoay 360 độ x 3 lần
                opacity: 1,
              }
            : {} // Không áp dụng animation nếu không trong viewport
        }
        transition={{
          duration: 3, // Tổng thời gian (2s mỗi vòng x 3 vòng)
          ease: "easeInOut",
          repeat: 0,
        }}
      />
    </motion.div>
  );

  const { Title, Items } = infoFeature;

  return (
    <div
      className="px-5 sm:px-10 md:px-20 lg:px-10 xl:px-20 py-8 "
      id="features"
    >
      <div className="max-w-screen-xl mx-auto">
        <h3 className={cssTitle}>{Title}</h3>

        <div
          className={`flex flex-col items-center sm:flex-row ${spaceSection} gap-12 sm:items-start`}
        >
          {Items &&
            Items.map((future) => (
              <div className="w-full max-w-sm flex flex-col">
                <div className="p-4 flex justify-center">
                  {renderImageStar(future.Url)}
                </div>
                <div className="text-sm font-normal text-center pt-5 lg:pt-10 flex-1 min-h-[60px] flex justify-center">
                  <p className="max-w-[80%] sm:max-w-[auto] text-lg sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                    {future.Content}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
