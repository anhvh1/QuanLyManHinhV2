import {getRoleByKey} from '../../../../helpers/utility';

const actions = {
  BAOTANG_GET_INIT_DATA_REQUEST: 'BAOTANG_GET_INIT_DATA_REQUEST',
  BAOTANG_GET_INIT_DATA_REQUEST_SUCCESS:
    'BAOTANG_GET_INIT_DATA_REQUEST_SUCCESS',
  BAOTANG_GET_INIT_DATA_REQUEST_ERROR: 'BAOTANG_GET_INIT_DATA_REQUEST_ERROR',
  getInitData: (filterData) => {
    return (disPatch, getState) => {
      //get role
      let listRole = getState().Auth.role;
      let role = getRoleByKey(listRole, 'bao-tang');
      //-------
      disPatch({
        type: actions.BAOTANG_GET_INIT_DATA_REQUEST,
        payload: {filterData, role},
      });
    };
  },

  BAOTANG_GET_LIST_REQUEST: 'BAOTANG_GET_LIST_REQUEST',
  BAOTANG_GET_LIST_REQUEST_SUCCESS: 'BAOTANG_GET_LIST_REQUEST_SUCCESS',
  BAOTANG_GET_LIST_REQUEST_ERROR: 'BAOTANG_GET_LIST_REQUEST_ERROR',
  getList: (filterData) => ({
    type: actions.BAOTANG_GET_LIST_REQUEST,
    payload: {filterData},
  }),
  //get notification
  getGuild: () => ({type: 'GET_NOTIFICATION_REQUEST_TO_APP_SAGA'}),

  BAOTANG_GET_ALL_REQUEST: 'BAOTANG_GET_ALL_REQUEST',
  BAOTANG_GET_ALL_REQUEST_SUCCESS: 'BAOTANG_GET_ALL_REQUEST_SUCCESS',
  BAOTANG_GET_ALL_REQUEST_ERROR: 'BAOTANG_GET_ALL_REQUEST_ERROR',
  getAll: (filterData) => ({
    type: actions.BAOTANG_GET_ALL_REQUEST,
    payload: {filterData},
  }),
};
export default actions;
