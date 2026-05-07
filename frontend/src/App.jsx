import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";

function App() {


  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element ={<Register/>} />
         <Route path="/login" element ={<Login/>} />
      </Routes>
    </div>
  )
}

export default App
