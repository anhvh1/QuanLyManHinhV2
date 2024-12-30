import {apiGetAuth, apiPostAuth, apiDownloadAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

export const apiUrl = {
  danhsachqlthuvien: server.v2Url + 'DanhMucCoQuanDonVi/api/v2/DanhMucCoQuanDonVi/DanhSachCacCap',
  themqlthuvien: server.v2Url + 'DanhMucCoQuanDonVi/api/v2/DanhMucCoQuanDonVi/ThemMoiCoQuanDonVi',
  chitietqlthuvien: server.v2Url + 'DanhMucCoQuanDonVi/api/v2/DanhMucCoQuanDonVi/ChiTietCoQuanID',
  suaqlthuvien: server.v2Url + 'DanhMucCoQuanDonVi/api/v2/DanhMucCoQuanDonVi/CapNhatCoQuan',
  xoacoquan: server.v2Url + 'DanhMucCoQuanDonVi/api/v2/DanhMucCoQuanDonVi/XoaCoQuanDonVi',
  danhsachdmthuvien: server.v2Url + 'DanhMucChung/GetListPaging?LoaiDanhMuc=14',
};
const api = {
  danhSachQLThuVien: (param) => {
    return apiGetAuth(apiUrl.danhsachqlthuvien, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  danhSachDMThuVien: (param) => {
    return apiGetAuth(apiUrl.danhsachdmthuvien, {
      ...param,
    });
  },
  themQLThuVien: (param) => {
    return apiPostAuth(apiUrl.themqlthuvien, {
      ...param,
    });
  },
  chiTietQLThuVien: (param) => {
    return apiGetAuth(apiUrl.chitietqlthuvien, param);
  },
  suaQLThuVien: (param) => {
    return apiPostAuth(apiUrl.suaqlthuvien, {
      ...param,
    });
  },
  xoaCoQuan: (param) => {
    return apiGetAuth(`${apiUrl.xoacoquan}?CoQuanID=${param}`);
  },
};

export default api;
