import actions from './actions';

const initState = {
  user: null,
  role: null,
  dataConfig: null,
  is_refreshing: false,
  access_token: null,
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return {
        ...state,
        is_refreshing: true,
      };
    case actions.CHECK_AUTHORIZATION:
      return {
        ...state,
        is_refreshing: true,
      };
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        role: action.role,
        is_refreshing: false,
        access_token: action.access_token,
      };
    case actions.LOGOUT:
      return {
        ...state,
        user: null,
        role: null,
        access_token: null,
        dataConfig: null,
        is_refreshing: false,
      };
    default:
      return state;
  }
}
