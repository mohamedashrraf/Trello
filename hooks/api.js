import React from 'react'
import axios from 'axios'
const url = "http://127.0.0.1:5000/api/v1"
// const url = "https://trello-app-api-n2zs.onrender.com/api/v1"
export function useApi() {
    return axios.create({ baseURL: url })
}
export function useApiAuth() {
    
    return axios.create({
        baseURL: url, headers: {
            Authorization: localStorage.getItem('token')
        }
    })

}
