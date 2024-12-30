import {apiGetAuth, apiPostAuth} from '../../../api';
import {getDefaultPageSize} from '../../../helpers/utility';
import server from '../../../settings';

const getApi = (LoaiDanhMuc) => {
  const apiUrl = {
    danhsachchung: server.v2Url + `DanhMucChung/GetListPaging?OrderByOption=ASC&OrderByName=GhiChu`,
    themdanhsachchung: server.v2Url + 'DanhMucChung/Insert',
    suadanhmucchung: server.v2Url + 'DanhMucChung/Update',
    xoadanhmucchung: server.v2Url + 'DanhMucChung/Delete',
    getbyid: server.v2Url + 'DanhMucChung/GetByID',
    getall: server.v2Url + 'DanhMucChung/GetAll',
  };
  const api = {
    DanhSachChung: (param) => {
      return apiGetAuth(apiUrl.danhsachchung, {
        ...param,
        LoaiDanhMuc: LoaiDanhMuc,
        PageNumber: param.PageNumber ? param.PageNumber : 1,
        PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
      });
    },
    ThemDanhSachChung: (param) => {
      return apiPostAuth(apiUrl.themdanhsachchung, {
        ...param,
        Loai: LoaiDanhMuc,
      });
    },
    SuaDanhMucChung: (param) => {
      return apiPostAuth(apiUrl.suadanhmucchung, {
        ...param,
        Loai: LoaiDanhMuc,
      });
    },
    ChiTietDanhMucChung: (param) => {
      return apiGetAuth(apiUrl.getbyid, {
        ...param,
        Loai: LoaiDanhMuc,
      });
    },
    XoaDanhMucChung: (param) => {
      return apiPostAuth(apiUrl.xoadanhmucchung, {
        ...param,
        Loai: LoaiDanhMuc,
      });
    },
    GetAllDanhMucChung: (param) => {
      return apiGetAuth(apiUrl.getall, {
        ...param,
        LoaiDanhMuc: LoaiDanhMuc,
      });
    },
  };

  return {apiUrl, api};
};

export default getApi;
