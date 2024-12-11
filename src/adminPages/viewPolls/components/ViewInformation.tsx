import { DislikeOutlined, FrownOutlined, MehOutlined, MinusOutlined, SmileOutlined } from "@ant-design/icons";
import BoxCircleChart from "./BoxCircleChart";
import { useEffect, useState } from "react";
import { Form, Select, Empty } from "antd";
import { GET } from "../../../services/apiService/AxiosApiService";
import { transformKeyValueToLabelValue } from "../../../services/globals/globalServices";
import CommentsBox from "./CommentsBox";

interface ChartData {
    voted: number;
    rating: {
        five: number;
        four: number;
        three: number;
        two: number;
        one: number;
    };
    haveUsed: number;
    attracted: number;
    viewers: number;
    usedPercentage: number;
    attractedPercentage: number;
    votedPercentage: number;
}


// Main component that renders the exhibition information, including charts and comments.
const ViewInformation = () => {
    // State management
    const [options, setOptions] = useState<{ selection: any[] }>({ selection: [] });
    const [filter, setFilter] = useState({ exhibitionId: null as number | null });
    const [chartData, setChartData] = useState<ChartData>();
    const [userComments, setUserComments] = useState<{ exhibitionAnnounce: string[]; reviews: string[] }>({
        exhibitionAnnounce: [],
        reviews: []
    });
    const [noData, setNoData] = useState(true);

    // Handlers
    // Update exhibitionId in filter
    const handleTemplateChange = (value: string) => {
        setFilter((prev) => ({ ...prev, exhibitionId: Number(value) }));
    };

    // Generic data fetcher
    const fetchData = async (url: string, onSuccess: (data: any) => void) => {
        try {
            const response = await GET(url, { exhibitionId: filter.exhibitionId });
            if (response.status === 200) {
                onSuccess(response.data);
            } else {
                setNoData(true);
            }
        } catch {
            setNoData(true);
        }
    };

    // Fetch exhibition options
    const fetchExhibitionIds = async () => {
        await fetchData('/exhibitions-enum', (data) => {
            const optionsData = transformKeyValueToLabelValue(data);
            setOptions({ selection: optionsData });
            if (optionsData.length > 0) {
                setFilter({ exhibitionId: Number(optionsData[0].value) });
            }
        });
    };

    // Fetch chart data
    const fetchChartData = async () => {
        if (filter.exhibitionId !== null) {
            await fetchData(`/polls/${filter.exhibitionId}/statistic`, (data) => {
                if (data) setChartData(data);
            });
        }
    };

    // Fetch user comments
    const fetchUserComments = async () => {
        if (filter.exhibitionId !== null) {
            await fetchData(`/polls/${filter.exhibitionId}`, (data) => {
                if (data) {
                    setUserComments({
                        exhibitionAnnounce: data.result.exhibitionAnnounce,
                        reviews: data.result.reviews,
                    });

                    if (data.result.exhibitionAnnounce === null && data.result.reviews === null) {
                        setNoData(true);
                    } else {
                        setNoData(false);
                    }
                }
            });
        }
    };

    useEffect(() => {
        fetchExhibitionIds();
    }, []);

    useEffect(() => {
        if (filter.exhibitionId !== null) {
            fetchChartData();
            fetchUserComments();
        }
    }, [filter.exhibitionId]);

    return (
        <div className="space-y-8">
            <div className="p-4">
                <Form.Item>
                    <Select
                        showSearch
                        placeholder="نمایشگاه را انتخاب کنید"
                        value={filter.exhibitionId?.toString()}
                        filterOption={(input, option) => (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())}
                        options={options.selection}
                        onChange={handleTemplateChange}
                        className="w-full"
                    />
                </Form.Item>
            </div>

            {
                noData ? (
                    <div className="flex justify-center items-center">
                        <Empty description="داده‌ای موجود نیست" />
                    </div>
                ) : (
                    <>
                        {chartData?.viewers && chartData?.voted ?
                            <BoxCircleChart title="تعداد شرکت کنند‌گان" text="نفر شرکت کرده‌اند" total={chartData?.viewers} attendees={chartData?.voted} />
                            : null
                        }

                        <div className="flex items-center justify-center flex-wrap gap-2">
                            <div className="text-center space-y-3">
                                <div className="p-4 bg-gray-200 rounded-[1.2rem]">
                                    <DislikeOutlined className='text-main-color text-4xl' />
                                </div>
                                <p>{chartData?.rating.one}</p>
                            </div>

                            <div className="text-center space-y-3">
                                <div className="p-4 bg-gray-200 rounded-[1.2rem]">
                                    <FrownOutlined className='text-main-color text-4xl' />
                                </div>
                                <p>{chartData?.rating.two}</p>
                            </div>

                            <div className="text-center space-y-3">
                                <div className="p-4 bg-gray-200 rounded-[1.2rem]">
                                    <MinusOutlined className='text-main-color text-4xl' />
                                </div>
                                <p>{chartData?.rating.three}</p>
                            </div>

                            <div className="text-center space-y-3">
                                <div className="p-4 bg-gray-200 rounded-[1.2rem]">
                                    <MehOutlined className='text-main-color text-4xl' />
                                </div>
                                <p>{chartData?.rating.four}</p>
                            </div>

                            <div className="text-center space-y-3">
                                <div className="p-4 bg-gray-200 rounded-[1.2rem]">
                                    <SmileOutlined className='text-main-color text-4xl' />
                                </div>
                                <p>{chartData?.rating.five}</p>
                            </div>
                        </div>

                        {chartData?.voted && chartData?.haveUsed ?
                            <BoxCircleChart title="آیا قبلا از محصولات ما استفاده کرده‌اید؟" text="نفر از محصولات ما استفاده کرده‌اند" total={chartData?.voted} attendees={chartData?.haveUsed} />
                            : null
                        }
                        {
                            chartData?.voted && chartData?.attracted ?
                                <BoxCircleChart title="طراحی غرفه از نظر کاربران" text="نفر غرفه ما را جذاب دانستند" total={chartData?.voted} attendees={chartData?.attracted} />
                                : null
                        }

                        {
                            userComments.exhibitionAnnounce &&
                            <CommentsBox title="افراد چگونه از نمایشگاه مطلع شدند؟" data={userComments.exhibitionAnnounce} />
                        }
                        {
                            userComments.reviews &&
                            <CommentsBox title="انتقاد افراد از ما:" data={userComments.reviews} />
                        }
                    </>
                )}
        </div>
    );
};

export default ViewInformation;
