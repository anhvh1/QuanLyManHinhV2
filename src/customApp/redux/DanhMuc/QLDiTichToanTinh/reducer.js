import actions from './actions';
const initState = {
  role: {view: 0, add: 0, edit: 0, delete: 0},
  DanhSachDiTichToanTinh: [],
  DanhSachLoaiDiTich: [],
  DanhSachCapXepHang: [],
  TotalRow: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const {type, payload} = action;
  switch (type) {
    //get initData
    case actions.DITICHTOANTINH_GET_INIT_DATA_REQUEST:
      return {
        ...state,
      };
    case actions.DITICHTOANTINH_GET_INIT_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachLoaiDiTich: payload.DanhSachLoaiDiTich,
        DanhSachCapXepHang: payload.DanhSachCapXepHang,
      };
    case actions.DITICHTOANTINH_GET_INIT_DATA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachLoaiDiTich: [],
        DanhSachCapXepHang: [],
      };   
    //get list
    case actions.DITICHTOANTINH_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.DITICHTOANTINH_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachDiTichToanTinh: payload.DanhSachDiTichToanTinh,
        // AllHuongDan: payload.AllHuongDan,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.DITICHTOANTINH_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachDiTichToanTinh: [],
        TotalRow: 0,
        TableLoading: false,
      };
    default:
      return state;
  }
}
