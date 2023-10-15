import React from 'react'
import axios from 'axios'
export default function useApi() {
    const url = "https://trello-app-api-n2zs.onrender.com/api/v1"
     return axios.create({baseURL:url})
    
}
