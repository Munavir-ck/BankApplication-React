import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import axios from "../Axios/axios";
import { useActionData } from "react-router-dom";

function Home() {
  const [balance, setBalance] = useState(false);

  const [user,setUser]=useState({})

  useEffect(()=>{
  axios.get("/profile", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  }).then((res)=>{
    console.log(res.data.result);
 setUser(res.data.result)
  })
  },[])

  return (
    <div>
      <Navbar />

<h>asdjsmdnmsdn</h>
      <div className="flex items-center my-20 justify-center  ">
        <div className="max-w-xs">
          <div className="bg-white shadow-xl rounded-lg py-3 w-96">
            <div className="photo-wrapper p-2">
              <img
                className="w-32 h-32 rounded-full mx-auto"
                src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                alt="img"
              />
            </div>
            <div className="p-2">
              <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
              {user.name}
              </h3>
              <div className="text-center text-gray-400 text-xs font-semibold">
                <p></p>
              </div>
              <table className="text-center my-3">
                <tbody>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      Phone
                    </td>
                    <td className="px-2 py-2">+977 9955221114</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      Email
                    </td>
                    <td className="px-2 py-2">{user.email}</td>
                  </tr>
                </tbody>
              </table>

              <div className="text-center my-3">
                <p
                  onClick={() => setBalance(!balance)}
                  className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 cursor-pointer font-medium"
                >
                  View Balance
                </p>
                <div className={`${balance ? "font-bold" : "hidden"}`}>
                 ${user.balance}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
