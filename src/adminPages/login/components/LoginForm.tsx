import { Form } from "antd";
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import BtnLoading from "../../../components/commonUI/BtnLoading";
import { InputUi } from "../../../components/commonUI/InputUi";
import Logo from "../../../components/commonUI/Logo";
import { ApiErrorManager } from "../../../services/apiService/apiError/ApiErrorManager";
import { POST } from "../../../services/apiService/AxiosApiService";
import { fetchAccessToken, saveAccessToken } from "../../../services/apiService/JwtService";
import { loginFormData } from "../../../types/formTypes";


const LoginForm: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<loginFormData>({
        mobileNumber: '',
        password: '',
    }
    );

    const showBtnLoading = () => {
        setIsLoading(true);
    }

    const hideBtnLoading = () => {
        setIsLoading(false);
    }

    const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmitFormLogin = async () => {
        try {
            showBtnLoading();
            const res = await POST('/auth/login', formData);
            if (res.status === 200) {
                saveAccessToken(res.data?.token);
                toast.success('خوش آمدید');
                window.location.href = '/app/archive';
            } else {
                hideBtnLoading();
            }
        } catch (error: any) {
            hideBtnLoading();
            ApiErrorManager(error)
        }
    };

    useEffect(() => {
        const token = fetchAccessToken();
        if (token !== undefined) {
            window.location.href = '/app/archive';
        }
    }, [])



    return (
        <div className="pt-2">
            <Logo className="h-16" />
            <Form
                name="login"
                className="bg-white rounded-[2rem] shadow-sm px-2 pt-6 pb-5 space-y-3"
                initialValues={{ remember: true }}
                onFinish={handleSubmitFormLogin}
            >
                <InputUi name={'mobileNumber'}
                    type={'text'}
                    required={true}
                    message={'لطفا نام کاربری خود را وارد کنید.'}
                    placeholder={'نام کاربری را وارد کنید:'}
                    calssName="mb-2"
                    handleValue={handleValue}
                />

                <InputUi name={'password'}
                    type={'password'}
                    required={true}
                    message={'لطفا رمز عبور خود را وارد کنید.'}
                    placeholder={'رمز عبور را وارد کنید:'}
                    calssName="mb-2"
                    handleValue={handleValue}
                />

                <Form.Item className="mb-0">
                    <BtnLoading isLoading={isLoading} htmlType={'submit'} label="ورود" />
                </Form.Item>
            </Form>


            <ToastContainer />
        </div>
    )
}

export default LoginForm;