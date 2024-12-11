import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal, Select } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BtnLoading from "../../../components/commonUI/BtnLoading";
import { GET, POST, PUT } from "../../../services/apiService/AxiosApiService";
import { ModalPropsTypes } from "../../../types/funcProps";
import { transformKeyValueToLabelValue } from "../../../services/globals/globalServices";
import { BasicUserUrl } from "../../../services/apiService/axiosClient";

// Modal component for adding or editing a message
const AddMessageModal: React.FC<ModalPropsTypes> = ({ refreshMessage, isEdit, singleSms, setIsEdit }) => {
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [options, setOptions] = useState<{ selection: any[] }>({ selection: [] });
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [requestsChckbox, setRequestsChckbox] = useState(false);
    const [surveyChckbox, setSurveyChckbox] = useState(false);
    const [selectedExhibitionId, setSelectedExhibitionId] = useState<string | undefined>(undefined);
    const [form] = Form.useForm();

    // Show modal for adding/editing message
    const handleShowModal = (isEdit: boolean) => {
        form.resetFields();
        setIsOpenModal(true);

        if (isEdit && singleSms) {
            form.setFieldsValue({
                title: singleSms?.title,
                message: singleSms?.message.default,
            });

            setRequestsChckbox(singleSms?.message.default.includes("registration-request"));
            setSurveyChckbox(singleSms?.message.default.includes("survey-registration"));
        }
    };

    // Hide modal and reset form
    const handleHideModal = () => {
        setIsOpenModal(false);
        setIsEdit(false);
        form.resetFields();
        setRequestsChckbox(false);
        setSurveyChckbox(false);
        setSelectedExhibitionId(undefined);
    };

    // Handle checkbox change for adding/removing links
    const handleCheckboxChange = (e: CheckboxChangeEvent) => {
        const { name, checked } = e.target;
        const companyId = singleSms?.companyId;
        const exhibitionId = selectedExhibitionId;
        let updatedMessage = form.getFieldValue('message') || '';

        const requestLink = `لینک درخواست: ${BasicUserUrl.baseURL}/users/registration-request?companyId=${companyId}`;
        const surveyLink = exhibitionId ? `لینک نظرسنجی:  ${BasicUserUrl.baseURL}/users/survey-registration?exhibitionId=${exhibitionId}` : '';

        if (name === "requestsChckbox") {
            updatedMessage = checked && !updatedMessage.includes(requestLink)
                ? updatedMessage + `\r\n ${requestLink}`
                : updatedMessage.replace(requestLink, "").trim();
        } else if (name === "surveyChckbox") {
            updatedMessage = checked && surveyLink && !updatedMessage.includes(surveyLink)
                ? updatedMessage + `\r\n ${surveyLink}`
                : updatedMessage.replace(surveyLink, "").trim();
        }

        form.setFieldsValue({ message: updatedMessage.trim() });
    };

    // Handle exhibition selection
    const handleExhibitionSelect = (value: string) => {
        const baseUrl = `${BasicUserUrl.baseURL}/users/survey-registration?exhibitionId=`;
        const existingMessage = form.getFieldValue("message") || "";
        
        const cleanedMessage = (existingMessage || '').split(' ').filter((word: string) => !word.startsWith(baseUrl)).join(' ');
        const newMessage = `${cleanedMessage} ${baseUrl}${value}`.trim();

        form.setFieldsValue({ message: newMessage });
        setSelectedExhibitionId(value);
    };

    // Handle form submission (add/edit message)
    const handleSubmitForm = async () => {
        try {
            setIsLoadingBtn(true);
            const apiEndpoint = isEdit ? `/sms/templates/${singleSms.id}` : '/sms/templates';
            const method = isEdit ? PUT : POST;
            
            const formValues = form.getFieldsValue();
            const payload = {
                ...formValues,
                message: { default: formValues.message }
            };

            const res = await method(apiEndpoint, payload);

            if (res.status === 200 || res.status === 201) {
                toast.success(isEdit ? 'پیام با موفقیت ویرایش شد.' : 'پیام با موفقیت ثبت گردید.');
                refreshMessage();
                handleHideModal();
            }
        } finally {
            setIsLoadingBtn(false);
        }
    };

    // Fetch exhibition IDs for the select dropdown
    const fetchExhibitionIds = async () => {
        try {
            const response = await GET('/exhibitions-enum', {});
            if (response.status === 200) {
                const optionsData = transformKeyValueToLabelValue(response.data);
                setOptions({ selection: optionsData });

                if (optionsData.length > 0) {
                    const firstItemId = optionsData[0].value;
                    setSelectedExhibitionId(firstItemId);
                    form.setFieldsValue({
                        message: (form.getFieldValue('message') || '') + ` ${BasicUserUrl.baseURL}/users/survey-registration?exhibitionId=${firstItemId}`
                    });
                }
            }
        } catch (error) {
            console.error('Error fetching exhibition IDs:', error);
        }
    };

    useEffect(() => {
        fetchExhibitionIds();
    }, []);

    useEffect(() => {
        if (isEdit && singleSms) {
            form.setFieldsValue({
                title: singleSms.title,
                message: singleSms.message.default
            });
            setRequestsChckbox(singleSms.message.default.includes("registration-request"));
            setSurveyChckbox(singleSms.message.default.includes("survey-registration"));
            setIsOpenModal(true);
        }
    }, [isEdit, singleSms]);

    return (
        <>
            <Button type="link" className="text-main-color my-2" onClick={() => handleShowModal(false)}>
                <PlusCircleOutlined />
                اضافه کردن پیام
            </Button>
            <Modal
                title={isEdit ? 'ویرایش پیام' : 'اضافه کردن پیام'}
                footer={<BtnLoading isLoading={isLoadingBtn} onClick={form.submit} label={isEdit ? "ویرایش پیام" : "ذخیره پیام"} />}
                open={isOpenModal}
                onCancel={handleHideModal}
                centered
            >
                <Form
                    form={form}
                    name="sendMessage"
                    className="bg-white rounded-[1.5rem] shadow-sm px-2 pt-6 space-y-2"
                    onFinish={handleSubmitForm}
                >
                    <Form.Item
                        name="title"
                        rules={[{ required: true, message: 'لطفا عنوان را وارد کنید' }]}
                    >
                        <Input placeholder="عنوان را وارد کنید:" />
                    </Form.Item>

                    <Form.Item
                        name="message"
                        rules={[{ required: true, message: 'لطفا متن پیام را وارد کنید' }]}
                    >
                        <TextArea placeholder="متن پیام را وارد کنید:" />
                    </Form.Item>

                    {!isEdit && (
                        <>
                            <Form.Item>
                                <Checkbox
                                    name="requestsChckbox"
                                    checked={requestsChckbox}
                                    onChange={(e) => {
                                        setRequestsChckbox(e.target.checked);
                                        handleCheckboxChange(e);
                                    }}
                                >
                                    ارسال لینک ثبت درخواست برای کاربر
                                </Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Checkbox
                                    name="surveyChckbox"
                                    checked={surveyChckbox}
                                    onChange={(e) => {
                                        setSurveyChckbox(e.target.checked);
                                        handleCheckboxChange(e);
                                    }}
                                >
                                    ارسال لینک ثبت نظرسنجی برای کاربر
                                </Checkbox>
                            </Form.Item>

                            {surveyChckbox && (
                                <Form.Item>
                                    <Select
                                        placeholder="انتخاب نمایشگاه"
                                        options={options.selection}
                                        defaultValue={selectedExhibitionId}
                                        onChange={handleExhibitionSelect}
                                    />
                                </Form.Item>
                            )}
                        </>
                    )}
                </Form>
            </Modal>
        </>
    );
};

export default AddMessageModal;
