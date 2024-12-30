import actions from './actions';
const initialData = {
  CauHinhDangNhap: [],
};

const reducer = (state = initialData, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.CauHinhDangNhap_GET_LIST_REQUEST:
      return {
        ...state,
      };
    case actions.CauHinhDangNhap_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        CauHinhDangNhap: payload.CauHinhDangNhap,
      };
    case actions.CauHinhDangNhap_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        CauHinhDangNhap: [],
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
