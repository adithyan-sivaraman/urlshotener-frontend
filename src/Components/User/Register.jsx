import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser, faEnvelope, faEye } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from "../../Context/UserContext";
import Register from '../../assets/register.png'
import AlertDialog from "../Dialog";
import { apiEndpoint } from "../../Config";

const RegisterScreen = () => {
    const initialValues = {
        fname: "",
        lname: "",
        email: "",
        password: "",
        active: false,
    }
    const [formData, setFormData] = useState(initialValues)
    const [passwordType, setPasswordType] = useState(true)
    const [ruleVisible, setRulesVisible] = useState(false)
    const navigate = useNavigate();
    const { dialogOpen, setDialogOpen, setDialogText } = UserContext();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!regex.test(formData.password)) {
            setDialogOpen(true)
            setDialogText("Please enter a valid password")
            return;
        }

        const request = await fetch(`${apiEndpoint}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        });
        const response = await request.json();

        if (request.status === 500) {
            setDialogOpen(true)
            setDialogText("Unable to process your request. Please try again")
            return;
        }
        setFormData(initialValues)
        if (response.message === "user exists") {
            setDialogOpen(true)
            setDialogText("User exists already! Kindly proceed to login")

            return;
        }
        if (response.message === "user created") {
            setDialogOpen(true)
            setDialogText("User created! Kindly activate your account")

        }

    }

    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && dialogOpen) {
                setDialogOpen(false)
            }
        })
    }, [dialogOpen, setDialogOpen])

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    if (localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"))) {
        return <Navigate to={'/dashboard'} replace />
    }

    return (
        <div className="container select-none">
            {dialogOpen && <AlertDialog />}
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded p-4 flex flex-col items-center">
                <img src={Register} alt="" />
                <p className="text-center text-xl font-bold">Register yourself! </p>
                <div className="input-group">
                    <FontAwesomeIcon icon={faUser} className="relative-icon" />

                    <input className="form-input"
                        onInput={handleInput}
                        required
                        value={formData.fname}
                        name="fname"
                        id="fname"
                        type="text"
                        placeholder="First Name" />
                </div>
                <div className="input-group">
                    <FontAwesomeIcon icon={faUser} className="relative-icon" />
                    <input className="form-input"
                        onInput={handleInput}
                        required
                        value={formData.lname}
                        name="lname"
                        id="lname"
                        type="text"
                        placeholder="Last Name" />
                </div>
                <div className="input-group">
                    <FontAwesomeIcon icon={faEnvelope} className="relative-icon" />
                    <input className="form-input"
                        onInput={handleInput}
                        required
                        value={formData.email}
                        name="email"
                        id="username"
                        type="email"
                        placeholder="Username" />
                </div>
                <div className="input-group relative">
                    <FontAwesomeIcon icon={faLock} className="relative-icon" />
                    <input className="form-input"
                        onInput={handleInput}
                        onFocus={() => setRulesVisible(!ruleVisible)}

                        required
                        value={formData.password}
                        name="password"
                        id="password"
                        type={passwordType ? 'password' : 'text'}
                        placeholder="******************" />
                    <FontAwesomeIcon
                        icon={faEye}
                        className="password-icon"
                        onClick={() => setPasswordType(!passwordType)}
                    />
                </div>

                {ruleVisible && (
                    <div className="pwd-rules">
                        <span className="">Password must be atleast 8 characters and atleast</span>
                        <span className="">1 Capital Letter</span>
                        <span className="">1 Small Letter</span>
                        <span className="">1 Number</span>
                        <span className="">1 Special Character ( ! @ # $ & * )</span>
                    </div>
                )}

                <button
                    onClick={() => setRulesVisible(!ruleVisible)}
                    className="btn btn-grad mt-4 w-full  tracking-wider  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                    Register
                </button>

                <p className="text-center mt-4 tracking-wider text-base font-bold  text-gray-500 hover:text-red-800 cursor-pointer"
                    onClick={() => navigate('/')}>
                    Have an account ? <u>Sign in</u>
                </p>
            </form>
        </div>

    )
}

export default RegisterScreen;