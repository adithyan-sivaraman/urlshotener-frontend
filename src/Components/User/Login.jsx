import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faEye, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from "../../Context/UserContext";
import Login from '../../assets/login.png'
import AlertDialog from "../Dialog";
import { apiEndpoint } from "../../Config";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordType, setPasswordType] = useState(true);
    const {dialogOpen, setDialogOpen, setDialogText,setUrlData } = UserContext();
    const [spinner,setSpinner] = useState(false);
    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        (name === "email") ? setEmail(value) : setPassword(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSpinner(true)
        const request = await fetch(`${apiEndpoint}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password }),
        });
        const response = await request.json();
        setSpinner(false)
        if (request.status === 500) {
            setDialogOpen(true)
            setDialogText("Unable to process your request. Please try again")
            return;
        }
        if (response.message === "user not found") {
            setDialogOpen(true)
            setDialogText("Email ID entered is invalid. Please enter a valid Email ID")
            return;
        }
        else if (response.message === "user not active") {
            setDialogOpen(true)
            setDialogText("User ID not activated. Please activate your account")
            return;
        }
        else if (response.message === "incorrect password") {
            setDialogOpen(true)
            setDialogText("Password entered is incorrect. Please enter a valid password")
            return;
        }
        setEmail("");
        setPassword("");
        setUrlData(response.urlData)
        localStorage.setItem("user", JSON.stringify({ "email": email ,"userId":response.userId}))
        navigate('/')

    }
    
    useEffect(()=>{
        window.addEventListener('keydown', (e)=>{
            if(e.key==="Escape" && dialogOpen){
                setDialogOpen(false)
            }
        })
    },[dialogOpen,setDialogOpen])

    if (localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"))) {
        return <Navigate to={'/dashboard'} replace />
    }
    

    return (
        <div className="container select-none">
        {dialogOpen && <AlertDialog />}
            
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex items-center flex-col">
                <img src={Login} alt="" />
                <p className="text-center text-xl font-bold">Welcome to Login</p>
                <div className="mt-4 flex flex-row w-full items-center">
                    <FontAwesomeIcon icon={faEnvelope} className="shadow appearance-none text-xl border py-2 px-3 rounded" />
                    <input className="shadow appearance-none border  rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                        onInput={handleInput}
                        value={email}
                        name="email"
                        id="email"
                        type="text"
                        required
                        placeholder="Email Address" />
                </div>
                <div className="mt-4 flex flex-row w-full items-center relative ">
                    <FontAwesomeIcon icon={faLock} className="shadow appearance-none text-xl border py-2 px-3 rounded" />
                    <input className="shadow appearance-none border  rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                        onInput={handleInput}
                        value={password}
                        name="password"
                        id="password"
                        required
                        type={passwordType ? 'password' : 'text'}
                        placeholder="******************" />
                    <FontAwesomeIcon
                        icon={faEye}
                        className="absolute right-3 top-2 text-xl cursor-pointer"
                        onClick={() => setPasswordType(!passwordType)}
                    />
                </div>
                <div className="flex flex-row mt-4 w-full ">
                    <p
                        onClick={() => navigate('/reset')}
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer">
                        Forgot Password?
                    </p>
                </div>

               { spinner && (
                    <div className="flex w-full justify-center">
                    <div className="spinner"></div>
                    </div>)
                }

                <button
                    className="select-none btn btn-grad mt-4 w-full  tracking-wider  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                    Sign In
                </button>

                <p className="select-none text-center mt-4 tracking-wider text-base font-bold  text-gray-500 hover:text-red-800 cursor-pointer"
                    onClick={() => navigate('/register')}>
                    Dont have an account ? <u>Sign up</u>
                </p>
            </form>
        </div>

    )
}

export default LoginScreen;