import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/DanhMuc/DMDonViTinh/config';
import actions from './actions';
function* getDataDonViTinh({payload}) {
  try {
    const response = yield call(api.DanhSachDonViTinh, payload.filterData);
    yield put({
      type: actions.DONVITINH_GET_INIT_DATA_REQUEST_SUCCESS,
      payload: {
        DanhSachDonViTinh: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.DONVITINH_GET_INIT_DATA_REQUEST_ERROR,
    });
  }
}

export default function* donvitinhAll() {
  yield all([
    yield takeEvery(actions.DONVITINH_GET_INIT_DATA_REQUEST, getDataDonViTinh),
  ]);
}
