import { FC, ReactNode } from "react";

interface PropTypes {
    title: string;
    icon?: ReactNode;
    className?: string;
}

const PageTitle: FC<PropTypes> = ({ title, icon, className }) => {


    return (
        <h1 className={`${className?className:'text-xl'} flex items-center justify-center mb-3 font-bold`}>
            <span className="text-xl me-2">{icon && icon}</span>
            {title}
        </h1>
    )
}

export default PageTitle;