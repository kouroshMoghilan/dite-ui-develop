// messageManager
export interface ModalPropsTypes {
    refreshMessage: () => void;
    isEdit: Boolean;
    singleSms: {
        id:number,
        companyId:string,
        title:string,
        message: {
            default: string
        }
    };
    setIsEdit: (value: boolean) => void;
}

export interface MessagePropsType {
    title: string;
    messageId: number;
    setIsEdit: (value: boolean) => void;
    setSingleSms: (value: any) => void;
    refreshState: () => void;
}

// input component
export interface inputProps {
    name: string;
    type: string;
    value?:any,
    required?: boolean;
    message?: string;
    label?:string;
    placeholder?: string;
    calssName?: string;
    handleValue?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Use ChangeEvent for input
}

// dataPicker component
export interface datePickerProps {
    onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void; // Use ChangeEvent for input
    value?:any;
}

// data-analysis
export interface FilterDataAnalysis {
    exhibitionId: number | null;
    createTime: string | null;
}