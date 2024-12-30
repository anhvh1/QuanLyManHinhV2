import {apiGetAuth, apiPostAuth, apiDownloadAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

export const apiUrl = {
  danhsachditichtoantinh: server.v2Url + 'QuanLyDiTichToanTinh/GetListPaging',
  themditichtoantinh: server.v2Url + 'QuanLyDiTichToanTinh/Insert',
  chitietditichtoantinh: server.v2Url + 'QuanLyDiTichToanTinh/ChiTiet',
  suaditichtoantinh: server.v2Url + 'QuanLyDiTichToanTinh/Update',
  xoaditichtoantinh: server.v2Url + 'QuanLyDiTichToanTinh/Delete',
  danhsachloaiditich:server.v2Url + 'DanhMucChung/GetListPaging?LoaiDanhMuc=4',
  danhsachcapxephang:server.v2Url + 'DanhMucChung/GetListPaging?LoaiDanhMuc=5',
  downloadfile: server.v2Url + 'QuanLyDiTichToanTinh/ChiTiet',
};
const api = {
  danhSachDiTichToanTinh: (param) => {
    return apiGetAuth(apiUrl.danhsachditichtoantinh, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  danhSachLoaiDiTich: (param) => {
    return apiGetAuth(apiUrl.danhsachloaiditich, {
      ...param,
    });
  },
  danhSachCapXepHang: (param) => {
    return apiGetAuth(apiUrl.danhsachcapxephang, {
      ...param,
    });
  },
  themDiTichToanTinh: (param) => {
    return apiPostAuth(apiUrl.themditichtoantinh, {
      ...param,
    });
  },
  chiTietDiTichToanTinh: (param) => {
    return apiGetAuth(apiUrl.chitietditichtoantinh, param);
  },
  suaDiTichToanTinh: (param) => {
    return apiPostAuth(apiUrl.suaditichtoantinh, {
      ...param,
    });
  },
  xoaDiTichToanTinh: (param) => {
    return apiPostAuth(apiUrl.xoaditichtoantinh, param);
  },
  downloadFile: (param) => {
    return apiGetAuth(apiUrl.downloadfile, param);
  },
};

export default api;
