import { apiGetAuth, apiPostAuth, apiDownloadAuth } from '../../../../api';
import server from '../../../../settings';
import { getDefaultPageSize } from '../../../../helpers/utility';

export const apiUrl = {
  danhsachLicence: server.v2Url + 'QuanLyLicense/GetPagingBySearch',
  themLicence: server.v2Url + 'QuanLyLicense/Insert',
  chitietLicence: server.v2Url + 'QuanLyLicense/ChiTiet',
  suaLicence: server.v2Url + 'QuanLyLicense/Update',
  xoaLicence: server.v2Url + 'QuanLyLicense/Delete',
  danhsachdanhmucdisanvanhoaphivatthe:
    server.v2Url + 'QuanLyDanhMucDiSanVanHoaPhiVatThe/GetListPaging',
  danhsachloaisukien: server.v2Url + 'QuanLyLichPhat/LoaiSuKien',
  danhsachmediaorphat: server.v2Url + 'QuanLyLichPhat/GetDanhSachMediaOrDanhSachPhat',
  danhsachmanhinhornhommanhinh: server.v2Url + 'QuanLyLichPhat/GetManHinhOrNhomManHinh',
  danhsachnguoidung: server.v2Url + 'DanhMucCoQuanDonVi/GetAll',
  CreateLicense: server.v2Url + 'QuanLyLicense/CreateLicense',
};
const api = {
  danhSachLicence: (param) => {
    return apiGetAuth(apiUrl.danhsachLicence, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  DanhSachNguoiDung: (param) => {
    return apiGetAuth(apiUrl.danhsachnguoidung, {
      ...param,
    });
  },
  danhSachLoaiSuKien: (param) => {
    return apiGetAuth(apiUrl.danhsachloaisukien, {
      ...param,
    });
  },
  danhSachMediaorPhat: (param) => {
    return apiGetAuth(apiUrl.danhsachmediaorphat, {
      ...param,
    });
  },
  danhSachManHinhOrNhomManHinh: (param) => {
    return apiGetAuth(apiUrl.danhsachmanhinhornhommanhinh, {
      ...param,
    });
  },
  danhSachDanhMucDiSanVanHoaPhiVatThe: (param) => {
    return apiGetAuth(apiUrl.danhsachdanhmucdisanvanhoaphivatthe, {
      ...param,
    });
  },
  themLicence: (param) => {
    return apiPostAuth(apiUrl.themLicence, {
      ...param,
    });
  },
  CreateLicense: (param) => {
    return apiPostAuth(apiUrl.CreateLicense, {
      ...param,
    });
  },
  chiTietLicence: (param) => {
    return apiGetAuth(apiUrl.chitietLicence, param);
  },
  suaLicence: (param) => {
    return apiPostAuth(apiUrl.suaLicence, {
      ...param,
    });
  },
  xoaLicence: (LicenseID, param) => {
    const url = `${apiUrl.xoaLicence}?LicenseID=${LicenseID}`;
    return apiPostAuth(url, param);
  },
};

export default api;
