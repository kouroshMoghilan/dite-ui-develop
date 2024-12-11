import empty from "../../../public/imges/empty.svg";

const EmptyResult =()=> {
    return (
        <div className="flex justify-center items-center flex-col size-full text-center space-y-4 p-4">
            <img src={empty} alt="emptyResult" />
            <h5 className="text-[14px]">متاسفانه دیتایی یافت نشد!</h5>
        </div>
    )
}

export default EmptyResult;