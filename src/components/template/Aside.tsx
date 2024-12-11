import React from 'react';
import { BarChartOutlined, FolderOpenOutlined, LikeOutlined, LogoutOutlined, MailOutlined, MessageOutlined, PlusCircleOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { NavbarProps } from '../../types/layoutTypes';
import Logo from '../commonUI/Logo';
import { Link } from 'react-router-dom';
import { RemoveAccessToken } from '../../services/apiService/JwtService';


type MenuItem = Required<MenuProps>['items'][number];


const Aside: React.FC<NavbarProps> = (props) => {

    const handleLogout = () => {
        RemoveAccessToken()
    }


    const items: MenuItem[] = [
        {
            key: 'sub1',
            label: <Link to={'/app/archive'}>آرشیو</Link>,
            icon: <FolderOpenOutlined />,
        },
        {
            key: 'sub2',
            label: <Link to={'/app/visitor-data-entry'}>ثبت اطلاعات بازدیدکنندگان</Link>,
            icon: <UsergroupAddOutlined />
        },
        {
            key: 'sub4',
            label: <Link to={'/app/message-manager'}>مدیریت و ذخیره پیام ها</Link>,
            icon: <MessageOutlined />
        },
        {
            key: 'sub5',
            label: <Link to={'/app/data-analysis'}>تحلیل داده ها</Link>,
            icon: <BarChartOutlined />
        },
        {
            key: 'sub6',
            label: <Link to={'/app/view-requests'}>مشاهده درخواست ها</Link>,
            icon: <MailOutlined />
        },
        {
            key: 'sub7',
            label: <Link to={'/app/view-polls'}>مشاهده نظر سنجی های دریافتی</Link>,
            icon: <LikeOutlined />
        },
        {
            key: 'sub8',
            label: <Link to={'/app/add-event'}>اضافه کردن ایونت</Link>,
            icon: <PlusCircleOutlined />
        },
        {
            key: 'sub9',
            label: <Link className='!text-red-800' to={'/login'}>خروج</Link>,
            icon: <LogoutOutlined className='!text-red-800' />,
            onClick: handleLogout,
        },
    ];


    return (
        <>
            <div
                className={`fixed start-0 top-0 bottom-0 h-full z-50 bg-white w-64
        transition-transform duration-300 ease-in-out
        ${props.isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div>
                    <Logo className='py-6' label='نرم افزار مدیریت نمایشگاهی دایت' />
                </div>
                <Menu
                    className='w-full h-full space-y-4'
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={items}
                    onClick={() => props.setIsOpen(false)}
                />
            </div>
            {/* Overlay for blurring background when the menu is open */}
            {props.isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10 lg:hidden"
                    onClick={() => props.setIsOpen(!props.isOpen)} // Close the menu when clicking outside
                />
            )}
        </>
    )
}

export default Aside