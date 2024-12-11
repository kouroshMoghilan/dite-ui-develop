import WhiteScreen from "../../components/template/WhiteScreen";
import LoginForm from "./components/LoginForm";

const Login: React.FC = () => {

    return (
        <div className="center-page !min-h-screen">
            <WhiteScreen className="!p-1">
                <LoginForm />
            </WhiteScreen>
        </div>
    );
};

export default Login