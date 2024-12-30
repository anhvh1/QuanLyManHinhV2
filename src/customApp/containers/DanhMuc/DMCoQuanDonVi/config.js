import {apiGetAuth, apiPostAuth} from '../../../../api';
import {getDefaultPageSize} from '../../../../helpers/utility';
import server from '../../../../settings';
export const apiUrl = {
  danhsachcoquandonvi:
    server.v2Url +
    'DanhMucChung/LayThongTinDanhMucChungTheoTrang?TypeDanhMuc=1',
  themcoquandonvi: server.v2Url + 'DanhMucChung/ThemMoiDanhMucChung',
  suacoquandonvi: server.v2Url + 'DanhMucChung/SuaDanhMucChung',
  xoacoquandonvi: server.v2Url + 'DanhMucChung/XoaDanhMucChung',
};
const api = {
  DanhSachCoQuanDonVi: (param) => {
    return apiGetAuth(apiUrl.danhsachcoquandonvi, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ThemCoQuanDonVi: (param) => {
    return apiPostAuth(apiUrl.themcoquandonvi, {
      ...param,
    });
  },
  SuaCoQuanDonVi: (param) => {
    return apiPostAuth(apiUrl.suacoquandonvi, {
      ...param,
    });
  },
  XoaCoQuanDonVi: (param) => {
    return apiPostAuth(apiUrl.xoacoquandonvi, {
      ...param,
    });
  },
};

export default api;
