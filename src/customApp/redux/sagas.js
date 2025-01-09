import {all} from 'redux-saga/effects';
import DMCoQuan from './DanhMuc/DMCoQuan/saga';
// Hệ Thống
import QLPhanQuyen from './HeThong/QLPhanQuyen/saga';
import ListSideBar from './HeThong/Sidebar/saga';
import QLNguoiDung from './HeThong/QLNguoiDung/saga';
import QuanLyThamSoHeThong from './HeThong/QLThamSoHeThong/saga';
import QLHuongDanSuDung from './HeThong/QLHuongDanSuDung/saga';
import NhatKyHeThong from './HeThong/NhatKyHeThong/saga';
import QuanTriDuLieu from './HeThong/QuanTriDuLieu/saga';
import CauHinhDangNhap from './HeThong/CauHinhDangNhap/saga';
import QLChucNang from './HeThong/QLChucNang/saga';
// Dashboard
import DashBoard from './DashBoard/saga';
import QLThuVien from './DanhMuc/QLThuVien/saga';
import DMKhachHang from './DanhMuc/GiaoDienKhachHang/saga';
import KhachHang from './DanhMuc/DMKhachHang/saga';
import QLLichPhat from './DanhMuc/QLLichPhat/saga';
import DMChiTieu from './DanhMuc/QLMedia/saga';
import QuanLyManHinh from './DanhMuc/QuanLyManHinh/saga';
import QuanLyNhomManHinh from './DanhMuc/QuanLyNhomManHinh/saga';
import QLLicense from './DanhMuc/QLLicense/saga';

export default function* devSaga() {
  yield all([
    QLHuongDanSuDung(),
    DMCoQuan(),
    CauHinhDangNhap(),
    QLPhanQuyen(),
    DashBoard(),
    QuanTriDuLieu(),
    QLNguoiDung(),
    ListSideBar(),
    QuanLyThamSoHeThong(),
    NhatKyHeThong(),
    DMKhachHang(),
    QLChucNang(),
    QLLichPhat(),
    KhachHang(),
    QuanLyManHinh(),
    QuanLyNhomManHinh(),
    QLLicense(),
    QLThuVien(),
    DMChiTieu(),

  ]);
}
