import {apiGetAuth, apiPostAuth, apiDownloadAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

export const apiUrl = {
  danhsachdisantulieu: server.v2Url + 'DanhMucDiSanTuLieu/GetListPaging',
  themdisantulieu: server.v2Url + 'DanhMucDiSanTuLieu/Insert',
  chitietdisantulieu: server.v2Url + 'DanhMucDiSanTuLieu/ChiTiet',
  suadisantulieu: server.v2Url + 'DanhMucDiSanTuLieu/Update',
  xoadisantulieu: server.v2Url + 'DanhMucDiSanTuLieu/Delete',
  danhsachloaimauphieu:
    server.v2Url + 'DanhMucChung/GetListPaging?LoaiDanhMuc=3',
  danhsachchitieu: server.v2Url + 'DanhMucChiTieu/GetAll',
  chitietchitieu: server.v2Url + 'DanhMucChiTieu/GetById',
  
};

const api = {
  danhSachDiSanTuLieu: (param) => {
    return apiGetAuth(apiUrl.danhsachdisantulieu, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietChiTieu: (param) => {
    return apiGetAuth(apiUrl.chitietchitieu, {
      ...param,
    });
  },
  danhSachLoaiMauPhieu: (param) => {
    return apiGetAuth(apiUrl.danhsachloaimauphieu, {
      ...param,
    });
  },
  danhSachChiTieu: (param) => {
    return apiGetAuth(apiUrl.danhsachchitieu, {
      ...param,
    });
  },
  themDiSanTuLieu: (param) => {
    return apiPostAuth(apiUrl.themdisantulieu, {
      ...param,
    });
  },
  chiTietDiSanTuLieu: (param) => {
    return apiGetAuth(apiUrl.chitietdisantulieu, param);
  },
  suaDiSanTuLieu: (param) => {
    return apiPostAuth(apiUrl.suadisantulieu, {
      ...param,
    });
  },
  xoaDiSanTuLieu: (id, param) => {
    const url = `${apiUrl.xoadisantulieu}?id=${id}`;
    return apiPostAuth(url, param);
  },
};

export default api;
