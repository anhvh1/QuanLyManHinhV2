import React, {useEffect, useRef, useState} from 'react';
import {
  ITEM_LAYOUT2,
  ITEM_LAYOUT,
  ITEM_LAYOUT_SMALL_2,
  REQUIRED,
} from '../../../../settings/constants';
import {Form, Space, DatePicker, Select, Table, Checkbox} from 'antd';
import {
  Button,
  Modal,
  InputFormatSpecific,
  Input,
  Radio,
} from '../../../../components/uielements/exportComponent';
import api from './config';
const {Item, useForm} = Form;
export default (props) => {
  const [form] = useForm();
  const {dataEdit, loading, visible, action} = props;
  const [DanhSachChiTiet, setDanhSachChiTiet] = useState([]);
  const [ChiTieuChaID, setChiTieuChaID] = useState(
    dataEdit ? dataEdit.ChiTieuChaID : null,
  );
  const [iconStates, setIconStates] = useState([]);
  const [selectedChiTieuID, setSelectedChiTieuID] = useState(null);
  useEffect(() => {
    if (dataEdit && dataEdit.ChiTieuID) {
      setSelectedChiTieuID(dataEdit.ChiTieuID);
      form.setFieldsValue({
        ...dataEdit,
      });
    }
  }, [dataEdit]);
  useEffect(() => {
    if (!ChiTieuChaID) {
      setDanhSachChiTiet([]);
      return;
    }
    const fetchChiTieuData = async () => {
      try {
        const response = await api.ChiTietChiTieu({
          Id: ChiTieuChaID,
        });
        if (response.data.Status === 1) {
          const childrenData = response.data.Data.Children;
          if (!childrenData) {
            setDanhSachChiTiet([]);
          } else {
            const extractedData = [];
            const extractChildren = (children, isChild) => {
              children.forEach((item) => {
                extractedData.push({
                  TenChiTieu: item.TenChiTieu,
                  ChiTieuID: item.ChiTieuID,
                  isChild: isChild,
                });
                if (item.Children && item.Children.length > 0) {
                  extractChildren(item.Children, true);
                }
              });
            };
            extractChildren(childrenData, false);
            if (extractedData.length === 0) {
              setDanhSachChiTiet([]);
            } else {
              setDanhSachChiTiet(extractedData);
              setIconStates(new Array(extractedData.length).fill(true));
            }
          }
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Failed to fetch data');
      }
    };
    fetchChiTieuData();
  }, [ChiTieuChaID]);

  const handleSelectChange = (value) => {
    setChiTieuChaID(value);
  };
  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    props.onCreate({
      ...value,
    });
  };
  const toggleIcon = (index) => {
    const selectedChiTieu = DanhSachChiTiet[index];
    const newSelectedChiTieuID =
      selectedChiTieu.ChiTieuID === selectedChiTieuID
        ? null
        : selectedChiTieu.ChiTieuID;
    setSelectedChiTieuID(newSelectedChiTieuID);
    form.setFieldsValue({ChiTieuID: newSelectedChiTieuID});
  };
  const ParentComponent = ({record, index}) => (
    <div
      style={{
        border: '1px solid #ccc',
        height: '35px', 
        padding: '5px 0px 0px 10px',
        marginLeft: '-15px', 
      }}
    >
      <span>{record.TenChiTieu}</span>
      <Checkbox
        style={{float: 'right', marginRight: 20}}
        checked={selectedChiTieuID === record.ChiTieuID}
        onChange={() => toggleIcon(index)}
      />
    </div>
  );
  const ChildComponent = ({record, index}) => (
    <div
      style={{
        border: '1px solid #ccc',
        marginLeft: '10px',
        height: '35px', 
        padding: '5px 0px 0px 10px',
      }}
    >
      <span>{record.TenChiTieu}</span>
      <Checkbox
      style={{float: 'right', marginRight: 20}}
        checked={selectedChiTieuID === record.ChiTieuID}
        onChange={() => toggleIcon(index)}
      />
    </div>
  );
  
  const columns = [
    {
      dataIndex: 'ChiTieuID',
      align: 'left',
      render: (text, record, index) => (
        <>
          {record.isChild ? (
            <ChildComponent record={record} index={index} />
          ) : (
            <ParentComponent record={record} index={index} />
          )}
        </>
      ),
    },
  ];
  const {danhSachLoaiMauPhieu,DanhSachChiTieu} = props;
  return (
    <Modal
      title={`${action === 'edit' ? 'Sửa' : 'Thêm mới'} di sản tư liệu`}
      width={1000}
      visible={visible}
      onCancel={props.onCancel}
      footer={[
        <Button key="back" onClick={props.onCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          htmlType="submit"
          type="primary"
          form="formDiSanTuLieu"
          loading={loading}
          onClick={onOk}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form form={form} name={'formDiSanTuLieu'}>
        {action !== 'add' ? (
          <Item name="DiSanTuLieuID" hidden {...REQUIRED}></Item>
        ) : null}
        <Item
          label="Tên"
          name={'TenDiSanTuLieu'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item
          label="Chọn loại mẫu phiếu "
          name={'LoaiMauPhieuID'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Select allowClear placeholder={'Chọn loại mẫu phiếu'}>
            {danhSachLoaiMauPhieu?.map((item) => (
              <Option value={item.ID}>{item.Ten}</Option>
            ))}
          </Select>
        </Item>
        <Item
          label="Chọn chỉ tiêu"
          name="ChiTieuChaID"
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Select
            allowClear
            placeholder="Chọn chỉ tiêu"
            onChange={handleSelectChange}
            defaultValue={dataEdit ? dataEdit.ChiTieuChaID : undefined}
          >
            {DanhSachChiTieu?.map((item) => (
              <Option key={item.ChiTieuID} value={item.ChiTieuID}>
                {item.TenChiTieu}
              </Option>
            ))}
          </Select>
        </Item>
        <Item name={'ChiTieuID'}>
          <Table
            columns={columns}
            dataSource={DanhSachChiTiet}
            pagination={false}
            scroll={{
              y: 440,
            }}
          />
        </Item>
      </Form>
    </Modal>
  );
};
