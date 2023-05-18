import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import axios from "../Axios/axios";
import moment from "moment"

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get("/transactions",{
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTransactions(res.data.result);
      });
  }, []);

  return (
    <div>
      <Navbar />

      <div class="relative overflow-x-auto mt-16 m-5">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                DATE
              </th>
              <th scope="col" class="px-6 py-3">
                AMOUNT
              </th>
              <th scope="col" class="px-6 py-3">
                TYPE
              </th>
              <th scope="col" class="px-6 py-3">
                DETAILS
              </th>
              <th scope="col" class="px-6 py-3">
                BALANCE
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((item, i) => {
              return (
                <tr
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={i}
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                   {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                  </th>
                  <td class="px-6 py-4">${item.amount}</td>
                  <td class="px-6 py-4">{item.type}</td>
                  <td class="px-6 py-4">{item.details}</td>
                  <td class="px-6 py-4">${item.balance}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
