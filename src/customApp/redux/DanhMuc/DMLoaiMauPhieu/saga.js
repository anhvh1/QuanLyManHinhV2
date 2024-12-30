import {all, takeEvery, put, call} from 'redux-saga/effects';
import actions from './actions';
import getApi from '../../../containers/DanhMuc/config';
import {DANHMUCCHUNG} from '../../../../settings/constants';
const {api} = getApi(DANHMUCCHUNG.LOAIMAUPHIEU);
function* getDataLoaiMauPhieu({payload}) {
  try {
    const response = yield call(api.DanhSachChung, payload.filterData);
    yield put({
      type: actions.LOAIMAUPHIEU_GET_INIT_DATA_REQUEST_SUCCESS,
      payload: {
        DanhSachLoaiMauPhieu: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.LOAIMAUPHIEU_GET_INIT_DATA_REQUEST_ERROR,
    });
  }
}

function* getAllLoaiMauPhieu({payload}) {
  try {
    const response = yield call(api.GetAllDanhMucChung, payload.filterData);
    yield put({
      type: actions.LOAIMAUPHIEU_GET_ALL_DATA_REQUEST_SUCCESS,
      payload: {
        DanhSachAllLoaiMauPhieu: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.LOAIMAUPHIEU_GET_ALL_DATA_REQUEST_ERROR,
    });
  }
}

export default function* loaimauphieuAll() {
  yield all([
    yield takeEvery(
      actions.LOAIMAUPHIEU_GET_INIT_DATA_REQUEST,
      getDataLoaiMauPhieu,
    ),
    yield takeEvery(
      actions.LOAIMAUPHIEU_GET_ALL_DATA_REQUEST,
      getAllLoaiMauPhieu,
    ),
  ]);
}
