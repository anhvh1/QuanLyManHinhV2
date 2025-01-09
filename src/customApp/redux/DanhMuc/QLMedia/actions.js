import {getRoleByKey} from '../../../../helpers/utility';

const actions = {
  MEDIA_GET_INIT_DATA_REQUEST: 'MEDIA_GET_INIT_DATA_REQUEST',
  MEDIA_GET_INIT_DATA_REQUEST_SUCCESS: 'MEDIA_GET_INIT_DATA_REQUEST_SUCCESS',
  MEDIA_GET_INIT_DATA_REQUEST_ERROR: 'MEDIA_GET_INIT_DATA_REQUEST_ERROR',
  getInitData: (filterData) => {
    return (disPatch, getState) => {
      //get role
      let listRole = getState().Auth.role;
      let role = getRoleByKey(listRole, 'di-tich-toan-tinh');
      //-------
      disPatch({
        type: actions.MEDIA_GET_INIT_DATA_REQUEST,
        payload: {filterData, role},
      });
    };
  },
  MEDIA_GET_LIST_REQUEST: 'MEDIA_GET_LIST_REQUEST',
  MEDIA_GET_LIST_REQUEST_SUCCESS: 'MEDIA_GET_LIST_REQUEST_SUCCESS',
  MEDIA_GET_LIST_REQUEST_ERROR: 'MEDIA_GET_LIST_REQUEST_ERROR',
  getList: (filterData) => ({
    type: actions.MEDIA_GET_LIST_REQUEST,
    payload: {filterData},
  }),
  //get notification
  getGuild: () => ({type: 'GET_NOTIFICATION_REQUEST_TO_APP_SAGA'}),
};
export default actions;
