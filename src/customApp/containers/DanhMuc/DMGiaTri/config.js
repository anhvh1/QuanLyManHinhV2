import {apiGetAuth, apiPostAuth} from '../../../../api';
import {getDefaultPageSize} from '../../../../helpers/utility';
import server from '../../../../settings';
export const apiUrl = {
  danhsachgiatri:
    server.v2Url +
    'DanhMucChung/LayThongTinDanhMucChungTheoTrang?TypeDanhMuc=7',
  themgiatri: server.v2Url + 'DanhMucChung/ThemMoiDanhMucChung',
  suagiatri: server.v2Url + 'DanhMucChung/SuaDanhMucChung',
  xoagiatri: server.v2Url + 'DanhMucChung/XoaDanhMucChung',
};
const api = {
  DanhSachGiaTri: (param) => {
    return apiGetAuth(apiUrl.danhsachgiatri, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ThemGiaTri: (param) => {
    return apiPostAuth(apiUrl.themgiatri, {
      ...param,
    });
  },
  SuaGiaTri: (param) => {
    return apiPostAuth(apiUrl.suagiatri, {
      ...param,
    });
  },
  XoaGiaTri: (param) => {
    return apiPostAuth(apiUrl.xoagiatri, {
      ...param,
    });
  },
};

export default api;
