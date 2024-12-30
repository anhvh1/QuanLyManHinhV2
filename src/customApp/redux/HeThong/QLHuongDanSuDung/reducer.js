import actions from './actions';

const initState = {
  role: {view: 0, add: 0, edit: 0, delete: 0},
  DanhSachHuongDan: [],
  DanhSachCacCap: [],
  TotalRow: 0,
  tableLoading: false,
};

export default function Reducer(state = initState, action) {
  const {type, payload} = action;
  switch (type) {
    //get initData
    case actions.QLHDSD_GET_INIT_DATA_REQUEST:
      return {
        ...state,
      };
    case actions.QLHDSD_GET_INIT_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachCacCap: payload.DanhSachCacCap,
      };
    case actions.QLHDSD_GET_INIT_DATA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachCacCap: [],
      };
    //get list
    case actions.QLHDSD_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.QLHDSD_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachHuongDan: payload.DanhSachHuongDan,
        TotalRow: payload.TotalRow,
        tableLoading: false,
      };
    case actions.QLHDSD_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachHuongDan: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return state;
  }
}
