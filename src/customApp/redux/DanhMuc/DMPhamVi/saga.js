import {all, takeEvery, put, call} from 'redux-saga/effects';
import getApi from '../../../containers/DanhMuc/config';
import {DANHMUCCHUNG} from '../../../../settings/constants';
import actions from './actions';
const {api} = getApi(DANHMUCCHUNG.PHAMVI);
function* getDataPhamVi({payload}) {
  try {
    const response = yield call(api.DanhSachChung, payload.filterData);
    yield put({
      type: actions.PHAMVI_GET_INIT_DATA_REQUEST_SUCCESS,
      payload: {
        DanhSachPhamVi: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.PHAMVI_GET_INIT_DATA_REQUEST_ERROR,
    });
  }
}

export default function* giatriAll() {
  yield all([
    yield takeEvery(actions.PHAMVI_GET_INIT_DATA_REQUEST, getDataPhamVi),
  ]);
}
