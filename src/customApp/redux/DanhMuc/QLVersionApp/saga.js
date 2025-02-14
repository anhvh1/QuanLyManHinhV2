import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/DanhMuc/QLVersionApp/config';
import actions from './actions';
function* getList({payload}) {
  try {
    const response = yield call(api.danhSachVersionApp, payload.filterData);
    // const responseAll = yield call(api.danhSachHuongDan, {
    //   PageNumber: 1,
    //   PageSize: 1000,
    // });
    yield put({
      type: actions.QLVERSIONAPP_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachVersionApp: response.data.Data,
        // AllHuongDan: responseAll.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.QLVERSIONAPP_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery(actions.QLVERSIONAPP_GET_LIST_REQUEST, getList)]);
}
