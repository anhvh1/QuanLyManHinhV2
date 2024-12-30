import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  Button,
  InputSearch,
} from '../../../../components/uielements/exportComponent';
import {Modal, Table, Tooltip, message,DatePicker} from 'antd';
import queryString from 'query-string';
import {
  changeUrlFilter,
  getDefaultPageSize,
  getFilterData,
} from '../../../../helpers/utility';
import actions from '../../../redux/DanhMuc/DMLoaiMauPhieu/actions';
import ModalAddEdit from './modalAddEdit';
import {TreeSelect} from '../../../../components/uielements/exportComponent';
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import {useKey} from '../../../CustomHook/useKey';
import getApi from '../config';
import {DANHMUCCHUNG} from '../../../../settings/constants';
import {actionsGroup} from '../actions';
import dayjs from 'dayjs';
const DMLoaiMauPhieu = (props) => {
  const {api} = getApi(DANHMUCCHUNG.LOAIMAUPHIEU);
  document.title = 'Danh Mục Loại Mẫu Phiếu';

  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );

  const {DanhSachLoaiMauPhieu, TotalRow} = props;

  useEffect(() => {
    changeUrlFilter(filterData);
    props.getData(filterData);
  }, [filterData]);

  useEffect(() => {
    props.getData(filterData);
  }, []);

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
        <Tooltip title={'Sửa'}>
          <EditOutlined onClick={() => showModalEdit(record.ID)} />
        </Tooltip>
        <Tooltip title={'Xóa'}>
          <DeleteOutlined onClick={() => deleteModalAddEdit(record.ID)} />
        </Tooltip>
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
      title: 'STT',
      width: '5%',
      align: 'center',
      render: (text, record, index) => (
        <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>
      ),
    },
    {
      title: 'Tên loại mẫu phiếu',
      dataIndex: 'Ten',
      align: 'left',
      width: '80%',
    },
    {
      title: 'Thao tác',
      width: '15%',
      align: 'center',
      render: (text, record) => renderThaoTac(record),
    },
  ];

  return (
    <LayoutWrapper>
      <PageHeader>Danh Mục Loại Mẫu Phiếu</PageHeader>
      <PageAction>
        <Button type="primary" onClick={showModalAdd}>
          <PlusOutlined />
          Thêm mới
        </Button>
      </PageAction>
      <Box>
        <BoxFilter>
        <DatePicker
            picker="year"
            placeholder="Chọn năm"
            value={filterData.GhiChu ? dayjs(`${filterData.GhiChu}`) : null}
            onChange={(value, valueStr) => onFilter(valueStr, 'GhiChu')}
          />
          <InputSearch
            allowClear
            defaultValue={filterData.Keyword}
            placeholder={'Nhập tên loại mẫu phiếu'}
            style={{width: 300}}
            onSearch={(value) => onFilter(value, 'Keyword')}
          />
        </BoxFilter>
        <BoxTable
          columns={columns}
          dataSource={DanhSachLoaiMauPhieu}
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
        DanhSachLoaiMauPhieu={DanhSachLoaiMauPhieu}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.DMLoaiMauPhieu,
  };
}

export default connect(mapStateToProps, actions)(DMLoaiMauPhieu);
