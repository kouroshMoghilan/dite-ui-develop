import { LayoutProps } from "antd";
import Footer from "./Footer";


const MainLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <main className="flex items-center justify-center h-screen">
                {children}
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;
