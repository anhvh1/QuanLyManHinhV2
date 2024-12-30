import actions from './actions';

const initState = {
  DanhSachDonViTinh: [],
  TotalRow: 0,
  tableLoading: true,
};

const ReducerDonViTinh = (state = initState, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.DONVITINH_GET_INIT_DATA_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.DONVITINH_GET_INIT_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachDonViTinh: payload.DanhSachDonViTinh,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.DONVITINH_GET_INIT_DATA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachDonViTinh: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default ReducerDonViTinh;
