import {getRoleByKey} from '../../../../helpers/utility';

const actions = {
  NHANLUC_GET_LIST_REQUEST: 'NHANLUC_GET_LIST_REQUEST',
  NHANLUC_GET_LIST_REQUEST_SUCCESS: 'NHANLUC_GET_LIST_REQUEST_SUCCESS',
  NHANLUC_GET_LIST_REQUEST_ERROR: 'NHANLUC_GET_LIST_REQUEST_ERROR',
  getList: (filterData) => ({
    type: actions.NHANLUC_GET_LIST_REQUEST,
    payload: {filterData},
  }),
  NHANLUC_GET_ALL_DATA_REQUEST: 'NHANLUC_GET_ALL_DATA_REQUEST',
  NHANLUC_GET_ALL_DATA_REQUEST_SUCCESS:
    'NHANLUC_GET_ALL_DATA_REQUEST_SUCCESS',
  NHANLUC_GET_ALL_DATA_REQUEST_ERROR:
    'NHANLUC_GET_ALL_DATA_REQUEST_ERROR',
    getAll: (filterData) => ({
      type: actions.NHANLUC_GET_ALL_DATA_REQUEST,
      payload: {filterData},
    }),
};
export default actions;
