"use client";
import React, { useEffect, createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

const UserContextProvider = ({ children, id }) => {
  const [user, setUser] = useState(null);

  
    async function fetchData(data,id) {
      try {
        const response = await axios.patch(`https://trello-app-api-n2zs.onrender.com/api/v1/users/user/${id}`,
          data,
          {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        const userData = response.data;
        console.log(userData);
        setUser(userData.userName);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }  

  return (
    <UserContext.Provider value={{ user, setUser, fetchData}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;