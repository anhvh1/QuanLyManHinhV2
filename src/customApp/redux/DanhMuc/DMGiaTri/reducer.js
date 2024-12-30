import actions from './actions';

const initState = {
  DanhSachGiaTri: [],
  TotalRow: 0,
  tableLoading: true,
};

const ReducerGiaTri = (state = initState, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.GIATRI_GET_INIT_DATA_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.GIATRI_GET_INIT_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachGiaTri: payload.DanhSachGiaTri,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.GIATRI_GET_INIT_DATA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachGiaTri: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default ReducerGiaTri;
