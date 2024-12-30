import {apiGetAuth, apiPostAuth, apiDeleteAuth} from '../../../../api';
import server from '../../../../settings';

const apiUrl = {
  danhsachtieuchi: server.v2Url + 'DanhMucCot/GetListPaging',
  themtieuchi: server.v2Url + 'DanhMucCot/ThemCot',
  chitiettieuchi: server.v2Url + 'DanhMucCot/GetByID',
  suatieuchi: server.v2Url + 'DanhMucCot/SuaCot',
  getalltieuchi: server.v2Url + 'DanhMucCot/GetListPaging?PageSize=20',
  xoatieuchi: server.v2Url + 'DanhMucCot/XoaCot',
};
const api = {
  DanhSachTieuChi: (param) => {
    return apiGetAuth(apiUrl.danhsachtieuchi, {
      ...param,
    });
  },
  ChiTietTieuChi: (param) => {
    return apiGetAuth(apiUrl.chitiettieuchi, {
      ...param,
    });
  },
  ThemTieuChi: (param) => {
    return apiPostAuth(apiUrl.themtieuchi, {
      ...param,
    });
  },
  SuaTieuChi: (param) => {
    return apiPostAuth(apiUrl.suatieuchi, {
      ...param,
    });
  },
  XoaTieuChi: (param) => {
    return apiPostAuth(`${apiUrl.xoatieuchi}`, {...param});
  },
  AllTieuChi: (param) => {
    return apiGetAuth(apiUrl.getalltieuchi, {...param});
  },
};

export default api;
