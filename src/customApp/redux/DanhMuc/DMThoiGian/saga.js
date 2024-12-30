import {all, takeEvery, put, call} from 'redux-saga/effects';
import actions from './actions';
import getApi from '../../../containers/DanhMuc/config';
import {DANHMUCCHUNG} from '../../../../settings/constants';
const {api} = getApi(DANHMUCCHUNG.THOIGIAN);
function* getDataThoiGian({payload}) {
  try {
    const response = yield call(api.DanhSachChung, payload.filterData);
    yield put({
      type: actions.THOIGIAN_GET_INIT_DATA_REQUEST_SUCCESS,
      payload: {
        DanhSachThoiGian: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.THOIGIAN_GET_INIT_DATA_REQUEST_ERROR,
    });
  }
}

function* getAll({payload}) {
  try {
    const response = yield call(api.GetAllDanhMucChung, payload.filterData);
    yield put({
      type: actions.THOIGIAN_GET_ALL_DATA_REQUEST_SUCCESS,
      payload: {
        DanhSachThoiGianAll: response.data.Data,
      },
    });
  } catch (e) {
    yield put({
      type: actions.THOIGIAN_GET_ALL_DATA_REQUEST_ERROR,
    });
  }
}

export default function* ThoiGianAll() {
  yield all([
    yield takeEvery(actions.THOIGIAN_GET_INIT_DATA_REQUEST, getDataThoiGian),
    yield takeEvery(actions.THOIGIAN_GET_ALL_DATA_REQUEST, getAll),
  ]);
}
