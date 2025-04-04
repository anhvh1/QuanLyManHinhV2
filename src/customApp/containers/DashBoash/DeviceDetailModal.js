import React from "react";
import { Modal } from "antd";
import {
  FaBarcode,
  FaCamera,
  FaHdd,
  FaMapMarked,
  FaMemory,
  FaNetworkWired,
  FaPlay,
  FaPowerOff,
  FaRedo,
  FaThermometerHalf,
} from "react-icons/fa";

const DeviceDetailModal = ({ visible, onCancel, device }) => {
  // Handler for device actions
  const handleResumeDevice = () => {
    console.log("Resuming device:", device.code);
    // Implement resume device logic
  };

  const handleRestartDevice = () => {
    console.log("Restarting device:", device.code);
    // Implement restart device logic
  };

  const handleShutdownDevice = () => {
    console.log("Shutting down device:", device.code);
    // Implement shutdown device logic
  };

  const handleCaptureDevice = () => {
    console.log("Capturing screenshot for device:", device.code);
    // Implement capture screenshot logic
  };

  return (
    <Modal
      title={
        <h2 className="m-0 text-xl font-semibold text-gray-800">
          {device.name}
        </h2>
      }
      open={visible}
      footer={null}
      onCancel={onCancel}
      width={800}
      bodyStyle={{ padding: "25px" }}
    >
      <div className="mb-6 flex items-center gap-4">
        <div
          className={`inline-flex items-center gap-2 py-2 px-4 rounded-full text-sm font-medium ${
            device.status === "active"
              ? "bg-green-100 text-green-500"
              : device.status === "paused"
              ? "bg-orange-100 text-orange-500"
              : "bg-red-100 text-red-500"
          }`}
        >
          <div className="w-2 h-2 rounded-full bg-current"></div>
          {device.status === "active" && "Đang hoạt động"}
          {device.status === "paused" && "Tạm dừng"}
          {device.status === "expired" && "Hết hạn"}
        </div>
      </div>

      <div className="flex items-center gap-2.5 mb-6 pb-5 border-b border-gray-200 text-base text-gray-600">
        <FaMapMarked className="text-red-500" />
        <span>{device.location}</span>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-5 text-gray-800">
          Thông tin thiết bị
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          <div className="flex flex-col gap-2 bg-gray-50 p-4 rounded-lg hover:translate-y-[-3px] hover:shadow-md transition duration-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaThermometerHalf className="text-blue-500" />
              <span>Nhiệt độ</span>
            </div>
            <div className="text-base font-semibold text-gray-800">
              {device.temperature || "38°C"}
            </div>
          </div>

          <div className="flex flex-col gap-2 bg-gray-50 p-4 rounded-lg hover:translate-y-[-3px] hover:shadow-md transition duration-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaMemory className="text-purple-500" />
              <span>RAM</span>
            </div>
            <div className="text-base font-semibold text-gray-800">
              {device.ram || "4GB"}
            </div>
          </div>

          <div className="flex flex-col gap-2 bg-gray-50 p-4 rounded-lg hover:translate-y-[-3px] hover:shadow-md transition duration-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaHdd className="text-teal-500" />
              <span>Bộ nhớ</span>
            </div>
            <div className="text-base font-semibold text-gray-800">
              {device.storage || "32GB"}
            </div>
          </div>

          <div className="flex flex-col gap-2 bg-gray-50 p-4 rounded-lg hover:translate-y-[-3px] hover:shadow-md transition duration-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaBarcode className="text-blue-500" />
              <span>Mã thiết bị</span>
            </div>
            <div className="text-base font-semibold text-gray-800">
              {device.code}
            </div>
          </div>

          <div className="flex flex-col gap-2 bg-gray-50 p-4 rounded-lg hover:translate-y-[-3px] hover:shadow-md transition duration-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaNetworkWired className="text-blue-500" />
              <span>Địa chỉ MAC</span>
            </div>
            <div className="text-base font-semibold text-gray-800">
              {device.mac}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 mb-8 rounded-lg overflow-hidden shadow-md">
        {device.screenshot && (
          <img
            src={device.screenshot}
            alt="Device Screenshot"
            className="w-full h-auto"
          />
        )}
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-6 pt-6 border-t border-gray-200">
        <button
          onClick={handleResumeDevice}
          className="bg-green-500 text-white border-0 rounded-lg py-3 px-5 flex items-center gap-2.5 cursor-pointer transition duration-200 font-medium hover:bg-green-600 hover:translate-y-[-3px]"
        >
          <FaPlay />
          <span>Mở lại thiết bị</span>
        </button>
        <button
          onClick={handleRestartDevice}
          className="bg-blue-500 text-white border-0 rounded-lg py-3 px-5 flex items-center gap-2.5 cursor-pointer transition duration-200 font-medium hover:bg-blue-600 hover:translate-y-[-3px]"
        >
          <FaRedo />
          <span>Khởi động lại</span>
        </button>
        <button
          onClick={handleShutdownDevice}
          className="bg-red-500 text-white border-0 rounded-lg py-3 px-5 flex items-center gap-2.5 cursor-pointer transition duration-200 font-medium hover:bg-red-600 hover:translate-y-[-3px]"
        >
          <FaPowerOff />
          <span>Tắt thiết bị</span>
        </button>
        <button
          onClick={handleCaptureDevice}
          className="bg-purple-600 text-white border-0 rounded-lg py-3 px-5 flex items-center gap-2.5 cursor-pointer transition duration-200 font-medium hover:bg-purple-700 hover:translate-y-[-3px]"
        >
          <FaCamera />
          <span>Chụp màn hình</span>
        </button>
      </div>
    </Modal>
  );
};

export default DeviceDetailModal;
