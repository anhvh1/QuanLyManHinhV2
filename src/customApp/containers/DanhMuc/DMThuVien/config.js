import {apiGetAuth, apiPostAuth} from '../../../../api';
import {getDefaultPageSize} from '../../../../helpers/utility';
import server from '../../../../settings';
export const apiUrl = {
  danhsachloaiditich:
    server.v2Url +
    'DanhMucChung/GetAll?LoaiDanhMuc=4',
    themloaiditich: server.v2Url + 'DanhMucChung/Insert',
    sualoaiditich: server.v2Url + 'DanhMucChung/Update',
    xoaloaiditich: server.v2Url + 'DanhMucChung/Delete',
};
const api = {
  DanhSachLoaiDiTich: (param) => {
    return apiGetAuth(apiUrl.danhsachloaiditich, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ThemLoaiDiTich: (param) => {
    return apiPostAuth(apiUrl.themloaiditich, {
      ...param,
    });
  },
  SuaLoaiDiTich: (param) => {
    return apiPostAuth(apiUrl.sualoaiditich, {
      ...param,
    });
  },
  XoaLoaiDiTich: (param) => {
    return apiPostAuth(apiUrl.xoaloaiditich, {
      ...param,
    });
  },
};
export default api;
