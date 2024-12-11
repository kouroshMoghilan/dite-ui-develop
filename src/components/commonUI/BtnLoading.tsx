import { Button } from "antd"

interface LoadingDataTypes {
    isLoading: boolean,
    label?: string,
    htmlType?: "submit" | "button" | "reset";
    onClick?:()=>void;
}

const BtnLoading = ({ isLoading, label, htmlType,onClick }: LoadingDataTypes) => {

    return (
        <Button
            className="bg-main-color hover:!bg-blue-900 w-full h-[46px]"
            type="primary"
            htmlType={htmlType ?? 'submit'}
            loading={isLoading}
            onClick={onClick}>
            {label ?? 'ثبت'}
        </Button>
    )
}

export default BtnLoading