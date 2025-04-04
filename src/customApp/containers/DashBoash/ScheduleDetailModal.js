import React from "react";
import { Modal } from "antd";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

const ScheduleDetailModal = ({ visible, onCancel, schedule }) => {
  return (
    <Modal
      title={
        <h2 className="m-0 text-xl font-semibold text-gray-800">
          {schedule.title}
        </h2>
      }
      open={visible}
      footer={null}
      onCancel={onCancel}
      width={800}
      bodyStyle={{ padding: "25px" }}
    >
      <div className="mb-4">
        <div className="text-gray-600 mb-2">
          <FaCalendarAlt className="mr-2" />
          {schedule.date}
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Danh sách sự kiện</h3>
          {schedule.events && schedule.events.length > 0 ? (
            <div className="space-y-4">
              {schedule.events.map((event, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg"
                  style={{
                    borderLeft: `4px solid ${event.color || "#2196F3"}`,
                  }}
                >
                  <div className="font-medium text-lg">{event.title}</div>
                  <div className="text-gray-600 mt-1">
                    <FaClock className="mr-2" />
                    {event.time}
                  </div>
                  {event.description && (
                    <div className="mt-2 text-gray-700">
                      {event.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Không có sự kiện nào
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ScheduleDetailModal;
