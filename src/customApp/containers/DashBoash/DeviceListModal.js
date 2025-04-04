import React from "react";
import { Modal } from "antd";
import {
  FaHdd,
  FaMapMarkedAlt,
  FaMemory,
  FaThermometerHalf,
} from "react-icons/fa";

const DeviceListModal = ({
  visible,
  onCancel,
  title,
  devices = [],
  onViewDeviceDetail,
}) => {
  return (
    <Modal
      title={
        <h2 className="m-0 text-xl font-semibold text-gray-800">{title}</h2>
      }
      open={visible}
      footer={null}
      onCancel={onCancel}
      width={800}
      bodyStyle={{ padding: "25px" }}
    >
      <div
        className="grid gap-5 p-1"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        }}
      >
        {devices.map((device, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => onViewDeviceDetail(device.id || index)}
          >
            <div
              className="border-l-4 px-4 py-3"
              style={{
                borderLeftColor:
                  device.status === "active"
                    ? "#4CAF50"
                    : device.status === "paused"
                    ? "#FF9800"
                    : "#F44336",
              }}
            >
              <div className="flex items-center mb-2">
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${
                    device.status === "active"
                      ? "bg-green-500"
                      : device.status === "paused"
                      ? "bg-orange-500"
                      : "bg-red-500"
                  }`}
                ></div>
                <span
                  className={`text-sm ${
                    device.status === "active"
                      ? "text-green-500"
                      : device.status === "paused"
                      ? "text-orange-500"
                      : "text-red-500"
                  }`}
                >
                  {device.status === "active"
                    ? "Hoạt động"
                    : device.status === "paused"
                    ? "Tạm dừng"
                    : "Hết hạn"}
                </span>
              </div>

              <h3 className="font-medium text-lg mb-2">{device.name}</h3>

              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                <div className="flex items-center">
                  <FaThermometerHalf className="text-blue-500 mr-2" />
                  <span>{device.temperature || "38°C"}</span>
                </div>
                <div className="flex items-center">
                  <FaMemory className="text-purple-500 mr-2" />
                  <span>{device.ram || "4GB"}</span>
                </div>
                <div className="flex items-center">
                  <FaHdd className="text-purple-500 mr-2" />
                  <span>{device.storage || "32GB"}</span>
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-600 mt-3">
                <FaMapMarkedAlt className="text-red-500 mr-2" />
                <span className="truncate">{device.location}</span>
              </div>
            </div>
          </div>
        ))}
        {devices.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-500">
            Không có thiết bị nào
          </div>
        )}
      </div>
    </Modal>
  );
};

export default DeviceListModal;
