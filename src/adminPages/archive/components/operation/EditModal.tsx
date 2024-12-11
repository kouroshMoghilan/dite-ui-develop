import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Form, Modal } from "antd";
import { useState } from "react";




// interface sendMesseageTypes {
//     message: string,
//     templateId: number | null,
//     usingTemplate: boolean,
//     viewers: number[];
// }


const EditModal = () => {
    // const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    // const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
    // const [formData, setFormData] = useState<sendMesseageTypes>({
    //     message: '',
    //     templateId: null,
    //     usingTemplate: false,
    //     viewers: [0]
    // });
    const [form] = Form.useForm();


    // handle show and hide
    // const handleShowBtnLoading = () => {
    //     setIsLoadingBtn(true);
    // };
    // const handleHideBtnLoading = () => {
    //     setIsLoadingBtn(false);
    // };

    const handleShowModal = (isEdit: Boolean) => {
        setIsOpenModal(true);
        if (isEdit) {
            setIsLoading(true);
        }
    };

    const handleHideModal = () => {
        setIsOpenModal(false);
        form.resetFields();
    };


    return (
        <>
            <Button className="flex" type="link" onClick={() => handleShowModal(false)}>
                <PlusCircleOutlined />
            </Button>
            <Modal
                title={'ادیت'}
                footer={''}
                // <BtnLoading isLoading={isLoadingBtn}
                //     // onClick={handleSubmitForm} 
                //     label={"ارسال پیام"} />
                loading={isLoading}
                open={isOpenModal}
                onCancel={handleHideModal}
            >
                {/* <VisitorForm 
               formData={}
               formRef={}
               handleNumberValue={}
               handleValue={}
               isLoadingBtn
               onChangeSelection={}
               onChangeUnnecessaryData={}
               onChangeUnnecessaryDataSelection={}
               onFinish={}
               options={}
               /> */}
                {/* <TabBars /> */}
            </Modal>
        </>
    );
}

export default EditModal;