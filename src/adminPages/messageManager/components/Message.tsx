import { CloseCircleOutlined, MessageOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import { useState } from "react";
import { DELETE, GET } from "../../../services/apiService/AxiosApiService";
import { MessagePropsType } from "../../../types/funcProps";
import { Modal, message } from 'antd';

const Message = ({ title, setIsEdit, messageId,setSingleSms,refreshState }: MessagePropsType) => {
    const [isLoadingBtn,setIsLoadingBtn]=useState<Boolean>(false);

    const showLoadingBtn=()=> {setIsLoadingBtn(true)}
    const hideLoadingBtn=()=> {setIsLoadingBtn(false)}


    const handleRemoveId = async (id: number) => {
      Modal.confirm({
        title: 'آیا مطمئن هستید که می‌خواهید این آیتم را حذف کنید؟',
        content: 'با حذف این آیتم، امکان بازیابی وجود نخواهد داشت.',
        okText: 'حذف',
        cancelText: 'انصراف',
        onOk: async () => {
          try {
            showLoadingBtn();
            const res = await DELETE(`/sms/templates/${id}`);
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
    

    const handleEdit = async (id: number) => {
        try {
            const res = await GET(`/sms/templates/${id}`, {});
            if (res.status === 200) {
                setIsEdit(true); // set edit mode
                setSingleSms({
                    id:res.data?.id,
                    companyId:res.data?.companyId,
                    title: res.data?.title,
                    message: { default: res.data?.message?.default },
                });
            }
        } catch (error) {
            // handle error
        }
    };
    

    return (
        <div className="flex items-center justify-between space-x-3 bg-input rounded-[2rem] p-4 w-full" key={messageId}>
            <div className="me-2"><MessageOutlined /></div>
            <h5 className="text-[14px] line-clamp-2 w-2/3">{title}</h5>
            {/* <p className="text-[12px] line-clamp-1">{description}</p> */}
            <Button type="link" onClick={()=>handleEdit(messageId)} className="text-main-color">مشاهده</Button>
            <div className="cursor-pointer" onClick={()=>handleRemoveId(messageId)}>
                {
                    !isLoadingBtn?
                    <CloseCircleOutlined />
                    :
                    <Spin />
                }
            </div>
        </div>
    )
}

export default Message;