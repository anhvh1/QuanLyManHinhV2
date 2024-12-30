import {apiGetAuth, apiPostAuth} from '../../../../api';
import {getDefaultPageSize} from '../../../../helpers/utility';
import server from '../../../../settings';
export const apiUrl = {
  danhsachdovitinh:
    server.v2Url +
    'DanhMucChung/LayThongTinDanhMucChungTheoTrang?TypeDanhMuc=2',
  themdovitinh: server.v2Url + 'DanhMucChung/ThemMoiDanhMucChung',
  suadovitinh: server.v2Url + 'DanhMucChung/SuaDanhMucChung',
  xoadovitinh: server.v2Url + 'DanhMucChung/XoaDanhMucChung',
};
const api = {
  DanhSachDonViTinh: (param) => {
    return apiGetAuth(apiUrl.danhsachdovitinh, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ThemDonViTinh: (param) => {
    return apiPostAuth(apiUrl.themdovitinh, {
      ...param,
    });
  },
  SuaDonViTinh: (param) => {
    return apiPostAuth(apiUrl.suadovitinh, {
      ...param,
    });
  },
  XoaDonViTinh: (param) => {
    return apiPostAuth(apiUrl.xoadovitinh, {
      ...param,
    });
  },
};

export default api;
