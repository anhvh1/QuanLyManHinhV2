import {apiGetAuth, apiPostAuth, apiDownloadAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

export const apiUrl = {
  danhsachbaovatquocgia: server.v2Url + 'QuanLyBaoVatQuocGia/GetListPaging',
  thembaovatquocgia: server.v2Url + 'QuanLyBaoVatQuocGia/Insert',
  chitietbaovatquocgia: server.v2Url + 'QuanLyBaoVatQuocGia/ChiTiet',
  suabaovatquocgia: server.v2Url + 'QuanLyBaoVatQuocGia/Update',
  xoabaovatquocgia: server.v2Url + 'QuanLyBaoVatQuocGia/Delete',
  danhsachbaotang: server.v2Url + 'QuanLyBaoTang/GetListPaging',
  downloadfile: server.v2Url + 'QuanLyBaoVatQuocGia/ChiTiet',
};
const api = {
  danhSachBaoVatQuocGia: (param) => {
    return apiGetAuth(apiUrl.danhsachbaovatquocgia, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  danhSachBaoTang: (param) => {
    return apiGetAuth(apiUrl.danhsachbaotang, {
      ...param,
    });
  },
  themBaoVatQuocGia: (param) => {
    return apiPostAuth(apiUrl.thembaovatquocgia, {
      ...param,
    });
  },
  chiTietBaoVatQuocGia: (param) => {
    return apiGetAuth(apiUrl.chitietbaovatquocgia, param);
  },
  suaBaoVatQuocGia: (param) => {
    return apiPostAuth(apiUrl.suabaovatquocgia, {
      ...param,
    });
  },
  xoaBaoVatQuocGia: (param) => {
    return apiPostAuth(apiUrl.xoabaovatquocgia, param);
  },
  downloadFile: (param) => {
    return apiGetAuth(apiUrl.downloadfile, param);
  },
};

export default api;
