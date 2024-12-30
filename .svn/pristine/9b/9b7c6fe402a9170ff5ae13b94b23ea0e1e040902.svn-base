import {apiGetAuth, apiPostAuth, apiDownloadAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

export const apiUrl = {
  danhsachnhanlucthuvien: server.v2Url + 'QuanLyNhanLucThuVien/GetListPaging',
  themnhanlucthuvien: server.v2Url + 'QuanLyNhanLucThuVien/Insert',
  chitietnhanlucthuvien: server.v2Url + 'QuanLyNhanLucThuVien/ChiTiet',
  suanhanlucthuvien: server.v2Url + 'QuanLyNhanLucThuVien/Update',
  xoanhanlucthuvien: server.v2Url + 'QuanLyNhanLucThuVien/Delete',
  download: server.v2Url + 'QuanLyNhanLucThuVien/DownLoadTemplate',
  importexcel: server.v2Url + 'QuanLyNhanLucThuVien/ImportExcel',
  danhsachquanlythuvien: server.v2Url + 'QuanLyThuVien/GetAll',
};
const api = {
  danhSachNhanLucThuVien: (param) => {
    return apiGetAuth(apiUrl.danhsachnhanlucthuvien, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  danhSachQuanLyThuVien: (param) => {
    return apiGetAuth(apiUrl.danhsachquanlythuvien, {
      ...param,
    });
  },
  themNhanLucThuVien: (param) => {
    return apiPostAuth(apiUrl.themnhanlucthuvien, {
      ...param,
    });
  },
  chiTietNhanLucThuVien: (param) => {
    return apiGetAuth(apiUrl.chitietnhanlucthuvien, param);
  },
  suaNhanLucThuVien: (param) => {
    return apiPostAuth(apiUrl.suanhanlucthuvien, {
      ...param,
    });
  },
  xoaNhanLucThuVien: (id, param) => {
    const url = `${apiUrl.xoanhanlucthuvien}?id=${id}`;
    return apiPostAuth(url, param);
  },
  Download: (param) => {
    return apiPostAuth(apiUrl.download, {...param}, null, 'arraybuffer');
  },
};

export default api;

