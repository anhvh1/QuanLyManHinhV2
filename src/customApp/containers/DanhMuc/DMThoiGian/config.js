import {apiGetAuth, apiPostAuth} from '../../../../api';
import {getDefaultPageSize} from '../../../../helpers/utility';
import server from '../../../../settings';
export const apiUrl = {
  danhsachthoigian:
    server.v2Url +
    'DanhMucChung/GetListPaging?LoaiDanhMuc=2',
  themthoigian: server.v2Url + 'DanhMucChung/Insert',
  suathoigian: server.v2Url + 'DanhMucChung/Update',
  xoathoigian: server.v2Url + 'DanhMucChung/Delete',
};
const api = {
  DanhSachThoiGian: (param) => {
    return apiGetAuth(apiUrl.danhsachthoigian, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ThemThoiGian: (param) => {
    return apiPostAuth(apiUrl.themthoigian, {
      ...param,
    });
  },
  SuaThoiGian: (param) => {
    return apiPostAuth(apiUrl.suathoigian, {
      ...param,
    });
  },
  XoaThoiGian: (param) => {
    return apiPostAuth(apiUrl.xoathoigian, {
      ...param,
    });
  },
};
export default api;
