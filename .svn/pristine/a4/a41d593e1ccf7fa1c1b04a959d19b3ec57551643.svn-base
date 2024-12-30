import actions from './actions';
const initState = {
  role: {view: 0, add: 0, edit: 0, delete: 0},
  DanhSachDiSanVanHoaPhiVatThe: [],
  DanhSachDanhMucDiSanVanHoaPhiVatThe:[],
  TotalRow: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const {type, payload} = action;
  switch (type) {
    //get initData
    case actions.DISAN_GET_INIT_DATA_REQUEST:
      return {
        ...state,
        TableLoading: true,
        role: payload.role,
      };
    case actions.DISAN_GET_INIT_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachDanhMucDiSanVanHoaPhiVatThe:
          payload.DanhSachDanhMucDiSanVanHoaPhiVatThe,
          TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.DISAN_GET_INIT_DATA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachDanhMucDiSanVanHoaPhiVatThe: [],
        TotalRow: 0,
        TableLoading: false,
      };

    //get list
    case actions.DISAN_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.DISAN_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachDiSanVanHoaPhiVatThe: payload.DanhSachDiSanVanHoaPhiVatThe,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.DISAN_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachDiSanVanHoaPhiVatThe: [],
        TotalRow: 0,
        TableLoading: false,
      };
    default:
      return state;
  }
}
