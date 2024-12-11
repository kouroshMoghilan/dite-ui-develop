import PageTitle from "../../components/template/PageTitle";
import WhiteScreen from "../../components/template/WhiteScreen";
import MultiStepForm from "./components/MultiStepForm";


const RegistrationRequest: React.FC = () => {


    return (
        <div className="center-page !min-h-screen">
            <PageTitle className="w-3/4" title="نظرسنجی: " />
            <WhiteScreen className="!m-5">
                <MultiStepForm />
            </WhiteScreen>
        </div>
    )
}

export default RegistrationRequest;