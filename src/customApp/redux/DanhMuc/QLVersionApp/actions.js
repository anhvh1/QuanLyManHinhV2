import {getRoleByKey} from '../../../../helpers/utility';

const actions = {
  QLVERSIONAPP_GET_INIT_DATA_REQUEST: 'QLVERSIONAPP_GET_INIT_DATA_REQUEST',
  QLVERSIONAPP_GET_INIT_DATA_REQUEST_SUCCESS: 'QLVERSIONAPP_GET_INIT_DATA_REQUEST_SUCCESS',
  QLVERSIONAPP_GET_INIT_DATA_REQUEST_ERROR: 'QLVERSIONAPP_GET_INIT_DATA_REQUEST_ERROR',
  getInitData: (filterData) => {
    return (disPatch, getState) => {
      //get role
      let listRole = getState().Auth.role;
      let role = getRoleByKey(listRole, 'di-san');
      //-------
      disPatch({
        type: actions.QLVERSIONAPP_GET_INIT_DATA_REQUEST,
        payload: {filterData, role},
      });
    };
  },

  QLVERSIONAPP_GET_LIST_REQUEST: 'QLVERSIONAPP_GET_LIST_REQUEST',
  QLVERSIONAPP_GET_LIST_REQUEST_SUCCESS: 'QLVERSIONAPP_GET_LIST_REQUEST_SUCCESS',
  QLVERSIONAPP_GET_LIST_REQUEST_ERROR: 'QLVERSIONAPP_GET_LIST_REQUEST_ERROR',
  getList: (filterData) => ({
    type: actions.QLVERSIONAPP_GET_LIST_REQUEST,
    payload: {filterData},
  }),
  //get notification
  getGuild: () => ({type: 'GET_NOTIFICATION_REQUEST_TO_APP_SAGA'}),
};
export default actions;
