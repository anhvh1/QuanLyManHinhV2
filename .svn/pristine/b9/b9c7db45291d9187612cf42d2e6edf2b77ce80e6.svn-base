import {all, takeEvery, put, call} from 'redux-saga/effects';

import apiCauHinh from '../../../containers/HeThong/CauHinhDangNhap/config';
import actions from './actions';
function* getList({payload}) {
  try {
    const response = yield call(apiCauHinh.GetAll, payload.filterData);
    yield put({
      type: actions.CauHinhDangNhap_GET_LIST_REQUEST_SUCCESS,
      payload: {
        CauHinhDangNhap: response.data.Data,
      },
    });
  } catch (e) {
    yield put({
      type: actions.CauHinhDangNhap_GET_LIST_REQUEST_ERROR,
    });
  }
}
export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.CauHinhDangNhap_GET_LIST_REQUEST, getList),
  ]);
}
