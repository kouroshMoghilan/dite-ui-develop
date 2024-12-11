import { Tabs } from "antd";
import React, { useRef, useState } from 'react';
import { eventFormData } from '../../../types/formTypes';
import { PermanentForm } from "./PermanentForm";
import { TemporaryForm } from "./TemporaryForm";

const TabBars: React.FC = () => {
    const [formData, setFormData] = useState<eventFormData>({
        endDate: '',
        startDate: '',
        title: '',
        type: ''
    });
    const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false);

    const showLoadingBtn = () => { setIsLoadingBtn(true) }
    const hideLoadingBtn = () => { setIsLoadingBtn(false) }

    const formRefPE = useRef<any>(null); // Reference for Permanent Exhibition form
    const formRefTE = useRef<any>(null); // Reference for Temporary Exhibition form

    const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleStartDate = (data: string) => {
        setFormData((prevContent) => ({ ...prevContent, startDate: data }));
    };

    const handleEndDate = (data: string) => {
        setFormData((prevContent) => ({ ...prevContent, endDate: data }));
    };


    const resetForms = () => {
        formRefPE.current?.resetFields(); // Reset Permanent Exhibition form fields
        formRefTE.current?.resetFields(); // Reset Temporary Exhibition form fields
        setFormData({ endDate: '', startDate: '', title: '', type: '' });
    };

    const handleSwitchBetweenTabs = () => {
        resetForms(); // Reset both forms when switching tabs
    };

    return (
        <div className="w-full">
            <Tabs
                defaultActiveKey="pe"
                className="w-full flex justify-center"
                type="card"
                size={'small'}
                onChange={() => handleSwitchBetweenTabs()}
                items={[
                    {
                        label: 'دائمی',
                        key: 'pe',
                        children: (
                            <PermanentForm
                                formData={formData}
                                formRef={formRefPE}
                                handleValue={handleValue}
                                showLoadingBtn={showLoadingBtn}
                                hideLoadingBtn={hideLoadingBtn}
                                isLoadingBtn={isLoadingBtn}
                                resetForms={resetForms}
                            />
                        ),
                    },
                    {
                        label: 'موقت',
                        key: 'te',
                        children: (
                            <TemporaryForm
                                formData={formData}
                                formRef={formRefTE}
                                handleValue={handleValue}
                                handleStartDate={handleStartDate}
                                handleEndDate={handleEndDate}
                                showLoadingBtn={showLoadingBtn}
                                hideLoadingBtn={hideLoadingBtn}
                                isLoadingBtn={isLoadingBtn}
                                resetForms={resetForms}
                            />
                        ),
                    },
                ]}
            />
        </div>
    );
}

export default TabBars;
