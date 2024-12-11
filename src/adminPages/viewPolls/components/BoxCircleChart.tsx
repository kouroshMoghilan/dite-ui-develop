import SemiCircleChart from "../../../components/commonUI/SemiCircleChart";
import WhiteScreen from "../../../components/template/WhiteScreen";

interface BoxCircleChartProps {
    title: string;
    text: string;
    total: number;
    attendees: number;
}

const BoxCircleChart = ({ title, text, total, attendees }: BoxCircleChartProps) => {

    return (
        <WhiteScreen className="rounded-[2rem] shadow-lg flex items-start justify-center flex-col space-y-3">
            <div className="text-center font-bold text-lg">
                <h5>
                    {title}
                </h5>
            </div>
            <div>
                <SemiCircleChart totalPeople={total} attendees={attendees} />
            </div>
            <div className="text-center">
                <h6 className="pb-1 text-lg">
                    <p className="text-[14px]">
                        <span className="mw-2">{attendees} </span>
                        {text}
                    </p>
                </h6>
                <hr className="my-2 mx-auto w-[70%]" />
                <h6 className="text-sm">
                    از {total} نفر
                </h6>
            </div>
        </WhiteScreen>
    )
}

export default BoxCircleChart;