import Login from './Login';
import { useLocation } from 'react-router-dom';

export default function SuccessSignup(){
    const location = useLocation();

    return (
        <div className="bg-zinc-900 w-full h-screen">
            <Login 
                heading = {false}
                showSignupLink = {false}
            >
                <h2 className="font-medium text-zinc-900">{location.state.backendResponse}</h2>
            </Login>
        </div>
    )
}