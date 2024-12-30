import actions from './actions';

const initState = {
  DanhSachDMThuVien: [],
  DanhSachAllDMThuVien: [],
  TotalRow: 0,
  tableLoading: true,
};

const ReducerDMThuVien = (state = initState, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.DMTHUVIEN_GET_INIT_DATA_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.DMTHUVIEN_GET_INIT_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachDMThuVien: payload.DanhSachDMThuVien,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.DMTHUVIEN_GET_INIT_DATA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachDMThuVien: [],
        TotalRow: 0,
        tableLoading: false,
      };
      case actions.DMTHUVIEN_GET_ALL_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachAllDMThuVien: payload.DanhSachAllDMThuVien,
      };
    default:
      return {
        ...state,
      };
  }
};

export default ReducerDMThuVien;
