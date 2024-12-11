import { Empty, Progress } from "antd";
import { useEffect, useState } from "react";
import { GET } from "../../../services/apiService/AxiosApiService";
import { DatePickerUi } from "../../../components/commonUI/DatePickerUi";
import { FilterDataAnalysis } from "../../../types/funcProps";

export const LanguageAnalysis = ({
    filter,
    setFilter,
}: {
    filter: FilterDataAnalysis;
    setFilter: React.Dispatch<React.SetStateAction<FilterDataAnalysis>>;
}) => {

    const [languages, setLanguages] = useState([
        { lang: 'پارسی', statistics: 0, key: 'persian' },
        { lang: 'انگلیسی', statistics: 0, key: 'english' },
        { lang: 'عربی', statistics: 0, key: 'arabic' },
    ]);

    // Update filter when date changes
    const handleDateChange = (date: string) => {
        setFilter((prev) => ({ ...prev, createTime: date }));
    };

    // Fetching Statistics by Languages
    const fetchLanguageData = async () => {
        try {
            const res = await GET(`/viewers/visitors-by-language/${filter.exhibitionId}`, {
                date: filter.createTime
            });
    
            if (res.status === 200) {
                const languageStats = res.data;
    
                setLanguages((prev) => prev.map(lang => ({
                    ...lang,
                    statistics: languageStats[lang.key] || lang.statistics,
                })));
            }
        } catch (error) {
            console.error("Error fetching language data:", error);
        }
    };
    

    useEffect(() => {
        if (filter.createTime !== null && filter.exhibitionId !== null) {
            fetchLanguageData();
        }
    }, [filter.createTime, filter.exhibitionId]);

    return (
        <div className="space-y-4">
            <div className="flex justify-between flex-wrap gap-3 p-2">
                <div className="space-y-2">
                    <h2 className="text-md">از نظر زبان</h2>
                    <p className="text-sm text-gray-400">آمار محاسبه شده: </p>
                </div>

                <div>
                    <DatePickerUi onChangeValue={handleDateChange} />
                </div>
            </div>
            {
                filter.createTime != null ? (
                    languages.map((item, index) => {
                        return (
                            <div className="flex items-center gap-2" key={index} dir="ltr">
                                <span>{item.lang}</span>
                                <Progress percent={item.statistics} status="normal" />
                            </div>
                        )
                    })
                ) : (
                    <div className="flex justify-center items-center p-4">
                        <Empty description="لطفا تاریخ نمایشگاه را انتخاب کنید." />
                    </div>
                )
            }
        </div>
    )
}