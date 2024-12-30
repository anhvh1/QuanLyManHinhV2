import {apiGetAuth, apiPostAuth} from '../../../../api';
import {getDefaultPageSize} from '../../../../helpers/utility';
import server from '../../../../settings';
import {DANHMUCCHUNG} from '../../../../settings/constants';
export const apiUrl = {
  danhsachloaimauphieu:
    server.v2Url +
    `DanhMucChung/GetListPaging?LoaiDanhMuc=${DANHMUCCHUNG.LOAIMAUPHIEU}`,
  themloaimauphieu: server.v2Url + 'DanhMucChung/Insert',
  sualoaimauphieu: server.v2Url + 'DanhMucChung/GetByID',
  capnhatloaimauphieu: server.v2Url + 'DanhMucChung/Update',
  xoaloaimauphieu: server.v2Url + 'DanhMucChung/Delete',
};
const api = {
  DanhSachLoaiMauPhieu: (param) => {
    return apiGetAuth(apiUrl.danhsachloaimauphieu, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ThemLoaiMauPhieu: (param) => {
    return apiPostAuth(apiUrl.themloaimauphieu, {
      ...param,
    });
  },
  SuaLoaiMauPhieu: (param) => {
    return apiGetAuth(apiUrl.sualoaimauphieu, {
      ...param,
    });
  },
  CapNhatLoaiMauPhieu: (param) => {
    return apiPostAuth(apiUrl.capnhatloaimauphieu, {
      ...param,
    });
  },
  XoaLoaiMauPhieu: (param) => {
    return apiPostAuth(apiUrl.xoaloaimauphieu, {
      ...param,
    });
  },
};

export default api;
