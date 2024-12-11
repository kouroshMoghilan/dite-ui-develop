import { useEffect, useState } from "react";
import EmptyResult from "../../../components/commonUI/EmptyResult";
import { GET } from "../../../services/apiService/AxiosApiService";
import { SingleSmsTypes } from "../../../types/formTypes";
import Message from "./Message";
import MessageModal from "./MessageModal";

const MessageViewer = () => {
    const [smsData, setSmsData] = useState<any>([]);
    const [singleSms, setSingleSms] = useState<SingleSmsTypes>({
        id: 0,
        companyId: '',
        title: '',
        message: {
            default: ''
        }
    });
    const [refresh, setRefresh] = useState<Boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const refreshState = () => {
        setRefresh(!refresh);
    }

    // fechData
    const fetchData = async () => {
        try {
            const res = await GET('/sms/templates', {});
            if (res.status === 200) {
                setSmsData(res.data?.result);
                setSingleSms((prev) => ({
                    ...prev,
                    companyId: res.data?.companyId
                }))
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [refresh]);

    return (
        <>
            <div className="w-full border-b-2 px-1 py-6 space-y-3 overflow-y-auto max-h-[360px]">

                {
                    smsData ?
                        smsData.map((item: any) => {
                            return <Message
                                setSingleSms={setSingleSms}
                                setIsEdit={setIsEdit}
                                title={item?.title}
                                messageId={item?.id}
                                refreshState={refreshState}
                                key={item?.id} />
                        })
                        : <EmptyResult />
                }
            </div>
            <MessageModal
                refreshMessage={refreshState}
                isEdit={isEdit}
                singleSms={singleSms}
                setIsEdit={setIsEdit}
            />
        </>
    )
}

export default MessageViewer;