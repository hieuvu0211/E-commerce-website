import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../Slices/authSlice";
import {StyledForm} from "./StyledForm";
import {useNavigate} from "react-router";
const Login = () => {
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
        email: "",
        password: "",
    });
    const handleSubmit = (e:any) => {
        e.preventDefault();
        // @ts-ignore
        dispatch(loginUser(user))
    }
    return (
        <>
            <StyledForm onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input type="email" placeholder="email"
                       onChange={(e) => setUser({...user, email:e.target.value})}/>
                <input type="password" placeholder="password"
                       onChange={(e) => setUser({...user, password:e.target.value})}/>
                <button>
                    {auth.loginStatus === "pending"? "Submitting" : "Login"}
                </button>

                {auth.loginStatus === "rejected" ? <p>{auth.loginError}</p> : null}
            </StyledForm>
        </>
    )
}
export default Login;