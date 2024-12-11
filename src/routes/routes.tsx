import { Suspense, lazy } from 'react';
import MainLayout from '../components/template/MainLayout';
import SecondLayout from '../components/template/SecondLayout';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Loading from '../components/commonUI/Loading';

// import pages with lazy loading
const Login = lazy(() => import('../adminPages/login'));
const Archive = lazy(() => import('../adminPages/archive'));
const AddEvent = lazy(() => import('../adminPages/addEvent'));
const SendMessages = lazy(() => import('../adminPages/sendMessages'));
const MessageManager = lazy(() => import('../adminPages/messageManager'));
const VisitorDataEntry = lazy(() => import('../adminPages/visitorDataEntry'));
const ViewRequests = lazy(() => import('../adminPages/viewRequests'));
const ViewPolls = lazy(() => import('../adminPages/viewPolls'));
const DataAnalysis = lazy(() => import('../adminPages/dataAnalysis'));

const RegistrationRequest = lazy(() => import('../usersPages/registrationRequest'));
const SurveyRegistration = lazy(() => import('../usersPages/surveyRegistration'));

const Routings = () => {
    return (
        <Suspense fallback={<Loading isLoading />}>
            <ToastContainer />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate to="/app/archive" replace />} />
                <Route path="/app" element={<Navigate to="/app/archive" replace />} />
                <Route path="/app" element={<MainLayout />}>
                    <Route path="archive" element={<Archive />} />
                    <Route path="add-event" element={<AddEvent />} />
                    <Route path="send-messages" element={<SendMessages />} />
                    <Route path="message-manager" element={<MessageManager />} />
                    <Route path="visitor-data-entry" element={<VisitorDataEntry />} />
                    <Route path="view-requests" element={<ViewRequests />} />
                    <Route path="view-polls" element={<ViewPolls />} />
                    <Route path="data-analysis" element={<DataAnalysis />} />
                </Route>
                <Route path="/users" element={<SecondLayout />}>
                    <Route path="registration-request" element={<RegistrationRequest />} />
                    <Route path="survey-registration" element={<SurveyRegistration />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default Routings;
