import {apiGetAuth, apiPostAuth, apiDownloadAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

export const apiUrl = {
  danhsachphamvi:
    server.v2Url +
    'DanhMucChung/LayThongTinDanhMucChungTheoTrang?TypeDanhMuc=8',
  themphamvi: server.v2Url + 'DanhMucChung/ThemMoiDanhMucChung',
  suaphamvi: server.v2Url + 'DanhMucChung/SuaDanhMucChung',
  xoaphamvi: server.v2Url + 'DanhMucChung/XoaDanhMucChung',
  // danhsachcaccapdonvi: server.v2Url + 'DanhMucCoQuanDonVi/DanhSachCacCapDonVi',
};
const api = {
  DanhSachPhamVi: (param) => {
    return apiGetAuth(apiUrl.danhsachphamvi, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },

  ThemPhamVi: (param) => {
    return apiPostAuth(apiUrl.themphamvi, {
      ...param,
    });
  },
  SuaPhamVi: (param) => {
    return apiPostAuth(apiUrl.suaphamvi, {
      ...param,
    });
  },
  XoaPhamVi: (param) => {
    return apiPostAuth(apiUrl.xoaphamvi, {
      ...param,
    });
  },
};

export default api;
