import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/DanhMuc/GiaoDienKhachHang/Content/Media/config';
import actions from './actions';

function* getInitData({payload}) {
  try {
    const responseLoaiDiTich = yield call(api.DanhSachMedia, payload.filterData);
    const responseCapXepHang = yield call(api.DanhSachThuMuc, payload.filterData);
    
    yield put({
      type: actions.MEDIA_GET_INIT_DATA_REQUEST_SUCCESS,
      payload: {
        DanhSachMedia: responseLoaiDiTich.data.Data,
        DanhSachThuMuc: responseCapXepHang.data.Data.Data,
        TotalRow: responseLoaiDiTich.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.MEDIA_GET_INIT_DATA_REQUEST_ERROR,
    });
  }
}
function* getList({payload}) {
  try {
    const response = yield call(api.DanhSachMedia, payload.filterData);
    // const responseAll = yield call(api.danhSachHuongDan, {
    //   PageNumber: 1,
    //   PageSize: 1000,
    // });
    yield put({
      type: actions.MEDIA_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachMedia: response.data.Data,
        // AllHuongDan: responseAll.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.MEDIA_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.MEDIA_GET_INIT_DATA_REQUEST, getInitData),
  ]);
  
  yield all([yield takeEvery(actions.MEDIA_GET_LIST_REQUEST, getList)]);
}
