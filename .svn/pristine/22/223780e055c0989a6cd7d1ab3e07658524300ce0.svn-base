import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/DanhMuc/DMCoQuanDonVi/config';
import actions from './actions';
function* getDataCoQuanDonVi({payload}) {
  try {
    const response = yield call(api.DanhSachCoQuanDonVi, payload.filterData);
    yield put({
      type: actions.COQUANDONVI_GET_INIT_DATA_REQUEST_SUCCESS,
      payload: {
        DanhSachCoQuanDonVi: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.COQUANDONVI_GET_INIT_DATA_REQUEST_ERROR,
    });
  }
}

export default function* coquandonviAll() {
  yield all([
    yield takeEvery(
      actions.COQUANDONVI_GET_INIT_DATA_REQUEST,
      getDataCoQuanDonVi,
    ),
  ]);
}
