module.exports = Object.freeze({
  TINH: '1',
  HUYEN: '2',
  XA: '3',
  MODAL_LARGE: 900,
  MODAL_NORMAL: 600,
  MODAL_SMALL: 416,

  ITEM_LAYOUT: {
    labelAlign: 'left',
    labelCol: {span: 8},
    wrapperCol: {span: 16},
  },

  ITEM_LAYOUT_NEW: {
    labelAlign: 'left',
    labelCol: {span: 6},
    wrapperCol: {span: 18},
  },

  ITEM_LAYOUT_HALF: {
    labelAlign: 'left',
    labelCol: {span: 6},
    wrapperCol: {span: 16},
  },

  ITEM_LAYOUT_SMALL: {
    labelAlign: 'left',
    labelCol: {span: 5},
    wrapperCol: {span: 19},
  },

  ITEM_LAYOUT_SMALL_2: {
    labelAlign: 'left',
    labelCol: {span: 7},
    wrapperCol: {span: 17},
  },

  ITEM_LAYOUT_HALF_SMALL: {
    labelAlign: 'left',
    labelCol: {span: 10},
    wrapperCol: {span: 12},
  },

  ITEM_LAYOUT_HALF_SMALL_2: {
    labelAlign: 'left',
    labelCol: {span: 12},
    wrapperCol: {span: 10},
  },

  ITEM_LAYOUT_HALF_SMALL_RIGHT_2: {
    labelAlign: 'left',
    labelCol: {span: 10},
    wrapperCol: {span: 14},
  },

  ITEM_LAYOUT_ROW: {
    labelAlign: 'left',
    labelCol: {span: 24},
    wrapperCol: {span: 24},
  },

  COL_ITEM_LAYOUT_HALF: {
    xs: {span: 24},
    lg: {span: 12},
  },

  COL_COL_ITEM_LAYOUT_RIGHT: {
    xs: {span: 24},
    lg: {span: 24},
  },

  COL_ITEM_LAYOUT: {
    xs: {span: 24},
    lg: {span: 24},
  },

  REQUIRED: {
    required: true,
    message: 'Thông tin bắt buộc',
  },

  API_ERROR: {
    title: 'Không thể cập nhật',
    content: 'Đã có lỗi xảy ra ...',
  },

  fileUploadLimit: 10000, //MB

  NhomTaiSan: {
    NhaO: 1,
    CongTrinhXayDung: 11,
    NhaOCongTrinhXayDung: 4,
    DatO: 12,
    DatKhac: 13,
    Tien: 6,
    PhuongTien: 3,
    KimLoai: 2,
    NuocNgoai: 10,
    TaiSanKhac: 8,
    KhoanNo: 7,
    TongThuNhap: 9,
    GanLienVoiDat: 14,
    CoPhieu: 15,
    TaiKhoanNuocNgoai: 16,
  },

  LoaiTaiSan: {
    NhaO: {
      CanHo: 18,
      NhaORiengLe: 19,
      BietThu: 20,
    },
    CongTrinhXayDung: {
      CongTrinhDanDung: 21,
      CongTrinhCongNghiep: 22,
    },
    Tien: {
      TienMat: 8,
      TienChoVay: 9,
      TienTraTruoc: 10,
      TienGuiCaNhan: 11,
    },
    KimLoai: {
      Vang: 4,
      KimCuong: 5,
      BachKim: 6,
      KimLoaiKhac: 7,
    },
    TaiSanKhac: {
      TaiSanDangKy: 16,
      TaiSanKhac: 17,
    },
    GanLienVoiDat: {
      CayLauNam: 1,
      RungSanXuat: 2,
      VatKienTruc: 3,
    },
    CoPhieu: {
      CoPhieu: 12,
      TraiPhieu: 13,
      VonGop: 14,
      GiayToKhac: 15,
    },
  },

  CanBoNghiHuu: 2,

  STYLE: {
    tableToXls: {
      border: 'none',
      fontSize: '14pt',
      fontFamily: 'Times New Roman',
    },
    tableToXls_td: {border: 'none'},
    tableToXls_tableTd: {border: '1px solid #333'},
    tableToXls_provincial: {
      verticalAlign: 'top',
      display: 'inline-block',
      float: 'left',
      textAlign: 'center',
    },
    tableToXls_country: {
      display: 'inline-block',
      float: 'right',
      textAlign: 'center',
    },
    tableToXls_title: {textAlign: 'center'},
    tableToXls_sign: {
      display: 'inline-block',
      float: 'right',
      textAlign: 'center',
      width: 300,
      paddingBottom: 40,
    },

    tableData: {
      border: '1px solid #333',
      fontSize: '13pt',
      fontFamily: 'Times New Roman',
    },
    tableData_td: {border: '1px solid #333'},
    tableData_th: {border: '1px solid #333'},
  },
  STYLE2: {
    tableToXls: {border: 'none'},
    tableToXls_td: {border: 'none'},
    tableToXls_tableTd: {border: 'none'},
    tableToXls_provincial: {
      verticalAlign: 'top',
      display: 'inline-block',
      float: 'left',
      textAlign: 'center',
    },
    tableToXls_country: {
      display: 'inline-block',
      float: 'right',
      textAlign: 'center',
    },
    tableToXls_title: {textAlign: 'center'},
    tableToXls_sign: {
      display: 'inline-block',
      float: 'right',
      textAlign: 'center',
      width: 300,
      paddingBottom: 40,
    },

    tableData: {},
    tableData_td: {},
    tableData_th: {textAlign: 'center'},
  },
  DangLamViec: 1,

  FORMLAYOUTV4: {
    labelCol: {span: 6},
    wrapperCol: {span: 16},
    labelAlign: 'left',
  },
  ITEMLAYOUT4: {
    labelCol: {lg: 3, xs: 6},
    wrapperCol: {lg: 20, xs: 16},
    labelAlign: 'left',
  },
  LoaiKhieuTo: {
    TranhChap: 71,
    KienNghiPhanAnh: 9,
    ToCao: 8,
    KhieuNai: 1,
  },
  LoaiTiepDan: {
    ThuongXuyen: 1,
    DinhKy: 2,
    DotXuat: 3,
  },
  LoaiMaIn: {
    BienBanTiepCongDan: 'TCD_20',
  },
  HuongGiaiQuyet: {
    DeXuatThuLy: 31,
    ChuyenDon: 32,
    TraDon: 33,
    HuongDan: 30,
  },
  LoaiFileDinhKem: {
    FILECAUHINHHETHONG: 3,
  },
  ITEMLAYOUTHALF4: {
    labelCol: {lg: 3, xs: 6},
    wrapperCol: {lg: 8, xs: 16},
    labelAlign: 'left',
  },
  IMAGECROP: {
    grid: true,
    rotate: true,
    modalOk: 'Cắt ảnh',
    modalCancel: 'Hủy',
    modalTitle: 'Chỉnh sửa hình ảnh',
    shape: 'round',
    maxZoom: 5,
    minZoom: 1,
  },
  MODALCONFIRM: {
    title: 'Thông báo',
    okText: 'Có',
    cancelText: 'Không',
  },
  LOAICOT: {
    PhanDauBaoCao: 1,
    PhanTieuChi: 2,
    PhanCuoiBaoCao: 3,
    PhanChiTieu: 4,
  },
  LOAIDULIEUCOT: {
    KIEUCHU: 3,
    KIEUSODECIMAL: 2,
    KIEUINT: 1,
    KIEUDUNGSAI: 5,
    KIEUNGAYTHANG: 4,
  },
  DANHMUCCHUNG: {
    DONVITINH: 1,
    KYBAOCAO: 2,
    LOAIMAUPHIEU: 3,
    LOAIDITICH: 4,
    DITICHCAPXEPHANG: 5,
    DISANVANHOA: 5,
    CAPDITICHXEPHANG: 2,
    GIATRI: 2,
    PHAMVI: 8,
    PHANLOAI: 2,
    QUANLYBAOTANG: 10,
    QUANLYBAOVATQUOCGIA: 2,
    DISANTULIEU: 2,
    DISANVANHOAPHIVATTHE: 4,
    DITICHTOANTINH: 2,
    QUANLYNGHENHAN: 2,
    THOIGIAN: 2,
    DMTHUVIEN:14,
    QLTHUVIEN:21,
  },
  LOAIMAUPHIEU: {
    MAUPHIEU: 1,
    DULIEU: 2,
  },
  MaCot: {
    PhanDauBaoCaoMauPhieu: {
      QHTN: 'QHTN',
      DVCQ: 'DVCQ',
      TieuDeBaoCao: 'TieuDeBaoCao',
    },
    PhanCuoiBaoCao: {
      NgayBaoCao: 'NgayBaoCao',
      NguoiBaoCao: 'NguoiBaoCao',
      ChucVu: 'ChucVu',
    },
    PHANTIEUCHI: {
      STT: 'BODY_STT',
      NOIDUNG: 'BODY_ND',
      THANGNAM: 'BODY_THANGNAM',
    },
  },
  SECRETKEY: '',
  MAXLENGTH: 250,
  LOAIHIENTHIMAUPHIEU: {
    Ngang: 1,
    Doc: 2,
    LoaiSTT: {
      LAMA: 1,
      TUNHIEN: 2,
      CHUCAI: 3,
      GACHDAUDONG: 4,
      CONG: 5,
    },
  },
  CAPMAUPHIEU: {
    HETHONG: 1,
    CAPNHATDULIEU: 2,
  },
  IDS: {
    Admin: 18,
  },
  CAPNHATBAOCAOIDS: {
    QuanLyHTTTTongHopBaoCao: 300,
    NghiepVuMauPhieu: 301,
    ThietLapMauBaoCao: 302,
    CapNhapBieuMauDuLieu: 303,
    QuanLyDiTichToanTinh: 304,
    QuanLyBaoVatQuocGia: 307,
    QuanLyBaoTang2: 309,
    QuanLyHienVatBaoTang: 310,
    QuanLyDiSanVanHoaPhiVatThe: 306,
    QuanLyNgheNhan: 308,
    CapHinhNhapChiTietBieuMauSoLieu: 400,
    CauHinhNhapBaoCaoChiTiet: 401,
    QuanLyBaoTang: 402,
    QuanLyDiSanPhiVatThe: 403,
    QuanLyHeThongThietCheVanHoa: 404,
    QuanLyHeThongThuVien: 405,
    QuanLyNgheThuatBieuDien: 406,
    QuanLyMyThuatNhiepAnhTrienLam: 407,
    QuanLyVeGiaDinh: 408,
    QuanLyPhongTraoToanDanDoanKetXayDungDoiSongVanHoa: 409,
    QuanLyTheDucTheThao: 410,
    QuanLyThanhTra: 411,
  },
});
