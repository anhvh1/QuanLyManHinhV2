import {all, takeEvery, put, call} from 'redux-saga/effects';
import actions from './actions';
import getApi from '../../../containers/DanhMuc/config';
import {DANHMUCCHUNG} from '../../../../settings/constants';
const {api} = getApi(DANHMUCCHUNG.LOAIDITICH);
function* getDataLoaiDiTich({payload}) {
  try {
    const response = yield call(api.DanhSachChung, payload.filterData);
    yield put({
      type: actions.LOAIDITICH_GET_INIT_DATA_REQUEST_SUCCESS,
      payload: {
        DanhSachLoaiDiTich: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.LOAIDITICH_GET_INIT_DATA_REQUEST_ERROR,
    });
  }
}

export default function* LoaiDiTichAll() {
  yield all([
    yield takeEvery(
      actions.LOAIDITICH_GET_INIT_DATA_REQUEST,
      getDataLoaiDiTich,
    ),
  ]);
}
