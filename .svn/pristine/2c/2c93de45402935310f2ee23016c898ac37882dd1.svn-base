import actions from './actions';

const initState = {
  role: {view: 0, add: 0, edit: 0, delete: 0},
  DanhSachQLThuVien: [],
  DanhSachDMThuVien:[],
  DanhSachMedia: [],
  DanhSachNguoiDung:[],
  TotalRow: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const {type, payload} = action;
  switch (type) {
        //get initData
        case actions.QLTHUVIEN_GET_INIT_DATA_REQUEST:
          return {
            ...state,
          };
        case actions.QLTHUVIEN_GET_INIT_DATA_REQUEST_SUCCESS:
          return {
            ...state,
            DanhSachDMThuVien: payload.DanhSachDMThuVien,
            DanhSachMedia: payload.DanhSachMedia,
            DanhSachNguoiDung: payload.DanhSachNguoiDung,
          };
        case actions.QLTHUVIEN_GET_INIT_DATA_REQUEST_ERROR:
          return {
            ...state,
            DanhSachDMThuVien: [],
            DanhSachMedia: [],
            DanhSachNguoiDung:[],
          };
          
    //get list
    case actions.QLTHUVIEN_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.QLTHUVIEN_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachQLThuVien: payload.DanhSachQLThuVien,
        // AllHuongDan: payload.AllHuongDan,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.QLTHUVIEN_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachQLThuVien: [],
        TotalRow: 0,
        TableLoading: false,
      };
    default:
      return state;
  }
}
