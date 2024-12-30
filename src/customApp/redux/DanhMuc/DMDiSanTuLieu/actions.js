import {getRoleByKey} from '../../../../helpers/utility';

const actions = {
  DMDISANTULIEU_GET_INIT_DATA_REQUEST: 'DMDISANTULIEU_GET_INIT_DATA_REQUEST',
  DMDISANTULIEU_GET_INIT_DATA_REQUEST_SUCCESS: 'DMDISANTULIEU_GET_INIT_DATA_REQUEST_SUCCESS',
  DMDISANTULIEU_GET_INIT_DATA_REQUEST_ERROR: 'DMDISANTULIEU_GET_INIT_DATA_REQUEST_ERROR',
  getInitData: (filterData) => {
    return (disPatch, getState) => {
      //get role
      let listRole = getState().Auth.role;
      let role = getRoleByKey(listRole, 'loai-mau-phieu');
      //-------
      disPatch({
        type: actions.DMDISANTULIEU_GET_INIT_DATA_REQUEST,
        payload: {filterData, role},
      });
    };
  },

  DMDISANTULIEU_GET_LIST_REQUEST: 'DMDISANTULIEU_GET_LIST_REQUEST',
  DMDISANTULIEU_GET_LIST_REQUEST_SUCCESS: 'DMDISANTULIEU_GET_LIST_REQUEST_SUCCESS',
  DMDISANTULIEU_GET_LIST_REQUEST_ERROR: 'DMDISANTULIEU_GET_LIST_REQUEST_ERROR',
  getList: (filterData) => ({
    type: actions.DMDISANTULIEU_GET_LIST_REQUEST,
    payload: {filterData},
  }),
  //get notification
  getGuild: () => ({type: 'GET_NOTIFICATION_REQUEST_TO_APP_SAGA'}),
};
export default actions;
