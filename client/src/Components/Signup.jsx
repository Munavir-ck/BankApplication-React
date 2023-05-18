import React from "react";
import { useState } from "react";
import axios from "../Axios/axios";
import validate from "../Validation/validation";
import { useNavigate } from "react-router-dom";

function Signup() {

    const navigate=useNavigate()
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
   
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    
    setFormErrors(validate(formValues));

    
  
    if (Object.keys(formErrors).length === 0) {
      console.log(4444444);

    await  axios.post("/signup", { formValues }).then((res)=>{
        console.log(res);
        if (res.data.status) {
            navigate("/")
        }
      })
    }
  };

 

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">
                Signup Form with Floating Labels
              </h1>
            </div>
            <form    onSubmit={handleSubmit}>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <p className="text-red-600"> {formErrors.name}</p>
                <div className="relative">
                  <input
                    onChange={handleChange}
                    autocomplete="off"
                    id="name"
                    name="name"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Email address"
                  />
                  <label
                    for="name"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Name
                  </label>
                </div>
                <p className="text-red-600"> {formErrors.email}</p>
                <div className="relative">
                  <input
                    onChange={handleChange}
                    autocomplete="off"
                    id="email"
                    name="email"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Email address"
                  />
                  <label
                    for="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                </div>
                <p className="text-red-600"> {formErrors.password}</p>
                <div className="relative">
                  <input
                    onChange={handleChange}
                    autocomplete="off"
                    id="password"
                    name="password"
                    type="password"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Password"
                  />
                  <label
                    for="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <button
                    type="submit"
                  
                    className="bg-blue-500 text-white rounded-md px-2 py-1"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
