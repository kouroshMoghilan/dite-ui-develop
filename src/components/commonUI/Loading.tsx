import { Spin } from "antd"
interface load {
    isLoading:boolean
}
const Loading = ({isLoading}:load) => {
    return (
        isLoading?
        <div className="absolute end-0 top-0 z-40 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-25 backdrop-blur-sm p-8 rounded-lg">
            <Spin size="large" spinning={isLoading} />
        </div>
        :null
    )
}
export default Loading