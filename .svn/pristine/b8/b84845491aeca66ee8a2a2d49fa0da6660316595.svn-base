import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/DanhMuc/DMDiSanTuLieu/config';
import actions from './actions';
function* getInitData({payload}) {
  try {
    const responseLoaiMauPhieu = yield call(api.danhSachLoaiMauPhieu, payload.filterData);
    const responseChiTieu = yield call(api.danhSachChiTieu, payload.filterData);

    yield put({
      type: actions.DMDISANTULIEU_GET_INIT_DATA_REQUEST_SUCCESS,
      payload: {
        DanhSachLoaiMauPhieu: responseLoaiMauPhieu.data.Data,
        DanhSachChiTieu:responseChiTieu.data.Data,
        TotalRow: responseLoaiMauPhieu.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.DMDISANTULIEU_GET_INIT_DATA_REQUEST_ERROR,
    });
  }
}
function* getList({payload}) {
  try {
    const response = yield call(
      api.danhSachDiSanTuLieu,
      payload.filterData,
    );
    yield put({
      type: actions.DMDISANTULIEU_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachDanhMucDiSanTuLieu: response.data.Data,
        // AllHuongDan: responseAll.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.DMDISANTULIEU_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.DMDISANTULIEU_GET_INIT_DATA_REQUEST, getInitData),
  ]);
  yield all([yield takeEvery(actions.DMDISANTULIEU_GET_LIST_REQUEST, getList)]);
}
