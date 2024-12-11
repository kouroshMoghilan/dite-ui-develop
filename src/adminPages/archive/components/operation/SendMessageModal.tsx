import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BtnLoading from "../../../../components/commonUI/BtnLoading";
import { transformKeyValueToLabelValue, transformObjectToOptions } from "../../../../services/globals/globalServices";
import { GET, POST } from "../../../../services/apiService/AxiosApiService";

interface sendMesseageTypes {
    message: string,
    templateId: number | null,
    usingTemplate: boolean,
    viewers: number[];
    type: string | null
}

const SendMessageModal = ({ usersId }: { usersId: number[] }) => {
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [options, setOptions] = useState<{ smsTemplates: any[]; smsTypes: any[] }>({ smsTemplates: [], smsTypes: [] });
    const [formData, setFormData] = useState<sendMesseageTypes>({
        message: '',
        templateId: null,
        usingTemplate: false,
        viewers: usersId,
        type: null
    });
    const [form] = Form.useForm();

    // handle show and hide
    const handleShowBtnLoading = () => {
        setIsLoadingBtn(true);
    };
    const handleHideBtnLoading = () => {
        setIsLoadingBtn(false);
    };

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


    // handle value
    const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            templateId: null,
        }));
    };

    const handleCheckboxValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: checked,
            message: '',
        }));
    };

    const handleTemplateChange = (value: string, name: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: isNaN(Number(value)) ? value : Number(value),
        }));
    };


    // handle submit
    const handleSubmitForm = async () => {
        try {
            handleShowBtnLoading();
            const res = await POST('/sms/send', formData);
            if (res.status === 201) {
                toast.success('پیام شما با موفقیت ارسال شد.');
                handleHideModal();
                handleHideBtnLoading();
            } else {
                handleHideBtnLoading();
            }

        } catch (error) {
            handleHideModal();
            handleHideBtnLoading();
        }
    };

    // get data
    const fetchData = async () => {
        try {
            const [responseTemplates, responseSmsTypes] = await Promise.all([
                GET('/sms/templates-enum', {}),
                GET('/sms/types', {})
            ]);

            if (responseTemplates.status === 200 && responseSmsTypes.status === 200) {
                const templates = responseTemplates.data;
                const smsTypes = responseSmsTypes.data;
                // transformObjectToOptions
                const optionsDataTemplates = transformObjectToOptions(templates);
                const optionsDataSmsTypes = transformKeyValueToLabelValue(smsTypes);

                setOptions((prev) => ({
                    ...prev,
                    smsTemplates: optionsDataTemplates,
                    smsTypes: optionsDataSmsTypes
                }));
            }
        } catch (error) {
            console.error('Error fetching templates:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // get UserId
    useEffect(() => {
        const stringToArray = usersId.map(item => Number(item))
        setFormData((prev) => ({
            ...prev,
            viewers: stringToArray,
        }));
    }, [usersId])

    return (
        <>
            <Button type="link" className="text-main-color" onClick={() => handleShowModal(false)}>
                <PlusCircleOutlined />
                ارسال پیام
            </Button>
            <Modal
                title={'ارسال پیام گروهی'}
                footer={false}
                loading={isLoading}
                open={isOpenModal}
                onCancel={handleHideModal}
            >
                <Form
                    form={form}
                    name="modalForm"
                    className="pt-6 space-y-3"
                    initialValues={{ remember: true }}
                    onFinish={handleSubmitForm}
                >

                    <Checkbox name="usingTemplate"
                        checked={formData.usingTemplate}
                        onChange={(e: any) => handleCheckboxValue(e)}>استفاده از پیام های ثبت شده</Checkbox>
                    {
                        formData.usingTemplate ?
                            <Form.Item
                                name={'templates'}
                                rules={[{ required: true, message: 'این فیلد الزامی است' }]}
                                className='w-full'
                            >
                                <Select
                                    showSearch
                                    placeholder="انتخاب کنید ..."
                                    filterOption={(input, option) =>
                                        (option?.smsTemplates?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={options.smsTemplates}
                                    onChange={(e) => handleTemplateChange(e, 'templateId')}
                                />
                            </Form.Item>
                            :
                            <Form.Item
                                name={'message'}
                                rules={[{ required: true, message: 'لطفا متن پیام را وارد کنید' }]}
                            >
                                <TextArea
                                    name={'message'}
                                    value={formData.message}
                                    onInput={(e: any) => handleValue(e)}
                                    placeholder={'متن پیام را وارد کنید:'}
                                />
                            </Form.Item>
                    }

                    <Form.Item
                        name={'type'}
                        rules={[{ required: true, message: 'این فیلد الزامی است' }]}
                        className='w-full'
                    >
                        <Select
                            showSearch
                            placeholder="انتخاب کنید ..."
                            filterOption={(input, option) =>
                                (option?.smsTypes.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={options.smsTypes}
                            onChange={(e) => handleTemplateChange(e, 'type')}
                        />
                    </Form.Item>

                    <Form.Item>
                        <BtnLoading isLoading={isLoadingBtn} label={"ارسال پیام"} />
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
};

export default SendMessageModal;
