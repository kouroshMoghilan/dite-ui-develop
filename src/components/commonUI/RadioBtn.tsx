import { Flex, Radio } from 'antd';

const RadioBtn = ({ options, onChange,value }: any) => {
  return (
    <Flex vertical gap="middle" className='border-2 rounded-3xl p-1'>
      <Radio.Group
        block
        options={options}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className='line-clamp-1 custom-radio-btn'
        optionType="button"
        buttonStyle="solid"
      />
    </Flex>
  );
};

export default RadioBtn;
