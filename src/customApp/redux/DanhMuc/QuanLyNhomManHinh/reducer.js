import actions from './actions';

const initState = {
  role: {view: 0, add: 0, edit: 0, delete: 0},
  DanhSachNhomManHinh: [],
  DanhSachManHinh: [],
  TotalRow: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const {type, payload} = action;
  switch (type) {
    //get initData
    case actions.QLNHOMMANHINH_GET_INIT_DATA_REQUEST:
      return {
        ...state,
      };
    case actions.QLNHOMMANHINH_GET_INIT_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachManHinh: payload.DanhSachManHinh,
      };
    case actions.QLNHOMMANHINH_GET_INIT_DATA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachManHinh: [],
      };
    //get list
    case actions.QLNHOMMANHINH_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.QLNHOMMANHINH_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachNhomManHinh: payload.DanhSachNhomManHinh,
        // AllHuongDan: payload.AllHuongDan,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.QLNHOMMANHINH_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachNhomManHinh: [],
        TotalRow: 0,
        TableLoading: false,
      };
    default:
      return state;
  }
}
