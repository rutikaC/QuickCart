import { useState } from "react";
import axios from "axios";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/register",
        formData
      );
      console.log(formData)
      console.log(response.data);

      alert("Registration Successful");

    } catch (error) {

      console.log(error.response.data);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
   <div className="flex items-center justify-center h-screen bg-gray-100">

  <div className="w-96 h-80 border bg-white shadow-md">

    <h1 className="text-3xl font-semibold text-center mb-2">
      Register
    </h1>
     
    
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
    <div className="flex flex-col items-center gap-4 m-1 ">
        
      <input
        type="text"
        name="name"
        placeholder="Enter name"
        onChange={handleChange}
        className="border p-2 rounded-md"
      />

      <input
        type="email"
        name="email"
        placeholder="Enter email"
        onChange={handleChange}
        className="border p-2 rounded-md"
      />

      <input
        type="password"
        name="password"
        placeholder="Enter password"
        onChange={handleChange}
        className="border p-2 rounded-md"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        Register
      </button>
    </div>
    </form>

  </div>

</div>
  );
}

export default  Register;