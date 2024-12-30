import actions from './actions';

const initState = {
  DanhSachCoQuanDonVi: [],
  TotalRow: 0,
  tableLoading: true,
};

const ReducerCoQuanDonVi = (state = initState, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.COQUANDONVI_GET_INIT_DATA_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.COQUANDONVI_GET_INIT_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachCoQuanDonVi: payload.DanhSachCoQuanDonVi,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.COQUANDONVI_GET_INIT_DATA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachCoQuanDonVi: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default ReducerCoQuanDonVi;
