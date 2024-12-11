import React from "react";

export interface NavbarProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface LayoutProps {
    children: React.ReactNode;
}