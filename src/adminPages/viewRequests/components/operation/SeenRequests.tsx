import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Spin, message } from "antd";
import { useState } from "react";
import { PUT } from "../../../../services/apiService/AxiosApiService";

interface IdPropsTypes {
    requestId: number;
    seenStatus: boolean;
    refreshState: () => void;
}

const SeenRequests = ({ requestId, seenStatus, refreshState }: IdPropsTypes) => {
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);

    const toggleSeenStatus = async (id: number) => {
        setIsLoadingBtn(true);
        try {
            await PUT(`/requests/${id}`, { seen: !seenStatus });
            message.success("وضعیت با موفقیت به‌روزرسانی شد.");
            refreshState(); // به‌روزرسانی لیست
        } catch (error) {
            message.error("به‌روزرسانی وضعیت با خطا مواجه شد.");
        } finally {
            setIsLoadingBtn(false);
        }
    };

    return (
        <div className="cursor-pointer flex" onClick={() => toggleSeenStatus(requestId)}>
            {
                !isLoadingBtn ? (
                    seenStatus ? <EyeOutlined /> : <EyeInvisibleOutlined />
                ) : (
                    <Spin />
                )
            }
        </div>
    );
};

export default SeenRequests;
