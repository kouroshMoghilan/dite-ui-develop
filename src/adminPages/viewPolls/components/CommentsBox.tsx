import { MessageFilled } from "@ant-design/icons";
import WhiteScreen from "../../../components/template/WhiteScreen";

const CommentsBox = ({ data, title }: { data: string[], title: string }) => {
    return (
        <div className="main-layout">
            <h4 className="text-center text-lg mb-4">
                {title}
            </h4>
            {
                data.map((item: string, index: number) => (
                    <WhiteScreen className="max-h-64 overflow-auto" key={index}>
                        <MessageFilled />
                        <p>
                            {item}
                        </p>
                    </WhiteScreen>
                ))
            }
        </div>
    )
}
export default CommentsBox;
