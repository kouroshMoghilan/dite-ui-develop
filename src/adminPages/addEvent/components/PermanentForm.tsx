import { Form, Input } from "antd";
import { toast } from "react-toastify";
import BtnLoading from "../../../components/commonUI/BtnLoading";
import { POST } from "../../../services/apiService/AxiosApiService";
import { TabBarForm } from "../../../types/formTypes";

export const PermanentForm = ({ formData, formRef,resetForms, handleValue, showLoadingBtn, hideLoadingBtn, isLoadingBtn }: TabBarForm) => {

    const handleSubmitFormPE = async (type: string) => {
        try {
            showLoadingBtn();
            const res = await POST('/exhibitions', {
                // description: formData.description,
                title: formData.title,
                type: type,
            });
            if (res.status === 201) {
                hideLoadingBtn();
                toast.success('با موفقیت انجام شد');
                resetForms(); // Reset both forms after successful submission
            }
        } catch {
            hideLoadingBtn();
        }
    };


    return (
        <>
            <Form
                className='space-y-2'
                name="formPE"
                ref={formRef}
                onFinish={() => handleSubmitFormPE('pe')}
            >
                <Form.Item
                    name={'title'}
                    rules={[{ required: true, message: 'لطفا نام نمایشگاه را وارد کنید' }]}
                >
                    <Input
                        className="bg-input border-0 !text-black !text-[13px] py-3"
                        type={'text'}
                        value={formData.title}
                        name={'title'}
                        placeholder={'نام نمایشگاه را وارد کنید:'}
                        onChange={handleValue} // Use onChange instead of onInput
                    />
                </Form.Item>

                <Form.Item>
                    <BtnLoading isLoading={isLoadingBtn} htmlType='submit' label='ایجاد' />
                </Form.Item>
            </Form>
        </>
    )
}