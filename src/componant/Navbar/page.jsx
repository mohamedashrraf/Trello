"use client";
import Link from 'next/link';
import React, { useContext } from 'react';
import { tokenContext } from '../../context/tokenContext';
import "bootstrap/dist/js/bootstrap"
import {useRouter} from "next/navigation"

export default function Navbar() {
  let { token, setToken } = useContext(tokenContext);
const router = useRouter()

  function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("data")
    setToken(null);
    router.push("/login")
  }

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" href="/"> <img src="/images/logo.png" alt="Trello" style={{ width: "100px" }} /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" href="/">Home</Link>
            </li>
           {!localStorage.getItem("data")&& <>
            <li className="nav-item">
              <Link className="nav-link" href='./login'>Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href='./signup'>Sign Up</Link>
            </li>
            </>}
           {!localStorage.getItem("data") || <>
            <li className="nav-item">
              <Link className="nav-link" href='./user'>user</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href='./tasks'>tasks</Link>
              </li>
              <li className="nav-item">
              <button className="nav-link" onClick={logout}>Logout</button>
            </li>
            <li className="nav-item">
              <a className="nav-link " onClick={(e)=>{e.preventDefault(); googleLogout();logout()}} style={{cursor:"pointer"}} >logout</a>
            </li>
            </>}
          </ul>

        </div>
      </div>
    </nav>
  )

}
