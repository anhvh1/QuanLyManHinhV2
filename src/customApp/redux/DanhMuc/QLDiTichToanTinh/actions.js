import {getRoleByKey} from '../../../../helpers/utility';

const actions = {
  DITICHTOANTINH_GET_INIT_DATA_REQUEST: 'DITICHTOANTINH_GET_INIT_DATA_REQUEST',
  DITICHTOANTINH_GET_INIT_DATA_REQUEST_SUCCESS: 'DITICHTOANTINH_GET_INIT_DATA_REQUEST_SUCCESS',
  DITICHTOANTINH_GET_INIT_DATA_REQUEST_ERROR: 'DITICHTOANTINH_GET_INIT_DATA_REQUEST_ERROR',
  getInitData: (filterData) => {
    return (disPatch, getState) => {
      //get role
      let listRole = getState().Auth.role;
      let role = getRoleByKey(listRole, 'di-tich-toan-tinh');
      //-------
      disPatch({
        type: actions.DITICHTOANTINH_GET_INIT_DATA_REQUEST,
        payload: {filterData, role},
      });
    };
  },
  DITICHTOANTINH_GET_LIST_REQUEST: 'DITICHTOANTINH_GET_LIST_REQUEST',
  DITICHTOANTINH_GET_LIST_REQUEST_SUCCESS: 'DITICHTOANTINH_GET_LIST_REQUEST_SUCCESS',
  DITICHTOANTINH_GET_LIST_REQUEST_ERROR: 'DITICHTOANTINH_GET_LIST_REQUEST_ERROR',
  getList: (filterData) => ({
    type: actions.DITICHTOANTINH_GET_LIST_REQUEST,
    payload: {filterData},
  }),
  //get notification
  getGuild: () => ({type: 'GET_NOTIFICATION_REQUEST_TO_APP_SAGA'}),
};
export default actions;
