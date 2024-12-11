import React, { useEffect, useRef, useState } from 'react';
import { Steps, Form, Input, Button, Radio, message, Divider, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { DislikeOutlined, FrownOutlined, MehOutlined, MinusOutlined, SmileOutlined } from '@ant-design/icons';
import { clientNotToken } from '../../../services/apiService/axiosClient';

const { Step } = Steps;

const MultiStepForm: React.FC = () => {
    const formRef = useRef<any>(null);
    const [current, setCurrent] = useState(0);
    const [formData, setFormData] = useState({
        exhibitionAnnounce: '',
        usedOurProduct: null,
        attractiveExhibition: null,
        exhibitionId: 0,
        review: '',
        rating: null
    });

    // ** Effect Hook to extract exhibitionId from URL query params **
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const exhibitionId = queryParams.get('exhibitionId');
        setFormData((prevData) => ({
            ...prevData,
            exhibitionId: exhibitionId ? parseInt(exhibitionId, 10) : 0
        }));
    }, [location.search]);

    // ** Handle form field changes and update formData **
    const handleInputChange = (field: string, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    // ** Reset form and set initial state **
    const resetForms = () => {
        formRef.current?.resetFields();
        setFormData({
            exhibitionAnnounce: '',
            usedOurProduct: null,
            attractiveExhibition: null,
            exhibitionId: 0,
            review: '',
            rating: null
        });
        setCurrent(0);
    };

    // ** Navigate to the next step **
    const next = () => {
        setCurrent(current + 1);
    };

    // ** Navigate to the previous step **
    const prev = () => setCurrent(current - 1);

    // ** Handle form submission, validation and API call **
    const handleSubmit = async () => {
        try {
            if (formData.rating === null) {
                // Validate all fields before submission
                await formRef.current?.validateFields();
            }

            // Submit form data via API if validation succeeds
            const res = await clientNotToken.post('/polls', formData);
            if (res.status === 201) {
                message.success('اطلاعات با موفقیت ثبت شد!');
                resetForms();
            } else {
                message.error('با مشکل مواجه شدید لطفا مجددا تلاش کنید!');
            }
        } catch (error: any) {
            // Handle validation failure or error responses
            if (error?.errorFields) {
                message.error('لطفا همه فیلدها را پر کنید');
            } else {
                message.error(error.response?.data?.message || 'خطای نامشخص');
                resetForms();
            }
        }
    };

    // ** Step definitions for the multi-step form **
    const steps = [
        {
            title: '1',
            content: (
                <Form.Item
                    label="چگونه از نمایشگاه مطلع شدید؟"
                    name="exhibitionAnnounce"
                    rules={[{ required: true, message: 'این فیلد الزامی است' }]}
                >
                    <Input
                        value={formData.exhibitionAnnounce}
                        onChange={(e) => handleInputChange('exhibitionAnnounce', e.target.value)}
                    />
                </Form.Item>
            )
        },
        {
            title: '2',
            content: (
                <Form.Item
                    label="آیا قبلا از محصولات ما استفاده کرده‌اید؟"
                    name="usedOurProduct"
                    rules={[{ required: true, message: 'این فیلد الزامی است' }]}
                >
                    <Radio.Group
                        value={formData.usedOurProduct}
                        onChange={(e) => handleInputChange('usedOurProduct', e.target.value)}
                    >
                        <Radio value={true}>بله</Radio>
                        <Radio value={false}>خیر</Radio>
                    </Radio.Group>
                </Form.Item>
            )
        },
        {
            title: '3',
            content: (
                <Form.Item
                    label="آیا طراحی غرفه ما را جذاب می‌دانید؟"
                    name="attractiveExhibition"
                    rules={[{ required: true, message: 'این فیلد الزامی است' }]}
                >
                    <Radio.Group
                        value={formData.attractiveExhibition}
                        onChange={(e) => handleInputChange('attractiveExhibition', e.target.value)}
                    >
                        <Radio value={true}>بله</Radio>
                        <Radio value={false}>خیر</Radio>
                    </Radio.Group>
                </Form.Item>
            )
        },
        {
            title: '4',
            content: (
                <Form.Item
                    name={'review'}
                    label="انتقاد، پیشنهادی :)"
                    rules={[{ required: true, message: 'این فیلد الزامی است' }]}
                >
                    <TextArea
                        name='review'
                        value={formData.review}
                        onChange={(e) => handleInputChange('review', e.target.value)}
                    />
                </Form.Item>
            )
        },
        {
            title: '5',
            content: (
                <Form.Item
                    label="چقدر از تجربه خود راضی هستید؟"
                    name="rating"
                    rules={[{ required: true, message: 'لطفا نمره خود را انتخاب کنید' }]}
                >
                    <Space size="middle" className='flex justify-center pt-4'>
                        <DislikeOutlined
                            className='p-2 w-8 h-8 bg-input rounded-md'
                            style={{ fontSize: 30, color: formData.rating === 1 ? 'red' : 'gray' }}
                            onClick={() => handleInputChange('rating', 1)}
                        />
                        <FrownOutlined
                            className='p-2 w-8 h-8 bg-input rounded-md'
                            style={{ fontSize: 30, color: formData.rating === 2 ? 'orange' : 'gray' }}
                            onClick={() => handleInputChange('rating', 2)}
                        />
                        <MinusOutlined
                            className='p-2 w-8 h-8 bg-input rounded-md'
                            style={{ fontSize: 30, color: formData.rating === 3 ? 'yellow' : 'gray' }}
                            onClick={() => handleInputChange('rating', 3)}
                        />
                        <MehOutlined
                            className='p-2 w-8 h-8 bg-input rounded-md'
                            style={{ fontSize: 30, color: formData.rating === 4 ? 'lightgreen' : 'gray' }}
                            onClick={() => handleInputChange('rating', 4)}
                        />
                        <SmileOutlined
                            className='p-2 w-8 h-8 bg-input rounded-md'
                            style={{ fontSize: 30, color: formData.rating === 5 ? 'green' : 'gray' }}
                            onClick={() => handleInputChange('rating', 5)}
                        />
                    </Space>
                </Form.Item>
            )
        }
    ];

    return (
        <div>
            <Steps
                className='!flex-row justify-center'
                current={current}
                onChange={setCurrent}
                direction="horizontal"
            >
                {steps.map((item,index) => (
                    <Step key={index} subTitle={item.title} />
                ))}
            </Steps>
            <Divider className='my-5'/>

            <Form
                layout="vertical"
                ref={formRef}
                onFinish={next}  // Move to next step if form is valid
                onFinishFailed={() => message.error('لطفا تمام فیلدها را پر کنید.')}  // Show error message if validation fails
            >
                {steps[current].content}

                <div className='felx justify-between mt-4'>
                    {current > 0 && (
                        <Button onClick={prev}>قبلی</Button>
                    )}
                    {current < steps.length - 1 ? (
                        <Button type="primary" htmlType="submit">بعدی</Button>  // Submit form and validate before moving to next step
                    ) : (
                        <Button type="primary" onClick={handleSubmit}>ثبت اطلاعات</Button>
                    )}
                </div>
            </Form>
        </div>
    );
};

export default MultiStepForm;
