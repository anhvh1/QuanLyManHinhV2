import axios from 'axios';
import {getTokenDecode} from '../helpers/utility';
export const formDataCaller = (url, data) => {
  return axios({
    method: 'POST',
    url,
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${getTokenDecode()}`,
    },
  }).catch((err) => {
    const {status, statusText} = err.response;
    return {
      Status: 0,
      Message:
        status || statusText ? `${status} - ${statusText}` : 'Đã có lỗi xảy ra',
    };
  });
};
