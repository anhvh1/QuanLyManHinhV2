import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import {
  _debounce,
  getInfoFromToken,
  getLocalKey,
} from "../../../../../../helpers/utility";

const SlideViewer = ({
  dataResult,
  setDataResult,
  filterData,
  setfetchData,
  fetchData1,
}) => {
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const access_token = getLocalKey("access_token");
  const dataUnzip = getInfoFromToken(access_token);
  const CoQuanID = dataUnzip?.NguoiDung?.CoQuanID;
  const CanBoID = dataUnzip?.NguoiDung?.CanBoID;

  useEffect(() => {
    let connection = null;
    let reconnectTimer = null;
    const reconnectInterval = 10000; // Thời gian thử reconnect: 10 giây

    const filter = {
      Keyword: filterData.Keyword || "",
      PageSize: 100000,
      PageNumber: 1,
      Status: filterData.Status || null,
      NhomID: null,
      CoQuanID: CoQuanID,
    };
    const canboid = CanBoID;

    const fetchData = async () => {
      try {
        const result = await connection.invoke(
          "GetListDisplay",
          filter,
          canboid
        );
        setDataResult(result); // Lưu kết quả vào state
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    const startConnection = async () => {
      connection = new signalR.HubConnectionBuilder()
        .withUrl("https://displaycms.gosol.com.vn/slideHub", {
          withCredentials: false,
        })
        .build();

      try {
        await connection.start();
        setConnectionStatus("Connected");

        // Gọi API lần đầu khi kết nối thành công
        await fetchData();

        // Lắng nghe thông điệp từ server
        connection.on("RequestType", async (data) => {
          if (data.requestType === 4) {
            await fetchData(); // Gọi lại API khi nhận được requestType = 4
          }
        });
      } catch (err) {
        console.error(`SignalR connection failed for device:`, err);
        setConnectionStatus("Disconnected");
        scheduleReconnect(); // Thử reconnect
      }

      // Xử lý khi mất kết nối
      connection.onclose(() => {
        setConnectionStatus("Disconnected");
        scheduleReconnect();
      });
    };

    const scheduleReconnect = () => {
      if (reconnectTimer) clearTimeout(reconnectTimer);
      reconnectTimer = setTimeout(() => {
        startConnection();
      }, reconnectInterval);
    };

    startConnection();

    // Cleanup khi unmount
    return () => {
      if (reconnectTimer) clearTimeout(reconnectTimer);
      if (connection) connection.stop();
    };
  }, [filterData]);

  // Thêm useEffect để lắng nghe thay đổi của fetchData
  useEffect(() => {
    let connection = null;
    let reconnectTimer = null;
    const reconnectInterval = 10000; // Thời gian thử reconnect: 10 giây

    const filter = {
      Keyword: filterData.Keyword || "",
      PageSize: 100000,
      PageNumber: 1,
      Status: filterData.Status || null,
      NhomID: null,
      CoQuanID: CoQuanID,
    };
    const canboid = CanBoID;

    const fetchData = async () => {
      try {
        const result = await connection.invoke(
          "GetListDisplay",
          filter,
          canboid
        );
        setDataResult(result); // Lưu kết quả vào state
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    const startConnection = async () => {
      connection = new signalR.HubConnectionBuilder()
        .withUrl("https://displaycms.gosol.com.vn/slideHub", {
          withCredentials: true,
        })
        .build();

      try {
        await connection.start();
        setConnectionStatus("Connected");

        // Gọi API lần đầu khi kết nối thành công
        await fetchData();
        // Lắng nghe thông điệp từ server
        connection.on("RequestType", async (data) => {
          if (data.requestType === 4) {
            await fetchData(); // Gọi lại API khi nhận được requestType = 4
          }
        });
      } catch (err) {
        console.error(`SignalR connection failed for device:`, err);
        setConnectionStatus("Disconnected");
        scheduleReconnect(); // Thử reconnect
      }

      // Xử lý khi mất kết nối
      connection.onclose(() => {
        setConnectionStatus("Disconnected");
        scheduleReconnect();
      });
    };

    const scheduleReconnect = () => {
      if (reconnectTimer) clearTimeout(reconnectTimer);
      reconnectTimer = setTimeout(() => {
        startConnection();
      }, reconnectInterval);
    };

    startConnection();

    // Cleanup khi unmount
    return () => {
      if (reconnectTimer) clearTimeout(reconnectTimer);
      if (connection) connection.stop();
    };
  }, [fetchData1]);

  return <div></div>;
};

export default SlideViewer;
