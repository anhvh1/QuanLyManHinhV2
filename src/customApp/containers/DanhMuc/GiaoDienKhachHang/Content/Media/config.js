import {apiGetAuth, apiPostAuth, apiDownloadAuth} from '../../../../../../api';
import server from '../../../../../../settings';
import {getDefaultPageSize} from '../../../../../../helpers/utility';

export const apiUrl = {
  danhsachmanhinh: server.v2Url + 'QuanLyManHinh/GetListPaging',
  themmanhinh: server.v2Url + 'QuanLyManHinh/Insert',
  chitietmanhinh: server.v2Url + 'QuanLyManHinh/ChiTiet',
  suamanhinh: server.v2Url + 'QuanLyManHinh/Update',
  xoamanhinh: server.v2Url + 'QuanLyManHinh/Delete',
};
const api = {
  danhSachManHinh: (param) => {
    return apiGetAuth(apiUrl.danhsachmanhinh, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  themManHinh: (param) => {
    return apiPostAuth(apiUrl.themmanhinh, {
      ...param,
    });
  },
  chiTietManHinh: (param) => {
    return apiGetAuth(apiUrl.chitietmanhinh, param);
  },
  suaManHinh: (param) => {
    return apiPostAuth(apiUrl.suamanhinh, {
      ...param,
    });
  },
  xoaManHinh: (manHinhID, param) => {
    const url = `${apiUrl.xoamanhinh}?manHinhID=${manHinhID}`;
    return apiPostAuth(url, param);
  },
};

export default api;
