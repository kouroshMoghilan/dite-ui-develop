import { Table, type TableColumnsType, type TablePaginationConfig } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DatePickerUi } from '../../../components/commonUI/DatePickerUi';
import RadioBtn from '../../../components/commonUI/RadioBtn';
import { GET } from '../../../services/apiService/AxiosApiService';
import RemoveDataConfirm from './operation/RemoveDataConfirm';
import SeenRequests from './operation/SeenRequests';
import ShowTextModal from './operation/ShowTextModal';

// Types
interface ViewerData {
  key: React.Key;
  id: number;
  userProfile: React.ReactNode;
  description: React.ReactNode;
  seenStatus: React.ReactNode;
  operation: React.ReactNode;
}

const columns: TableColumnsType<ViewerData> = [
  { title: 'مشخصات', dataIndex: 'userProfile', key: 'userProfile' },
  { title: 'توضیحات', dataIndex: 'description', key: 'description' },
  { title: 'وضعیت بازدید', dataIndex: 'seenStatus', key: 'seenStatus' },
  { title: 'عملیات', dataIndex: 'operation', key: 'operation' },
];

const gridTabs = [
  { label: 'همه', value: null },
  { label: 'مشاهده شده', value: true },
  { label: 'مشاهده نشده', value: false },
];

const GridRequests: React.FC = () => {

  // State variables
  const [data, setData] = useState<ViewerData[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [filter, setFilter] = useState({
    seen: null as boolean | null,
    createTime: null as string | null,
  });
  const [radioOptions] = useState(gridTabs);

  // Handle pagination changes
  const handlePaginationChange = (pagination: TablePaginationConfig) => {
    setPagination((prev) => ({ ...prev, ...pagination }));
  };

  // Update filter when view status changes
  const handleViewStatusChange = (value: boolean | null) => {
    setFilter((prev) => ({ ...prev, seen: value }));
  };

  // Update filter when date changes
  const handleDateChange = (date: string) => {
    setFilter((prev) => ({ ...prev, createTime: date }));
  };


  // Fetch data for the table
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await GET('/requests', {
        page: pagination.current,
        pageSize: pagination.pageSize,
        createTime: filter.createTime,
        seen: filter.seen,
      });

      if (response.status === 200 && response.data?.result) {
        const mappedData = response.data.result.map((item: any, index: number) => ({
          key: item.id || index,
          userProfile: (
            <div className="flex flex-col">
              <span>{item.fullName}</span>
              <Link to={`tel:${item.mobileNumber}`}>{item.mobileNumber}</Link>
            </div>
          ),
          description: <ShowTextModal title={item.fullName} description={item.text} />,
          seenStatus: (
            <div className="flex justify-center">
              <SeenRequests requestId={item.id} seenStatus={item.seen} refreshState={fetchData} />
            </div>
          ),
          operation: (
            <div className="flex items-center justify-center">
              <RemoveDataConfirm requestId={item.id} refreshState={fetchData} />
            </div>
          ),
        }));

        setData(mappedData);
        setPagination((prev) => ({
          ...prev,
          current: response.data.currentPage,
          total: response.data.totalItems,
        }));
      } else {
        setData([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter, pagination.current, pagination.pageSize]);

  return (
    <div className="space-y-3 w-full">
      {/* Filters */}
      <div>
        <RadioBtn options={radioOptions} value={filter.seen} onChange={handleViewStatusChange} />
      </div>
      <div>
        <DatePickerUi onChangeValue={handleDateChange} />
      </div>

      {/* Table */}
      <Table<ViewerData>
        columns={columns}
        dataSource={loading ? [] : data}
        loading={loading}
        pagination={pagination}
        onChange={handlePaginationChange}
        rowKey="id"
        scroll={{ x: true }}
        className="w-full"
      />
    </div>
  );
};

export default GridRequests;
