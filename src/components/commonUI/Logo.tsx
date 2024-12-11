import { styleType } from "../../types/globalTypes";
import diteLogo from "../../../public/imges/diteLogo.png";

const Logo = ({className,label}:styleType) => {

    return (
        <div className={`${className} text-2xl flex flex-col justify-center items-center font-bold h-24`}>
            <img src={diteLogo} alt="Webfam Logo" className="h-full inline-block mr-2" />

            {
                label?
                <span className="text-[10px]">{label}</span>
                :null
            }
        </div>
    )
}

export default Logo;