import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/DanhMuc/QLDiSanVanHoaPhiVatThe/config';
import actions from './actions';
function* getInitData({payload}) {
  try {
    const response = yield call(api.danhSachDanhMucDiSanVanHoaPhiVatThe, payload.filterData);
    yield put({
      type: actions.DISAN_GET_INIT_DATA_REQUEST_SUCCESS,
      payload: {
        DanhSachDanhMucDiSanVanHoaPhiVatThe: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.DISAN_GET_INIT_DATA_REQUEST_ERROR,
    });
  }
}
function* getList({payload}) {
  try {
    const response = yield call(api.danhSachDiSanVanHoaPhiVatThe, payload.filterData);
    // const responseAll = yield call(api.danhSachHuongDan, {
    //   PageNumber: 1,
    //   PageSize: 1000,
    // });
    yield put({
      type: actions.DISAN_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachDiSanVanHoaPhiVatThe: response.data.Data,
        // AllHuongDan: responseAll.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.DISAN_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.DISAN_GET_INIT_DATA_REQUEST, getInitData),
  ]);
  yield all([yield takeEvery(actions.DISAN_GET_LIST_REQUEST, getList)]);
}
