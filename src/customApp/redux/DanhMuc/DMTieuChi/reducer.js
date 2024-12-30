import actions from './actions';

const initState = {
  DanhSachTieuChi: [],
  DanhSachDauBaoCao: [],
  DanhSachCuoiBaoCao: [],
  // expandedKeys: [],
  TableLoading: false,
  data: [],
};

export default function Reducer(state = initState, action) {
  const {type, payload} = action;
  switch (type) {
    //get initData
    case actions.DMTIEUCHI_GET_INIT_DATA_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.DMTIEUCHI_GET_INIT_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachTieuChi: payload.DanhSachTieuChi,
        DanhSachDauBaoCao: payload.DanhSachDauBaoCao,
        DanhSachCuoiBaoCao: payload.DanhSachCuoiBaoCao,
        // // expandedKeys: payload.expandedKeys,
        TableLoading: false,
      };
    case actions.DMTIEUCHI_GET_INIT_DATA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachTieuChi: [],
        DanhSachDauBaoCao: [],
        DanhSachCuoiBaoCao: [],
        // expandedKeys: [],
        TableLoading: false,
      };
    // get list
    case actions.DMTIEUCHI_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.DMTIEUCHI_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachTieuChi: payload.DanhSachTieuChi,
        DanhSachDauBaoCao: payload.DanhSachDauBaoCao,
        DanhSachCuoiBaoCao: payload.DanhSachCuoiBaoCao,
        // // expandedKeys: payload.expandedKeys,
        TableLoading: false,
      };
    case actions.DMTIEUCHI_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachTieuChi: [],
        DanhSachDauBaoCao: [],
        DanhSachCuoiBaoCao: [],
        // expandedKeys: [],
        TableLoading: false,
      };
    default:
      return state;
  }
}
