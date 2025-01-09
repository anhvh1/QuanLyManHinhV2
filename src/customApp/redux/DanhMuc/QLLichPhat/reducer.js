import actions from './actions';

const initState = {
  role: {view: 0, add: 0, edit: 0, delete: 0},
  DanhSachNgheNhan: [],
  DanhSachLoaiSuKien:[],
  DanhSachMediaOrPhat:[],
  DanhSachManHinhOrNhomManHinh:[],
  TotalRow: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const {type, payload} = action;
  switch (type) {
     //get initData
     case actions.NGHENHAN_GET_INIT_DATA_REQUEST:
      return {
        ...state,
      };
    case actions.NGHENHAN_GET_INIT_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachLoaiSuKien: payload.DanhSachLoaiSuKien,
        DanhSachMediaOrPhat: payload.DanhSachMediaOrPhat,
        DanhSachManHinhOrNhomManHinh: payload.DanhSachManHinhOrNhomManHinh,
      };
    case actions.NGHENHAN_GET_INIT_DATA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachLoaiSuKien: [],
        DanhSachMediaOrPhat: [],
        DanhSachManHinhOrNhomManHinh:[],
      };
    //get list
    case actions.NGHENHAN_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.NGHENHAN_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachNgheNhan: payload.DanhSachNgheNhan,
        // AllHuongDan: payload.AllHuongDan,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.NGHENHAN_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachNgheNhan: [],
        TotalRow: 0,
        TableLoading: false,
      };
    default:
      return state;
  }
}
