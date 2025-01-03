import { apiGetAuth } from "../../../../api";
import server from "../../../../settings";
import { getDefaultPageSize } from "../../../../helpers/utility";

const apiUrl = {
  dowload: server.v2Url + "QuanLyVersionApp/GetLastVersion",
};
const api = {
  Dowload: (param) => {
    return apiGetAuth(apiUrl.dowload, {
      ...param,
    });
  },
};

export default api;
