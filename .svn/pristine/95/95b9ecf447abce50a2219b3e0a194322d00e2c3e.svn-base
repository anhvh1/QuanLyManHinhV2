import actions from './actions';

const initState = {
  DanhSachLoaiMauPhieu: [],
  DanhSachAllLoaiMauPhieu: [],
  TotalRow: 0,
  tableLoading: true,
};

const ReducerLoaiMauPhieu = (state = initState, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.LOAIMAUPHIEU_GET_INIT_DATA_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.LOAIMAUPHIEU_GET_INIT_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachLoaiMauPhieu: payload.DanhSachLoaiMauPhieu,
        TotalRow: payload.TotalRow,
        tableLoading: false,
      };
    case actions.LOAIMAUPHIEU_GET_INIT_DATA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachLoaiMauPhieu: [],
        TotalRow: 0,
        tableLoading: false,
      };

    case actions.LOAIMAUPHIEU_GET_ALL_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachAllLoaiMauPhieu: payload.DanhSachAllLoaiMauPhieu,
      };
    default:
      return {
        ...state,
      };
  }
};

export default ReducerLoaiMauPhieu;
