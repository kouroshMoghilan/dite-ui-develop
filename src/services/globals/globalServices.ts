export const transformObjectToOptions = (data: Record<string, string>): { value: string; label: string }[] => {
    return Object.entries(data).map(([key, value]) => ({
        value: key,
        label: value,
    }));
};

export const transformKeyValueToLabelValue = (array:any[]) => {
    return array.map(item => ({
        value: item.key,
        label: item.value
    }));
};