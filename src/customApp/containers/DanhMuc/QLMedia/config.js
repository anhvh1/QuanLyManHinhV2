import {apiGetAuth, apiPostAuth, apiDeleteAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';
export const apiUrl = {
  danhsachthumuc: server.v2Url + 'ThuMuc/GetListPaging',
  themchitieu: server.v2Url + 'ThuMuc/Insert',
  chitietchitieu: server.v2Url + 'ThuMuc/ChiTiet',
  suachitieu: server.v2Url + 'ThuMuc/Update',
  sua: server.v2Url + 'QuanLyMedia/Update',
  getallchitieu: server.v2Url + 'DanhMucChiTieu/GetAll',
  xoachitieu: server.v2Url + 'ThuMuc/Delete',
  xoa: server.v2Url + 'QuanLyMedia/Delete',
  danhsachmedia:server.v2Url + 'QuanLyMedia/GetListPaging',
  themmedia: server.v2Url + 'QuanLyMedia/Insert',
  chitiet: server.v2Url + 'QuanLyMedia/ChiTiet',
  // DanhSachMedia
};
const api = {
  DanhSachMedia: (param) => {
    return apiGetAuth(apiUrl.danhsachmedia, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  DanhSachThuMuc: (param) => {
    return apiGetAuth(apiUrl.danhsachthumuc, {
      ...param,
    });
  },
  themMedia: (param) => {
    return apiPostAuth(apiUrl.themmedia, {
      ...param,
    });
  },
  ChiTietChiTieu: (param) => {
    return apiGetAuth(apiUrl.chitietchitieu, {
      ...param,
    });
  },
  ChiTiet: (param) => {
    return apiGetAuth(apiUrl.chitiet, {
      ...param,
    });
  },
  ThemChiTieu: (param) => {
    return apiPostAuth(apiUrl.themchitieu, {
      ...param,
    });
  },
  SuaChiTieu: (param) => {
    return apiPostAuth(apiUrl.suachitieu, {
      ...param,
    });
  },
  Sua: (param) => {
    return apiPostAuth(apiUrl.sua, {
      ...param,
    });
  },
  XoaChiTieu: (thuMucID, param) => {
    const url = `${apiUrl.xoachitieu}?thuMucID=${thuMucID}`;
    return apiPostAuth(url, param);
  },
  Xoa: (id, param) => {
    const url = `${apiUrl.xoa}?id=${id}`;
    return apiPostAuth(url, param);
  },
  AllChiTieu: () => {
    return apiGetAuth(apiUrl.getallchitieu);
  },
};

export default api;
