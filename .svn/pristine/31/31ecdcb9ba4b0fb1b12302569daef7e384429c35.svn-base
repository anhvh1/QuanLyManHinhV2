import {apiGetAuth, apiPostAuth, apiDownloadAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

export const apiUrl = {
  danhsachnhommanhinh: server.v2Url + 'QuanLyNhomManHinh/GetListPaging',
  themnhommanhinh: server.v2Url + 'QuanLyNhomManHinh/Insert',
  chitietnhommanhinh: server.v2Url + 'QuanLyNhomManHinh/ChiTiet',
  suanhommanhinh: server.v2Url + 'QuanLyNhomManHinh/Update',
  xoanhommanhinh: server.v2Url + 'QuanLyNhomManHinh/Delete',
  danhsachdmnhommanhinh: server.v2Url + 'QuanLyNhomManHinh/GetListPaging',
  danhsachmanhinh: server.v2Url + 'QuanLyManHinh/GetListPaging',
};
const api = {
  danhSachNhomManHinh: (param) => {
    return apiGetAuth(apiUrl.danhsachnhommanhinh, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  danhSachManHinh: (param) => {
    return apiGetAuth(apiUrl.danhsachmanhinh, {
      ...param,
    });
  },
  danhSachDMNhomManHinh: (param) => {
    return apiGetAuth(apiUrl.danhsachdmnhommanhinh, {
      ...param,
    });
  },

  themNhomManHinh: (param) => {
    return apiPostAuth(apiUrl.themnhommanhinh, {
      ...param,
    });
  },
  chiTietNhomManHinh: (param) => {
    return apiGetAuth(apiUrl.chitietnhommanhinh, param);
  },
  suaNhomManHinh: (param) => {
    return apiPostAuth(apiUrl.suanhommanhinh, {
      ...param,
    });
  },
  xoaNhomManHinh: (nhomManHinhID, param) => {
    const url = `${apiUrl.xoanhommanhinh}?nhomManHinhID=${nhomManHinhID}`;
    return apiPostAuth(url, param);
  },
};

export default api;
