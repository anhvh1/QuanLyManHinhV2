import {Modal, Table, Tooltip, message} from 'antd';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import actions from '../../../redux/DanhMuc/DMPhamVi/actions';
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
const DMPhamVi = (props) => {
  document.title = 'Danh Mục Phạm Vi';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const {DanhSachPhamVi, TotalRow, role} = props;
  const {api} = getApi(DANHMUCCHUNG.PHAMVI);

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
      title: 'Tên Phạm Vi',
      dataIndex: 'Ten',
      align: 'left',
      width: '25%',
    },
    {
      title: 'Mã Phạm Vi',
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
      dataIndex: 'Loai',
      align: 'center',
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
      <PageHeader>Danh Mục Phạm Vi</PageHeader>
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
            placeholder={'Nhập mã hoặc tên phạm vi'}
            style={{width: 300}}
            onSearch={(value) => onFilter(value, 'Keyword')}
          />
        </BoxFilter>
        <BoxTable
          columns={columns}
          dataSource={DanhSachPhamVi}
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
        DanhSachPhamVi={DanhSachPhamVi}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.DMPhamVi,
  };
}

export default connect(mapStateToProps, actions)(DMPhamVi);
