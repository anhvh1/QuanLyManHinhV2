import {getRoleByKey} from '../../../../helpers/utility';

const actions = {
  QLDISANTULIEU_GET_INIT_DATA_REQUEST: 'QLDISANTULIEU_GET_INIT_DATA_REQUEST',
  QLDISANTULIEU_GET_INIT_DATA_REQUEST_SUCCESS: 'QLDISANTULIEU_GET_INIT_DATA_REQUEST_SUCCESS',
  QLDISANTULIEU_GET_INIT_DATA_REQUEST_ERROR: 'QLDISANTULIEU_GET_INIT_DATA_REQUEST_ERROR',
  getInitData: (filterData) => {
    return (disPatch, getState) => {
      //get role
      let listRole = getState().Auth.role;
      let role = getRoleByKey(listRole, 'di-san');
      //-------
      disPatch({
        type: actions.QLDISANTULIEU_GET_INIT_DATA_REQUEST,
        payload: {filterData, role},
      });
    };
  },

  QLDISANTULIEU_GET_LIST_REQUEST: 'QLDISANTULIEU_GET_LIST_REQUEST',
  QLDISANTULIEU_GET_LIST_REQUEST_SUCCESS: 'QLDISANTULIEU_GET_LIST_REQUEST_SUCCESS',
  QLDISANTULIEU_GET_LIST_REQUEST_ERROR: 'QLDISANTULIEU_GET_LIST_REQUEST_ERROR',
  getList: (filterData) => ({
    type: actions.QLDISANTULIEU_GET_LIST_REQUEST,
    payload: {filterData},
  }),
  //get notification
  getGuild: () => ({type: 'GET_NOTIFICATION_REQUEST_TO_APP_SAGA'}),
};
export default actions;
