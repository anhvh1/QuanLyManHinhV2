import {apiGetAuth, apiPostAuth} from '../../../../api';
import {getDefaultPageSize} from '../../../../helpers/utility';
import server from '../../../../settings';
export const apiUrl = {
  danhsachphanloai:
    server.v2Url +
    'DanhMucChung/LayThongTinDanhMucChungTheoTrang?TypeDanhMuc=6',
  themphanloai: server.v2Url + 'DanhMucChung/ThemMoiDanhMucChung',
  suaphanloai: server.v2Url + 'DanhMucChung/SuaDanhMucChung',
  xoaphanloai: server.v2Url + 'DanhMucChung/XoaDanhMucChung',
};
const api = {
  DanhSachPhanLoai: (param) => {
    return apiGetAuth(apiUrl.danhsachphanloai, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ThemPhanLoai: (param) => {
    return apiPostAuth(apiUrl.themphanloai, {
      ...param,
    });
  },
  SuaPhanLoai: (param) => {
    return apiPostAuth(apiUrl.suaphanloai, {
      ...param,
    });
  },
  XoaPhanLoai: (param) => {
    return apiPostAuth(apiUrl.xoaphanloai, {
      ...param,
    });
  },
};

export default api;
