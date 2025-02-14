import actions from './actions';

const initState = {
  role: {view: 0, add: 0, edit: 0, delete: 0},
  DanhSachVersionApp: [],
  TotalRow: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const {type, payload} = action;
  switch (type) {
    //get list
    case actions.QLVERSIONAPP_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.QLVERSIONAPP_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachVersionApp: payload.DanhSachVersionApp,
        // AllHuongDan: payload.AllHuongDan,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.QLVERSIONAPP_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachVersionApp: [],
        TotalRow: 0,
        TableLoading: false,
      };
    default:
      return state;
  }
}
