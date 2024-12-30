import {apiGetAuth, apiPostAuth, apiDownloadAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

export const apiUrl = {
  danhsachbaotang: server.v2Url + 'QuanLyBaoTang/GetListPaging',
  thembaotang: server.v2Url + 'QuanLyBaoTang/Insert',
  chitietbaotang: server.v2Url + 'QuanLyBaoTang/ChiTiet',
  suabaotang: server.v2Url + 'QuanLyBaoTang/Update',
  xoabaotang: server.v2Url + 'QuanLyBaoTang/Delete',
  downloadfile: server.v2Url + 'QuanLyBaoTang/ChiTiet',
};
const api = {
  danhSachBaoTang: (param) => {
    return apiGetAuth(apiUrl.danhsachbaotang, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  themBaoTang: (param) => {
    return apiPostAuth(apiUrl.thembaotang, {
      ...param,
    });
  },
  chiTietBaoTang: (param) => {
    return apiGetAuth(apiUrl.chitietbaotang, param);
  },
  suaBaoTang: (param) => {
    return apiPostAuth(apiUrl.suabaotang, {
      ...param,
    });
  },
  xoaBaoTang: (param) => {
    return apiPostAuth(apiUrl.xoabaotang, param);
  },
  AllDanhSachBaoTang: (param) => {
    return apiGetAuth(apiUrl.danhsachbaotang, {
      ...param,
    });
  },
  downloadFile: (param) => {
    return apiGetAuth(apiUrl.downloadfile, param);
  },
};

export default api;
