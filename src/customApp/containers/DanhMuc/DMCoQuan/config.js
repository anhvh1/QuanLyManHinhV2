import {apiGetAuth, apiPostAuth, apiDeleteAuth} from '../../../../api';
import server from '../../../../settings';

const apiUrl = {
  danhsachcoquan: server.v2Url + 'DanhMucCoQuanDonVi/api/v2/DanhMucCoQuanDonVi/DanhSachCacCap',
  getallcoquan: server.v2Url + 'DanhMucCoQuanDonVi/api/v2/DanhMucCoQuanDonVi/DanhSachCacCap',
  chitietcoquan: server.v2Url + 'DanhMucCoQuanDonVi/api/v2/DanhMucCoQuanDonVi/ChiTietCoQuanID',
  themcoquan: server.v2Url + 'DanhMucCoQuanDonVi/api/v2/DanhMucCoQuanDonVi/ThemMoiCoQuanDonVi',
  suacoquan: server.v2Url + 'DanhMucCoQuanDonVi/api/v2/DanhMucCoQuanDonVi/CapNhatCoQuan',
  xoacoquan: server.v2Url + 'DanhMucCoQuanDonVi/api/v2/DanhMucCoQuanDonVi/XoaCoQuanDonVi',
  danhsachcaccapdonvi: server.v2Url + 'DanhMucCoQuanDonVi/DanhSachCacCapDonVi',
  danhsachthamquyen: server.v2Url + 'DanhMucCoQuanDonVi/DanhSachThamQuyen',
  danhsachdiagioi:
    server.v2Url + 'DanhMucDiaGioiHanhChinh/DanhSachCacCap/Tinh/Huyen/Xa',
};
const api = {
  danhSachDiaGioi: (param) => {
    return apiGetAuth(apiUrl.danhsachdiagioi, {
      ...param,
    });
  },
  danhSachCoQuan: (param) => {
    return apiGetAuth(apiUrl.danhsachcoquan, {
      ...param,
    });
  },
  chiTietCoQuan: (param) => {
    return apiGetAuth(apiUrl.chitietcoquan, {
      ...param,
    });
  },
  themCoQuan: (param) => {
    return apiPostAuth(apiUrl.themcoquan, {
      ...param,
    });
  },
  xoaCoQuan: (param) => {
    return apiGetAuth(`${apiUrl.xoacoquan}?CoQuanID=${param}`);
  },
  danhSachCacCapDonVi: (param) => {
    return apiGetAuth(apiUrl.danhsachcaccapdonvi);
  },
  danhSachThamQuyen: (param) => {
    return apiGetAuth(apiUrl.danhsachthamquyen);
  },
  AllCoQuan: () => {
    return apiGetAuth(apiUrl.getallcoquan);
  },
  suaCoQuan: (param) => {
    return apiPostAuth(apiUrl.suacoquan, {
      ...param,
    });
  },
};

export default api;
