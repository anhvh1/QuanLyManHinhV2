import actions from './actions';

const initState = {
  role: {view: 0, add: 0, edit: 0, delete: 0},
  DanhSachBaoTang: [],
  DanhSachBaoTangAll: [],
  TotalRow: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const {type, payload} = action;
  switch (type) {
    //get all
    case actions.BAOTANG_GET_ALL_REQUEST:
      return {
        ...state,
      };
    case actions.BAOTANG_GET_ALL_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachBaoTangAll: payload.DanhSachBaoTangAll,
      };
    case actions.BAOTANG_GET_ALL_REQUEST_ERROR:
      return {
        ...state,
        DanhSachBaoTangAll: [],
      };
    //get list
    case actions.BAOTANG_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.BAOTANG_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachBaoTang: payload.DanhSachBaoTang,
        // AllHuongDan: payload.AllHuongDan,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.BAOTANG_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachBaoTang: [],
        TotalRow: 0,
        TableLoading: false,
      };
    default:
      return state;
  }
}
