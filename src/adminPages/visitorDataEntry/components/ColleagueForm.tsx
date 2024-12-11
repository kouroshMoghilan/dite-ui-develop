import { Flex, Form, Input, Select } from "antd";
import TextArea from 'antd/es/input/TextArea';
import BtnLoading from "../../../components/commonUI/BtnLoading";

const ColleagueForm: React.FC<{
    isLoadingBtn: boolean;
    formData: any;
    options: any;
    onChangeSelection: any;
    onChangeUnnecessaryData: any;
    onChangeUnnecessaryDataSelection: any;
    onFinish: () => Promise<void>;
    formRef: React.RefObject<any>;
    handleValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleNumberValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ formData, options, onChangeSelection, onChangeUnnecessaryData, onChangeUnnecessaryDataSelection, isLoadingBtn, onFinish, formRef, handleValue,handleNumberValue }) => {
    return (
        <Form
            className='space-y-2'
            name="VisitorForm"
            ref={formRef}
            onFinish={onFinish}
        >

            <Form.Item
                name="exhibitionId"
                rules={[{ required: true, message: 'انتخاب نمایشگاه الزامی است.' }]}
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
                rules={[{ required: true, message: 'نام همکار الزامی است.' }]}
            >
                <Input
                    name="fullName"
                    value={formData.fullName}
                    onInput={(e: any) => handleValue(e)}
                    className="bg-input border-0 !text-black !text-[13px] py-3"
                    type="text"
                    placeholder="نام همکار را انتخاب کنید"
                />
            </Form.Item>

            <Form.Item
                name="mobileNumber"
                rules={[
                    { required: true, message: 'شماره همراه الزامی است.' },
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
                    rules={[{ required: true, message: 'انتخاب زبان الزامی است.' }]}
                    className="w-full"
                >
                    <Select
                        showSearch
                        placeholder="زبان"
                        value={formData.language?.toString()}
                        filterOption={(input, option) =>
                            (option?.languages?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
                        }
                        options={options.languages}
                        onChange={onChangeSelection('language')}
                    />
                </Form.Item>

                <Form.Item
                    name="city"
                    // rules={[{ required: true, message: 'انتخاب شهر الزامی است.' }]}
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

            <Form.Item
                name={'address'}
            >
                <Input
                    className="bg-input border-0 !text-black !text-[13px] py-3"
                    type={'text'}
                    name="address"
                    value={formData.data.address}
                    onInput={(e: any) => onChangeUnnecessaryData(e)}
                    placeholder={'آدرس (فروشگاه|محل کار) را وارد کنید'}
                />
            </Form.Item>

            <Flex gap={'small'}>
                <Form.Item
                    name={'typeOwnership'}
                    // rules={[{ required: true, message: '' }]}
                    className='w-full'
                >
                    <Select
                        showSearch
                        placeholder="نوع مالکیت"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={[
                            { value: 'حقیقی', label: 'حقیقی' },
                            { value: 'حقوقی', label: 'حقوقی' }
                        ]}
                        onChange={(e) => onChangeUnnecessaryDataSelection(e, 'typeOwnership')}
                    />
                </Form.Item>

                <Form.Item
                    name={'workplaceSpace'}
                    // rules={[{ required: true, message: '' }]}
                    className='w-full'
                >
                    <Input
                        className="bg-input border-0 !text-black !text-[13px] py-3"
                        type={'number'}
                        value={formData.data.workplaceSpace}
                        name={'workplaceSpace'}
                        placeholder={'مساحت محل کار'}
                        onInput={(e) => onChangeUnnecessaryData(e)} // Use onChange instead of onInput
                    />
                </Form.Item>
            </Flex>

            <Form.Item
                name="tel"
                rules={[
                    { required: true, message: 'شماره خط ثبات الزامی است.' },
                    { pattern: /^\d{11}$/, message: 'شماره خط ثبات باید 11 رقم باشد.' },
                ]}
            >
                <Input
                    name="tel"
                    value={formData.tel}
                    onInput={(e: any) => handleNumberValue(e)}
                    className="bg-input border-0 !text-black !text-[13px] w-full"
                    maxLength={11}
                    pattern="\d*" 
                    type="text"
                    placeholder="شماره همراه بازدید کننده را وارد کنید"
                />
            </Form.Item>


            <Form.Item
                name={'email'}
                // rules={[{ required: true, message: '' }]}
            >
                <Input
                    className="bg-input border-0 !text-black !text-[13px] py-3"
                    type={'text'}
                    value={formData.data?.email}
                    name={'email'}
                    onInput={(e) => onChangeUnnecessaryData(e)}
                    placeholder={'پست الکترونیکی را وارد کنید'}
                />
            </Form.Item>

            <Form.Item
                name={'activePhoneNumber'}
                // rules={[{ required: true, message: '' }]}
            >
                <Input
                    className="bg-input border-0 !text-black !text-[13px] py-3"
                    type={'text'}
                    value={formData.data?.activePhoneNumber}
                    name={'activePhoneNumber'}
                    onInput={(e) => onChangeUnnecessaryData(e)}
                    placeholder={'شماره فعال در شبکه های اجتماعی را وارد کنید'}
                />
            </Form.Item>

            <Form.Item
                name={'platformAddress'}
                // rules={[{ required: true, message: '' }]}
            >
                <Input
                    className="bg-input border-0 !text-black !text-[13px] py-3"
                    type={'text'}
                    value={formData.data?.platformAddress}
                    name={'platformAddress'}
                    onInput={(e) => onChangeUnnecessaryData(e)}
                    placeholder={'آدرس سایت یا اینستاگرام را وارد کنید'}
                />
            </Form.Item>

            <Form.Item
                name={'fax'}
            // rules={[{ required: true, message: '' }]}
            >
                <Input
                    className="bg-input border-0 !text-black !text-[13px] py-3"
                    type={'text'}
                    value={formData.data?.fax}
                    name={'fax'}
                    onInput={(e) => onChangeUnnecessaryData(e)}
                    placeholder={'فکس را وارد کنید'}
                />
            </Form.Item>

            <Form.Item
                name={'workField'}
            // rules={[{ required: true, message: '' }]}
            >
                <Input
                    className="bg-input border-0 !text-black !text-[13px] py-3"
                    type={'text'}
                    value={formData.data?.workField}
                    name={'workField'}
                    onInput={(e) => onChangeUnnecessaryData(e)}
                    placeholder={'زمینه تخصصی فعالیت را وارد کنید'}
                />
            </Form.Item>

            <Flex gap={'small'}>
                <Form.Item
                    name={'purchaseType'}
                    // rules={[{ required: true, message: '' }]}
                    className='w-full'
                >
                    <Input
                        className="bg-input border-0 !text-black !text-[13px] py-3"
                        type={'text'}
                        value={formData.data?.purchaseType}
                        name={'purchaseType'}
                        onInput={(e) => onChangeUnnecessaryData(e)}
                        placeholder={'نوع خرید'}
                    />
                </Form.Item>

                <Form.Item
                    name={'purchaseAmount'}
                    // rules={[{ required: true, message: '' }]}
                    className='w-full'
                >
                    <Input
                        className="bg-input border-0 !text-black !text-[13px] py-3"
                        type={'number'}
                        value={formData.data?.purchaseAmount}
                        name={'purchaseAmount'}
                        onInput={(e) => onChangeUnnecessaryData(e)}
                        placeholder={'میزان خرید ماهانه'}
                    />
                </Form.Item>
            </Flex>

            <Form.Item
                name={'considerations'}
            >
                <TextArea
                    name='considerations'
                    onInput={(e) => onChangeUnnecessaryData(e)}
                    placeholder={'ملاحضات را وارد کنید'}
                />

            </Form.Item>

            <Flex gap="small">
                <Form.Item
                    name="templateId"
                    rules={[{ required: true, message: 'انتخاب پیام الزامی است.' }]}
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

export default ColleagueForm