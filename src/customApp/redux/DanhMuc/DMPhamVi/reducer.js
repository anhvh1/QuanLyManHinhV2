import actions from './actions';

const initState = {
  DanhSachPhamVi: [],
  TotalRow: 0,
  tableLoading: true,
};

const ReducerPhamVi = (state = initState, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.PHAMVI_GET_INIT_DATA_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.PHAMVI_GET_INIT_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachPhamVi: payload.DanhSachPhamVi,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.PHAMVI_GET_INIT_DATA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachPhamVi: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default ReducerPhamVi;
