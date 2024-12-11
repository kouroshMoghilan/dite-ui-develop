import React from "react";
import { NavbarProps } from "../../types/layoutTypes";
import { MenuOutlined } from '@ant-design/icons';
import Logo from "../commonUI/Logo";

const Navbar: React.FC<NavbarProps> = (props) => {

    return (
        <nav className="flex items-center justify-between w-100 p-4">
            {/* Button for toggling the menu in small screens */}
            <div  
            className="cursor-pointer"
            onClick={() => props.setIsOpen(!props.isOpen)}
            >
            <MenuOutlined className="text-[1.2rem]" />
            </div>
            <Logo className="h-[2.5rem]" />
        </nav>
    );
}

export default Navbar;
