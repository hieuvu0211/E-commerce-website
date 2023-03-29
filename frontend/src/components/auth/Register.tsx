import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../Slices/authSlice";
import {StyledForm} from "./StyledForm";
import {useNavigate} from "react-router";
const register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state:any) =>state.auth)
    useEffect(() => {
        if (auth._id) {
            navigate("/cart")
        }
    },[auth._id, navigate]);
    console.log("auth", auth);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });
const handleSubmit = (e:any) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(registerUser(user))
}
    return (
        <>
            <StyledForm onSubmit={handleSubmit}>
                <h2>Register</h2>
                <input type="text" placeholder="name"
                       onChange={(e) => setUser({...user, name:e.target.value})}/>
                <input type="email" placeholder="email"
                       onChange={(e) => setUser({...user, email:e.target.value})}/>
                <input type="password" placeholder="password"
                       onChange={(e) => setUser({...user, password:e.target.value})}/>
                <button>
                    {auth.registerStatus === "pending"? "Submitting" : "Register"}
                </button>

                {auth.registerStatus === "rejected" ? <p>{auth.registerError}</p> : null}
            </StyledForm>
        </>
    )
}
export default register;