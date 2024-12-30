import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/DanhMuc/QLNgheNhan/config';
import actions from './actions';
function* getInitData({payload}) {
  try {
    const responseLoaiSuKien = yield call(
      api.danhSachLoaiSuKien,
      payload.filterData,
    );
    const responseMediaOrPhat = yield call(
      api.danhSachMediaorPhat,
      payload.filterData,
    );
    const responseManHinhOrNhomManHinh = yield call(
      api.danhSachManHinhOrNhomManHinh,
      payload.filterData,
    );
    yield put({
      type: actions.NGHENHAN_GET_INIT_DATA_REQUEST_SUCCESS,
      payload: {
        DanhSachLoaiSuKien: responseLoaiSuKien.data.Data,
        DanhSachMediaOrPhat: responseMediaOrPhat.data.Data,
        DanhSachManHinhOrNhomManHinh: responseManHinhOrNhomManHinh.data.Data,
        TotalRow: responseLoaiSuKien.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.NGHENHAN_GET_INIT_DATA_REQUEST_ERROR,
    });
  }
}
function* getList({payload}) {
  try {
    const response = yield call(api.danhSachNgheNhan, payload.filterData);
    // const responseAll = yield call(api.danhSachHuongDan, {
    //   PageNumber: 1,
    //   PageSize: 1000,
    // });
    yield put({
      type: actions.NGHENHAN_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachNgheNhan: response.data.Data,
        // AllHuongDan: responseAll.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.NGHENHAN_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.NGHENHAN_GET_INIT_DATA_REQUEST, getInitData),
  ]);
  yield all([yield takeEvery(actions.NGHENHAN_GET_LIST_REQUEST, getList)]);
}
