// ViewerFilters.tsx
import React from 'react';
import { Select } from 'antd';
import { DatePickerUi } from '../../../components/commonUI/DatePickerUi';
import RadioBtn from '../../../components/commonUI/RadioBtn';

interface ViewerFiltersProps {
  filter: {
    createTime: string | null;
    exhibitionId: number | null;
    role: string | null;
  };
  options: { selection: any[]; radioButton: any[] };
  onDateChange: (date: string) => void;
  onExhibitionChange: (value: string) => void;
  onRoleChange: (value: string) => void;
}

const ViewerFilters: React.FC<ViewerFiltersProps> = ({
  filter,
  options,
  onDateChange,
  onExhibitionChange,
  onRoleChange,
}) => (
  <div className="space-y-3">
    <DatePickerUi onChangeValue={(e:any) => onDateChange(e)} />

    <Select
      showSearch
      placeholder="انتخاب کنید ..."
      value={filter.exhibitionId?.toString()}
      filterOption={(input, option) =>
        (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
      }
      options={options.selection}
      onChange={onExhibitionChange}
      className="w-full"
    />

    <RadioBtn options={options.radioButton} value={filter.role} onChange={onRoleChange} />
  </div>
);

export default ViewerFilters;
