import {getRoleByKey} from '../../../../helpers/utility';

const actions = {
  LICENSE_GET_INIT_DATA_REQUEST: 'LICENSE_GET_INIT_DATA_REQUEST',
  LICENSE_GET_INIT_DATA_REQUEST_SUCCESS: 'LICENSE_GET_INIT_DATA_REQUEST_SUCCESS',
  LICENSE_GET_INIT_DATA_REQUEST_ERROR: 'LICENSE_GET_INIT_DATA_REQUEST_ERROR',
  getInitData: (filterData) => {
    return (disPatch, getState) => {
      //get role
      let listRole = getState().Auth.role;
      let role = getRoleByKey(listRole, 'quan-ly-license');
      //-------
      disPatch({
        type: actions.LICENSE_GET_INIT_DATA_REQUEST,
        payload: {filterData, role},
      });
    };
  },

  LICENSE_GET_LIST_REQUEST: 'LICENSE_GET_LIST_REQUEST',
  LICENSE_GET_LIST_REQUEST_SUCCESS: 'LICENSE_GET_LIST_REQUEST_SUCCESS',
  LICENSE_GET_LIST_REQUEST_ERROR: 'LICENSE_GET_LIST_REQUEST_ERROR',
  getList: (filterData) => ({
    type: actions.LICENSE_GET_LIST_REQUEST,
    payload: {filterData},
  }),
  //get notification
  getGuild: () => ({type: 'GET_NOTIFICATION_REQUEST_TO_APP_SAGA'}),
};
export default actions;
