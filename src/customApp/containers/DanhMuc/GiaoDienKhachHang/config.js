import {apiGetAuth, apiPostAuth, apiDownloadAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

export const apiUrl = {
  danhsachdisantulieu: server.v2Url + 'QuanLyDiSanTuLieu/GetListPaging',
  themdisantulieu: server.v2Url + 'QuanLyDiSanTuLieu/Insert',
  chitietdisantulieu: server.v2Url + 'QuanLyDiSanTuLieu/ChiTiet',
  suadisantulieu: server.v2Url + 'QuanLyDiSanTuLieu/Update',
  xoadisantulieu: server.v2Url + 'QuanLyDiSanTuLieu/Delete',
  danhsachdmdisantulieu: server.v2Url + 'DanhMucDiSanTuLieu/GetListPaging',
};
const api = {
  danhSachDiSanTuLieu: (param) => {
    return apiGetAuth(apiUrl.danhsachdisantulieu, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  danhSachDMDiSanTuLieu: (param) => {
    return apiGetAuth(apiUrl.danhsachdmdisantulieu, {
      ...param,
    });
  },

  themDiSanTuLieu: (param) => {
    return apiPostAuth(apiUrl.themdisantulieu, {
      ...param,
    });
  },
  chiTietDiSanTuLieu: (param) => {
    return apiGetAuth(apiUrl.chitietdisantulieu, param);
  },
  suaDiSanTuLieu: (param) => {
    return apiPostAuth(apiUrl.suadisantulieu, {
      ...param,
    });
  },
  xoaDiSanTuLieu: (id, param) => {
    const url = `${apiUrl.xoadisantulieu}?id=${id}`;
    return apiPostAuth(url, param);
  },
};

export default api;
