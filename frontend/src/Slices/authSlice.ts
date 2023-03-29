import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {url} from "./api";
import jwtDecode from "jwt-decode";
const initialState = {
    token: localStorage.getItem("token"),
    name: "",
    email: "",
    _id: "",
    registerStatus: "",
    registerError: "",
    loginStatus: "",
    loginError: "",
    userloaded: false
}

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async(users:any, {rejectWithValue}) => {
        try {
             const token = await axios.post(`${url}/register`,{
                 name: users.name,
                 email: users.email,
                 password: users.password
             });
            localStorage.setItem('token', token.data);
            return token.data;
        }catch (err:any) {
            console.log(err.response.data);
            return rejectWithValue(err.response.data);
        }
    }
)
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async(users:any, {rejectWithValue}) => {
        try {
             const token = await axios.post(`${url}/login`,{
                 email: users.email,
                 password: users.password
             });
            localStorage.setItem('token', token.data);
            return token.data;
        }catch (err:any) {
            console.log(err.response.data);
            return rejectWithValue(err.response.data);
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loadUser(state, action) {
            const token = state.token
            if(token){
                const user:any = jwtDecode(token);
                return {
                    ...state,
                    token,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    userLoaded:true,
                }
            }
},
        logoutUser(state, action) {
            localStorage.removeItem("token")
            return {
                ...state,
                token: "",
                name: "",
                email: "",
                _id: "",
                registerStatus: "",
                registerError: "",
                loginStatus: "",
                loginError: "",
                userloaded: false
            }
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(registerUser.pending, (state:any, action:any) => {
            return {...state, registerStatus: "pending"}
        })
        builder.addCase(registerUser.fulfilled, (state:any, action:any) => {
            if (action.payload){
                const user:any = jwtDecode(action.payload)
                return {
                ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    _id:user._id,
                    registerStatus: "success"
                }
            }else return state;
        })
        builder.addCase(registerUser.rejected, (state:any, action:any) => {
            return {
                ...state,
                registerStatus:"rejected",
                registerError: action.payload
            }
        })
        builder.addCase(loginUser.pending, (state:any, action:any) => {
            return {...state, loginStatus: "pending"}
        })
        builder.addCase(loginUser.fulfilled, (state:any, action:any) => {
            if (action.payload){
                const user:any = jwtDecode(action.payload)
                return {
                ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    _id:user._id,
                    loginStatus: "success"
                }
            }else return state;
        })
        builder.addCase(loginUser.rejected, (state:any, action:any) => {
            return {
                ...state,
                loginStatus:"rejected",
                loginError: action.payload
            }
        })
    }
});
export const {loadUser, logoutUser} = authSlice.actions
export default authSlice.reducer;