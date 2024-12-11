import { Flex, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import { toast } from "react-toastify";
import BtnLoading from "../../../components/commonUI/BtnLoading";
import { ApiErrorManager } from "../../../services/apiService/apiError/ApiErrorManager";
import { POST } from "../../../services/apiService/AxiosApiService";
import { saveAccessToken } from "../../../services/apiService/JwtService";
import { loginFormData } from "../../../types/formTypes";

const SendMessageForm: React.FC = () => {
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
                ApiErrorManager(res);
                hideBtnLoading();
            }
        } catch (error) {
            hideBtnLoading();
        }
    };



    return (
        <div className="w-3/4">
            <Form
                name="sendMesseage"
                className="bg-white rounded-[1.5rem] shadow-sm px-2 pt-6 pb-5 space-y-2"
                initialValues={{ remember: true }}
                onFinish={handleSubmitFormLogin}
            >
                <Flex gap={'small'}>
                    <Form.Item
                        name={''}
                        rules={[{ required: true, message: '' }]}
                        className='w-full'
                    >
                        <Select
                            showSearch
                            placeholder="انتخاب کنید ..."
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={[
                                { value: '1', label: 'Jack' },
                                { value: '2', label: 'Lucy' },
                                { value: '3', label: 'Tom' },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        name={''}
                        rules={[{ required: true, message: '' }]}
                            className='w-full'
                    >
                        <Select
                            showSearch
                            placeholder="انتخاب کنید ..."
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={[
                                { value: '1', label: 'Jack' },
                                { value: '2', label: 'Lucy' },
                                { value: '3', label: 'Tom' },
                            ]}
                        />
                    </Form.Item>
                </Flex>

                <Form.Item
                        name={''}
                        rules={[{ required: true, message: '' }]}
                            className='w-full'
                    >
                        <Select
                            showSearch
                            placeholder="انتخاب کنید ..."
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={[
                                { value: '1', label: 'Jack' },
                                { value: '2', label: 'Lucy' },
                                { value: '3', label: 'Tom' },
                            ]}
                        />
                    </Form.Item>

                <Form.Item
                    name={''}
                    rules={[{ required: true, message: 'لطفا نام نمایشگاه را وارد کنید' }]}
                >
                    <Input
                        type={'text'}
                        // value={formData.title}
                        name={'title'}
                        placeholder={'نام نمایشگاه را وارد کنید:'}
                        onChange={handleValue} // Use onChange instead of onInput
                    />
                </Form.Item>

                <Form.Item
                        name={''}
                        rules={[{ required: true, message: '' }]}
                            className='w-full'
                    >
                        <Select
                            showSearch
                            placeholder="انتخاب کنید ..."
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={[
                                { value: '1', label: 'Jack' },
                                { value: '2', label: 'Lucy' },
                                { value: '3', label: 'Tom' },
                            ]}
                        />
                    </Form.Item>

                <Form.Item>
                    <BtnLoading isLoading={isLoading} htmlType={'submit'} label="ورود" />
                </Form.Item>
            </Form>

            {/* <ToastContainer /> */}
        </div>
    )
}

export default SendMessageForm;