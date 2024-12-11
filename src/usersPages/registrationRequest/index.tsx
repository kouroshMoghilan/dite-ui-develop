import PageTitle from "../../components/template/PageTitle";
import WhiteScreen from "../../components/template/WhiteScreen";
import RegistrationForm from "./components/RegistrationForm";


const RegistrationRequest: React.FC = () => {


    return (
        <div className="center-page !min-h-screen">
            <PageTitle className="w-3/4" title="بازدید کننده گرامی درخواست خود را
            از طریق زیر برای ما ارسال کنید:" />
            <WhiteScreen className="!m-5">
                <RegistrationForm />
            </WhiteScreen>
        </div>
    )
}

export default RegistrationRequest;