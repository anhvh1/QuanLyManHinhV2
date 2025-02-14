import asyncComponent from "../helpers/AsyncFunc";

const routes = [
  {
    path: "",
    component: asyncComponent(() => import("./containers/DashBoash")),
  },
  // sửa chữ "DashBoash" thành đường dẫn tới file danh mục
  {
    path: "tai-lieu-huong-dan",
    component: asyncComponent(() =>
      import("./containers/HeThong/QLHuongDanSuDung")
    ),
  },
  {
    path: "danh-muc-co-quan",
    component: asyncComponent(() => import("./containers/DanhMuc/DMKhachHang")),
  },

  {
    path: "cau-hinh-landingpage",
    component: asyncComponent(() =>
      import("./containers/HeThong/ConfigLandingPage")
    ),
  },

  {
    path: "quan-ly-nguoi-dung",
    component: asyncComponent(() =>
      import("./containers/HeThong/UserManagement")
    ),
  },
  {
    path: "tham-so-he-thong",
    component: asyncComponent(() =>
      import("./containers/HeThong/QuanLyThamSoHeThong")
    ),
  },
  {
    path: "sao-luu-du-lieu",
    component: asyncComponent(() =>
      import("./containers/HeThong/QuanTriDuLieu")
    ),
  },
  {
    path: "nhat-ky-he-thong",
    component: asyncComponent(() =>
      import("./containers/HeThong/NhatKyHeThong")
    ),
  },
  {
    path: "phan-quyen",
    component: asyncComponent(() => import("./containers/HeThong/QLPhanQuyen")),
  },

  {
    path: "quan-ly-man-hinh-a",
    component: asyncComponent(() =>
      import("./containers/DanhMuc/QuanLyManHinh")
    ),
  },
  // {
  //   path: 'danh-muc-quan-ly-di-san-tu-lieu',
  //   component: asyncComponent(() =>
  //     import('./containers/DanhMuc/QuanLyDiSanTuLieu'),
  //   ),
  // },
  {
    path: "quan-ly-danh-sach-phat",
    component: asyncComponent(() => import("./containers/DanhMuc/QLThuVien")),
  },
  {
    path: "quan-ly-license",
    component: asyncComponent(() => import("./containers/DanhMuc/QLLicense")),
  },
  {
    path: "khach-hang",
    component: asyncComponent(() =>
      import("./containers/DanhMuc/GiaoDienKhachHang")
    ),
  },
  {
    path: "quan-ly-lich-phat-2",
    component: asyncComponent(() => import("./containers/DanhMuc/QLLichPhat")),
  },
  {
    path: "quan-ly-hien-vat-bao-tang",
    component: asyncComponent(() => import("./containers/DanhMuc/DMKhachHang")),
  },
  {
    path: "quan-ly-man-hinh",
    component: asyncComponent(() =>
      import("./containers/DanhMuc/QuanLyManHinh")
    ),
  },
  {
    path: "quan-ly-version-app",
    component: asyncComponent(() =>
      import("./containers/DanhMuc/QLVersionApp")
    ),
  },
  {
    path: "quan-ly-nhom-man-hinh",
    component: asyncComponent(() =>
      import("./containers/DanhMuc/QuanLyNhomManHinh")
    ),
  },
  {
    path: "cau-hinh-dang-nhap",
    component: asyncComponent(() =>
      import("./containers/HeThong/CauHinhDangNhap")
    ),
  },
  {
    path: "quan-ly-media",
    component: asyncComponent(() => import("./containers/DanhMuc/QLMedia")),
  },
];
export default routes;
