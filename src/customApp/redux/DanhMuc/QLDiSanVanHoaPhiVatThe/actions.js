import {getRoleByKey} from '../../../../helpers/utility';

const actions = {
  DISAN_GET_INIT_DATA_REQUEST: 'DISAN_GET_INIT_DATA_REQUEST',
  DISAN_GET_INIT_DATA_REQUEST_SUCCESS: 'DISAN_GET_INIT_DATA_REQUEST_SUCCESS',
  DISAN_GET_INIT_DATA_REQUEST_ERROR: 'DISAN_GET_INIT_DATA_REQUEST_ERROR',
  getInitData: (filterData) => {
    return (disPatch, getState) => {
      //get role
      let listRole = getState().Auth.role;
      let role = getRoleByKey(listRole, 'di-tich-toan-tinh');
      //-------
      disPatch({
        type: actions.DISAN_GET_INIT_DATA_REQUEST,
        payload: {filterData, role},
      });
    };
  },
  DISAN_GET_LIST_REQUEST: 'DISAN_GET_LIST_REQUEST',
  DISAN_GET_LIST_REQUEST_SUCCESS: 'DISAN_GET_LIST_REQUEST_SUCCESS',
  DISAN_GET_LIST_REQUEST_ERROR: 'DISAN_GET_LIST_REQUEST_ERROR',
  getList: (filterData) => ({
    type: actions.DISAN_GET_LIST_REQUEST,
    payload: {filterData},
  }),
  //get notification
  getGuild: () => ({type: 'GET_NOTIFICATION_REQUEST_TO_APP_SAGA'}),
};
export default actions;
