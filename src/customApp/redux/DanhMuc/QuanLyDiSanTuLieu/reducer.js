import actions from './actions';

const initState = {
  role: {view: 0, add: 0, edit: 0, delete: 0},
  DanhSachDiSanTuLieu: [],
  DanhSachDMDiSanTuLieu: [],
  TotalRow: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const {type, payload} = action;
  switch (type) {
    //get list
    case actions.QLDISANTULIEU_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.QLDISANTULIEU_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachDiSanTuLieu: payload.DanhSachDiSanTuLieu,
        // AllHuongDan: payload.AllHuongDan,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.QLDISANTULIEU_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachDiSanTuLieu: [],
        TotalRow: 0,
        TableLoading: false,
      };
    default:
      return state;
  }
}
