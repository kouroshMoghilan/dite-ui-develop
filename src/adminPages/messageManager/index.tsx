import { MessageOutlined } from "@ant-design/icons";
import PageTitle from "../../components/template/PageTitle";
import WhiteScreen from "../../components/template/WhiteScreen";
import MessageViewer from "./components/MessageViewer";

const MessageManager: React.FC = () => {


    return (
        <div className="center-page">
            <PageTitle title='ثبت پیام' icon={<MessageOutlined />}  />
            <WhiteScreen className="!p-1">
                <MessageViewer />
                {/* <ViewerGrid /> */}
            </WhiteScreen>
        </div>
    )
}

export default MessageManager;