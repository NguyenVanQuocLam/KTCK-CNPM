import React, { useState } from 'react';
import { Table, Button, Input, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  name: string;
  price: number;
  origin: string;
  IsEditable: boolean;
}

const data: DataType[] = [
  {
    key: '1',
    name: 'Kiwi',
    price: 200000,
    origin: 'LA',
    IsEditable: false,
  },
  {
    key: '2',
    name: 'Mango',
    price: 250000,
    origin: 'Thailand',
    IsEditable: false,
  },
  {
    key: '3',
    name: 'Banana',
    price: 100000,
    origin: 'Malaysia',
    IsEditable: false,
  },
  {
    key: '4',
    name: 'Melon',
    price: 150000,
    origin: 'Vietnam',
    IsEditable: false,
  },
  {
    key: '5',
    name: 'Apple',
    price: 200000,
    origin: 'America',
    IsEditable: false,
  },
];

const Demo2103: React.FC = () => {
  const [SearchData, setSearchData] = useState<DataType[]>(data);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string>('');

  const isEditing = (record: DataType) => record.key === editingKey;

  const edit = (record: DataType) => {
    setEditingKey(record.key);
    setEditingValue(record.origin);
  };

  const save = () => {
    const newData = [...SearchData];
    const index = newData.findIndex(item => item.key === editingKey);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, origin: editingValue });
      setSearchData(newData);
      setEditingKey(null);
    }
  };
  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Origin',
      dataIndex: 'origin',
      key: 'origin',
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Input
            value={editingValue}
            onChange={e => setEditingValue(e.target.value)}
          />
        ) : 
          <a onClick={() => edit(record)}>{record.origin}</a>}
    },
    {
      title: 'ExpireDated',
      dataIndex: 'expireDated',
      key: 'expireDated',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type='primary'
          onClick={() => setSearchData(SearchData.filter(item => item.key !== record.key))}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={SearchData} columns={columns} />
      <Modal
        title="Edit Origin"
        visible={!!editingKey}
        onOk={save}
        onCancel={() => setEditingKey(null)}
      >
        <Input value={editingValue} onChange={e => setEditingValue(e.target.value)} />
      </Modal>
    </>
  );
};

export default Demo2103;
