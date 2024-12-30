import {getRoleByKey} from '../../../../helpers/utility';
const actions = {
  DMTIEUCHI_GET_INIT_DATA_REQUEST: 'DMTIEUCHI_GET_INIT_DATA_REQUEST',
  DMTIEUCHI_GET_INIT_DATA_REQUEST_SUCCESS:
    'DMTIEUCHI_GET_INIT_DATA_REQUEST_SUCCESS',
  DMTIEUCHI_GET_INIT_DATA_REQUEST_ERROR:
    'DMTIEUCHI_GET_INIT_DATA_REQUEST_ERROR',
  getInitData: (filterData) => {
    return (disPatch, getState) => {
      //get role
      // -------
      disPatch({
        type: actions.DMTIEUCHI_GET_INIT_DATA_REQUEST,
        payload: {filterData},
      });
    };
  },

  DMTIEUCHI_GET_LIST_REQUEST: 'DMTIEUCHI_GET_LIST_REQUEST',
  DMTIEUCHI_GET_LIST_REQUEST_SUCCESS: 'DMTIEUCHI_GET_LIST_REQUEST_SUCCESS',
  DMTIEUCHI_GET_LIST_REQUEST_ERROR: 'DMTIEUCHI_GET_LIST_REQUEST_ERROR',
  getList: (filterData) => ({
    type: actions.DMTIEUCHI_GET_LIST_REQUEST,
    payload: {filterData},
  }),
};
export default actions;
