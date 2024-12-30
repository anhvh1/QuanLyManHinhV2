import actions from './actions';

const initState = {
  DanhSachThoiGian: [],
  DanhSachThoiGianAll: [],
  TotalRow: 0,
  tableLoading: true,
};

const ReducerThoiGian = (state = initState, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.THOIGIAN_GET_INIT_DATA_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.THOIGIAN_GET_INIT_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachThoiGian: payload.DanhSachThoiGian,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.THOIGIAN_GET_INIT_DATA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachThoiGian: [],
        TotalRow: 0,
        tableLoading: false,
      };
    case actions.THOIGIAN_GET_ALL_DATA_REQUEST:
      return {
        ...state,
      };
    case actions.THOIGIAN_GET_ALL_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachThoiGianAll: payload.DanhSachThoiGianAll,
      };
    case actions.THOIGIAN_GET_ALL_DATA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachThoiGianAll: [],
      };
    default:
      return {
        ...state,
      };
  }
};

export default ReducerThoiGian;
