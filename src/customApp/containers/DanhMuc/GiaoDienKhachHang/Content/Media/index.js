import {Modal, Table, Tooltip, message} from 'antd';
import actions from '../../../../../redux/DanhMuc/ContentMedia/actions';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import LayoutWrapper from '../../../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../../../components/utility/pageHeader';
import PageAction from '../../../../../../components/utility/pageAction';
import Box from '../../../../../../components/utility/box';
import BoxFilter from '../../../../../../components/utility/boxFilter';
import BoxTable from '../../../../../../components/utility/boxTable';
import {
  Button,
  InputSearch,
  Select,
} from '../../../../../../components/uielements/exportComponent';
import Checkbox from '../../../../../../components/uielements/checkbox';
import {
  changeUrlFilter,
  exportExcel,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
} from '../../../../../../helpers/utility';
import {useKey} from '../../../../../CustomHook/useKey';
import queryString from 'query-string';
import api from './config';
import moment from 'moment';
import ModalAddEdit from './modalAddEdit';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {useSelector} from 'react-redux';
import PageWrap from '../../../../../../components/utility/PageWrap';
const QuanLyManHinh = (props) => {
  const {filterData,setFilterData} = props
  // const [filterData, setFilterData] = useState(
  //   queryString.parse(props.location.search),
  // );
  const [dataModalAddEdit, setDataModalAddEdit] = useState([]);
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState('');
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);

  document.title = 'Quản Lý Màn Hình';

  useEffect(() => {
    changeUrlFilter(filterData);
    props.getList(filterData);
  }, [filterData]);

  useEffect(() => {
    props.getList(filterData);
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

  const deleteModalAddEdit = (ManHinhID) => {
    Modal.confirm({
      title: 'Xóa Dữ Liệu',
      content: 'Bạn có muốn xóa chức vụ này không?',
      cancelText: 'Không',
      okText: 'Có',
      onOk: () => {
        setConfirmLoading(true);
        api
        .xoaManHinh(ManHinhID, {})
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

  const showModalEdit = (manHinhID) => {
    const ManHinhID = manHinhID;
    setAction('edit');
    api
      .chiTietManHinh({ManHinhID})
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
        .themManHinh(data)
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
        .suaManHinh(data)
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
            <EditOutlined onClick={() => showModalEdit(record.ManHinhID)} />
          </Tooltip>
        {/* ) : ( */}
          {/* '' */}
        {/* )} */}
        {/* {role?.delete ? ( */}
          <Tooltip title={'Xóa'}>
            <DeleteOutlined
              onClick={() => deleteModalAddEdit(record.ManHinhID)}
            />
          </Tooltip>
        {/* ) : (
          ''
        )} */}
      </div>
    );
  };
  const {DanhSachManHinh, TotalRow, role} = props;
  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();
    const [nhomManHinhs, setNhomManHinhs] = useState([]);
    
    const columns = [
      {
        title: 'STT',
        align: 'center',
        width: '5%',
        render: (text, record, index) => (
          <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>
        ),
      },
      {
        title: 'HardwareKey',
        dataIndex: 'HardwareKey',
        width: '20%',
      },
      {
        title: 'Tên màn hình',
        dataIndex: 'TenManHinh',
        width: '25%',
      },
      {
        title: 'Địa chỉ mac',
        dataIndex: 'DiaChiMac',
        width: '15%',
      },
      {
        title: 'Trạng thái',
        dataIndex: 'TrangThai',
        align: 'left',
        width: '10%',
        render: (text, record) => {
          return record.TrangThai ? 'Hoạt động' : 'Không hoạt động'; // Assuming TrangThai is boolean
        },
      },
      {
        title: 'Nhóm',
        dataIndex: 'NhomManHinhs',
        align: 'center',
        width: '15%',
        render: (text, record) => {
          if (record.NhomManHinhs && record.NhomManHinhs.length > 0) {
            // Assuming you want to render the first group's name
            return record.NhomManHinhs[0].TenNhom;
          } else {
            return ''; // Handle case where there are no groups or handle accordingly
          }
        },
      },
      {
        title: 'Thao tác',
        width: '10%',
        align: 'center',
        margin: '10px',
        render: (text, record) => renderThaoTac(record),
      },
    ];
  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>QUẢN LÝ MÀN HÌNH</PageHeader>
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
        <BoxFilter>
          <InputSearch
            defaultValue={filterData.Keyword}
            placeholder={'Nhập tên hoặc HardwareKey'}
            style={{width: 300}}
            onSearch={(value) => onFilter(value, 'Keyword')}
            allowClear
          />
        </BoxFilter>
        <BoxTable
          columns={columns}
          dataSource={DanhSachManHinh}
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
        DanhSachManHinh={DanhSachManHinh}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.QuanLyManHinh,
    role: getRoleByKey(state.Auth.role, 'danh-muc-chuc-vu'),
  };
}

export default connect(mapStateToProps, actions)(QuanLyManHinh);
