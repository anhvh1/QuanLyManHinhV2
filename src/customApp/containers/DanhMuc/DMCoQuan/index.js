import React, {Component, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import queryString from 'query-string';
import actions from '../../../redux/DanhMuc/DMCoQuan/actions';
import api from './config';
import Constants from '../../../../settings/constants';
import Select, {Option} from '../../../../components/uielements/select';

import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import {EmptyTable} from '../../../../components/utility/boxTable';

import ModalEdit from './modalAddEdit';
import {Modal, message, Input, Tree, Menu, Dropdown} from 'antd';
import Button from '../../../../components/uielements/button';
import {changeUrlFilter, getFilterData} from '../../../../helpers/utility';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import TreeData from './treeData';
import {RedTree, StyledBoxDMCoQuan} from './styled';
import {getRoleByKey} from '../../../../helpers/utility';
import PageWrap from '../../../../components/utility/PageWrap';
import {InputSearch} from '../../../../components/uielements/input';
const {TreeNode} = Tree;
const DMCoQuan = (props) => {
  document.title = 'Danh mục cơ quan đơn vị';
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [keyState, setKeyState] = useState({
    key: 0,
    treeKey: 0,
  });
  const [stateModalAddEdit, setStateModalAddEdit] = useState({
    confirmLoading: false,
    visibleModalAddEdit: false,
    action: '',
    dataModalAddEdit: {
      DanhSachTinh: [],
      Data: null,
    },
    modalKey: 0,
  });
  const {DanhSachCoQuan} = props;
  const [DanhSachCacCap, setDanhSachCacCap] = useState([]);
  const {
    confirmLoading,
    visibleModalAddEdit,
    action,
    dataModalAddEdit,
    modalKey,
  } = stateModalAddEdit;

  const {treeKey, key} = keyState;
  // get api danhsachcaccap
  const danhSachCacCap = async () => {
    try {
      const res = await api.danhSachCacCapDonVi();
      setDanhSachCacCap(res.data.Data);
    } catch (error) {}
  };

  useEffect(() => {
    props.getInitData(filterData);
    danhSachCacCap();
  }, []);

  useEffect(() => {
    changeUrlFilter(filterData); //change url
    props.getList(filterData);
  }, [filterData]);

  //filter --------------------------------------------------
  const onFilter = (value, property) => {
    //get filter data
    let oldFilterData = {...filterData};
    let onFilter = {value, property};
    let newFilterData = getFilterData(oldFilterData, onFilter, null);
    //get filter data
    setFilterData(newFilterData);
  };

  //Delete-----------------------------------------------------
  const deleteData = (CoQuanID) => {
    // if (!props.role.delete) {
    //   message.destroy();
    //   message.warning('Bạn không có quyền thực hiện chức năng này');
    // } else {
    Modal.confirm({
      title: 'Xóa dữ liệu',
      content: 'Bạn có muốn xóa cơ quan đơn vị này không?',
      cancelText: 'Không',
      okText: 'Có',
      onOk: () => {
        api
          .xoaCoQuan(CoQuanID)
          .then((response) => {
            if (response.data.Result.Status > 0) {
              //reset tree
              props.getList(filterData); //get list
              //message success
              message.destroy();
              message.success(response.data.Result.Message);
            } else {
              Modal.error({
                title: 'Lỗi',
                content: response.data.Result.Message,
              });
            }
          })
          .catch((error) => {
            Modal.error(Constants.API_ERROR);
          });
      },
    });
    // }
  };

  //Modal add -----------------------------------------------------
  const showModalAdd = (CoQuanChaID, TenCoQuanCha) => {
    if (!props.role.add) {
      message.destroy();
      message.warning('Bạn không có quyền thực hiện chức năng này');
    } else {
      if (!CoQuanChaID) {
        let newModalKey = modalKey + 1;
        setStateModalAddEdit((prevState) => ({
          ...prevState,
          visibleModalAddEdit: true,
          dataModalAddEdit: {
            CoQuanChaID: CoQuanChaID ? CoQuanChaID : DanhSachCoQuan[0]?.ID,
            TenCoQuanCha: TenCoQuanCha ? TenCoQuanCha : DanhSachCoQuan[0]?.Ten,
            Data: {
              CoQuanChaID: CoQuanChaID ? CoQuanChaID : DanhSachCoQuan[0]?.ID,
              TinhID: DanhSachCoQuan[0]?.ID,
            },
          },
          confirmLoading: false,
          modalKey: newModalKey,
          action: 'add',
        }));
      } else
        api
          .chiTietCoQuan({ID: CoQuanChaID})
          .then((response) => {
            if (response.data.Status > 0) {
              let Data = response.data.Data;
              let newModalKey = modalKey + 1;
              setStateModalAddEdit((prevState) => ({
                ...prevState,
                visibleModalAddEdit: true,
                dataModalAddEdit: {
                  Data: {...Data, CoQuanChaID},
                  CoQuanChaID,
                  TenCoQuanCha,
                },
                confirmLoading: false,
                modalKey: newModalKey,
                action: 'add',
              }));
            } else {
              Modal.error({
                title: 'Lỗi',
                content: response.data.Message,
              });
            }
          })
          .catch((error) => {
            message.destroy();
            message.warning(error.toString());
          });
    }
  };

  //Modal edit -----------------------------------------------------
  const showModalEdit = (CoQuanID, TenCoQuanCha) => {
    if (!props.role.edit) {
      message.destroy();
      message.warning('Bạn không có quyền thực hiện chức năng này');
    } else {
      api
        .chiTietCoQuan({ID: CoQuanID})
        .then((response) => {
          if (response.data.Status > 0) {
            let Data = response.data.Data;
            let newModalKey = modalKey + 1;
            setStateModalAddEdit((prevState) => ({
              ...prevState,
              visibleModalAddEdit: true,
              dataModalAddEdit: {
                Data,
                CoQuanID,
                TenCoQuanCha,
              },
              confirmLoading: false,
              modalKey: newModalKey,
              action: 'edit',
            }));
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
    }
  };

  const hideModalEdit = () => {
    setStateModalAddEdit((prevState) => ({
      dataModalAddEdit: {},
      visibleModalAddEdit: false,
      action: '',
    }));
  };

  const submitModalEdit = (data) => {
    setStateModalAddEdit((prevState) => ({...prevState, confirmLoading: true}));
    if (action === 'add') {
      api
        .themCoQuan(data)
        .then((response) => {
          setStateModalAddEdit((prevState) => ({
            ...prevState,
            confirmLoading: false,
          }));
          if (response.data.Status > 0) {
            //message success
            message.destroy();
            message.success(response.data.Message);
            //hide modal
            hideModalEdit();
            props.getList(filterData); //get list
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
    } else {
      api
        .suaCoQuan(data)
        .then((response) => {
          setStateModalAddEdit((prevState) => ({
            ...prevState,
            confirmLoading: false,
          }));
          if (response.data.Status > 0) {
            //message success
            message.destroy();
            message.success(response.data.Message);
            //hide modal
            hideModalEdit();
            props.getList(filterData); //get list
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
    }
  };


  //Tree -------------------------------------------------------------
  const onExpandNode = (selectedKeys, info) => {
    let className = info.nativeEvent.target.outerHTML.toString();
    let parentClassName =
      info.nativeEvent.target.parentElement.className.toString();
    let checkMenu = className.includes('ant-dropdown-menu');
    let checkNearMenu = parentClassName.includes('ant-dropdown-menu');
    if (!checkMenu && !checkNearMenu) {
      //neu dang k click menu drop
      let key = info.node.props.eventKey.toString();
      if (key) {
        if (!info.node.props.isLeaf) {
          let newExpandedKeys = [...expandedKeys];
          let index = newExpandedKeys.indexOf(key);
          if (index > -1) {
            newExpandedKeys.splice(index, 1);
          } else {
            newExpandedKeys = newExpandedKeys.concat([key]);
          }
          setExpandedKeys(newExpandedKeys);
          setKeyState((prevKey) => ({...prevKey, key: selectedKeys}));
        }
      }
    }
  };
  const [openedMenuKey, setOpenedMenuKey] = useState(null);

  const handleMenuOpen = (key) => {
    setOpenedMenuKey(key);
  };

  const handleMenuClose = () => {
    setOpenedMenuKey(null);
  };
  const renderTreeNodes = (data) =>
    data?.map((item) => {
      let menu = (
        <Menu>
          {item.Cap <= 4 || item.Cap === 6 || item.Cap === 7 ? ( //if Cap = 1 or 2
            <Menu.Item
              onClick={() => {
                handleMenuClose(); // Đóng menu khi mục trong menu được nhấp
                showModalAdd(item.ID, item.Ten, item.Cap); // Hiển thị modal thêm mới khi mục được nhấp
              }}
            >
              <span>Thêm đơn vị</span>
            </Menu.Item>
          ) : null}
          <Menu.Item
            onClick={() => {
              handleMenuClose(); // Đóng menu khi mục trong menu được nhấp
              showModalEdit(item.ID, item.Ten, item.Cap); // Hiển thị modal chỉnh sửa khi mục được nhấp
            }}
          >
            <span>Sửa</span>
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              handleMenuClose();
              deleteData(item.ID);
            }}
            disabled={!item.children ? false : true}
          >
            <span>Xóa</span>
          </Menu.Item>
        </Menu>
      );
      let title = (
        <div
        //  onClick={() => props.dispatch(item.ID)}
        >
          <Dropdown
            overlay={menu}
            placement="bottomLeft"
            trigger={['contextMenu']}
            visible={openedMenuKey === item.key}
            onVisibleChange={(visible) => {
              if (visible) {
                handleMenuOpen(item.key);
              } else {
                handleMenuClose();
              }
            }}
          >
            <span
              className="title-tree"
              style={item.ID === props.styled ? {color: 'red'} : {}}
            >
              {item.title}
            </span>
          </Dropdown>
        </div>
      );

      if (item.children) {
        return (
          <TreeNode
            title={title}
            key={item.key}
            isLeaf={item.isLeaf}
            children={item.children}
            dataRef={item}
          >
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          title={title}
          key={item.key}
          isLeaf={item.isLeaf}
          children={item.children}
          dataRef={item}
        />
      );
    });

  const renderContent = () => {
    if (DanhSachCoQuan?.length) {
      const DSFilter = filterTreeNode(DanhSachCoQuan);
      return (
        <RedTree>
          <Tree
            showLine
            filterTreeNode={(treeNode) =>
              treeNode.props.dataRef.Highlight === 1
            }
            onSelect={onExpandNode}
            onExpand={onExpandNode}
            defaultExpandedKeys={key}
            expandedKeys={
              filterData.Keyword ? props.expandedKeys : expandedKeys
            }
          >
            {renderTreeNodes(DSFilter)}
          </Tree>
        </RedTree>
      );
    } else {
      return <EmptyTable loading={props.TableLoading} />;
    }
  };

  const filterTreeNode = (dataRoot) => {
    return dataRoot;
  };

  //Render action ---------------------------------------------
  const renderActionAdd = () => {
    return (
      <span>
        <Button
          type="primary"
          onClick={() => showModalAdd('', '', '')}
          className="d-none"
        >
          <PlusOutlined />
          Thêm mới
        </Button>
      </span>
    );
  };

  //Render ----------------------------------------------------
  const {role} = props;
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>DANH MỤC CƠ QUAN, ĐƠN VỊ</PageHeader>
        <PageAction>{role?.add ? renderActionAdd() : ''}</PageAction>
      </PageWrap>
      <StyledBoxDMCoQuan>
        <Box className="box">
          <BoxFilter>
            {/* <Select
              allowClear
              style={{width: '200px'}}
              defaultValue={filterData.Cap}
              placeholder={'Chọn cấp'}
              onChange={(value) => onFilter(value, 'Cap')}
            >
              {DanhSachCacCap?.map((item) => (
                <Option value={item.Cap}>{item.TenCap}</Option>
              ))}
            </Select> */}
            <InputSearch
              allowClear
              defaultValue={filterData.Keyword}
              placeholder="Tìm kiếm theo tên cơ quan, đơn vị"
              onSearch={(value) => onFilter(value, 'Keyword')}
              style={{width: 300}}
            />
          </BoxFilter>
          <div key={treeKey} style={{userSelect: 'none'}} className="mg-top">
            {renderContent()}
          </div>
        </Box>
      </StyledBoxDMCoQuan>
      <ModalEdit
        confirmLoading={confirmLoading}
        visible={visibleModalAddEdit}
        onCancel={hideModalEdit}
        onCreate={submitModalEdit}
        dataModalEdit={dataModalAddEdit}
        key={modalKey}
        DanhSachCoQuan={DanhSachCoQuan}
        action={action}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.DMCoQuan,
  };
}

export default connect(mapStateToProps, actions)(DMCoQuan);
