import {apiGetAuth, apiPostAuth, apiDownloadAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

export const apiUrl = {
  danhsachdisanvanhoaphivatthe: server.v2Url + 'QuanLyDiSanVanHoaPhiVatThe/GetListPaging',
  danhsachdanhmucdisanvanhoaphivatthe: server.v2Url + 'QuanLyDanhMucDiSanVanHoaPhiVatThe/GetListPaging',
  themdisanvanhoaphivatthe: server.v2Url + 'QuanLyDiSanVanHoaPhiVatThe/Insert',
  chitietdisanvanhoaphivatthe: server.v2Url + 'QuanLyDiSanVanHoaPhiVatThe/ChiTiet',
  suadisanvanhoaphivatthe: server.v2Url + 'QuanLyDiSanVanHoaPhiVatThe/Update',
  xoadisanvanhoaphivatthe: server.v2Url + 'QuanLyDiSanVanHoaPhiVatThe/Delete',
  downloadfile: server.v2Url + 'QuanLyDiSanVanHoaPhiVatThe/ChiTiet',
};
const api = {
  danhSachDiSanVanHoaPhiVatThe: (param) => {
    return apiGetAuth(apiUrl.danhsachdisanvanhoaphivatthe, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  danhSachDanhMucDiSanVanHoaPhiVatThe: (param) => {
    return apiGetAuth(apiUrl.danhsachdanhmucdisanvanhoaphivatthe, {
      ...param,
    });
  },
  themDiSanVanHoaPhiVatThe: (param) => {
    return apiPostAuth(apiUrl.themdisanvanhoaphivatthe, {
      ...param,
    });
  },
  chiTietDiSanVanHoaPhiVatThe: (param) => {
    return apiGetAuth(apiUrl.chitietdisanvanhoaphivatthe, param);
  },
  suaDiSanVanHoaPhiVatThe: (param) => {
    return apiPostAuth(apiUrl.suadisanvanhoaphivatthe, {
      ...param,
    });
  },
  xoaDiSanVanHoaPhiVatThe: (param) => {
    return apiPostAuth(apiUrl.xoadisanvanhoaphivatthe, param);
  },
  downloadFile: (param) => {
    return apiGetAuth(apiUrl.downloadfile, param);
  },
};

export default api;
