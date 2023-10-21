"use client";
import React, { useEffect, createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

const UserContextProvider = ({ children, id }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let id = JSON.parse(localStorage.getItem("data"))._id;
      try {
        const response = await axios.post(`https://trello-app-api-n2zs.onrender.com/api/v1/users/user/${id}`,
          {
          userName:res
        },
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

    fetchData();
  }, [id]); 

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
