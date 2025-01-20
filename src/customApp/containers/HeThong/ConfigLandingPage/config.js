import { apiGet, apiGetAuth, apiPostAuth } from "../../../../api";
import server from "../../../../settings";
import { getDefaultPageSize } from "../../../../helpers/utility";

const apiUrl = {
  uploadfile: server.v2Url + "FileDinhKem/Insert",
  insert: server.v2Url + "LandingPage/Insert",
  getlandingpage: server.v2Url + "LandingPage/GetLandingPage",
  deletefile: server.v2Url + "FileDinhKem/Delete",
};
const api = {
  UploadFile: (param) => {
    return apiPostAuth(apiUrl.uploadfile, param);
  },
  Insert: (param) => {
    return apiPostAuth(apiUrl.insert, param);
  },
  DeleteFile: (param) => {
    return apiPostAuth(apiUrl.deletefile, param);
  },
  GetLandingPage: (param) => {
    return apiGet(apiUrl.getlandingpage, param);
  },
};

export default api;
