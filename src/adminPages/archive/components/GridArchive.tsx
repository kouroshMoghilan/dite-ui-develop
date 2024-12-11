import { Table, Select, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { DatePickerUi } from '../../../components/commonUI/DatePickerUi';
import RadioBtn from '../../../components/commonUI/RadioBtn';
import { transformKeyValueToLabelValue } from '../../../services/globals/globalServices';
import { GET } from '../../../services/apiService/AxiosApiService';
import RemoveDataConfirm from './operation/RemoveDataConfirm';
import SendMessageModal from './operation/SendMessageModal';

interface ViewerData {
  key: number;
  id: number;
  fullName: string;
  mobileNumber: string;
  language: string;
  operation: React.ReactNode;
}

interface Options {
  selection: { label: string; value: string }[];
  radioButton: { label: string; value: string }[];
}

const columns = [
  { title: 'ردیف', dataIndex: 'key', key: 'key' },
  { title: 'نام و نام خانوادگی', dataIndex: 'fullName', key: 'fullName' },
  { title: 'شماره موبایل', dataIndex: 'mobileNumber', key: 'mobileNumber' },
  { title: 'زبان', dataIndex: 'language', key: 'language' },
  { title: 'عملیات', dataIndex: 'operation', key: 'operation' },
];

const GridArchive: React.FC = () => {
  const [data, setData] = useState<ViewerData[]>([]);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<Options>({ selection: [], radioButton: [] });
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 2 });
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [filter, setFilter] = useState({
    search: null as string | null,
    role: null as string | null,
    exhibitionId: null as number | null,
    createTime: null as string | null,
  });

  
  const handleRefresh = () => setRefresh(prev => !prev);

  // Function for Fetching Data
  const fetchViewersData = async () => {
    setLoading(true);
    try {
      const response = await GET(`/viewers?exhibition-id=${filter.exhibitionId}&role=${filter.role}`, {
        page: pagination.current,
        pageSize: pagination.pageSize,
        search: filter.search,
        createTime: filter.createTime,
      });

      if (response.status === 200 && response.data?.result !== null) {
        const mappedData = response.data.result.map((item: any, index: number) => ({
          key: index + 1,
          id: item.viewerId,
          fullName: item.fullName,
          mobileNumber: item.mobileNumber,
          language: item?.language || 'N/A',
          operation: (
            <div className="flex items-center justify-between">
              <RemoveDataConfirm
                exhibitionId={item.exhibitionId}
                viewerId={item.viewerId}
                refreshState={handleRefresh}
              />
            </div>
          ),
        }));
        setData(mappedData);
      } else {
        setData([]);
      }

      // update pagination
      setPagination({
        current: response.data.currentPage,
        pageSize: response.data.itemsCount,
        total: response.data.itemsCount,
      });
    } catch (error) {
      console.error("Error fetching viewers data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Loading Initial Data (Viewer Types and Exhibitions)
  const fetchViewerTypes = async () => {
    try {
      const response = await GET('/viewer-types', {});
      if (response.status === 200) {
        const optionsData = transformKeyValueToLabelValue(response.data);
        setOptions(prev => ({ ...prev, radioButton: optionsData }));

        if (optionsData.length > 0) {
          setFilter(prev => ({ ...prev, role: optionsData[0].value }));
        }
      }
    } catch (error) {
      console.error('Error fetching viewer types:', error);
    }
  };

  // Fetching the List of Exhibitions
  const fetchExhibitionIds = async () => {
    try {
      const response = await GET('/exhibitions-enum', {});
      if (response.status === 200) {
        const optionsData = transformKeyValueToLabelValue(response.data);
        setOptions(prev => ({ ...prev, selection: optionsData }));

        if (optionsData.length > 0) {
          setFilter(prev => ({ ...prev, exhibitionId: Number(optionsData[0].value) }));
        }
      }
    } catch (error) {
      console.error('Error fetching exhibition IDs:', error);
    }
  };

  useEffect(() => {
    fetchViewerTypes();
    fetchExhibitionIds();
  }, []);

  useEffect(() => {
    if (filter.exhibitionId !== null && filter.role !== null) {
      fetchViewersData();
    }
  }, [filter, refresh]);

  // pagination
  const handleTableChange = (pagination: any) => {
    setPagination(prev => ({ ...prev, ...pagination }));
  };

  // Event Handlers
  const handleRoleChange = (value: string) => {
    setFilter(prev => ({ ...prev, role: value }));
  };

  const handleExhibitionChange = (value: string) => {
    setFilter(prev => ({ ...prev, exhibitionId: Number(value) }));
  };

  const handleDateChange = (data: string) => {
    setFilter(prev => ({ ...prev, createTime: data }));
  };

  // Selecting Table Rows
  const rowSelection = {
    selectedRowKeys: selectedUserIds,
    onChange: (_: React.Key[], selectedRows: ViewerData[]) => {
      const viewerIds = selectedRows.map(item => item.id);
      setSelectedUserIds(viewerIds);
    },
  };

  return (
    <div className="space-y-3 w-full">
      <RadioBtn options={options.radioButton} value={filter.role} onChange={handleRoleChange} />
      <Form.Item>
        <Select
          showSearch
          placeholder="نمایشگاه را انتخاب کنید"
          value={filter.exhibitionId?.toString()}
          filterOption={(input, option) =>
            (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
          }
          options={options.selection}
          onChange={handleExhibitionChange}
          className="w-full"
        />
      </Form.Item>
      <DatePickerUi onChangeValue={handleDateChange} />
      {selectedUserIds.length > 0 && <SendMessageModal usersId={selectedUserIds} />}
      <Table<ViewerData>
        columns={columns}
        dataSource={loading ? [] : data}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
        rowKey="id"
        rowSelection={rowSelection}
        scroll={{ x: true }}
        className="w-full"
      />
    </div>
  );
};

export default GridArchive;
