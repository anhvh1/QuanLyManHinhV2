import {all, takeEvery, put, call} from 'redux-saga/effects';
import actions from './actions';
import getApi from '../../../containers/DanhMuc/config';
import {DANHMUCCHUNG} from '../../../../settings/constants';
const {api} = getApi(DANHMUCCHUNG.DMTHUVIEN);
function* getDataDMThuVien({payload}) {
  try {
    const response = yield call(api.DanhSachChung, payload.filterData);
    yield put({
      type: actions.DMTHUVIEN_GET_INIT_DATA_REQUEST_SUCCESS,
      payload: {
        DanhSachDMThuVien: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.DMTHUVIEN_GET_INIT_DATA_REQUEST_ERROR,
    });
  }
}
function* getAllDMThuVien({payload}) {
  try {
    const response = yield call(api.GetAllDanhMucChung, payload.filterData);
    yield put({
      type: actions.DMTHUVIEN_GET_ALL_DATA_REQUEST_SUCCESS,
      payload: {
        DanhSachAllDMThuVien: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.DMTHUVIEN_GET_ALL_DATA_REQUEST_ERROR,
    });
  }
}

export default function* DMThuVienAll() {
  yield all([
    yield takeEvery(
      actions.DMTHUVIEN_GET_INIT_DATA_REQUEST,
      getDataDMThuVien,
    ),
    yield takeEvery(
      actions.DMTHUVIEN_GET_ALL_DATA_REQUEST,
      getAllDMThuVien,
    ),
  ]);
}
