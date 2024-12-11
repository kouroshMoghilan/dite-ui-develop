import { LayoutProps } from "antd";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer";


const SecondLayout: React.FC<LayoutProps> = () => {

    
    return (
        <>
        <main className={`!min-h-screen`}>
            <div className="lg:w-full flex-1 bg-gray-100">
                {<Outlet />}
            </div>

            <Footer />
        </main>


        <ToastContainer
            rtl={true}
        />
    </>
    );
};

export default SecondLayout;
