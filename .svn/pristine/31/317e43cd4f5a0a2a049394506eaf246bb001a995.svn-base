import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/DanhMuc/QLBaoTang/config';
import actions from './actions';

function* getInitData({payload}) {
  try {
    const response = yield call(api.danhSachBaoTang, payload.filterData);
    yield put({
      type: actions.BAOVATQUOCGIA_GET_INIT_DATA_REQUEST_SUCCESS,
      payload: {
        DanhSachBaoTang: response.data.Data,
        // AllHuongDan: responseAll.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.BAOTANG_GET_INIT_DATA_REQUEST_ERROR,
    });
  }
}

function* getList({payload}) {
  try {
    const response = yield call(api.danhSachBaoTang, payload.filterData);
    yield put({
      type: actions.BAOTANG_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachBaoTang: response.data.Data,
        // AllHuongDan: responseAll.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.BAOTANG_GET_LIST_REQUEST_ERROR,
    });
  }
}

function* getAll({payload}) {
  try {
    const response = yield call(api.AllDanhSachBaoTang, payload.filterData);
    yield put({
      type: actions.BAOTANG_GET_ALL_REQUEST_SUCCESS,
      payload: {
        DanhSachBaoTangAll: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.BAOTANG_GET_ALL_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.BAOTANG_GET_INIT_DATA_REQUEST, getInitData),
    yield takeEvery(actions.BAOTANG_GET_LIST_REQUEST, getList),
    yield takeEvery(actions.BAOTANG_GET_ALL_REQUEST, getAll),
  ]);
}
