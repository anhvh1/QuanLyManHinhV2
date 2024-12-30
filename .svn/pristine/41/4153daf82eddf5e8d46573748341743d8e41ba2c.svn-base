import actions from './actions';

const initState = {
  role: {view: 0, add: 0, edit: 0, delete: 0},
  DanhSachDanhMucDiSanVanHoaPhiVatThe: [],
  //   AllHuongDan: [],
  TotalRow: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const {type, payload} = action;
  switch (type) {
    //get list
    case actions.QLDISAN_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.QLDISAN_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachDanhMucDiSanVanHoaPhiVatThe: payload.DanhSachDanhMucDiSanVanHoaPhiVatThe,
        // AllHuongDan: payload.AllHuongDan,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.QLDISAN_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachDanhMucDiSanVanHoaPhiVatThe: [],
        TotalRow: 0,
        TableLoading: false,
      };
    default:
      return state;
  }
}
