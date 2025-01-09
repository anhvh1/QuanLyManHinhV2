import {getRoleByKey} from '../../../../helpers/utility';

const actions = {
  KHACHHANG_GET_INIT_DATA_REQUEST: 'KHACHHANG_GET_INIT_DATA_REQUEST',
  KHACHHANG_GET_INIT_DATA_REQUEST_SUCCESS: 'KHACHHANG_GET_INIT_DATA_REQUEST_SUCCESS',
  KHACHHANG_GET_INIT_DATA_REQUEST_ERROR: 'KHACHHANG_GET_INIT_DATA_REQUEST_ERROR',
  getInitData: (filterData) => {
    return (disPatch, getState) => {
      //get role
      let listRole = getState().Auth.role;
      let role = getRoleByKey(listRole, 'ql-thu-vien');
      //-------
      disPatch({
        type: actions.KHACHHANG_GET_INIT_DATA_REQUEST,
        payload: {filterData, role},
      });
    };
  },

  KHACHHANG_GET_LIST_REQUEST: 'KHACHHANG_GET_LIST_REQUEST',
  KHACHHANG_GET_LIST_REQUEST_SUCCESS: 'KHACHHANG_GET_LIST_REQUEST_SUCCESS',
  KHACHHANG_GET_LIST_REQUEST_ERROR: 'KHACHHANG_GET_LIST_REQUEST_ERROR',
  getList: (filterData) => ({
    type: actions.KHACHHANG_GET_LIST_REQUEST,
    payload: {filterData},
  }),
  //get notification
  getGuild: () => ({type: 'GET_NOTIFICATION_REQUEST_TO_APP_SAGA'}),
};
export default actions;
