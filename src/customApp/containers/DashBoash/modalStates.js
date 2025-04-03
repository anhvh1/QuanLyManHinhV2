import { useState, createContext, useContext } from 'react';

// Create context for modal states
const ModalContext = createContext();

// Provider component for modal states
export const ModalProvider = ({ children }) => {
  // Device List Modal
  const [deviceListModalVisible, setDeviceListModalVisible] = useState(false);
  const [deviceListTitle, setDeviceListTitle] = useState("");
  const [deviceList, setDeviceList] = useState([]);

  // Device Detail Modal
  const [deviceDetailModalVisible, setDeviceDetailModalVisible] = useState(false);
  const [deviceDetail, setDeviceDetail] = useState({
    name: "",
    status: "",
    location: "",
    code: "",
    mac: "",
  });

  // Schedule Detail Modal
  const [scheduleDetailModalVisible, setScheduleDetailModalVisible] = useState(false);
  const [scheduleDetail, setScheduleDetail] = useState({
    title: "",
    date: "",
    events: []
  });

  // Functions to show modals
  const showDeviceListModal = (title, devices = []) => {
    setDeviceListTitle(title);
    setDeviceList(devices);
    setDeviceListModalVisible(true);
  };

  const showDeviceDetailModal = (device) => {
    setDeviceDetail(device);
    setDeviceDetailModalVisible(true);
  };

  const showScheduleDetailModal = (schedule) => {
    setScheduleDetail(schedule);
    setScheduleDetailModalVisible(true);
  };

  // Value to be provided to consumers
  const value = {
    // Device List Modal
    deviceListModalVisible,
    setDeviceListModalVisible,
    deviceListTitle,
    deviceList,
    showDeviceListModal,

    // Device Detail Modal
    deviceDetailModalVisible,
    setDeviceDetailModalVisible,
    deviceDetail,
    showDeviceDetailModal,

    // Schedule Detail Modal
    scheduleDetailModalVisible,
    setScheduleDetailModalVisible,
    scheduleDetail,
    showScheduleDetailModal,
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

// Custom hook to use modal context
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};