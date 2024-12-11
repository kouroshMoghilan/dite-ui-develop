import { DeleteTwoTone } from "@ant-design/icons";
import { Modal, Spin, message } from "antd";
import { useState } from "react";
import { DELETE } from "../../../../services/apiService/AxiosApiService";

interface IdPropsTypes {
    requestId: number;
    refreshState: () => void;
}
const RemoveDataConfirm = ({ requestId, refreshState }: IdPropsTypes) => {
    const [isLoadingBtn, setIsLoadingBtn] = useState<Boolean>(false);

    const showLoadingBtn = () => { setIsLoadingBtn(true) }
    const hideLoadingBtn = () => { setIsLoadingBtn(false) }

    // handle remove row
    const handleRemoveId = async (requestId:number) => {
        Modal.confirm({
            title: 'آیا مطمئن هستید که می‌خواهید این آیتم را حذف کنید؟',
            content: 'با حذف این آیتم، امکان بازیابی وجود نخواهد داشت.',
            okText: 'حذف',
            cancelText: 'انصراف',
            centered:true,
            onOk: async () => {
                try {
                    showLoadingBtn();
                    const res = await DELETE(`/requests/${requestId}`);
                    if (res.status === 204) {
                        refreshState();
                        message.success('حذف با موفقیت انجام شد.');
                    }
                } catch (error) {
                    message.error('حذف با مشکل مواجه شد.');
                } finally {
                    hideLoadingBtn();
                }
            },
        });
    };



    return (
        <>
            <div className="cursor-pointer flex" onClick={() => handleRemoveId(requestId)}>
                {
                    !isLoadingBtn ?
                        <DeleteTwoTone />
                        :
                        <Spin />
                }
            </div>
        </>
    )
}

export default RemoveDataConfirm;