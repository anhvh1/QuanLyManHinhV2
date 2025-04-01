import {Modal, Table, Tooltip, message} from 'antd';
import actions from '../../../redux/DanhMuc/QLLichPhat/actions';
import React, {useState, useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import {TreeSelect} from '../../../../components/uielements/exportComponent';
import actionsCoQuan from '../../../redux/DanhMuc/DMCoQuan/actions';
import {
  Button,
  InputSearch,
  Select,
} from '../../../../components/uielements/exportComponent';
import Checkbox from '../../../../components/uielements/checkbox';
import Switches from '../../../../components/uielements/switch';
import {
  changeUrlFilter,
  exportExcel,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
} from '../../../../helpers/utility';
import {
  _debounce,
  getInfoFromToken,
  getLocalKey,
} from '../../../../helpers/utility';
import {useKey} from '../../../CustomHook/useKey';
import queryString from 'query-string';
import api from './config';
import ModalAddEdit from './modalAddEdit';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import moment from 'moment';

import PageWrap from '../../../../components/utility/PageWrap';
const QLLichPhat = (props) => {
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState('');
  const {DanhSachCoQuan} = useSelector((state) => state.DMCoQuan);
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();

  document.title = 'Quản lý lịch phát';

  useEffect(() => {
    changeUrlFilter(filterData);
    props.getList(filterData);
  }, [filterData]);

  useEffect(() => {
    props.getList(filterData);
    dispatch(actions.getInitData(filterData));
    dispatch(actionsCoQuan.getInitData());
  }, []);

  const onTableChange = (pagination, filters, sorter) => {
    let oldFilterData = filterData;
    let onOrder = {pagination, filters, sorter};
    let newFilterData = getFilterData(oldFilterData, null, onOrder);

    setFilterData(newFilterData);
    setSelectedRowsKey([]);
  };

  const onFilter = (value, property) => {
    let oldFilterData = filterData;
    let onFilter = {value, property};
    let newfilterData = getFilterData(oldFilterData, onFilter, null);
    //get filter data
    setFilterData(newfilterData);
    setSelectedRowsKey([]);
  };

  const showModalAdd = () => {
    setAction('add');
    setDataModalAddEdit({});
    inceaseModalKey();
    setVisibleModalAddEdit(true);
  };

  const deleteModalAddEdit = (LichPhatID) => {
    Modal.confirm({
      title: 'Xóa Dữ Liệu',
      content: 'Bạn có muốn xóa lịch phát này không?',
      cancelText: 'Không',
      okText: 'Có',
      onOk: () => {
        setConfirmLoading(true);
        api
          .xoaNgheNhan(LichPhatID, {})
          .then((res) => {
            if (res.data.Status > 0) {
              setConfirmLoading(false);
              props.getList({
                ...filterData,
                PageNumber:
                  Math.ceil((TotalRow - 1) / filterData.PageSize) <
                  filterData.PageNumber
                    ? Math.ceil((TotalRow - 1) / filterData.PageSize)
                    : filterData.PageNumber,
              });
              message.destroy();
              message.success(res.data.Message);
              setFilterData({
                ...filterData,
                PageNumber:
                  Math.ceil((TotalRow - 1) / filterData.PageSize) <
                  filterData.PageNumber
                    ? Math.ceil((TotalRow - 1) / filterData.PageSize)
                    : filterData.PageNumber,
              });
            } else {
              message.destroy();
              message.error(res.data.Message);
            }
          })
          .catch((error) => {
            message.destroy();
            message.error(error.toString());
          });
      },
    });
  };

  const showModalEdit = (lichPhatID) => {
    const LichPhatID = lichPhatID;
    setAction('edit');
    api
      .chiTietNgheNhan({LichPhatID})
      .then((res) => {
        if (res.data.Status > 0) {
          setDataModalAddEdit(res.data.Data);
          inceaseModalKey();
          setVisibleModalAddEdit(true);
        } else {
          message.destroy();
          message.error(res.data.Message);
        }
      })
      .catch((error) => {
        message.destroy();
        message.error(error.toString());
      });
  };

  const hideModalAddEdit = () => {
    setSelectedRowsKey([]);
    setDataModalAddEdit({});
    setVisibleModalAddEdit(false);
  };

  const submitModalAddEdit = (data) => {
    setConfirmLoading(true);
    if (action === 'add') {
      api
        .themNgheNhan(data)
        .then((res) => {
          setConfirmLoading(false);
          if (res.data.Status > 0) {
            message.destroy();
            message.success(res.data.Message);
            hideModalAddEdit();
            props.getList(filterData);
          } else {
            setConfirmLoading(false);
            message.destroy();
            message.error(res.data.Message);
          }
        })
        .catch((error) => {
          setConfirmLoading(false);
          message.destroy();
          message.error(error.toString());
        });
    }
    if (action === 'edit') {
      api
        .suaNgheNhan(data)
        .then((res) => {
          if (res.data.Status > 0) {
            setConfirmLoading(false);
            message.destroy();
            message.success(res.data.Message);
            hideModalAddEdit();
            props.getList(filterData);
          } else {
            setConfirmLoading(false);
            message.destroy();
            message.error(res.data.Message);
          }
        })
        .catch((error) => {
          setConfirmLoading(false);
          message.destroy();
          message.error(error.toString());
        });
    }
  };

  const renderThaoTac = (record) => {
    return (
      <div className={'action-btn'}>
        {/* {role?.edit ? ( */}
        <Tooltip title={'Sửa'}>
          <EditOutlined onClick={() => showModalEdit(record.LichPhatID)} />
        </Tooltip>
        {/* ) : ( */}
        {/* '' */}
        {/* )} */}
        {/* {role?.delete ? ( */}
        <Tooltip title={'Xóa'}>
          <DeleteOutlined
            onClick={() => deleteModalAddEdit(record.LichPhatID)}
          />
        </Tooltip>
        {/* ) : (
          ''
        )} */}
      </div>
    );
  };
  const {
    DanhSachNgheNhan,
    DanhSachLoaiSuKien,
    DanhSachMediaOrPhat,
    DanhSachManHinhOrNhomManHinh,
    TotalRow,
    role,
  } = props;
  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();

  const columns = [
    {
      title: 'STT',
      width: '5%',
      align: 'center',
      render: (text, record, index) => (
        <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>
      ),
    },
    {
      title: 'Tên lịch phát',
      dataIndex: 'TenLichPhat',
      align: 'center',
      width: '20%',
    },
    {
      title: 'Loại sự kiện',
      dataIndex: 'TenSuKien',
      align: 'center',
      width: '15%',
    },
    {
      title: 'Media/Danh sách phát',
      dataIndex: 'TenMediaORDanhSachPhat',
      align: 'center',
      width: '20%',
    },
    {
      title: 'Màn hình/Nhóm',
      dataIndex: 'ListManHinhOrNhomManHinh',
      align: 'center',
      width: '20%',
      render: (text, record) => {
        if (
          record.ListManHinhOrNhomManHinh &&
          record.ListManHinhOrNhomManHinh.length > 0
        ) {
          const Ten = record.ListManHinhOrNhomManHinh.filter(
            (item) => item.Ten !== null,
          ).map((item) => item.Ten);
          return Ten.join(', ');
        } else {
          return ''; // Handle case where there are no items in the array or handle accordingly
        }
      },
    },
    {
      title: 'Giờ bắt đầu',
      dataIndex: 'GioBatDau',
      align: 'center',
      width: '10%',
      render: (GioBatDau, record) => {
        if (record.ChiaNgay === false) {
          return <span>Luôn Luôn</span>;
        } else {
          return (
            <>
             {(GioBatDau)}
            </>
          );
        }
      },
    },

    {
      title: 'Giờ kết thúc',
      dataIndex: 'GioKetThuc',
      align: 'center',
      width: '10%',
      render: (GioKetThuc, record) => {
        if (record.ChiaNgay === false) {
          return null;
        } else {
          return (
            <>
              
              {(GioKetThuc)}
            </>
          );
        }
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'TrangThai',
      align: 'center',
      width: '15%',
      render: (TrangThai) => {
        if (TrangThai === true) {
          return <span>Hoạt động</span>;
        } else if (TrangThai === false) {
          return <span>Không hoạt động</span>;
        } else {
          return <span>Trạng thái khác</span>; // Handle any other values if necessary
        }
      },
    },
    {
      title: 'Khách hàng',
      dataIndex: 'TenCoQuan',
      align: 'center',
      width: '20%',
    },
    {
      title: 'Thao tác',
      width: '10%',
      align: 'center',
      margin: '10px',
      render: (text, record) => renderThaoTac(record),
    },
  ];
  const access_token1 = getLocalKey('access_token');
  const dataUnzip1 = getInfoFromToken(access_token1);
  const ListNguoiDung = dataUnzip1?.NguoiDung?.NguoiDungID;
  const hideSelect = ListNguoiDung !== 18;
  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>Quản lý lịch phát</PageHeader>
        <PageAction>
          {/* {role ? (
            role.add ? ( */}
          <Button type="primary" onClick={showModalAdd}>
            <PlusOutlined />
            Thêm mới
          </Button>
          {/* ) : (
              ''
            )
          ) : (
            ''
          )} */}
        </PageAction>
      </PageWrap>
      <Box>
        <BoxFilter hienthi={true}> 
        {!hideSelect && (
          <TreeSelect
            showSearch
            treeData={DanhSachCoQuan}
            onChange={(value) => onFilter(value, 'CoQuanID')}
            style={{width: 400}}
            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
            placeholder="Chọn cơ quan"
            allowClear
            treeDefaultExpandAll
            // onChange={value => this.onSearch(value, "CoQuanID")}
            notFoundContent={'Không có dữ liệu'}
            treeNodeFilterProp={'title'}
          />
        )}
          <Select
            allowClear
            style={{width: '200px'}}
            defaultValue={filterData.LoaiSuKien}
            placeholder={'Loại sự kiện'}
            onChange={(value) => onFilter(value, 'LoaiSuKien')}
          >
            {DanhSachLoaiSuKien?.map((item) => (
              <Option value={item.ID}>{item.TenSuKien}</Option>
            ))}
          </Select>
          <Select
            allowClear
            style={{width: '200px'}}
            defaultValue={filterData.ID}
            placeholder={'Màn hình'}
            onChange={(value, item) => {
              onFilter(value, 'ID');
              const selectedItem = DanhSachManHinhOrNhomManHinh.find(
                (item) => item.ID === value,
              );

              if (selectedItem && selectedItem.ID === value) {
                onFilter(1, 'title'); 
              } else {
                onFilter(null, 'title');
              }
            }}
          >
            {DanhSachManHinhOrNhomManHinh.filter(
              (item) => item.Title === 1,
            ).map((item) => (
              <Option key={item.Title} value={item.ID}>
                {item.Ten}
              </Option>
            ))}
          </Select>

          <Select
            allowClear
            style={{width: '200px'}}
            defaultValue={filterData.title}
            placeholder={'Nhóm màn hình'}
            onChange={(value, item) => {
              onFilter(value, 'ID');
              const selectedItem = DanhSachManHinhOrNhomManHinh.find(
                (item) => item.ID === value,
              );

              if (selectedItem && selectedItem.ID === value) {
                onFilter(2, 'title'); 
              } else {
                onFilter(null, 'title');
              }
            }}
          >
            {DanhSachManHinhOrNhomManHinh.filter(
              (item) => item.Title === 2,
            ).map((item) => (
              <Option key={item.ID} value={item.ID}>
                {item.Ten}
              </Option>
            ))}
          </Select>
          <InputSearch
            defaultValue={filterData.Keyword}
            placeholder={'Nhập tên sự kiện'}
            style={{width: 300}}
            onSearch={(value) => onFilter(value, 'Keyword')}
            allowClear
          />
        </BoxFilter>
        <BoxTable
          columns={columns}
          dataSource={DanhSachNgheNhan}
          onChange={onTableChange}
          pagination={{
            showSizeChanger: true,
            showTotal: (total, range) =>
              `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
            total: TotalRow,
            current: PageNumber,
            pageSize: PageSize,
          }}
          rowKey={(record) => record.ID}
        />
      </Box>
      <ModalAddEdit
        visible={visibleModalAddEdit}
        dataEdit={dataModalAddEdit}
        action={action}
        loading={confirmLoading}
        key={modalKey}
        onCreate={submitModalAddEdit}
        onCancel={hideModalAddEdit}
        DanhSachLoaiSuKien={DanhSachLoaiSuKien}
        DanhSachMediaOrPhat={DanhSachMediaOrPhat}
        DanhSachManHinhOrNhomManHinh={DanhSachManHinhOrNhomManHinh}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.QLLichPhat,
    role: getRoleByKey(state.Auth.role, 'danh-muc-chuc-vu'),
  };
}

export default connect(mapStateToProps, actions)(QLLichPhat);
