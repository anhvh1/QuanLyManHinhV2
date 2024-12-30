import actions from './actions';

const initState = {
  DanhSachCapDiTichXepHang: [],
  TotalRow: 0,
  tableLoading: true,
};

const ReducerCapDiTichXepHang = (state = initState, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.CAPDITICHXEPHANG_GET_INIT_DATA_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.CAPDITICHXEPHANG_GET_INIT_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachCapDiTichXepHang: payload.DanhSachCapDiTichXepHang,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.CAPDITICHXEPHANG_GET_INIT_DATA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachCapDiTichXepHang: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default ReducerCapDiTichXepHang;
