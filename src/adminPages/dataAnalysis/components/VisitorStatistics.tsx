import { Empty, Form, Select } from "antd";
import { useEffect, useState } from "react";
import { GET } from "../../../services/apiService/AxiosApiService";
import { transformKeyValueToLabelValue } from "../../../services/globals/globalServices";
import { Chart } from "../../../components/commonUI/Chart";
import { convertToJalali } from "../../../services/globals/dateConverter";
import { FilterDataAnalysis } from "../../../types/funcProps";


export const VisitorStatistics = ({
    filter,
    setFilter,
}: {
    filter: FilterDataAnalysis;
    setFilter: React.Dispatch<React.SetStateAction<FilterDataAnalysis>>;
}) => {
    const [options, setOptions] = useState<{ selection: any[]; }>({ selection: [] });
    const [chartData, setChartData] = useState([]);

    // Updates the exhibition ID based on user selection from the dropdown.
    const handleTemplateChange = (value: string) => {
        setFilter((prev) => ({ ...prev, exhibitionId: Number(value) }));
    };

    // Fetch data for exhibitions
    const fetchExhibitionIds = async () => {
        try {
            const res = await GET('/exhibitions-enum', {});
            if (res.status === 200) {
                const optionsData = transformKeyValueToLabelValue(res.data);
                setOptions((prev) => ({ ...prev, selection: optionsData }));
                if (optionsData.length > 0) {
                    setFilter((prev) => ({ ...prev, exhibitionId: Number(optionsData[0].value) }));
                }
            }
        } catch (error) {
            console.error("Error fetching exhibitions:", error);
        }
    };

    // Fetch data for the chart
    const fetchChartData = async () => {
        if (filter?.exhibitionId) {
            try {
                const res = await GET(`/viewers/visitors-by-day/${filter?.exhibitionId}`, {});
                if (res.status === 200 && res.data !== null) {
                    const data = res.data;
                    const transformChartData = data.map((item: { date: string, count: number }) => {
                        return {
                            date: convertToJalali(item?.date),
                            count: item?.count
                        }
                    })
                    setChartData(transformChartData);
                } else {
                    setChartData([]);
                }
            } catch (error) {
                console.error("Error fetching chart data:", error);
            }
        }
    };

    useEffect(() => {
        fetchExhibitionIds();
    }, []);

    useEffect(() => {
        if (filter.exhibitionId != null) {
            fetchChartData();
        }
    }, [filter.exhibitionId]);

    return (
        <>
            <div className="flex justify-between flex-wrap gap-3 p-2">
                <div className="space-y-2">
                    <h2 className="text-md">آمار بازدیدکنندگان</h2>
                    <p className="text-sm text-gray-400">نرخ تعامل در این نمایشگاه:</p>
                </div>

                <div>
                    <Form.Item>
                        <Select
                            showSearch
                            placeholder="نمایشگاه را انتخاب کنید"
                            value={filter.exhibitionId?.toString()}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
                            }
                            options={options.selection}
                            onChange={handleTemplateChange}
                            className="!w-44"
                        />
                    </Form.Item>
                </div>
            </div>

            {/* Check if chartData is empty */}
            {chartData.length > 0 ? (
                <Chart data={chartData} />
            ) : (
                <div className="flex justify-center items-center p-4">
                    <Empty description="داده‌ای موجود نیست" />
                </div>
            )}
        </>
    );
};
