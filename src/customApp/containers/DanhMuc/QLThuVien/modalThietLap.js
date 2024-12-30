import React, {useEffect, useState} from 'react';
import {Tree, Checkbox, Select, Tooltip} from 'antd';
import {
  Button,
  Modal,
  InputSearch,
  Input,
} from '../../../../components/uielements/exportComponent';
import {message} from 'antd';
import {
  customizeFormValidator as Form,
  useForm,
} from '../../../../components/uielements/formValidator';
import BoxTable from '../../../../components/utility/boxTable';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import Box from '../../../../components/utility/box';
import {EmptyTable} from '../../../../components/utility/boxTable';
import api from './config';
import {
  DeleteOutlined,
  FolderOutlined,
  FolderOpenOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import BoxFilter from '../../../../components/utility/boxFilter';
import {changeUrlFilter} from '../../../../helpers/utility';
import {DndContext, PointerSensor, useSensor, useSensors} from '@dnd-kit/core';
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
const {TreeNode} = Tree;
export default (props) => {
  const [form] = useForm();
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const {
    dataThietLap,
    loading,
    visible,
    actionthietlap,
    danhSachDMThuVien,
    filterData,
  } = props;
  const onChangeCheck = (e) => {
    const isChecked = e.target.checked;
    setFilterParams((prevParams) => ({
      ...prevParams,
      ThuMucID: isChecked ? null : '',
    }));
    setSelectAllFolders(isChecked);
  };
  const filterTreeNode = (dataRoot) => {
    return dataRoot;
  };
  const DSFilter = filterTreeNode(danhSachDMThuVien);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (DSFilter.length && !initialized) {
      setTimeout(() => {
        // Assuming the first item in DSFilter is the root node
        const rootNode = DSFilter[0];
        if (rootNode) {
          const firstNodeKey = rootNode.ThuMucID.toString();
          onExpandNode([firstNodeKey], {
            node: {props: {eventKey: firstNodeKey, isLeaf: false}},
            nativeEvent: {
              target: {outerHTML: '', parentElement: {className: ''}},
            },
          });
        }
        setInitialized(true);
      }, 0);
    }
  }, [DSFilter, initialized]);
  useEffect(() => {
    changeUrlFilter(filterData);
  }, [filterData]);
  useEffect(() => {
    if (dataThietLap && dataThietLap.DanhSachPhatID) {
      form &&
        form.setFieldsValue({
          ...dataThietLap,
        });
    }
  }, []);

  const onExpandNode = (selectedKeys, info) => {
    let className = info.nativeEvent.target.outerHTML.toString();
    let parentClassName =
      info.nativeEvent.target.parentElement.className.toString();
    let checkMenu = className.includes('ant-dropdown-menu');
    let checkNearMenu = parentClassName.includes('ant-dropdown-menu');
    if (!checkMenu && !checkNearMenu) {
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
    return renderContent();
  };

  const [keyState, setKeyState] = useState({
    key: 0,
    treeKey: 0,
  });
  const {treeKey, key} = keyState;
  const renderTreeNodes = (data) =>
    data?.map((item) => {
      let isExpanded = expandedKeys.includes(item.ThuMucID.toString());
      let switcherIcon;
      if (item.ThuMucID === 1) {
        switcherIcon = <HomeOutlined />;
      } else {
        switcherIcon = isExpanded ? <FolderOpenOutlined /> : <FolderOutlined />;
      }
      let title = (
        <div>
          <span>{item.TenThuMuc}</span>
        </div>
      );

      if (item.Children) {
        return (
          <TreeNode
            switcherIcon={switcherIcon}
            title={title}
            Children={item.Children}
            dataRef={item}
            key={item.ThuMucID}
            defaultExpandAll
          >
            {renderTreeNodes(item.Children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          title={title}
          switcherIcon={switcherIcon}
          Children={item.Children}
          dataRef={item}
          key={item.ThuMucID}
          defaultExpandAll
        />
      );
    });
  const [selectAllFolders, setSelectAllFolders] = useState(false);
  const clearAllFoldersSelection = () => {
    setSelectAllFolders(false);
  };
  const onSelectTreeNode = (selectedKeys, info) => {
    const selectedNode = info.node.props.dataRef;
    const ThuMucID = selectedNode.ThuMucID || '';
    setFilterParams((prev) => ({
      ...prev,
      ThuMucID: ThuMucID,
    }));
    clearAllFoldersSelection();
  };
  const renderContent = () => {
    if (danhSachDMThuVien?.length) {
      return (
        <Tree
          filterTreeNode={(treeNode) => treeNode.props.dataRef.Highlight === 1}
          onSelect={onSelectTreeNode}
          onExpand={onExpandNode}
          style={{
            userSelect: 'none',
            minHeight: '120px',
            maxHeight: '150px',
            overflowY: 'auto',
          }}
          expandedKeys={filterData.Keyword ? props.expandedKeys : expandedKeys}
        >
          {renderTreeNodes(DSFilter)}
        </Tree>
      );
    } else {
      return <EmptyTable loading={props.TableLoading} />;
    }
  };
  const [DanhSachMauPhieuSuggest, setDanhSachMauPhieuSuggest] = useState([]);
  const [TotalRow, setTotalRow] = useState([]);
  const [filterParams, setFilterParams] = useState({
    Loai: '',
    Keyword: '',
    ThuMucID: '',
    PageSize: TotalRow,
    Status: 'true',
  });
  useEffect(() => {
    setFilterParams((prevParams) => ({
      ...prevParams,
      PageSize: TotalRow.toString(),
    }));
  }, [TotalRow]);
  useEffect(() => {
    handleGetListSuggest();
  }, [filterParams]);
  const handleGetListSuggest = () => {
    api.DanhSachMedia(filterParams).then((res) => {
      if (res.data.Status > 0) {
        setDanhSachMauPhieuSuggest(res.data.Data);
        setTotalRow(res.data.TotalRow);
      } else {
        message.destroy();
        message.warning(res.data.Message);
      }
    });
  };
  const handleSelectChange = (value) => {
    setFilterParams((prev) => ({...prev, Loai: value}));
  };
  const handleSearch = (value) => {
    setFilterParams((prev) => ({...prev, Keyword: value}));
  };
  const convertDurationToSeconds = (duration) => {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };
  const convertSecondsToDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0',
    )}:${String(remainingSeconds).padStart(2, '0')}`;
  };
  const columns = [
    {
      title: 'STT',
      align: 'center',
      width: '5%',
      render: (text, record, index) => {
        const sttValue = index + 1;
        return sttValue;
      },
    },
    {
      title: 'Thời gian bắt đầu',
      align: 'center',
      width: '15%',
      render: (_, __, index) => {
        if (index === 0) return '00:00:00';

        let totalSeconds = 0;
        for (let i = 0; i < index; i++) {
          totalSeconds += convertDurationToSeconds(
            dataSource[i].ThoiLuongTrinhChieu,
          );
        }

        return convertSecondsToDuration(totalSeconds);
      },
    },

    {
      title: 'Thời Lượng Trình Chiếu',
      dataIndex: 'ThoiLuongTrinhChieu',
      key: 'ThoiLuongTrinhChieu',
      width: '15%',
      align: 'center',
      render: (_, record) => (
        <TimeInput
          value={record.ThoiLuongTrinhChieu}
          onChange={(value) => handleDurationChange(value, record)}
        />
      ),
    },
    {
      title: 'Tên file',
      dataIndex: 'TenFile',
      align: 'center',
      width: '30%',
    },
    {
      title: 'Thumbnail',
      dataIndex: 'UrlFile',
      align: 'center',

      width: '6%',
      render: (url) => {
        if (url) {
          if (url.startsWith('http') || url.startsWith('https')) {
            if (
              url.toLowerCase().endsWith('.mp4') ||
              url.toLowerCase().endsWith('.webm')
            ) {
              return (
                <video
                  src={url}
                  style={{width: '50%', height: '50px', textAlign: 'center'}}
                  controls
                />
              );
            } else {
              return (
                <img
                  src={url}
                  style={{
                    width: '50%',
                    height: '50px',
                    objectFit: 'cover',
                    textAlign: 'center',
                  }}
                  alt="Thumbnail"
                />
              );
            }
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    },
    {
      title: 'Thao tác',
      dataIndex: '', // Để trống dataIndex vì chúng ta sẽ sử dụng render để tạo nội dung
      width: '10%',
      align: 'center',
      render: (text, record) => renderThaoTac(record),
    },
  ];
  const TimeInput = ({value, onChange}) => {
    const [inputValue, setInputValue] = useState(value);

    const handleChange = (e) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      if (/^\d{2}:\d{2}:\d{2}$/.test(newValue)) {
        const [hours, minutes, seconds] = newValue.split(':').map(Number);
        const adjustedHours = hours > 23 ? 0 : hours;
        const adjustedMinutes = minutes > 59 ? 0 : minutes;
        const adjustedSeconds = seconds > 59 ? 0 : seconds;
        const correctedValue = `${String(adjustedHours).padStart(
          2,
          '0',
        )}:${String(adjustedMinutes).padStart(2, '0')}:${String(
          adjustedSeconds,
        ).padStart(2, '0')}`;
        setInputValue(correctedValue);
        onChange(correctedValue);
      }
    };
    return (
      <Input
        value={inputValue}
        onChange={handleChange}
        style={{width: 100}}
        placeholder="hh:mm:ss"
      />
    );
  };
  const handleDurationChange = (value, record) => {
    const newData = dataSource.map((item) => {
      if (item.ThuTu === record.ThuTu) {
        return {...item, ThoiLuongTrinhChieu: value};
      }
      return item;
    });
    setDataSource(newData);
  };
  const formatTime = (index) => {
    const hours = Math.floor(index / 3600);
    const minutes = Math.floor((index % 3600) / 60);
    const seconds = index % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  const parseDuration = (durationString) => {
    const [hours, minutes, seconds] = durationString.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateTotalDuration = (data) => {
    const totalSeconds = data.reduce((total, item) => {
      return total + parseDuration(item.ThoiLuongTrinhChieu);
    }, 0);
    return formatDuration(totalSeconds);
  };

  const renderThaoTac = (record) => {
    return (
      <div className={'action-btn'}>
        <Tooltip title={'Xóa'}>
          <DeleteOutlined onClick={() => handleDelete(record)} />
        </Tooltip>
      </div>
    );
  };
  const handleDelete = (record) => {
    // Filter out the record to be deleted from dataSource
    const newData = dataSource.filter((item) => item.ThuTu !== record.ThuTu);
    // Update dataSource with the new filtered data
    setDataSource(newData);
  };
  useEffect(() => {
    if (props.dataThietLap && Array.isArray(props.dataThietLap)) {
      const newData = props.dataThietLap.map((item, index) => ({
        ...item,
        STT: index + 1, // Đổi từ item.ThuTu thành index + 1
      }));
      setDataSource(newData);
    }
  }, [props.dataThietLap]);
  const onOk = async () => {
    try {
      const danhSachPhatID = props.dataModalDanhSachMediaID.DanhSachPhatID;
      const totalDuration = calculateTotalDuration(dataSource);
      const params = {
        DanhSachPhatID: danhSachPhatID,
        DanhSachMediaID: dataSource.map((item, index) => {
          const sttValue = index + 1; // Tính giá trị STT
          return {
            ID: item.ID,
            TenFile: item.TenFile,
            ThoiLuongTrinhChieu: item.ThoiLuongTrinhChieu,
            TrangThai: item.TrangThai,
            Tag: null,
            ThuMucID: item.ThuMucID,
            ThuTu: sttValue, // Gán giá trị STT cho ThuTu
          };
        }),
        TongThoiGianPhat: totalDuration,
        TongSoMedia: dataSource.length,
      };
      const response = await api.themThietLap(params);
      if (response.data.Status > 0) {
        props.onCancel();
        message.success(res.data.Message);
      } else {
        message.error(res.data.Message);
      }
    } catch (error) {
      console.error('Error adding thiet lap:', error);
    }
    const {onCreate} = props;
    onCreate();
    props.getList(filterData);
  };
  const [hoverIndex, setHoverIndex] = useState(null);
  const Row = (props) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: props['data-row-key'],
    });

    const style = {
      ...props.style,
      transform: CSS.Translate.toString(transform),
      transition,
      cursor: 'move',
      ...(isDragging
        ? {
            position: 'relative',
            zIndex: 9999,
          }
        : {}),
    };

    return (
      <tr
        {...props}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      />
    );
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
        distance: 1,
      },
    }),
  );

  const onDragEnd = ({active, over}) => {
    if (active.id !== over?.id) {
      setDataSource((prev) => {
        const activeIndex = prev.findIndex((i) => i.ThuTu === active.id);
        const overIndex = prev.findIndex((i) => i.ThuTu === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  const handleDragStart = (event, item) => {
    event.dataTransfer.setData('text/plain', JSON.stringify(item));
  };

  const handleDrop = (event, index) => {
    event.preventDefault();
    const item = JSON.parse(event.dataTransfer.getData('text/plain'));

    const newItem = {
      ID: item.ID,
      TenFile: item.TenFile,
      UrlFile: item.UrlFile,
      ThoiLuongTrinhChieu: item.ThoiLuongTrinhChieu,
      ThuTu: index + 1, // Assign the new order number based on the drop index
    };

    setDataSource((prev) => {
      const updatedDataSource = [...prev];
      updatedDataSource.splice(index, 0, newItem); // Insert at the specific index
      return updatedDataSource.map((item, idx) => ({...item, ThuTu: idx + 1})); // Update the order
    });
  };

  const handleDragOver = (event, index) => {
    event.preventDefault();
    setHoverIndex(index !== undefined ? index : null);
  };
  const handleMediaClick = (item) => {
    const newItem = {
      ID: item.ID,
      TenFile: item.TenFile,
      UrlFile: item.UrlFile,
      ThoiLuongTrinhChieu: item.ThoiLuongTrinhChieu,
      ThuTu: dataSource.length + 1, // Assign the next order number
    };
    setDataSource((prev) => [...prev, newItem]);
  };
  return (
    <Modal
      title={`${
        actionthietlap === 'edit' ? 'CẬP NHẬT' : 'THIẾT LẬP'
      } DANH SÁCH PHÁT`}
      width={'100%'}
      visible={visible}
      onCancel={props.onCancel}
      maskClosable={false}
      footer={[
        <Button key="back" onClick={props.onCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={onOk}>
          Lưu
        </Button>,
      ]}
    >
      <LayoutWrapper>
        <Box
          style={{
            float: 'left',
            width: '25%',
            border: '1px solid white',
          }}
        >
          <Box>
            <div
              key={treeKey}
              style={{
                userSelect: 'none',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              className="mg-top"
            >
              <Checkbox onChange={onChangeCheck} checked={selectAllFolders}>
                Tất cả thư mục
              </Checkbox>
              {renderContent()}
            </div>
          </Box>
          <Box>
            <BoxFilter>
              <Select
                placeholder="Chọn loại"
                onChange={handleSelectChange}
                style={{width: 200}}
                allowClear
              >
                <Option value="1">Hình ảnh</Option>
                <Option value="2">Video</Option>
              </Select>
              <InputSearch
                placeholder="Tìm kiếm theo tên"
                onSearch={handleSearch}
                style={{width: 200}}
                allowClear
              />
            </BoxFilter>
            <div
              style={{
                overflowY: 'auto',
                maxHeight: '413px',
                minHeight: '413px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              {DanhSachMauPhieuSuggest?.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 'calc(50% - 10px)', // Adjust width to account for gap
                    cursor: 'move',
                  }}
                  draggable="true"
                  onDragStart={(event) => handleDragStart(event, item)}
                  onClick={() => handleMediaClick(item)}
                >
                  {item.UrlFile.toLowerCase().endsWith('.mp4') ? (
                    <video width="100%" height="150px" controls>
                      <source src={item.UrlFile} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      style={{
                        width: '100%',
                        height: '150px',
                        objectFit: 'cover',
                      }}
                      src={item.UrlFile}
                      alt={item.TenFile}
                    />
                  )}
                  <p style={{textAlign: 'center', marginTop: '5px'}}>
                    {item.TenFile}
                  </p>
                </div>
              ))}
            </div>
          </Box>
        </Box>
        <Box style={{float: 'left', width: '75%', border: '1px solid white'}}>
          <Box
            style={{textAlign: 'center', paddingTop: '20px', height: '50px'}}
          >
            Tổng thời gian phát:{' '}
            <span style={{marginRight: '30px'}}>
              {calculateTotalDuration(dataSource)}
            </span>{' '}
            Tổng số Media: <span>{dataSource.length}</span>
          </Box>
          <Box>
            <DndContext sensors={sensors} onDragEnd={onDragEnd}>
              <SortableContext
                items={dataSource.map((i) => i.ThuTu)}
                strategy={verticalListSortingStrategy}
              >
                <div>
                  <BoxTable
                    components={{
                      body: {
                        row: Row,
                      },
                    }}
                    rowKey="ThuTu" // Thay đổi rowKey thành "ThuTu"
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                    scroll={{
                      y: '600px',
                    }}
                    onRow={(record, index) => ({
                      onDrop: (event) => handleDrop(event, index),
                      onDragOver: (event) => handleDragOver(event, index),
                    })}
                  />
                </div>
              </SortableContext>
            </DndContext>
          </Box>
        </Box>
      </LayoutWrapper>
    </Modal>
  );
};


