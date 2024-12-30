import actions from './actions';
const initState = {
  role: {view: 0, add: 0, edit: 0, delete: 0},
  DanhSachMedia: [],
  DanhSachThuMuc: [],
  TotalRow: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const {type, payload} = action;
  switch (type) {
    //get initData
    case actions.MEDIA_GET_INIT_DATA_REQUEST:
      return {
        ...state,
      };
    case actions.MEDIA_GET_INIT_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachMedia: payload.DanhSachMedia,
        DanhSachThuMuc: payload.DanhSachThuMuc,
      };
    case actions.MEDIA_GET_INIT_DATA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachThuMuc: [],
      };


      
    //get list
    case actions.MEDIA_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.MEDIA_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachMedia: payload.DanhSachMedia,
        // AllHuongDan: payload.AllHuongDan,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.MEDIA_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachMedia: [],
        TotalRow: 0,
        TableLoading: false,
      };
    default:
      return state;
  }
}
