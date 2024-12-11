import PageTitle from "../../components/template/PageTitle";
import WhiteScreen from "../../components/template/WhiteScreen";
import { UsergroupAddOutlined } from "@ant-design/icons";
import TabBars from "./components/TabBars";

const VisitorDataEntry: React.FC = () => {
    return (
        <>
            <PageTitle title='ثبت اطلاعات بازدیدکنندگان' className="text-md" icon={<UsergroupAddOutlined />} />
            <WhiteScreen>
                <TabBars />
            </WhiteScreen>
        </>
    )
}

export default VisitorDataEntry;