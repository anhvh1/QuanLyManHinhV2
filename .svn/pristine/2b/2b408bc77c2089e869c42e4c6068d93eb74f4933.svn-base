import actions from './actions';

const initState = {
  DanhSachPhanLoai: [],
  TotalRow: 0,
  tableLoading: true,
};

const ReducerPhanLoai = (state = initState, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.PHANLOAI_GET_INIT_DATA_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.PHANLOAI_GET_INIT_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachPhanLoai: payload.DanhSachPhanLoai,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.PHANLOAI_GET_INIT_DATA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachPhanLoai: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default ReducerPhanLoai;
