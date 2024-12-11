// ViewerTable.tsx
import React from 'react';
import { Table } from 'antd';
import type { TableColumnsType, TablePaginationConfig } from 'antd';


interface ViewerData {
    key: React.Key;
    id: number;
    fullName: string;
    mobileNumber: string;
    language: string;
}

interface ViewerTableProps {
    data: ViewerData[];
    loading: boolean;
    pagination: TablePaginationConfig;
    onTableChange: (pagination: TablePaginationConfig) => void;
    selectedUserIds: number[];
    onSelectChange: (selectedRowKeys: number[]) => void;
}

const columns: TableColumnsType<ViewerData> = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'نام و نام خانوادگی', dataIndex: 'fullName', key: 'fullName' },
    { title: 'شماره موبایل', dataIndex: 'mobileNumber', key: 'mobileNumber' },
    { title: 'زبان', dataIndex: 'language', key: 'language' },
];

const ViewerFilterPanel: React.FC<ViewerTableProps> = ({
    data,
    loading,
    pagination,
    onTableChange,
    selectedUserIds,
    onSelectChange,
}) => {
    const rowSelection = {
        selectedRowKeys: selectedUserIds,
        onChange: (selectedRowKeys: React.Key[]) => {
            onSelectChange(selectedRowKeys as number[]);
        },
    };

    return (
        <Table<ViewerData>
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={{
                ...pagination,
                position: ["bottomCenter"],
              }}
            onChange={onTableChange}
            rowKey="id"
            rowSelection={rowSelection}
            className="rtl"
        />
    );
};

export default ViewerFilterPanel;
