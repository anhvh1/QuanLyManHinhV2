// src/components/Header.js
import React, { useState } from "react";
import { HeaderContainer, HeaderButton } from "../styled";
import { motion } from "framer-motion";
import api from "../config";
import { message } from "antd";
const Header = ({ background }) => {
  const heightConfig = "min-h-[700px] md:h-[100vh]";
  const [loadingDownload, setLoadingDownload] = useState(false);
  const handleDowloadLastestApp = () => {
    setLoadingDownload(true);
    api.Dowload().then((res) => {
      setLoadingDownload(false);
      if (res.data.Status) {
        const link = res.data.Data;
        const a = document.createElement("a");
        a.href = link;
        a.target = "_blank";
        a.click();
      } else {
        message.destroy();
        message.warning(res.data.Message);
      }
    });
  };
  return (
    <div id="header" className="lg:flex items-center">
      <div
        className={`w-screen flex-1 lg:mt-0 ${heightConfig} bg-no-repeat bg-cover `}
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className={`px-12 ${heightConfig} bg-black bg-opacity-50`}>
          <div className="max-w-screen-xl mx-auto">
            <div className={`${heightConfig} flex flex-col`}>
              <div className="pt-12">
                <p className="text-white text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold italic">
                  LightJSC
                </p>
              </div>

              <div className="flex-1 flex items-center md:justify-center">
                <div className="max-w-screen-xl md:mx-auto md:text-center">
                  {/* "GO SMARTSIGNAGE" trượt từ trái qua phải */}
                  <motion.div
                    whileInView={{ x: 0, opacity: 1 }} // Animation chỉ khi vào viewport
                    initial={{ x: -100, opacity: 0 }} // Vị trí ban đầu bên trái ngoài màn hình
                    transition={{
                      duration: 1, // Thời gian animation
                      ease: "easeOut", // Sử dụng easeOut để hiệu ứng trở nên mượt mà
                    }}
                  >
                    <p className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl text-white font-medium">
                      GO SMARTSIGNAGE
                    </p>
                  </motion.div>

                  {/* "Giải pháp quản lý màn hình quảng cáo" trượt từ dưới lên */}
                  <motion.div
                    whileInView={{ y: 0, opacity: 1 }} // Animation khi vào viewport
                    initial={{ y: 50, opacity: 0 }} // Vị trí ban đầu dưới màn hình
                    transition={{
                      duration: 1,
                      delay: 0.2, // Thêm độ trễ cho phần tử thứ hai
                      ease: "easeOut", // Mượt mà hơn với easing
                    }}
                  >
                    <p className="mt-3 text-base md:text-sm lg:text-lg xl:text-xl text-white">
                      Giải pháp quản lý màn hình quảng cáo trực tuyến hiệu quả
                      và linh hoạt
                    </p>
                  </motion.div>

                  {/* Nút "Tải ứng dụng" từ từ hiện ra */}
                  <motion.div
                    whileInView={{ opacity: 1 }} // Animation khi vào viewport
                    initial={{ opacity: 0 }} // Vị trí ban đầu ẩn
                    transition={{
                      duration: 1,
                      delay: 0.4, // Độ trễ để nút xuất hiện sau phần text
                      ease: "easeOut", // Mượt mà hơn với easing
                    }}
                    className="mt-12 md:mt-16 lg:mt-20 flex justify-center"
                  >
                    <button
                      onClick={
                        !loadingDownload ? handleDowloadLastestApp : null
                      } // Ngăn việc bấm khi đang tải
                      disabled={loadingDownload} // Vô hiệu hóa nút khi đang tải
                      className={`relative px-14 py-2 md:px-16 md:py-3 md:rounded-3xl lg:text-lg lg:px-24 lg:py-3 lg:rounded-3xl text-white rounded-2xl shadow transition-all flex items-center justify-center bg-blue-500 hover:bg-blue-600
    ${loadingDownload ? "bg-blue-400 cursor-not-allowed" : ""}`}
                    >
                      <span className={`${loadingDownload ? "mr-4" : ""}`}>
                        Tải ứng dụng
                      </span>
                      {loadingDownload && (
                        <svg
                          className="animate-spin h-5 w-5 absolute right-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          ></path>
                        </svg>
                      )}
                    </button>
                    {/* <button
                      onClick={handleDowloadLastestApp}
                      className="px-14 py-2 md:px-16 md:py-3 md:rounded-3xl lg:text-lg lg:px-24 lg:py-3 lg:rounded-3xl text-white bg-blue-500 rounded-2xl shadow hover:bg-blue-600 transition-all"
                    >
                      Tải ứng dụng
                    </button> */}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
