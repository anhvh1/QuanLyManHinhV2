import actions from './actions';

const initState = {
  role: {view: 0, add: 0, edit: 0, delete: 0},
  DanhSachBaoVatQuocGia: [],
  DanhSachBaoTang:[],
  //   AllHuongDan: [],
  TotalRow: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const {type, payload} = action;
  switch (type) {
    //get initData
    case actions.BAOVATQUOCGIA_GET_INIT_DATA_REQUEST:
      return {
        ...state,
        TableLoading: true,
        role: payload.role,
      };
    case actions.BAOVATQUOCGIA_GET_INIT_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachBaoTang: payload.DanhSachBaoTang,
        // AllHuongDan: payload.AllHuongDan,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.BAOVATQUOCGIA_GET_INIT_DATA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachBaoTang: [],
        TotalRow: 0,
        TableLoading: false,
      };
    //get list
    case actions.BAOVATQUOCGIA_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.BAOVATQUOCGIA_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachBaoVatQuocGia: payload.DanhSachBaoVatQuocGia,
        // AllHuongDan: payload.AllHuongDan,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.BAOVATQUOCGIA_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachBaoVatQuocGia: [],
        TotalRow: 0,
        TableLoading: false,
      };
    default:
      return state;
  }
}
