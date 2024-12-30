const actions = {
  PHAMVI_GET_INIT_DATA_REQUEST: 'PHAMVI_GET_INIT_DATA_REQUEST',
  PHAMVI_GET_INIT_DATA_REQUEST_SUCCESS: 'PHAMVI_GET_INIT_DATA_REQUEST_SUCCESS',
  PHAMVI_GET_INIT_DATA_REQUEST_ERROR: 'PHAMVI_GET_INIT_DATA_REQUEST_ERROR',

  getData: (filterData) => ({
    type: actions.PHAMVI_GET_INIT_DATA_REQUEST,
    payload: {filterData},
  }),
};

export default actions;
