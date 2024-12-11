import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

interface PropsTypes {
    title: string;
    description: string;
}

const ShowTextModal = ({ title, description }: PropsTypes) => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [form] = Form.useForm();


    // Function to show modal for adding/editing message
    const handleShowModal = () => {
        setIsOpenModal(true);
    };

    // Function to hide modal and reset fields
    const handleHideModal = () => {
        setIsOpenModal(false);
        form.resetFields();
    };

    return (
        <>
            <Button type="link" className="text-main-color my-2" onClick={() => handleShowModal()}>
                مشاهده پیغام
            </Button>
            <Modal
                title={'نمایش پیام'}
                open={isOpenModal}
                onCancel={handleHideModal}
                footer={false}
                centered
            >
                <Form
                    form={form}
                    name="sendMessage"
                    className="bg-white rounded-[1.5rem] shadow-sm px-2 pt-6 space-y-2"
                >
                    <Form.Item
                        name="fullName"
                    >
                        <Input
                        name="fullName"
                            value={title}
                            placeholder={title}
                            disabled
                        />
                    </Form.Item>

                    <Form.Item
                        name="message"
                    >
                        <TextArea
                        className="!max-h-[200px]"
                            name="message"
                            value={description}
                            placeholder={description}
                            disabled
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default ShowTextModal;