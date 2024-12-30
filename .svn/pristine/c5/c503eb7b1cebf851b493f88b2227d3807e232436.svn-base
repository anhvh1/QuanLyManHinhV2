import actions from './actions';

const initState = {
  role: {view: 0, add: 0, edit: 0, delete: 0},
  DanhSachNhanLuc: [],
  DanhSachAllQLThuVien: [],
  TotalRow: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const {type, payload} = action;
  switch (type) {
    //get list
    case actions.NHANLUC_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.NHANLUC_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachNhanLuc: payload.DanhSachNhanLuc,
        // AllHuongDan: payload.AllHuongDan,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.NHANLUC_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachNhanLuc: [],
        TotalRow: 0,
        TableLoading: false,
      };
      case actions.NHANLUC_GET_ALL_DATA_REQUEST_SUCCESS:
        return {
          ...state,
          DanhSachAllQLThuVien: payload.DanhSachAllQLThuVien,
        };
      default:
        return {
          ...state,
        };
    }
}
