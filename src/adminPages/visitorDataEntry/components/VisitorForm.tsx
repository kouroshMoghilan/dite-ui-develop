import { Flex, Form, Input, Select } from "antd";
import React from 'react';
import BtnLoading from "../../../components/commonUI/BtnLoading";

export const VisitorForm: React.FC<{
    isLoadingBtn: boolean;
    formData: any;
    options: any;
    onChangeSelection: any;
    onChangeUnnecessaryData: any;
    onFinish: () => Promise<void>;
    formRef: React.RefObject<any>;
    handleValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleNumberValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ formData, options, onChangeSelection, onChangeUnnecessaryData, isLoadingBtn, onFinish, formRef, handleValue,handleNumberValue }) => {
    return (
        <Form
            className='space-y-2'
            name="VisitorForm"
            ref={formRef}
            onFinish={onFinish}
        >

            <Form.Item
                name="exhibitionId"
                rules={[{ required: true, message: 'انتخاب نمایشگاه اجباری است.' }]}
                className="w-full"
            >
                <Select
                    showSearch
                    placeholder="نمایشگاه را انتخاب کنید"
                    value={formData.exhibitionId?.toString()}
                    filterOption={(input, option) =>
                        (option?.exhibitions?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
                    }
                    options={options.exhibitions}
                    onChange={onChangeSelection('exhibitionId')}
                />
            </Form.Item>

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

            <Flex gap="small">
                <Form.Item
                    name="language"
                    rules={[{ required: true, message: 'انتخاب زبان اجباری است.' }]}
                    className="w-full"
                >
                    <Select
                        showSearch
                        placeholder="زبان"
                        value={formData.language?.toString()}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
                        }
                        options={options.languages}
                        onChange={(value) => onChangeSelection('language')(value)}
                    />
                </Form.Item>
                <Form.Item
                    name="city"
                    // rules={[{ required: true, message: 'انتخاب شهر اجباری است.' }]}
                    className="w-full"
                >
                    <Input
                        name="city"
                        value={formData.data.city}
                        onInput={(e: any) => onChangeUnnecessaryData(e)}
                        className="bg-input border-0 !text-black !text-[13px] py-3"
                        type="text"
                        placeholder="شهر محل سکونت"
                    />
                </Form.Item>
            </Flex>

            <Flex gap="small">
                <Form.Item
                    name="templateId"
                    rules={[{ required: true, message: 'انتخاب پیام اجباری است.' }]}
                    className="w-full"
                >
                    <Select
                        showSearch
                        placeholder="پیام مورد نظر"
                        value={formData?.data.templateId?.toString()}
                        filterOption={(input, option) =>
                            (option?.templateId?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
                        }
                        options={options.templateId}
                        onChange={onChangeSelection('templateId')}
                    />
                </Form.Item>

                <Form.Item
                    name="smsType"
                    rules={[{ required: true, message: 'این فیلد الزامی است.' }]}
                    className="w-full"
                >
                    <Select
                        showSearch
                        placeholder="ارسال در"
                        value={formData?.data.smsType?.toString()}
                        filterOption={(input, option) =>
                            (option?.smsTypes?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={options.smsTypes}
                        onChange={onChangeSelection('smsType')}
                    />
                </Form.Item>
            </Flex>

            <Form.Item>
                <BtnLoading
                    label="ثبت اطلاعات"
                    htmlType="submit"
                    // onClick={()=>onFinish('vi')}
                    isLoading={isLoadingBtn}
                />
            </Form.Item>
        </Form>
    );
};

export default VisitorForm