// input
export interface InputProps {
    name: string;
    type: string;
    required?: boolean;
    message?: string;
    label?: string;
    placeholder?: string;
    calssName?: string;
    handleValue: (e: any) => void;
}

// login
export interface loginFormData {
    mobileNumber: string,
    password: string
}

// addEvent
export interface eventFormData {
    endDate: string,
    startDate: string,
    title: string,
    type: string
}


// messageManager
export interface SingleSmsTypes {
    id: number,
    title: string,
    companyId: string;
    message: {
        default: string
    }
}

// 
export interface DatePickerProps {
    onChangeValue: (e: any) => void;
}


// add event
export interface TabBarForm {
    formData: eventFormData,
    formRef: any,
    handleValue: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleStartDate?: any,
    handleEndDate?: any,
    showLoadingBtn: () => void,
    hideLoadingBtn: () => void,
    isLoadingBtn: boolean,
    resetForms: () => void
}