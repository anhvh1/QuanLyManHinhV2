import { Modal, Table, Tooltip, message, Row, Col, Spin } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import actions from "../../redux/DashBoard/action";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import {
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaDesktop,
  FaPauseCircle,
  FaTimesCircle,
} from "react-icons/fa";
import Box from "../../../components/utility/box";
import api from "./config";
import {
  Button,
  DatePicker,
  InputSearch,
  Option,
  Select,
} from "../../../components/uielements/exportComponent";
import {
  changeUrlFilter,
  getFilterData,
  getRoleByKey,
} from "../../../helpers/utility";

import { Modals } from "./modalStates";
import DeviceListModal from "./DeviceListModal";
import DeviceDetailModal from "./DeviceDetailModal";
import ScheduleDetailModal from "./ScheduleDetailModal";
const DashBoard = (props) => {
  document.title = "Dashboard";
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return `Tháng ${now.getMonth() + 1}, ${now.getFullYear()}`;
  });
  const deviceStatusChartRef = useRef(null);
  const deviceGroupsChartRef = useRef(null);

  // Modal states
  const [deviceListModalVisible, setDeviceListModalVisible] = useState(false);
  const [deviceDetailModalVisible, setDeviceDetailModalVisible] =
    useState(false);
  const [scheduleDetailModalVisible, setScheduleDetailModalVisible] =
    useState(false);

  // Modal data states
  const [deviceListTitle, setDeviceListTitle] = useState("");
  const [deviceList, setDeviceList] = useState([]);
  const [deviceDetail, setDeviceDetail] = useState({
    name: "",
    status: "",
    location: "",
    code: "",
    mac: "",
  });
  const [scheduleDetail, setScheduleDetail] = useState({
    title: "",
    date: "",
    events: [],
  });

  // Calendar data
  const [calendarDays, setCalendarDays] = useState([]);
  const dispatch = useDispatch();
  const { dataDB, loadingDB } = useSelector((state) => state.DashBoard);
  console.log(dataDB, loadingDB, "dataDB, loadingDB");
  useEffect(() => {
    dispatch(actions.getInit());
  }, []);

  useEffect(() => {
    // Initialize charts when component mounts
    if (typeof window !== "undefined" && dataDB) {
      initializeCharts();
      generateCalendarData();
    }
  }, [currentMonth, dataDB]);

  const initializeCharts = () => {
    // Device Status Chart
    const deviceStatusCtx = document
      .getElementById("deviceStatusChart")
      ?.getContext("2d");
    if (deviceStatusCtx && dataDB) {
      if (deviceStatusChartRef.current) {
        deviceStatusChartRef.current.destroy();
      }
      deviceStatusChartRef.current = new Chart(deviceStatusCtx, {
        type: "doughnut",
        data: {
          labels: ["Hoạt động", "Tạm dừng", "Hết hạn"],
          datasets: [
            {
              data: [
                dataDB.TongSoThietBiOnline || 0,
                dataDB.TongSoThietBiOffline || 0,
                dataDB.TongSoThietBiHetHan || 0,
              ],
              backgroundColor: ["#4CAF50", "#FF9800", "#F44336"],
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "70%",
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }

    // Device Groups Chart
    const deviceGroupsCtx = document
      .getElementById("deviceGroupsChart")
      ?.getContext("2d");
    if (deviceGroupsCtx) {
      if (deviceGroupsChartRef.current) {
        deviceGroupsChartRef.current.destroy();
      }
      deviceGroupsChartRef.current = new Chart(deviceGroupsCtx, {
        type: "bar",
        data: {
          labels: ["Nhóm Đông", "Nhóm Tây", "Nhóm Nam", "Nhóm Bắc"],
          datasets: [
            {
              label: "Số thiết bị",
              data: [1, 2, 1, 1],
              backgroundColor: "#3498db",
              borderRadius: 5,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0,
              },
            },
          },
        },
      });
    }
  };

  // Generate calendar data based on current month
  const generateCalendarData = () => {
    // Parse month and year from currentMonth string
    const monthMatch = currentMonth.match(/Tháng (\d+), (\d+)/);
    if (!monthMatch || !dataDB || !dataDB.LichPhats) return;

    const month = parseInt(monthMatch[1], 10) - 1; // 0-based month
    const year = parseInt(monthMatch[2], 10);

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay(); // 0 = Sunday

    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push({ day: "", events: [] });
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, events: [] });
    }

    // Process events from API data
    if (dataDB.LichPhats && dataDB.LichPhats.length > 0) {
      dataDB.LichPhats.forEach((event) => {
        // Determine color based on event type
        let color = "#4CAF50"; // Default green
        if (event.LoaiSuKien === 2) {
          color = "#2196F3"; // Blue for Media
        } else if (event.LoaiSuKien === 3) {
          color = "#E91E63"; // Pink for other types
        }

        if (event.ChiaNgay === true) {
          // For events with ChiaNgay = true, display on specific NgayPhat date
          if (event.NgayPhat) {
            const eventDate = new Date(event.NgayPhat);
            // Check if event is in the current month/year
            if (
              eventDate.getMonth() === month &&
              eventDate.getFullYear() === year
            ) {
              const day = eventDate.getDate();
              const dayIndex = day + startingDay - 1;

              // Add event to the day
              if (
                dayIndex >= 0 &&
                dayIndex < days.length &&
                days[dayIndex].day !== ""
              ) {
                days[dayIndex].events.push({
                  title: event.TenLichPhat,
                  time: `${event.GioBatDau?.substring(0, 5) || "00:00"} - ${
                    event.GioKetThuc?.substring(0, 5) || "23:59"
                  }`,
                  color: color,
                  eventData: event, // Store full event data for modal
                });
              }
            }
          }
        } else {
          // For events with ChiaNgay = false, display on all days from CreatedDate to EndDate
          if (event.CreatedDate && event.EndDate) {
            const startDate = new Date(event.CreatedDate);
            const endDate = new Date(event.EndDate);
            
            // Current month's date range
            const currentMonthStart = new Date(year, month, 1);
            const currentMonthEnd = new Date(year, month + 1, 0);
            
            // Check if event period overlaps with current month
            if (startDate <= currentMonthEnd && endDate >= currentMonthStart) {
              // Calculate the range of days to display the event in current month
              const rangeStart = startDate > currentMonthStart ? startDate : currentMonthStart;
              const rangeEnd = endDate < currentMonthEnd ? endDate : currentMonthEnd;
              
              // Add event to all days in the range
              for (let date = new Date(rangeStart); date <= rangeEnd; date.setDate(date.getDate() + 1)) {
                if (date.getMonth() === month && date.getFullYear() === year) {
                  const day = date.getDate();
                  const dayIndex = day + startingDay - 1;
                  
                  if (
                    dayIndex >= 0 &&
                    dayIndex < days.length &&
                    days[dayIndex].day !== ""
                  ) {
                    days[dayIndex].events.push({
                      title: event.TenLichPhat,
                      time: `${event.GioBatDau?.substring(0, 5) || "00:00"} - ${
                        event.GioKetThuc?.substring(0, 5) || "23:59"
                      }`,
                      color: color,
                      eventData: event, // Store full event data for modal
                    });
                  }
                }
              }
            }
          }
        }
      });
    }

    setCalendarDays(days);
  };

  // Helper function to get mock events for a specific month
  const getMockEventsForMonth = (month, year) => {
    // Different events for different months
    const eventsMap = {
      // January
      0: {
        5: [
          {
            title: "Lịch phát quảng cáo tháng 1",
            time: "08:00 - 17:00",
            color: "#4CAF50",
          },
        ],
        12: [
          { title: "Sự kiện đầu năm", time: "09:00 - 11:30", color: "#2196F3" },
        ],
        25: [
          {
            title: "Lịch phát thông báo",
            time: "08:00 - 21:00",
            color: "#E91E63",
          },
        ],
      },
      // February
      1: {
        3: [
          {
            title: "Lịch phát quảng cáo tháng 2",
            time: "08:00 - 17:00",
            color: "#4CAF50",
          },
        ],
        14: [
          {
            title: "Sự kiện Valentine",
            time: "09:00 - 23:00",
            color: "#E91E63",
          },
        ],
        20: [
          {
            title: "Lịch phát thông báo",
            time: "08:00 - 21:00",
            color: "#2196F3",
          },
        ],
      },
      // March
      2: {
        8: [
          {
            title: "Lịch phát quảng cáo tháng 3",
            time: "08:00 - 17:00",
            color: "#4CAF50",
          },
        ],
        15: [
          {
            title: "Sự kiện mùa xuân",
            time: "09:00 - 11:30",
            color: "#2196F3",
          },
        ],
        28: [
          {
            title: "Lịch phát thông báo",
            time: "08:00 - 21:00",
            color: "#E91E63",
          },
        ],
      },
      // April
      3: {
        3: [
          {
            title: "Lịch phát quảng cáo tháng 4",
            time: "08:00 - 17:00",
            color: "#4CAF50",
          },
        ],
        10: [
          {
            title: "Lịch phát sự kiện",
            time: "09:00 - 11:30",
            color: "#2196F3",
          },
        ],
        15: [
          { title: "Meeting", time: "9:00 - 10:30", color: "#2196F3" },
          { title: "Presentation", time: "13:00 - 14:00", color: "#4CAF50" },
        ],
        30: [
          {
            title: "Lịch phát thông báo sự kiện",
            time: "08:00 - 21:00",
            color: "#E91E63",
          },
        ],
      },
      // May
      4: {
        1: [
          {
            title: "Lịch phát quảng cáo tháng 5",
            time: "08:00 - 17:00",
            color: "#4CAF50",
          },
        ],
        12: [
          { title: "Sự kiện mùa hè", time: "09:00 - 11:30", color: "#2196F3" },
        ],
        25: [
          {
            title: "Lịch phát thông báo",
            time: "08:00 - 21:00",
            color: "#E91E63",
          },
        ],
      },
    };

    return eventsMap[month] || {};
  };

  // Function to navigate to previous month
  const goToPreviousMonth = () => {
    const monthMatch = currentMonth.match(/Tháng (\d+), (\d+)/);
    if (!monthMatch) return;

    let month = parseInt(monthMatch[1], 10);
    let year = parseInt(monthMatch[2], 10);

    month--;
    if (month < 1) {
      month = 12;
      year--;
    }

    setCurrentMonth(`Tháng ${month}, ${year}`);
  };

  // Function to navigate to next month
  const goToNextMonth = () => {
    const monthMatch = currentMonth.match(/Tháng (\d+), (\d+)/);
    if (!monthMatch) return;

    let month = parseInt(monthMatch[1], 10);
    let year = parseInt(monthMatch[2], 10);

    month++;
    if (month > 12) {
      month = 1;
      year++;
    }

    setCurrentMonth(`Tháng ${month}, ${year}`);
  };

  // Functions to show modals
  const showDeviceListModal = (status) => {
    const statusText =
      status === "active"
        ? "đang hoạt động"
        : status === "paused"
        ? "tạm dừng"
        : status === "all"
        ? ""
        : "hết hạn";

    // Map status to API type parameter
    const typeParam =
      status === "active"
        ? 1
        : status === "paused"
        ? 2
        : status === "expired"
        ? 3
        : 0;

    // Set loading state
    setDeviceList([]);
    setDeviceListModalVisible(true);
    setDeviceListTitle(`Tổng danh sách thiết bị ${statusText}`);

    // Call API to get device list
    api
      .GetDevice({ type: typeParam })
      .then((res) => {
        console.log(res, "res");
        if (res && res.data.Status > 0) {
          // Transform API data to match our device list format
          const devices = res.data.Data.map((device) => ({
            ...device,
            id: device.ThietBiID || device.ID,
            name: device.TenManHinh,
            status: status,
            location: device.DiaChi || device.ViTri || "Địa chỉ trống",
            // temperature: device.NhietDo || "38°C",
            // ram: device.RAM || "4GB",
            // storage: device.BoNho || "32GB",
            // code: device.MaThietBi || "",
            // mac: device.MAC || "",
          }));
          setDeviceList(devices);
        } else {
          // If API fails, show error message
          message.error("Không thể tải danh sách thiết bị");
          setDeviceList([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching device list:", error);
        message.error("Lỗi khi tải danh sách thiết bị");
        setDeviceList([]);
      });
  };

  const showDeviceDetailModal = (ManHinhID) => {
    // In a real app, you would fetch device details here based on deviceId
    // For now, we'll use mock data that matches the selected device
    const selectedDevice =
      deviceList.find((device) => device.ManHinhID === ManHinhID) ||
      deviceList[0];
    console.log(selectedDevice, "selectedDevice");
    const mockDevice = {
      ...selectedDevice,
      name: selectedDevice?.name || "Go 1 - Màn hình 65",
      status: selectedDevice?.status || "active",
      // location: selectedDevice?.location || "55 Tô Ngọc Vân, P12/Q3, Tp.HCM",
      // code: "MH001",
      // mac: "00:1B:44:11:3A:B7",
      // temperature: selectedDevice?.temperature || "38°C",
      // ram: selectedDevice?.ram || "4GB",
      // storage: selectedDevice?.storage || "32GB",
    };

    setDeviceDetail(mockDevice);
    setDeviceDetailModalVisible(true);
  };

  const showScheduleDetailModal = (date, events) => {
    setScheduleDetail({
      title: `Lịch phát ngày ${date}`,
      date: date,
      events: events.map((event) => ({
        ...event,
        // Include any additional processing needed for the modal
        eventType:
          event.eventData?.LoaiSuKien === 1
            ? "Danh Sách Phát"
            : event.eventData?.LoaiSuKien === 2
            ? "Media"
            : "Khác",
        contentName: event.eventData?.TenMediaORDanhSachPhat || "",
      })),
    });
    setScheduleDetailModalVisible(true);
  };

  return (
    <>
      <LayoutWrapper>
        <Box>
          <div className="dashboard-content">
            {/* Stats Overview - Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5 pt-2">
              <div
                className="bg-white rounded-lg p-5 flex items-center shadow-md hover:translate-y-[-5px] hover:shadow-lg transition duration-300 cursor-pointer"
                onClick={() => showDeviceListModal("all")}
              >
                <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center mr-4 text-xl text-white bg-blue-500">
                  <FaDesktop />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold m-0 mb-1">
                    {dataDB?.Tong || 0}
                  </h3>
                  <p className="m-0 text-gray-600 text-sm">Tổng thiết bị</p>
                </div>
              </div>

              <div
                className="bg-white rounded-lg p-5 flex items-center shadow-md hover:translate-y-[-5px] hover:shadow-lg transition duration-300 cursor-pointer"
                onClick={() => showDeviceListModal("active")}
              >
                <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center mr-4 text-xl text-white bg-green-500">
                  <FaCheckCircle />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold m-0 mb-1">
                    {dataDB?.TongSoThietBiOnline || 0}
                  </h3>
                  <p className="m-0 text-gray-600 text-sm">Đang hoạt động</p>
                </div>
              </div>

              <div
                className="bg-white rounded-lg p-5 flex items-center shadow-md hover:translate-y-[-5px] hover:shadow-lg transition duration-300 cursor-pointer"
                onClick={() => showDeviceListModal("paused")}
              >
                <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center mr-4 text-xl text-white bg-orange-500">
                  <FaPauseCircle />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold m-0 mb-1">
                    {dataDB?.TongSoThietBiOffline || 0}
                  </h3>
                  <p className="m-0 text-gray-600 text-sm">Tạm dừng</p>
                </div>
              </div>

              <div
                className="bg-white rounded-lg p-5 flex items-center shadow-md hover:translate-y-[-5px] hover:shadow-lg transition duration-300 cursor-pointer"
                onClick={() => showDeviceListModal("expired")}
              >
                <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center mr-4 text-xl text-white bg-red-500">
                  <FaTimesCircle />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold m-0 mb-1">
                    {dataDB?.TongSoThietBiHetHan || 0}
                  </h3>
                  <p className="m-0 text-gray-600 text-sm">Hết hạn</p>
                </div>
              </div>
            </div>

            {/* Charts Section - Responsive */}
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5"> */}
            {/* Device Status Chart */}
            {/* <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="m-0 text-lg font-medium">
                    Trạng thái thiết bị
                  </h2>
                  <div>
                    <button className="bg-transparent border-0 cursor-pointer text-gray-600 text-base">
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <div className="h-[250px] relative">
                    <canvas id="deviceStatusChart"></canvas>
                  </div>
                  <div className="flex justify-center mt-4 flex-wrap">
                    <div className="flex items-center mx-2.5">
                      <span className="w-3 h-3 rounded bg-green-500 mr-1.5"></span>
                      <span className="text-sm text-gray-600">
                        Hoạt động (2)
                      </span>
                    </div>
                    <div className="flex items-center mx-2.5">
                      <span className="w-3 h-3 rounded bg-orange-500 mr-1.5"></span>
                      <span className="text-sm text-gray-600">
                        Tạm dừng (2)
                      </span>
                    </div>
                    <div className="flex items-center mx-2.5">
                      <span className="w-3 h-3 rounded bg-red-500 mr-1.5"></span>
                      <span className="text-sm text-gray-600">Hết hạn (1)</span>
                    </div>
                  </div>
                </div>
              </div> */}

            {/* Device Groups Chart */}
            {/* <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="m-0 text-lg font-medium">
                    Thiết bị theo nhóm
                  </h2>
                  <div>
                    <button className="bg-transparent border-0 cursor-pointer text-gray-600 text-base">
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <div className="h-[250px] relative">
                    <canvas id="deviceGroupsChart"></canvas>
                  </div>
                </div>
              </div> */}
            {/* </div> */}

            {/* Schedule Calendar */}
            <div className="bg-white rounded-lg shadow-md  overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="m-0 text-lg font-medium">
                  Lịch phát trong tháng
                </h2>
                <div className="flex items-center gap-2.5">
                  <button
                    className="bg-transparent border-0 cursor-pointer text-gray-600 text-sm w-[30px] h-[30px] rounded-full flex items-center justify-center hover:bg-gray-100"
                    onClick={goToPreviousMonth}
                  >
                    <FaChevronLeft />
                  </button>
                  <span className="text-base font-medium">{currentMonth}</span>
                  <button
                    className="bg-transparent border-0 cursor-pointer text-gray-600 text-sm w-[30px] h-[30px] rounded-full flex items-center justify-center hover:bg-gray-100"
                    onClick={goToNextMonth}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
              <div className="relative p-4">
                <div className="grid grid-cols-7 gap-1 mb-1">
                  <div className="p-2 text-center font-medium text-gray-700 bg-gray-50 rounded">
                    CN
                  </div>
                  <div className="p-2 text-center font-medium text-gray-700 bg-gray-50 rounded">
                    T2
                  </div>
                  <div className="p-2 text-center font-medium text-gray-700 bg-gray-50 rounded">
                    T3
                  </div>
                  <div className="p-2 text-center font-medium text-gray-700 bg-gray-50 rounded">
                    T4
                  </div>
                  <div className="p-2 text-center font-medium text-gray-700 bg-gray-50 rounded">
                    T5
                  </div>
                  <div className="p-2 text-center font-medium text-gray-700 bg-gray-50 rounded">
                    T6
                  </div>
                  <div className="p-2 text-center font-medium text-gray-700 bg-gray-50 rounded">
                    T7
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1" id="calendarGrid">
                  {calendarDays.map((day, index) => (
                    <div
                      key={index}
                      className={`relative p-2 border border-gray-200 rounded-md min-h-[90px] ${
                        day.day
                          ? "cursor-pointer hover:bg-gray-50 hover:shadow-sm transition-all duration-200"
                          : "bg-gray-50/30"
                      } ${day.events.length > 0 ? "shadow-sm" : ""}`}
                      onClick={() =>
                        day.day && day.events.length > 0
                          ? showScheduleDetailModal(
                              `${day.day}/${
                                currentMonth.match(/Tháng (\d+), (\d+)/)[1]
                              }/${currentMonth.match(/Tháng (\d+), (\d+)/)[2]}`,
                              day.events
                            )
                          : null
                      }
                    >
                      <div
                        className={`text-center font-medium ${
                          day.day
                            ? index % 7 === 0
                              ? ""
                              : ""
                            : "text-gray-300"
                        }`}
                      >
                        {day.day}
                      </div>
                      {day.events.length > 0 && (
                        <div className="relative mt-2 flex flex-col gap-1">
                          {day.events.map((event, eventIndex) => (
                            <div
                              key={eventIndex}
                              className="py-1 px-2 rounded text-xs text-white cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap shadow-sm z-10 hover:brightness-110 transition-all"
                              style={{ backgroundColor: event.color }}
                            >
                              <div className="font-medium overflow-hidden text-ellipsis">
                                {event.title}
                              </div>
                              <div className="text-[10px] opacity-90">
                                {event.time}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Import modals from separate files */}
          <DeviceListModal
            visible={deviceListModalVisible}
            onCancel={() => setDeviceListModalVisible(false)}
            title={deviceListTitle}
            devices={deviceList}
            onViewDeviceDetail={showDeviceDetailModal}
          />

          <DeviceDetailModal
            visible={deviceDetailModalVisible}
            onCancel={() => setDeviceDetailModalVisible(false)}
            device={deviceDetail}
          />

          <ScheduleDetailModal
            visible={scheduleDetailModalVisible}
            onCancel={() => setScheduleDetailModalVisible(false)}
            schedule={scheduleDetail}
          />
        </Box>
      </LayoutWrapper>
    </>
  );
};

export default DashBoard;
