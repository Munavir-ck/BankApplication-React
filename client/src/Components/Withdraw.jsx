import React, { useState } from 'react'
import Navbar from './Navbar/Navbar'
import axios from "../Axios/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Withdraw() {


    const[amount,setAmount]=useState(null)
   

    const handlAmount=(e)=>{
        console.log(33333333);
        setAmount(e.target.value)
    }
 

 const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post( "/withdraw",{amount}, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }).then((res)=>{
        if (res.data.status) {
           
            toast.success("success");
        }
        else{
            toast.error(res.data.message)
        }
      })
 }  
  return (
    <div>
    <Navbar/>
<div class="">
<div class="p-8 lg:w-1/2 mx-auto">
<ToastContainer/>
<div class="bg-gray-100 rounded-b-lg py-12 px-4 lg:px-24">
  <p class="text-center text-lg text-gray-500 font-light font-bold">
 WITHDRAW
  </p>
  <form class="mt-6" onSubmit={handleSubmit}>
    <div class="relative">
      <input
    value={amount}
onChange={handlAmount}
        class="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
        id="username"
        type="number"
        placeholder="amount"
      />
   
    </div>
  
   
    <div class="flex items-center justify-center mt-8">
      <button
        class="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
      >
       Withdraw
      </button>
    </div>
  </form>
</div>
</div>
</div>
</div>
  )
}

export default Withdraw
