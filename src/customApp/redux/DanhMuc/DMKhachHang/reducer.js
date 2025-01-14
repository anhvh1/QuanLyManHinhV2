import actions from './actions';

const initState = {
  role: {view: 0, add: 0, edit: 0, delete: 0},
  DanhSachKhachHang: [],
  DanhSachDMThuVien: [],
  TotalRow: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const {type, payload} = action;
  switch (type) {
        //get initData
        case actions.KHACHHANG_GET_INIT_DATA_REQUEST:
          return {
            ...state,
          };
        case actions.KHACHHANG_GET_INIT_DATA_REQUEST_SUCCESS:
          return {
            ...state,
            DanhSachDMThuVien: payload.DanhSachDMThuVien,
          };
        case actions.KHACHHANG_GET_INIT_DATA_REQUEST_ERROR:
          return {
            ...state,
            DanhSachDMThuVien: [],
          };
    //get list
    case actions.KHACHHANG_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.KHACHHANG_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachKhachHang: payload.DanhSachKhachHang,
        // AllHuongDan: payload.AllHuongDan,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.KHACHHANG_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachKhachHang: [],
        TotalRow: 0,
        TableLoading: false,
      };
    default:
      return state;
  }
}
