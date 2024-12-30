import {apiGetAuth, apiPostAuth} from '../../../../api';
import {getDefaultPageSize} from '../../../../helpers/utility';
import server from '../../../../settings';
export const apiUrl = {
  danhsachcapditichxephang:
    server.v2Url +
    'DanhMucChung/GetListPaging?OrderByOption=ASC&OrderByName=GhiChu&LoaiDanhMuc=5',
  themcapditichxephang: server.v2Url + 'DanhMucChung/Insert',
  suacapditichxephang: server.v2Url + 'DanhMucChung/Update',
  xoacapditichxephang: server.v2Url + 'DanhMucChung/Delete',
};
const api = {
  DanhSachCapDiTichXepHang: (param) => {
    return apiGetAuth(apiUrl.danhsachcapditichxephang, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ThemCapDiTichXepHang: (param) => {
    return apiPostAuth(apiUrl.themcapditichxephang, {
      ...param,
    });
  },
  SuaCapDiTichXepHang: (param) => {
    return apiPostAuth(apiUrl.suacapditichxephang, {
      ...param,
    });
  },
  XoaCapDiTichXepHang: (param) => {
    return apiPostAuth(apiUrl.xoacapditichxephang, {
      ...param,
    });
  },
};
export default api;
