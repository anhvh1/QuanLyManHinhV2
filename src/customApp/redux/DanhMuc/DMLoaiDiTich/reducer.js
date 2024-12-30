import actions from './actions';

const initState = {
  DanhSachLoaiDiTich: [],
  TotalRow: 0,
  tableLoading: true,
};

const ReducerLoaiDiTich = (state = initState, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.LOAIDITICH_GET_INIT_DATA_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.LOAIDITICH_GET_INIT_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachLoaiDiTich: payload.DanhSachLoaiDiTich,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.LOAIDITICH_GET_INIT_DATA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachLoaiDiTich: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default ReducerLoaiDiTich;
