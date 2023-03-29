import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Register from "./components/auth/Register";
import NotFound from "./components/NotFound";
import Login from "./components/auth/Login";
import "./App.css";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route path="/cart" element={<Cart/>} />
          <Route path="/not-found" element={<NotFound/>} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Home/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
