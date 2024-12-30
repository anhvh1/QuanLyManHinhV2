import React, {Component, useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import queryString from 'query-string';
import actions from '../../../redux/DanhMuc/QLBaoTang/actions';
import api, {apiUrl} from './config';
import Constants from '../../../../settings/constants';
import {Link} from 'react-router-dom';
import moment from 'moment';

import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import actionsSidebar from '../../../redux/HeThong/Sidebar/actions';
import {ModalAddEdit} from './modalAddEdit';
import {Modal, message, Input, Switch, Tooltip} from 'antd';
import Button from '../../../../components/uielements/button';
import Select, {Option} from '../../../../components/uielements/select';
import {
  changeUrlFilter,
  getFilterData,
  getDefaultPageSize,
  getConfigLocal,
} from '../../../../helpers/utility';
import {formDataCaller} from '../../../../api/formDataCaller';
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  FileAddOutlined,
  PlusOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import {useKey} from '../../../CustomHook/useKey';
import PageWrap from '../../../../components/utility/PageWrap';
import { InputSearch } from '../../../../components/uielements/input';

const QLBaoTang = (props) => {
  document.title = 'Quản lý bảo tàng';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalKey, increaseKey] = useKey();
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const {ListSideBar} = useSelector((state) => state.ListSideBar);
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [DanhSachCacCap, setDanhSachCacCap] = useState([]);
  const [action, setAction] = useState('');
  const dispatch = useDispatch();

  const getDanhSachCacCap = async () => {
    try {
      const res = await api.danhSachCacCapDonVi();
      setDanhSachCacCap(res.data.Data);
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(actions.getInitData(filterData));
    dispatch(actionsSidebar.getList());
    getDanhSachCacCap();
  }, []);

  useEffect(() => {
    changeUrlFilter(filterData); //change url
    props.getList(filterData); //get list
  }, [filterData]);

  const onFilter = (value, property) => {
    //get filter data
    let oldFilterData = {...filterData};
    let onFilter = {value, property};
    let newFilterData = getFilterData(oldFilterData, onFilter, null);
    setFilterData(newFilterData);
  };
  //order, paging --------------------------------------------
  const onTableChange = (pagination, filters, sorter) => {
    //get filter data
    let oldFilterData = {...filterData};
    let onOrder = {pagination, filters, sorter};
    let newFilterData = getFilterData(oldFilterData, null, onOrder);
    //get filter data
    setFilterData(newFilterData);
  };

  //Delete-----------------------------------------------------
  const deleteModalAddEdit = (ID) => {
    Modal.confirm({
      title: 'Xóa dữ liệu',
      content: ' Bạn có muốn xóa file bảo vật quốc gia này không?',
      cancelText: 'Không',
      okText: 'Có',

      onOk: () => {
        api
          .xoaBaoTang(ID)
          .then((response) => {
            if (response.data.Status > 0) {
              //message success
              message.success('Xóa thành công');
              //reset page
              dispatch(actions.getList(filterData));
              dispatch(actions.getGuild());
            } else {
              Modal.error({
                title: 'Lỗi',
                content: response.data.Message,
              });
            }
          })
          .catch((error) => {
            Modal.error(Constants.API_ERROR);
          });
      },
    });
  };
  const showModalAdd = () => {
    setDataModalAddEdit({});
    setVisibleModalAddEdit(true);
    increaseKey();
    setAction('add');
  };

  const submitModalAddEdit = (data, FileData) => {
    setConfirmLoading(true);

    if (action === 'add') {
      const formSave = new FormData();
      formSave.append('files', FileData);
      formSave.append('QuanLyBaoTangStr', JSON.stringify(data));

      formDataCaller(apiUrl.thembaotang, formSave)
        .then((response) => {
          setConfirmLoading(false);
          if (response.data.Status > 0) {
            //message success
            message.success('Thêm thành công');
            //hide modal
            hideModalAddEdit();
            //reset page
            dispatch(actions.getList(filterData));
            dispatch(actions.getGuild());
          } else {
            message.destroy();
            message.error(response.data.Message);
          }
        })
        .catch((error) => {
          message.destroy();
          message.error(error.toString());
        });
    } else if (action === 'edit') {
      const formSave = new FormData();
      formSave.append('QuanLyBaoTangStr', JSON.stringify(data));
      if (FileData.name) {
        formSave.append('files', FileData);
      }
      formDataCaller(apiUrl.suabaotang, formSave)
        .then((response) => {
          setConfirmLoading(false);
          if (response.data.Status > 0) {
            //message success
            message.success('Cập nhật thành công');
            //hide modal
            hideModalAddEdit();
            //reset page
            dispatch(actions.getList(filterData));
            dispatch(actions.getGuild());
          } else {
            message.destroy();
            message.error(response.data.Message);
          }
        })
        .catch((error) => {
          message.destroy();
          message.error(error.toString());
        });
    }
  };
  const downloadData = async (record) => {
    try {
      const baotang = await api.downloadFile({
        ID: record.ID,
      });

      if (baotang && baotang.data.Status > 0) {
        const Data = baotang.data.Data;
        if (Data.UrlFile && Data.UrlFile !== '') {
          const link = document.createElement('a');
          link.href = Data.UrlFile;
          link.download = Data.TenFileGoc;
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } else {
        message.error('Không có dữ liệu');
      }
    } catch (error) {}
  };
  //Modal edit ------------------------------------------------
  const showModalEdit = (record) => {
    setDataModalAddEdit({
      Data: record,
      DanhSachBaoTang: [],
    });
    setVisibleModalAddEdit(true);
    increaseKey();
    setAction('edit');
  };

  const hideModalAddEdit = () => {
    setVisibleModalAddEdit(false);
    setDataModalAddEdit({});
  };
  const {DanhSachBaoTang, TotalRow, role} = props;

  //paging info
  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();
  //format table
  const iconStyle = {fontSize: 20, cursor: 'pointer', margin: '0 10px'};
  const iconStyleDisable = {
    fontSize: 20,
    cursor: 'default',
    margin: '0 10px',
    color: 'grey',
  };
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
      title: 'Tên bảo tàng',
      dataIndex: 'TenBaoTang',
      width: '45%',
    },
    {
      title: 'Địa phương',
      dataIndex: 'DiaChi',
      width: '40%',
    },
    {
      title: 'Thao tác',
      width: '10%',
      align: 'center',
      margin: '10px',
      render: (text, record) => renderThaoTac(record),
    },
  ];
  const renderThaoTac = (record) => {
    return (
      <div className={'action-btn'}>
        {/* {role.edit ? ( */}
        <Tooltip title={'Chi tiết'}>
          <EyeOutlined onClick={() => downloadData(record)} />
        </Tooltip>
        {/* ) : (
          ''
        )} */}
        {/* {role.edit ? ( */}
        <Tooltip title={'Sửa'}>
          <EditOutlined onClick={() => showModalEdit(record)} />
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

  const {FileLimit} = props;
  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>Quản lý bảo tàng</PageHeader>
        <PageAction>
          <Button type="primary" onClick={showModalAdd}>
            <PlusOutlined />
            Thêm mới{' '}
          </Button>
        </PageAction>
      </PageWrap>
      <Box>
        <BoxFilter>
          <InputSearch
            allowClear={true}
            defaultValue={filterData.Keyword}
            placeholder="Tìm kiếm theo tên bảo tàng"
            onSearch={(value) => onFilter(value, 'Keyword')}
            style={{width: 300}}
          />
        </BoxFilter>
        <BoxTable
          columns={columns}
          // rowKey="HuongDanSuDungID"
          dataSource={DanhSachBaoTang}
          loading={props.TableLoading}
          onChange={onTableChange}
          pagination={{
            showSizeChanger: true, //show text: PageSize/page
            showTotal: (total, range) =>
              `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
            total: TotalRow,
            current: PageNumber, //current page
            pageSize: PageSize,
          }}
        />
      </Box>
      <ModalAddEdit
        confirmLoading={confirmLoading}
        visible={visibleModalAddEdit}
        onCancel={hideModalAddEdit}
        onCreate={submitModalAddEdit}
        dataModalAddEdit={dataModalAddEdit}
        danhSachCacCap={DanhSachCacCap}
        key={modalKey}
        FileLimit={FileLimit}
        action={action}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.QLBaoTang,
    FileLimit: getConfigLocal('fileLimit', 10),
  };
}

export default connect(mapStateToProps, actions)(QLBaoTang);
