import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/DanhMuc/DMGiaTri/config';
import actions from './actions';
function* getDataGiaTri({payload}) {
  try {
    const response = yield call(api.DanhSachGiaTri, payload.filterData);
    yield put({
      type: actions.GIATRI_GET_INIT_DATA_REQUEST_SUCCESS,
      payload: {
        DanhSachGiaTri: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.GIATRI_GET_INIT_DATA_REQUEST_ERROR,
    });
  }
}

export default function* giatriAll() {
  yield all([
    yield takeEvery(actions.GIATRI_GET_INIT_DATA_REQUEST, getDataGiaTri),
  ]);
}
