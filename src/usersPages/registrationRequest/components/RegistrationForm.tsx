import { Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import BtnLoading from "../../../components/commonUI/BtnLoading";
import { clientNotToken } from "../../../services/apiService/axiosClient";

const RegistrationForm = () => {
    const location = useLocation();
    const formRef = useRef<any>(null);
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [formData, setFormData] = useState({
        companyId: 0,
        fullName: '',
        mobileNumber: '',
        text: ''
    });

    // get companyId
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const companyId = queryParams.get('companyId');
        setFormData((prevData) => ({
            ...prevData,
            companyId: companyId ? parseInt(companyId, 10) : 0
        }));

    }, [location.search]);

    // handle show and hide
    const handleShowBtnLoading = () => {
        setIsLoadingBtn(true);
    };
    const handleHideBtnLoading = () => {
        setIsLoadingBtn(false);
    };

    const resetForms = () => {
        formRef.current?.resetFields(); // Reset
        setFormData({
            companyId: formData.companyId,
            fullName: '',
            mobileNumber: '',
            text: ''
        });
    };

    // handle submit
    const handleSubmitForm = async () => {
        try {
            handleShowBtnLoading();
            const res = await clientNotToken.post('/requests', formData);
            if (res.status === 201) {
                resetForms();
                handleHideBtnLoading();
                toast.success(`
                    بازدید کننده گرامی درخواست شما با موفقیت ارسال شد،
                    به زودی کارشناسان ما با شما تماس می‌گیرند.
                `);
            } else {
                handleHideBtnLoading();
                message.error('با مشکل مواجه شدید لطفا مجددا تلاش کنید!');
            }
        } catch (error:any) {
            handleHideBtnLoading();
            message.error(error.response?.data?.message || 'خطای نامشخص');
            resetForms();
        }
    };

    const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNumberValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (/^\d*$/.test(value) && value.length <= 11) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value.toString(),
            }));
        }
    };

    return (
        <>
            <Form
                ref={formRef}
                name="registrationForm"
                className="space-y-2"
                onFinish={handleSubmitForm}
            >
                <Form.Item
                    name="fullName"
                    rules={[{ required: true, message: 'نام بازدید کننده اجباری است.' }]}
                >
                    <Input
                        name="fullName"
                        value={formData.fullName}
                        onInput={(e: any) => handleValue(e)}
                        className="bg-input border-0 !text-black !text-[13px] py-3"
                        type="text"
                        placeholder="نام بازدید کننده را وارد کنید"
                    />
                </Form.Item>

                <Form.Item
                    name="mobileNumber"
                    rules={[
                        { required: true, message: 'شماره همراه اجباری است.' },
                        { pattern: /^\d{11}$/, message: 'شماره همراه باید ۱۱ رقم باشد.' },
                    ]}
                >
                    <Input
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onInput={(e: any) => handleNumberValue(e)}
                        className="bg-input border-0 !text-black !text-[13px] w-full"
                        maxLength={11}
                        pattern="\d*"
                        type="text"
                        placeholder="شماره همراه بازدید کننده را وارد کنید"
                    />
                </Form.Item>

                <Form.Item
                    name="text"
                    rules={[{ required: true, message: 'درخواست خود را وارد کنید' }]}
                >
                    <TextArea
                        name='text'
                        onInput={(e: any) => handleValue(e)}
                        placeholder="درخواست خود را وارد کنید"
                    />
                </Form.Item>

                <Form.Item>
                    <BtnLoading
                        label="ارسال پیام"
                        htmlType="submit"
                        isLoading={isLoadingBtn}
                    />
                </Form.Item>
            </Form>
        </>
    );
}

export default RegistrationForm;
