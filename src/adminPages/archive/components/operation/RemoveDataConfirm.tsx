import { DeleteTwoTone } from "@ant-design/icons";
import { Modal, Spin, message } from "antd";
import { useState } from "react";
import { DELETE } from "../../../../services/apiService/AxiosApiService";

interface IdPropsTypes {
    viewerId: number;
    exhibitionId: number;
    refreshState: () => void;
}
const RemoveDataConfirm = ({ viewerId, exhibitionId, refreshState }: IdPropsTypes) => {
    const [isLoadingBtn, setIsLoadingBtn] = useState<Boolean>(false);

    const showLoadingBtn = () => { setIsLoadingBtn(true) }
    const hideLoadingBtn = () => { setIsLoadingBtn(false) }

    // handle remove row
    const handleRemoveId = async (viewerId:number, exhibitionId:number) => {
        Modal.confirm({
            title: 'آیا مطمئن هستید که می‌خواهید این آیتم را حذف کنید؟',
            content: 'با حذف این آیتم، امکان بازیابی وجود نخواهد داشت.',
            okText: 'حذف',
            cancelText: 'انصراف',
            onOk: async () => {
                try {
                    showLoadingBtn();
                    const res = await DELETE(`/viewers/visit/${viewerId}/${exhibitionId}`);
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
            <div className="cursor-pointer flex" onClick={() => handleRemoveId(viewerId, exhibitionId)}>
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