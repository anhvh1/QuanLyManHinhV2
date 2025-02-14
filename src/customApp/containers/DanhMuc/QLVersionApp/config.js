import {apiGetAuth, apiPostAuth, apiDownloadAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

export const apiUrl = {
  danhsachversionapp: server.v2Url + 'QuanLyVersionApp/GetListPaging',
  themversionapp: server.v2Url + 'QuanLyVersionApp/Insert',
  chitietversionapp: server.v2Url + 'QuanLyVersionApp/ChiTiet',
  suaversionapp: server.v2Url + 'QuanLyVersionApp/Update',
  xoaversionapp: server.v2Url + 'QuanLyVersionApp/Delete',
};
const api = {
  danhSachVersionApp: (param) => {
    return apiGetAuth(apiUrl.danhsachversionapp, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  themVersionApp: (param) => {
    return apiPostAuth(apiUrl.themversionapp, {
      ...param,
    });
  },
  chiTietVersionApp: (param) => {
    return apiGetAuth(apiUrl.chitietversionapp, param);
  },
  suaVersionApp: (param) => {
    return apiPostAuth(apiUrl.suaversionapp, {
      ...param,
    });
  },
  xoaVersionApp: (versionappID, param) => {
    const url = `${apiUrl.xoaversionapp}?Id=${versionappID}`;
    return apiPostAuth(url, param);
  },
};

export default api;
