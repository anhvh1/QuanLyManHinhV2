import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/DanhMuc/DMCapDiTichXepHang/config';
import actions from './actions';
function* getDataCapDiTichXepHang({payload}) {
  try {
    const response = yield call(api.DanhSachCapDiTichXepHang, payload.filterData);
    yield put({
      type: actions.CAPDITICHXEPHANG_GET_INIT_DATA_REQUEST_SUCCESS,
      payload: {
        DanhSachCapDiTichXepHang: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.CAPDITICHXEPHANG_GET_INIT_DATA_REQUEST_ERROR,
    });
  }
}

export default function* CapDiTichXepHangAll() {
  yield all([
    yield takeEvery(actions.CAPDITICHXEPHANG_GET_INIT_DATA_REQUEST, getDataCapDiTichXepHang),
  ]);
}
