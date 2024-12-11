import { Tabs } from "antd";
import React, { useEffect, useRef, useState } from 'react';
import { toast } from "react-toastify";
import { transformKeyValueToLabelValue, transformObjectToOptions } from "../../../services/globals/globalServices";
import { GET, POST } from "../../../services/apiService/AxiosApiService";
import VisitorForm from "./VisitorForm";
import ResidentialCustomerForm from "./ResidentialCustomerForm";
import ColleagueForm from "./ColleagueForm";

interface Options {
    languages: { label: string, value: string }[];
    exhibitions: { label: string, value: string }[];
    templateId: { label: string, value: string }[];
    smsTypes: { label: string, value: string }[];
}

const TabBars= () => {
    const formRefVI = useRef<any>(null); // Reference for Permanent Exhibition form
    const formRefHC = useRef<any>(null); // Reference for Temporary Exhibition form
    const formRefCO = useRef<any>(null); // Reference for Temporary Exhibition form
    const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false);
    const [options, setOptions] = useState<Options  >({ exhibitions: [], languages: [], templateId: [], smsTypes: [] });
    const [formData, setFormData] = useState({
        exhibitionId: null,
        fullName: '',
        language: '',
        mobileNumber: '',
        templateId: '',
        smsType: '',
        role: 'vi',
        data: {

        }
    });

    // show and hide btn loading
    const handleShowLoadingBtn = () => {
        setIsLoadingBtn(true);
    }

    const handleHideLoadingBtn = () => {
        setIsLoadingBtn(false);
    }

    const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNumberValue = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name,value}=e.target;
        if (/^\d*$/.test(value) && value.length <= 11) {
          setFormData((prevData) => ({
            ...prevData,
            [name]: value.toString(),
          }));
        }
      };

    const handleUnnecessaryDataValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            data: {
                ...prev.data, // حفظ مقادیر قبلی
                [name]: value,
            }
        }));

    };

    const handleSelectChange = (key: string) => (value: string) => {
        setFormData((prevOptions) => ({
            ...prevOptions,
            [key]: isNaN(Number(value)) ? value : Number(value)
        }));
    };

    const handleUnnecessarySelectChange = (value: string, name: string) => {
        setFormData((prevOptions) => ({
            ...prevOptions,
            data: {
                ...prevOptions.data,  // حفظ مقادیر قبلی
                [name]: value
            }
        }));
    };

    // Reset form fields
    const resetForms = () => {
        formRefVI.current?.resetFields(); 
        formRefHC.current?.resetFields();
        formRefCO.current?.resetFields();
        setFormData(
            {
                exhibitionId: null,
                fullName: '',
                language: '',
                mobileNumber: '',
                templateId: '',
                smsType: '',
                role: 'vi',
                data: {

                }
            });
    };

    const handleSwitchBetweenTabs = (type: string) => {
        resetForms(); // Reset both forms when switching tabs
        setFormData((prev) => ({
            ...prev,
            role: type

        }))
    };

    // handle submit
    const handleSubmit = async () => {
        try {
            handleShowLoadingBtn();
            const res = await POST('/viewers/visit', formData)
            if (res.status === 201) {
                toast.success('ثبت با موفقیت انجام شد.');
                handleHideLoadingBtn();
                resetForms();
            } else {
                handleHideLoadingBtn();
            }
        } catch (error) {
            handleHideLoadingBtn();
        }
    }


    // get selection
    const fetchData = async () => {
        try {
            const [viewerLanguagesResponse, exhibitionsResponse, templatesResponse, smsTypeResponse] = await Promise.all([
                GET('/viewer-languages', {}),
                GET('/exhibitions-enum', {}),
                GET('/sms/templates-enum', {}),
                GET('/sms/types', {})
            ]);

            if (viewerLanguagesResponse.status === 200) {
                const viewerOptions = transformKeyValueToLabelValue(viewerLanguagesResponse.data);
                setOptions((prev) => ({ ...prev, languages: viewerOptions }));

                // Set default language to the value of the first option
                setFormData((prev) => ({ ...prev, language: viewerOptions[0].value }));
            }

            if (exhibitionsResponse.status === 200) {
                const exhibitionOptions = transformKeyValueToLabelValue(exhibitionsResponse.data);
                setOptions((prev) => ({ ...prev, exhibitions: exhibitionOptions }));
            }

            if (templatesResponse.status === 200) {
                const templatesOptions = transformObjectToOptions(templatesResponse.data);
                setOptions((prev) => ({ ...prev, templateId: templatesOptions }));
            }

            if (smsTypeResponse.status === 200) {
                const smsTypeOptions = transformKeyValueToLabelValue(smsTypeResponse.data);
                setOptions((prev) => ({ ...prev, smsTypes: smsTypeOptions }));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);





    return (
        <div className="w-full">
            <Tabs
                defaultActiveKey="pe"
                className="w-full flex justify-center"
                type="card"
                size={'small'}
                onChange={(e: string) => handleSwitchBetweenTabs(e)}
                items={[
                    {
                        label: 'بازدیدکننده',
                        key: 'vi',
                        children: (
                            <VisitorForm
                                formRef={formRefVI}
                                onFinish={handleSubmit}
                                isLoadingBtn={isLoadingBtn}
                                handleValue={handleValue}
                                handleNumberValue={handleNumberValue}
                                formData={formData}
                                onChangeSelection={handleSelectChange}
                                onChangeUnnecessaryData={handleUnnecessaryDataValue}
                                options={options}
                            />
                        ),
                    },
                    {
                        label: 'مشتری خانگی',
                        key: 'hc',
                        children: (
                            <ResidentialCustomerForm
                                formRef={formRefHC}
                                onFinish={handleSubmit}
                                isLoadingBtn={isLoadingBtn}
                                handleValue={handleValue}
                                handleNumberValue={handleNumberValue}
                                formData={formData}
                                onChangeSelection={handleSelectChange}
                                onChangeUnnecessaryData={handleUnnecessaryDataValue}
                                options={options}
                            />
                        ),
                    },
                    {
                        label: 'همکاری',
                        key: 'co',
                        children: (
                            <ColleagueForm
                                formRef={formRefCO}
                                onFinish={handleSubmit}
                                isLoadingBtn={isLoadingBtn}
                                handleValue={handleValue}
                                handleNumberValue={handleNumberValue}
                                formData={formData}
                                onChangeSelection={handleSelectChange}
                                onChangeUnnecessaryDataSelection={handleUnnecessarySelectChange}
                                onChangeUnnecessaryData={handleUnnecessaryDataValue}
                                options={options}
                            />
                        ),
                    }
                ]}
            />
        </div>
    );
}

export default TabBars;
