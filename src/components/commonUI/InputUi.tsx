import { Input, Form } from "antd";
import { InputProps } from "../../types/formTypes";

export const InputUi = ({ name, type, required, message, label, placeholder, calssName, handleValue }: InputProps) => {
    return (
        <Form.Item
            name={name ?? 'text'}
            rules={[{ required: required ?? false, message: message ?? '' }]}
            className={calssName}
            label={label}
        >
            <Input
                className="bg-input border-0 !text-black !text-[13px] py-3"
                type={type ?? 'text'}
                name={name ?? 'text'}
                placeholder={placeholder ?? 'وارد کنید:'}
                onInput={handleValue}
            />
        </Form.Item>
    );
};
