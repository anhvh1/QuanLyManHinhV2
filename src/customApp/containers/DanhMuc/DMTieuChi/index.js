import React, {Component, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import queryString from 'query-string';
import actions from '../../../redux/DanhMuc/DMTieuChi/actions';
import api from './config';
import Constants, {LOAICOT} from '../../../../settings/constants';
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
import {Wrapper} from './styled';
import {getRoleByKey} from '../../../../helpers/utility';
import PageWrap from '../../../../components/utility/PageWrap';
// import {mapCotIDToDataTable} from '../../BaoCao/Shared/table';
import {InputSearch} from '../../../../components/uielements/input';
const {TreeNode} = Tree;
const DMTieuChi = (props) => {
  document.title = 'Danh mục tiêu chí';
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
  const {DanhSachTieuChi, DanhSachDauBaoCao, DanhSachCuoiBaoCao} = props;

  const {
    confirmLoading,
    visibleModalAddEdit,
    action,
    dataModalAddEdit,
    modalKey,
  } = stateModalAddEdit;

  const {treeKey, key} = keyState;

  useEffect(() => {
    props.getList(filterData);
    // props.getInitData(filterData);
    // danhSachCacCap();
  }, []);

  const filterTreeNode = (dataRoot) => {
    return dataRoot;
  };

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
  const deleteData = (CotID) => {
    // if (!props.role.delete) {
    //   message.destroy();
    //   message.warning('Bạn không có quyền thực hiện chức năng này');
    // } else {
    Modal.confirm({
      title: 'Xóa dữ liệu',
      content: 'Bạn có muốn xóa tiêu chí này không?',
      cancelText: 'Không',
      okText: 'Có',
      onOk: () => {
        api
          .XoaTieuChi({ListID: [CotID]})
          .then((response) => {
            if (response.data.Status > 0) {
              props.getList(filterData); //get list
              //message success
              message.destroy();
              message.success(response.data.Message);
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
    // }
  };

  const findObjectByCotID = (arr, CotID) => {
    for (let i = 0; i < arr.length; i++) {
      const currentObject = arr[i];

      if (currentObject.CotID === CotID) {
        // Nếu tìm thấy đối tượng với CotID phù hợp, trả về nó
        return currentObject;
      }

      // Nếu không, kiểm tra children của đối tượng hiện tại bằng cách đệ quy
      if (currentObject.children && currentObject.children.length > 0) {
        const resultInChildren = findObjectByCotID(
          currentObject.children,
          CotID,
        );

        // Nếu tìm thấy trong children, trả về kết quả
        if (resultInChildren !== null) {
          return resultInChildren;
        }
      }
    }

    // Nếu không tìm thấy đối tượng nào có CotID phù hợp, trả về null
    return null;
  };

  //Modal add -----------------------------------------------------
  const showModalAdd = (CotID, CotChaID, TenCot, LoaiCot) => {
    // const objParent = findObjectByCotID(DSFilter, CotChaID);
    // !props.role.add
    if (false) {
      message.destroy();
      message.warning('Bạn không có quyền thực hiện chức năng này');
    } else {
      if (!CotChaID) {
        let newModalKey = modalKey + 1;
        setStateModalAddEdit((prevState) => ({
          ...prevState,
          visibleModalAddEdit: true,
          dataModalAddEdit: {
            CotChaID: CotID,
            TenCotCha: TenCot,
            LoaiCot: LoaiCot,
          },
          confirmLoading: false,
          modalKey: newModalKey,
          action: 'add',
        }));
      } else
        api
          .ChiTietTieuChi({ID: CotID})
          .then((response) => {
            if (response.data.Status > 0) {
              let Data = response.data.Data;
              let newModalKey = modalKey + 1;
              setStateModalAddEdit((prevState) => ({
                ...prevState,
                visibleModalAddEdit: true,
                dataModalAddEdit: {
                  CotChaID: CotID,
                  TenCotCha: Data.TenCot,
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
  const showModalEdit = (CotID, CotChaID, objParent) => {
    // if (!props.role.edit) {
    //   message.destroy();
    //   message.warning('Bạn không có quyền thực hiện chức năng này');
    // } else {
    api
      .ChiTietTieuChi({ID: CotID})
      .then((response) => {
        if (response.data.Status > 0) {
          let Data = response.data.Data;
          let newModalKey = modalKey + 1;
          setStateModalAddEdit((prevState) => ({
            ...prevState,
            visibleModalAddEdit: true,
            dataModalAddEdit: {
              ...Data,
              CotID,
              TenCotCha: objParent?.TenCot,
              CotChaID: CotChaID,
              // LoaiCot: objParent?.LoaiCot,
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
    // }
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
        .ThemTieuChi(data)
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
        .SuaTieuChi(data)
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

  const [openMenuKey, setOpenMenuKey] = useState(null);

  // Thêm hàm để xử lý việc mở hoặc đóng menu
  const handleMenuToggle = (item) => {
    setOpenMenuKey(openMenuKey === item.CotID ? null : item.CotID);
  };

  // Sửa phần renderTreeNodes để sử dụng state openMenuKey
  const renderTreeNodes = (data, originalData, LoaiCot) =>
    data?.map((item) => {
      const objParent = findObjectByCotID(originalData, item.CotChaID);
      let menu = (
        <Menu>
          <Menu.Item
            onClick={() => {
              showModalAdd(
                item.CotID,
                item.CotChaID,
                item.TenCot,
                item.LoaiCot,
              );
              setOpenMenuKey(null); // Đóng menu khi một mục được nhấp
            }}
          >
            <span>Thêm tiêu chí</span>
          </Menu.Item>

          <Menu.Item
            onClick={() => {
              showModalEdit(item.CotID, item.CotChaID, objParent);
              setOpenMenuKey(null); // Đóng menu khi một mục được nhấp
            }}
          >
            <span>Sửa</span>
          </Menu.Item>

          <Menu.Item
            onClick={() => {
              deleteData(item.CotID);
              setOpenMenuKey(null); // Đóng menu khi một mục được nhấp
            }}
            // disabled={!item.Children ? false : true}
            // disabled={!item.Children}
          >
            <span>Xóa</span>
          </Menu.Item>
        </Menu>
      );
      let title = (
        <div>
          <Dropdown
            overlay={menu}
            placement="bottomLeft"
            trigger={['contextMenu']}
            visible={openMenuKey === item.CotID} // Sử dụng openMenuKey để xác định trạng thái của menu
            onVisibleChange={() => handleMenuToggle(item)} // Thay đổi trạng thái menu khi được mở hoặc đóng
          >
            <span
              className="title-tree"
              style={item.CotID === props.styled ? {color: 'red'} : {}}
            >
              {item.TenCot}
            </span>
          </Dropdown>
        </div>
      );

      if (item.Children) {
        return (
          <TreeNode
            title={title}
            key={item.CotID}
            isLeaf={item.isLeaf}
            Children={item.Children}
            dataRef={item}
          >
            {renderTreeNodes(item.Children, originalData, LoaiCot)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          title={title}
          key={item.CotID}
          isLeaf={item.isLeaf}
          Children={item.Children}
          dataRef={item}
        />
      );
    });
  const renderContent = (Data, LoaiCot) => {
    const DSFilter = filterTreeNode(Data);
    if (Data?.length) {
      return (
        <Tree
          showLine
          filterTreeNode={(treeNode) => treeNode.props.dataRef.Highlight === 1}
          onSelect={onExpandNode}
          onExpand={onExpandNode}
          defaultExpandedKeys={key}
          expandedKeys={filterData.Keyword ? props.expandedKeys : expandedKeys}
        >
          {renderTreeNodes(DSFilter, DSFilter, LoaiCot)}
        </Tree>
      );
    } else {
      return <EmptyTable loading={props.TableLoading} />;
    }
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
    <Wrapper>
      <LayoutWrapper>
        <PageWrap>
          <PageHeader>Danh mục tiêu chí</PageHeader>
          <PageAction>{role?.add ? renderActionAdd() : ''}</PageAction>
        </PageWrap>
        <Box className="box">
          <BoxFilter>
            <InputSearch
              allowClear
              defaultValue={filterData.Keyword}
              placeholder="Tìm kiếm theo tên tiêu chí"
              onSearch={(value) => onFilter(value, 'Keyword')}
              style={{width: 300}}
            />
          </BoxFilter>
          <div key={treeKey} style={{userSelect: 'none'}} className="mg-top">
            {DanhSachDauBaoCao?.length ? (
              <>
                <p className="title">Phần đầu báo cáo</p>
                {renderContent(DanhSachDauBaoCao, LOAICOT.PhanDauBaoCao)}
              </>
            ) : null}
            {DanhSachTieuChi?.length ? (
              <>
                <p className="title">Phần nội dung tiêu chí báo cáo</p>
                {renderContent(DanhSachTieuChi, LOAICOT.PhanTieuChi)}
              </>
            ) : null}
            {DanhSachCuoiBaoCao?.length ? (
              <>
                <p className="title">Phần cuối báo cáo</p>
                {renderContent(DanhSachCuoiBaoCao, LOAICOT.PhanCuoiBaoCao)}
              </>
            ) : null}
          </div>
        </Box>
        <ModalEdit
          confirmLoading={confirmLoading}
          visible={visibleModalAddEdit}
          onCancel={hideModalEdit}
          onCreate={submitModalEdit}
          dataModalEdit={dataModalAddEdit}
          key={modalKey}
          DanhSachTieuChi={DanhSachTieuChi}
          action={action}
        />
      </LayoutWrapper>
    </Wrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.DMTieuChi,
  };
}

export default connect(mapStateToProps, actions)(DMTieuChi);
