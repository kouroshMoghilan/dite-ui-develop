// ViewerDataProvider.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { GET } from '../../../services/apiService/AxiosApiService';
import { transformKeyValueToLabelValue } from '../../../services/globals/globalServices';

interface ViewerData {
    key: React.Key;
    id: number;
    fullName: string;
    mobileNumber: string;
    language: string;
}

const ViewerDataProvider: React.FC<{ children: (props: any) => JSX.Element }> = ({ children }) => {
    const [data, setData] = useState<ViewerData[]>([]);
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState({ selection: [], radioButton: [] });
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 1 });
    const [filter, setFilter] = useState({
        search: null,
        language: '',
        role: null,
        exhibitionId: null,
        createTime: null,
    });

    const fetchViewersData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await GET(`/viewers?exhibition-id=${filter.exhibitionId}&role=${filter.role}`, {
                page: pagination.current,
                pageSize: pagination.pageSize,
                search: filter.search,
                language: filter.language,
                createTime: filter.createTime,
            });

            if (response.status === 200) {
                setData(response.data.result.map((item: any) => ({
                    key: item.id,
                    id: item.id,
                    fullName: item.fullName,
                    mobileNumber: item.mobileNumber,
                    language: item?.visits[0]?.language || 'N/A',
                })));
                setPagination((prev) => ({
                    ...prev,
                    current: response.data.currentPage,
                    total: response.data.itemsCount,
                }));
            }
        } catch (error) {
            console.error("Error fetching viewers data:", error);
        } finally {
            setLoading(false);
        }
    }, [filter, pagination]);

    const fetchViewerTypes = async () => {
        try {
            const response = await GET('/viewer-types', {});
            if (response.status === 200) {
                const optionsData = transformKeyValueToLabelValue(response.data);
                setOptions((prev: any) => ({ ...prev, radioButton: optionsData }));
                if (optionsData.length > 0) setFilter((prev) => ({ ...prev, role: optionsData[0].value }));
            }
        } catch (error) {
            console.error('Error fetching viewer types:', error);
        }
    };

    const fetchExhibitionIds = async () => {
        try {
            const response = await GET('/exhibitions-enum', {});
            if (response.status === 200) {
                const optionsData = transformKeyValueToLabelValue(response.data);
                setOptions((prev: any) => ({ ...prev, selection: optionsData }));
                if (optionsData.length > 0) setFilter((prev: any) => ({ ...prev, exhibitionId: Number(optionsData[0].value) }));
            }
        } catch (error) {
            console.error('Error fetching exhibition IDs:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([fetchViewerTypes(), fetchExhibitionIds()]); // ابتدا این دو را اجرا می‌کند
                fetchViewersData(); // پس از موفقیت، این تابع را فراخوانی کنید
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        };
    
        fetchData();
    }, []);
    

    useEffect(() => {
        fetchViewersData();
    }, [filter, pagination]);


    return children({
        data,
        loading,
        options,
        pagination,
        filter,
        setFilter,
        setPagination,
    });
};

export default ViewerDataProvider;