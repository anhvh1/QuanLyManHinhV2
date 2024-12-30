import {all, takeEvery, put, call} from 'redux-saga/effects';
import getApi from '../../../containers/DanhMuc/config';
import {DANHMUCCHUNG} from '../../../../settings/constants';
import actions from './actions';
const {api} = getApi(DANHMUCCHUNG.PHANLOAI);
function* getDataPhanLoai({payload}) {
  try {
    const response = yield call(api.DanhSachChung, payload.filterData);
    yield put({
      type: actions.PHANLOAI_GET_INIT_DATA_REQUEST_SUCCESS,
      payload: {
        DanhSachPhanLoai: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.PHANLOAI_GET_INIT_DATA_REQUEST_ERROR,
    });
  }
}

export default function* phanloaiAll() {
  yield all([
    yield takeEvery(actions.PHANLOAI_GET_INIT_DATA_REQUEST, getDataPhanLoai),
  ]);
}
