import { useState } from "react";
import { Outlet } from "react-router-dom";
import Aside from "./Aside";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <main className={`min-h-screen`}>
                {/* Aside with 25% width */}
                <Aside isOpen={isOpen} setIsOpen={setIsOpen} />
                {/* Content with 75% width */}
                <div className="lg:w-full flex-1 bg-gray-100">
                    <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
                    {<Outlet />}
                    {/* <Footer /> */}
                </div>
            </main>


            <ToastContainer
                rtl={true}
            />
        </>
    );
};

export default MainLayout;
