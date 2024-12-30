import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/DanhMuc/QLNhanLucThuVien/config';
import actions from './actions';
function* getList({payload}) {
  try {
    const response = yield call(api.danhSachNhanLucThuVien, payload.filterData);
    // const responseAll = yield call(api.danhSachHuongDan, {
    //   PageNumber: 1,
    //   PageSize: 1000,
    // });
    yield put({
      type: actions.NHANLUC_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachNhanLuc: response.data.Data,
        // AllHuongDan: responseAll.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.NHANLUC_GET_LIST_REQUEST_ERROR,
    });
  }
}
function* getAllQLThuVien({payload}) {
  try {
    const response = yield call(api.danhSachQuanLyThuVien, payload.filterData);
    yield put({
      type: actions.NHANLUC_GET_ALL_DATA_REQUEST_SUCCESS,
      payload: {
        DanhSachAllQLThuVien: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.NHANLUC_GET_ALL_DATA_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.NHANLUC_GET_LIST_REQUEST, getList),
    yield takeEvery(actions.NHANLUC_GET_ALL_DATA_REQUEST, getAllQLThuVien),
  ]);
}
