import {Modal, Table, Tooltip, message} from 'antd';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import actions from '../../../redux/DanhMuc/DMPhanLoai/actions';
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
const DMPhanLoai = (props) => {
  document.title = 'Danh Mục Phân Loại';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const {api} = getApi(DANHMUCCHUNG.PHANLOAI);

  useEffect(() => {
    changeUrlFilter(filterData);
    props.getData(filterData);
  }, [filterData]);

  useEffect(() => {
    props.getData(filterData);
  }, []);

  const {DanhSachPhanLoai, TotalRow, role} = props;

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
        {role.edit ? (
          <Tooltip title={'Sửa'}>
            <EditOutlined onClick={() => showModalEdit(record.ID)} />
          </Tooltip>
        ) : (
          ''
        )}
        {role.delete ? (
          <Tooltip title={'Xóa'}>
            <DeleteOutlined onClick={() => deleteModalAddEdit(record.ID)} />
          </Tooltip>
        ) : (
          ''
        )}
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
      title: 'Tên Phân Loại',
      dataIndex: 'Ten',
      align: 'left',
      width: '25%',
    },
    {
      title: 'Mã Phân Loại',
      dataIndex: 'Ma',
      align: 'left',
      width: '15%',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'GhiChu',
      align: 'left',
      width: '35%',
    },
    {
      title: 'Loại Danh Mục',
      dataIndex: 'LoaiDanhMuc',
      width: '25%',
    },
    {
      title: 'Đang sử dụng',
      dataIndex: 'TrangThai',
      align: 'center',
      width: '10%',
      render: (text, record) => {
        return <Checkbox checked={record.TrangThai}></Checkbox>;
      },
    },
    {
      title: 'Thao tác',
      width: '10%',
      align: 'center',
      margin: '15px',
      render: (text, record) => renderThaoTac(record),
    },
  ];

  return (
    <LayoutWrapper>
      <PageHeader>Danh Mục Phân Loại</PageHeader>
      <PageAction>
        {role ? (
          role.add ? (
            <Button type="primary" onClick={showModalAdd}>
              <PlusOutlined />
              Thêm mới
            </Button>
          ) : (
            ''
          )
        ) : (
          ''
        )}
      </PageAction>
      <Box>
        <BoxFilter>
          <InputSearch
            allowClear
            defaultValue={filterData.Keyword}
            placeholder={'Nhập mã hoặc tên Phân Loại'}
            style={{width: 300}}
            onSearch={(value) => onFilter(value, 'Keyword')}
          />
        </BoxFilter>
        <BoxTable
          columns={columns}
          dataSource={DanhSachPhanLoai}
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
        DanhSachPhanLoai={DanhSachPhanLoai}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.DMPhanLoai,
  };
}

export default connect(mapStateToProps, actions)(DMPhanLoai);
