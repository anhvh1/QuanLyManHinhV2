import {Modal, Table, Tooltip, message} from 'antd';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import actions from '../../../redux/DanhMuc/DMLoaiDiTich/actions';
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
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {actionsGroup} from '../actions';
const DMLoaiDiTich = (props) => {
  document.title = 'Danh Mục Loại Di Tích';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const {api} = getApi(DANHMUCCHUNG.LOAIDITICH);
  useEffect(() => {
    changeUrlFilter(filterData);
    props.getData(filterData);
  }, [filterData]);
  useEffect(() => {
    props.getData(filterData);
  }, []);

  const {DanhSachLoaiDiTich, TotalRow, role} = props;

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
      title: 'Tên loại di tích',
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
      <PageHeader>Danh Mục Loại Di Tích</PageHeader>
      <PageAction>
        {/* {role ? role.add ?  */}
        <Button type="primary" onClick={showModalAdd}>
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
            placeholder={'Nhập tên loại di tích'}
            style={{width: 300}}
            onSearch={(value) => onFilter(value, 'Keyword')}
          />
        </BoxFilter>
        <BoxTable
          columns={columns}
          dataSource={DanhSachLoaiDiTich}
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
        DanhSachLoaiDiTich={DanhSachLoaiDiTich}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.DMLoaiDiTich,
  };
}

export default connect(mapStateToProps, actions)(DMLoaiDiTich);
