import {Modal, Table, Tooltip, message} from 'antd';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import actions from '../../../redux/DanhMuc/DMThuVien/actions';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import Checkbox from '../../../../components/uielements/checkbox';
import {
  Button,
  InputSearch,
} from '../../../../components/uielements/exportComponent';
import {
  changeUrlFilter,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
} from '../../../../helpers/utility';
import {useKey} from '../../../CustomHook/useKey';
import queryString from 'query-string';
import getApi from '../config';
import {DANHMUCCHUNG} from '../../../../settings/constants';
import ModalAddEdit from './modalAddEdit';
import ModalThietLap from './modalThietLap';

import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {actionsGroup} from '../actions';
const DMThuVien = (props) => {
  document.title = 'Danh Mục Thư Viện';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const {api} = getApi(DANHMUCCHUNG.DMTHUVIEN);
  useEffect(() => {
    changeUrlFilter(filterData);
    props.getData(filterData);
  }, [filterData]);
  useEffect(() => {
    props.getData(filterData);
  }, []);

  const {DanhSachDMThuVien, TotalRow, role} = props;

  const {
    showModalAdd,
    showModalEdit,
    submitModalAddEdit,
    deleteModalAddEdit,
    onFilter,
    onTableChange,
    dataModalAddEdit,
    confirmLoading,
    visibleModalAddEdit,
    hideModalAddEdit,
    action,
    modalKey,
  } = actionsGroup(filterData, setFilterData, api, props, TotalRow);
  const [actionthietlap, setActionThietLap] = useState('');
  const [visibleModalThietLap, setVisibleModalThietLap] = useState(false);
  const [confirmLoadingThietLap, setConfirmLoadingThietLap] = useState(false);
  const [modalThietLap, inceaseModalThietLap] = useKey();
  
  const hideModalThietLap = () => {
    setVisibleModalThietLap(false);
  };
  const submitModalThietLap = (data,FileData) => {
    setConfirmLoadingThietLap(true);
  }
  const showModalThietLap = () => {
    setActionMedia('thietlap');
    setVisibleModalThietLap(true);
    inceaseModalThietLap();
  };
  const renderThaoTac = (record) => {
    return (
      <div className={'action-btn'}>
        {/* {role.edit ? ( */}
        <Tooltip title={'Sửa'}>
          <EditOutlined onClick={() => showModalEdit(record.ID)} />
        </Tooltip>
        {/* ) : (
          ''
        )} */}
        {/* {role.delete ? ( */}
        <Tooltip title={'Xóa'}>
          <DeleteOutlined onClick={() => deleteModalAddEdit(record.ID)} />
        </Tooltip>
        {/* ) : (
          ''
        )} */}
      </div>
    );
  };

  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();

  const columns = [
    {
      title: 'Số thứ tự',
      width: '10%',
      align: 'center',
      render: (text, record, index) => (
        <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>
      ),
    },
    {
      title: 'Tên danh mục thư viện',
      dataIndex: 'Ten',
      align: 'left',
      width: '40%',
    },
    {
      title: 'Thứ tự hiển thị',
      dataIndex: 'GhiChu',
      align: 'center',
      width: '35%',
    },
    {
      title: 'Thao tác',
      width: '15%',
      align: 'center',
      margin: '15px',
      render: (text, record) => renderThaoTac(record),
    },
  ];
  return (
    <LayoutWrapper>
      <PageHeader>Danh Mục Thư Viện</PageHeader>
      <PageAction>
        {/* {role ? role.add ?  */}
        <Button type="primary" onClick={showModalThietLap}>
          <PlusOutlined />
          Thêm mới
        </Button>
        {/* //  : '' : ''} */}
      </PageAction>
      <Box>
        <BoxFilter>
          <InputSearch
            allowClear
            defaultValue={filterData.Keyword}
            placeholder={'Nhập tên danh mục thư viện'}
            style={{width: 300}}
            onSearch={(value) => onFilter(value, 'Keyword')}
          />
        </BoxFilter>
        <BoxTable
          columns={columns}
          dataSource={DanhSachDMThuVien}
          onChange={onTableChange}
          pagination={{
            showSizeChanger: true,
            showTotal: (total, range) =>
              `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
            total: TotalRow,
            current: PageNumber,
            pageSize: PageSize,
          }}
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
        DanhSachDMThuVien={DanhSachDMThuVien}
      />
      <ModalThietLap
      visible={visibleModalThietLap}
      // dataEdit={dataModalAddEdit}
      action={actionthietlap}
      loading={confirmLoading}
      key={modalKey}
      onCreate={submitModalThietLap}
      onCancel={hideModalThietLap}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.DMThuVien,
  };
}

export default connect(mapStateToProps, actions)(DMThuVien);
