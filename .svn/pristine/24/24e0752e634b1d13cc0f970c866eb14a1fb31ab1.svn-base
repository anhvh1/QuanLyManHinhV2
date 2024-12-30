import {useEffect} from 'react';
import {useRef} from 'react';
import api from './config';

import React, {useState} from 'react';
import {Typography, Input, Upload, message} from 'antd';
import {
  PlusOutlined,
  CloseOutlined,
  CloudUploadOutlined,
} from '@ant-design/icons';
import DangNhap from '../DangNhap';
import SwiperCore from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination, Navigation, HashNavigation} from 'swiper/modules';
import {Button} from 'antd';
import Wrapper from './index.styled';
import {LoaiFileDinhKem} from '../../../../settings/constants';
import ImgCrop from 'antd-img-crop';
import {formDataCaller} from '../../../../api/formDataCaller';
SwiperCore.use([Navigation]);
import {apiUrl} from './config';
const {Title} = Typography;
const {Dragger} = Upload;
import actionsCauHinhDangNhap from '../../../redux/HeThong/CauHinhDangNhap/actions';
import {useDispatch, useSelector} from 'react-redux';
import 'swiper/css';
import 'swiper/css/navigation';
const CauHinhThongTinDangNhap = () => {
  document.title = 'Cấu hình đăng nhập';
  const {CauHinhDangNhap} = useSelector((state) => state.CauHinhDangNhap);
  const [InfoConfigure, setInfoConfigure] = useState({
    isHold: false,
    isClick: false,
    uploadAntRef: useRef(),
    draggedIndex: 0,
    dragLayerRef: useRef(),
    draggedItemRef: useRef(),
    visibleDraggLayer: false,
    styleDraggLayer: {},
    draggedItem: null,
    draggedOverIndex: null,
    draggedItemOver: null,
    Logo: null,
    Background: null,
    ListSlide: new Array(5).fill({}),
    TenPhanMem: '',
    LogoDangNhap: null,
    HinhNenDangNhap: null,
    ID: null,
  });

  const dispatch = useDispatch();

  const {
    ListSlide,
    isHold,
    isClick,
    draggedIndex,
    dragLayerRef,
    draggedItemRef,
    styleDraggLayer,
    draggedItem,
    draggedItemOver,
    draggedOverIndex,
    TenPhanMem,
    LogoDangNhap,
    HinhNenDangNhap,
    ID,
  } = InfoConfigure;

  useEffect(() => {
    dispatch(actionsCauHinhDangNhap.getInfo());
  }, []);

  useEffect(() => {
    if (CauHinhDangNhap) {
      const data = CauHinhDangNhap?.reduce(
        (prev, current) => (current.ID > prev.ID ? current : prev),
        {ID: 0},
      );
      if (data) {
        const SlideAnh = data?.SlideAnh?.split(';');
        const newListSlide = data?.SlideAnhUrl?.split(';')?.map(
          (item, index) => ({
            image: item,
            imageID: SlideAnh[index],
          }),
        );
        changeInfoConfigure({
          ...data,
          ListSlide: newListSlide,
          HinhNenDangNhap: {
            url: data.HinhNenDangNhapURL,
            Id: data.HinhNenDangNhap ? data.HinhNenDangNhap : null,
          },
          LogoDangNhap: {
            url: data.LogoDangNhapUrl,
            Id: data.LogoDangNhap ? data.LogoDangNhap : null,
          },
        });
      }
    }
  }, [CauHinhDangNhap]);

  useEffect(() => {
    let currentDraggedItem = InfoConfigure.draggedItem;
    // Tạo một hàm để xử lý sự kiện mousemove
    const handleMouseMove = (e) => {
      // Sử dụng currentDraggedItem thay vì draggedItem từ InfoConfigure
      if (
        currentDraggedItem !== null &&
        currentDraggedItem.image &&
        draggedIndex >= 0 &&
        draggedIndex !== null
      ) {
        const dragLayer = dragLayerRef?.current;
        if (dragLayer) {
          dragLayer.style.top = `${e.clientY - 10}px`;
          dragLayer.style.left = `${e.clientX - 50}px`;
          dragLayer.style.display = 'flex';
        }
      }
    };

    // Gán sự kiện mousemove và sử dụng hàm xử lý đã tạo
    document?.addEventListener('mousemove', handleMouseMove);

    const handleMouseUp = (e) => {
      if (isHold) {
        e?.dataTransfer?.setDragImage(img, 0, 0);
        // asign mouseove for window to change point draggedItem
        changeInfoConfigure({
          isHold: false,
          isClick: false,
          draggedItem: null,
          draggedIndex: null,
        });
      }
    };

    document?.addEventListener('mouseup', handleMouseUp);

    return () => {
      document?.removeEventListener('mousemove', handleMouseMove);
      document?.removeEventListener('mouseup', handleMouseUp);
    };
  }, [InfoConfigure]);

  useEffect(() => {
    const slideItems = document.querySelectorAll('.swiper-slide');
    for (let i = 0; i < slideItems.length; i++) {
      const ele = slideItems[i];
      ele.style.height = `${ele.clientWidth * 1.5}px`;
    }
  }, [ListSlide]);

  const renderDragLayer = () => {
    if (draggedIndex !== null && isHold) {
      return (
        <div
          ref={dragLayerRef}
          className="drag-layer"
          style={{
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: 1000,
            ...styleDraggLayer,
            backgroundColor: '#fff',
            display: 'none',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
          }}
        >
          <p style={{fontSize: '50px'}}>
            <img
              style={{width: '100%', height: 'auto'}}
              src={draggedItemRef.current?.image}
            />
          </p>
        </div>
      );
    }
    return null;
  };

  const changeInfoConfigure = (newConfig) => {
    setInfoConfigure((prevInfo) => ({...prevInfo, ...newConfig}));
  };

  const handleDragStart = (item, e, index, isUpload) => {
    draggedItemRef.current = item;
    const ItemSlide = document.querySelector('.action-swiper .swiper-slide');
    const style = {
      width: ItemSlide?.clientWidth,
      height: ItemSlide?.clientHeight,
    };
    if (e) {
      // e.stopPropagation();
      e?.dataTransfer?.setDragImage(img, 0, 0);
    }
    changeInfoConfigure({
      isClick: true,
      draggedIndex: index,
      styleDraggLayer: style,
      draggedItem: item,
    });
  };

  const handleMouseUp = () => {
    if (isHold) {
      if (draggedItemOver && isHold) {
        const newListSlide = [...ListSlide];
        newListSlide.splice(draggedIndex, 1);
        newListSlide.splice(draggedOverIndex, 0, draggedItem);
        changeInfoConfigure({ListSlide: newListSlide});
      }
    }
    changeInfoConfigure({
      isHold: false,
      isClick: false,
      draggedItem: null,
      draggedIndex: null,
      draggedOverIndex: null,
    });
  };

  const handleUpload = (file, index, type) => {
    if (file.size / 1024 / 1024 > 5) {
      message.error('File quá lớn');
      return false;
    }
    if (!file.type.startsWith('image/')) {
      message.error('Chỉ cho phép tải lên ảnh');
      return false;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      // reader.result chứa chuỗi base64 của file
      handleSlideChange(reader.result, file, index, type);
    };
    reader.readAsDataURL(file);

    // Trả về false để ngăn chặn Upload từ tự động tải lên file
    return false;
  };

  const handleSlideChange = (base64Image, file, index, type) => {
    if (type === 2) {
      changeInfoConfigure({LogoDangNhap: {file, url: base64Image}});
    } else if (type === 3) {
      changeInfoConfigure({HinhNenDangNhap: {file, url: base64Image}});
    } else {
      const newListSlide = [...ListSlide];
      newListSlide[index] = {
        ...newListSlide[index],
        image: base64Image,
        file,
        imageID: null,
      };
      changeInfoConfigure({ListSlide: newListSlide});
    }
  };

  const handleRemoveSlide = (index) => {
    const newListSlide = [...ListSlide];
    newListSlide[index].image = '';
    // newSlides.splice(index, 1);
    changeInfoConfigure({ListSlide: newListSlide});
  };

  const handleSave = () => {
    const formDataFile = new FormData();
    let SlideAnh = '';
    if (ListSlide) {
      ListSlide.forEach((slide) => {
        formDataFile.append('SlideAnhFiles', slide.file);
      });
      ListSlide.forEach((item) => {
        if (item.image && item.imageID) {
          SlideAnh += `${item.imageID};`;
        }
      });
    }
    const newSlideAnh = SlideAnh.slice(0, SlideAnh.length - 1);
    formDataFile.append('SlideAnh', newSlideAnh);
    formDataFile.append('HinhNenDangNhapFile', HinhNenDangNhap.file);
    formDataFile.append('TenPhanMem', TenPhanMem);
    formDataFile.append('LogoDangNhapFile', LogoDangNhap.file);
    if (HinhNenDangNhap.Id) {
      formDataFile.append('HinhNenDangNhap', HinhNenDangNhap.Id);
    }
    if (LogoDangNhap.Id) {
      formDataFile.append('LogoDangNhap', LogoDangNhap.Id);
    }
    formDataFile.append('ID', ID);
    formDataFile.append(
      'FileDinhKemJson',
      JSON.stringify({
        FileID: 0,
        NghiepVuID: null,
        DMTenFileID: null,
        TenFile: null,
        NgayCapNhat: null,
        NguoiCapNhat: null,
        FileType: 3,
        TrangThai: null,
        FolderPath: null,
        FileUrl: null,
        NoiDung: null,
        IsBaoMat: null,
        IsMaHoa: null,
        GroupUID: null,
      }),
    );
    if (ID) {
      formDataCaller(apiUrl.updateinfoconfigure, formDataFile).then((res) => {
        if (res.data.Status > 0) {
          message.destroy();
          message.success(res.data.Message);
          dispatch(actionsCauHinhDangNhap.getInfo());
        } else {
          message.destroy();
          message.warning(res.data.Message);
        }
      });
    } else {
      api.InsertConfig(formDataFile).then((res) => {
        if (res.data.Status > 0) {
          message.destroy();
          message.success(res.data.Message);
          dispatch(actionsCauHinhDangNhap.getInfo());
        } else {
          message.destroy();
          message.warning(res.data.Message);
        }
      });
    }
  };

  const handleMouseMove = (item, e, index) => {
    if (isClick) {
      changeInfoConfigure({
        draggedOverIndex: index,
        draggedItemOver: item,
        isHold: true,
      });
    }
  };

  return (
    <Wrapper style={{backgroundColor: '#F5F5F5', padding: '20px'}}>
      <h1 style={{fontWeight: 'bold'}}>Cấu hình thông tin đăng nhập</h1>
      <DangNhap isPreview={true} />
      <div style={titleStyle}>Tên phần mềm</div>
      <Input
        value={TenPhanMem}
        onChange={(e) => changeInfoConfigure({TenPhanMem: e.target.value})}
      />
      <div style={titleStyle}>Slide trình chiếu</div>
      <div onMouseUp={handleMouseUp} className="custom-div">
        <Swiper
          className="action-swiper"
          navigation
          spaceBetween={30}
          slidesPerView={5}
          modules={[Navigation, HashNavigation]}
          allowTouchMove={false}
          onMouseUp={handleMouseUp}
          mousewheel={{forceToAxis: true}}
        >
          <SwiperSlide
            style={slideStyle}
            onClick={() => {
              if (ListSlide.length === 8) {
                message.destroy();
                message.warning('Chỉ được thêm tối đa 8 slide');
              } else {
                changeInfoConfigure({ListSlide: [...ListSlide, {}]});
              }
            }}
          >
            <PlusOutlined style={{fontSize: '32px'}} />
          </SwiperSlide>
          {ListSlide
            ? ListSlide.map((slide, index) => (
                <SwiperSlide
                  key={index}
                  style={{...slideStyle, '--offset': `${index * 100}%`}}
                  className={index === draggedOverIndex ? 'slide-over' : ''}
                  onMouseMove={(e) => {
                    requestAnimationFrame(() =>
                      handleMouseMove(slide, e, index),
                    );
                  }}
                  onMouseDown={(e) => handleDragStart(slide, e, index, false)}
                >
                  <CloseOutlined
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      fontSize: '20px',
                    }}
                    onClick={() => handleRemoveSlide(index)}
                  />
                  <Upload
                    beforeUpload={(file) => handleUpload(file, index)}
                    showUploadList={false}
                    accept=".png,.jpg,.gif"
                  >
                    <div className="over-image">
                      {slide.image ? (
                        <img
                          onDragOver={(e) => {
                            e.preventDefault();
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                          }}
                          draggable={false}
                          src={slide.image}
                          alt="slide"
                          style={{width: '100%'}}
                          contentEditable="false"
                        />
                      ) : (
                        <PlusOutlined style={{fontSize: '32px'}} />
                      )}
                    </div>
                  </Upload>
                </SwiperSlide>
              ))
            : null}
        </Swiper>
      </div>
      <div className="logo-wrap">
        <p style={titleStyle}>Logo phần mềm</p>
        <div style={uploadWrapperStyle} className="upload-wrap">
          {LogoDangNhap?.url ? (
            <img className="image-upload" src={LogoDangNhap.url} />
          ) : null}
          <ImgCrop
            showGrid
            rotationSlider
            aspectSlider
            showReset
            modalTitle="CHỈNH SỬA HÌNH ẢNH"
          >
            <Upload
              beforeUpload={(file) => handleUpload(file, null, 2)}
              // onChange={({file}) => changeInfoConfigure({LogoDangNhap: {file}})}
              showUploadList={false}
              accept=".png,.jpg,.gif"
            >
              <div className="upload-target">
                {LogoDangNhap?.url ? (
                  <>
                    <p>Thay đổi ảnh </p>
                    <CloudUploadOutlined />
                  </>
                ) : (
                  <PlusOutlined style={{fontSize: '32px'}} />
                )}
              </div>
            </Upload>
          </ImgCrop>
        </div>
      </div>
      <div className="background-wrap">
        <p style={titleStyle}>Hình nền</p>
        <div style={uploadWrapperStyle} className="upload-wrap">
          {HinhNenDangNhap?.url ? (
            <img className="image-upload" src={HinhNenDangNhap.url} />
          ) : null}
          <ImgCrop
            showGrid
            rotationSlider
            aspectSlider
            showReset
            modalTitle="CHỈNH SỬA HÌNH ẢNH"
            className="ant-imagecrop__customize"
          >
            <Upload
              beforeUpload={(file) => handleUpload(file, null, 3)}
              // onChange={({file}) => changeInfoConfigure({HinhNenDangNhap: {file}})}
              showUploadList={false}
              accept=".png,.jpg,.gif"
            >
              <div className="upload-target">
                {HinhNenDangNhap?.url ? (
                  <>
                    <p>Thay đổi ảnh </p>
                    <CloudUploadOutlined />
                  </>
                ) : (
                  <PlusOutlined style={{fontSize: '32px'}} />
                )}
              </div>
            </Upload>
          </ImgCrop>
        </div>
      </div>
      <Button
        style={{float: 'right', marginBottom: '10px'}}
        onClick={handleSave}
      >
        Lưu
      </Button>
      {renderDragLayer()}
    </Wrapper>
  );
};

const titleStyle = {
  padding: '10px',
  display: 'inline-block',
  fontWeight: 'bold',
  fontSize: '18px',
  backgroundColor: '#E6E3E3',
  maxWidth: '250px',
  margin: '20px 0',
};

const slideStyle = {
  minHeight: '400px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  backgroundColor: '#fff',
  borderRadius: '15px',
};

const uploadWrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '20px 0',
};

export default CauHinhThongTinDangNhap;
