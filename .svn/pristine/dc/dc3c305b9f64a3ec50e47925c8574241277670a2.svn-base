import {apiGetAuth, apiPostAuth, apiDownloadAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

export const apiUrl = {
  danhsachdanhmucdisanvanhoaphivatthe: server.v2Url + 'QuanLyDanhMucDiSanVanHoaPhiVatThe/GetListPaging',
  themdanhmucdisanvanhoaphivatthe: server.v2Url + 'QuanLyDanhMucDiSanVanHoaPhiVatThe/Insert',
  chitietdanhmucdisanvanhoaphivatthe: server.v2Url + 'QuanLyDanhMucDiSanVanHoaPhiVatThe/ChiTiet',
  suadanhmucdisanvanhoaphivatthe: server.v2Url + 'QuanLyDanhMucDiSanVanHoaPhiVatThe/Update',
  xoadanhmucdisanvanhoaphivatthe: server.v2Url + 'QuanLyDanhMucDiSanVanHoaPhiVatThe/Delete',

};
const api = {
  danhSachDanhMucDiSanVanHoaPhiVatThe: (param) => {
    return apiGetAuth(apiUrl.danhsachdanhmucdisanvanhoaphivatthe, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
 
  themDanhMucDiSanVanHoaPhiVatThe: (param) => {
    return apiPostAuth(apiUrl.themdanhmucdisanvanhoaphivatthe, {
      ...param,
    });
  },
  chiTietDanhMucDiSanVanHoaPhiVatThe: (param) => {
    return apiGetAuth(apiUrl.chitietdanhmucdisanvanhoaphivatthe, param);
  },
  suaDanhMucDiSanVanHoaPhiVatThe: (param) => {
    return apiPostAuth(apiUrl.suadanhmucdisanvanhoaphivatthe, {
      ...param,
    });
  },
  xoaDanhMucDiSanVanHoaPhiVatThe: (id, param) => { 
    const url = `${apiUrl.xoadanhmucdisanvanhoaphivatthe}?id=${id}`; 
    return apiPostAuth(url, param);
  },
};

export default api;
