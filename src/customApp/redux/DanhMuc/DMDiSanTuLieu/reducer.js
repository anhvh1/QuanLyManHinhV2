import actions from './actions';

const initState = {
  role: {view: 0, add: 0, edit: 0, delete: 0},
  DanhSachDanhMucDiSanTuLieu: [],
  DanhSachLoaiMauPhieu: [],
  DanhSachChiTieu:[],
  TotalRow: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const {type, payload} = action;
  switch (type) {
    //get initData
    case actions.DMDISANTULIEU_GET_INIT_DATA_REQUEST:
      return {
        ...state,
      };
    case actions.DMDISANTULIEU_GET_INIT_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachLoaiMauPhieu: payload.DanhSachLoaiMauPhieu,
        DanhSachChiTieu:payload.DanhSachChiTieu,
      };
    case actions.DMDISANTULIEU_GET_INIT_DATA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachLoaiMauPhieu: [],
        DanhSachChiTieu:[]
      };
    //get list
    case actions.DMDISANTULIEU_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.DMDISANTULIEU_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachDanhMucDiSanTuLieu: payload.DanhSachDanhMucDiSanTuLieu,
        // AllHuongDan: payload.AllHuongDan,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.DMDISANTULIEU_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachDanhMucDiSanTuLieu: [],
        TotalRow: 0,
        TableLoading: false,
      };
    default:
      return state;
  }
}
