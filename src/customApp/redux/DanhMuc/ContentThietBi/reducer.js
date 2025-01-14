import actions from './actions';

const initState = {
  role: {view: 0, add: 0, edit: 0, delete: 0},
  DanhSachManHinh: [],
  DanhSachDMDiSanTuLieu: [],
  TotalRow: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const {type, payload} = action;
  switch (type) {
    //get list
    case actions.QLMANHINH_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.QLMANHINH_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachManHinh: payload.DanhSachManHinh,
        // AllHuongDan: payload.AllHuongDan,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.QLMANHINH_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachManHinh: [],
        TotalRow: 0,
        TableLoading: false,
      };
    default:
      return state;
  }
}
