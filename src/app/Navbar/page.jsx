"use client";
import Link from 'next/link';
import React, { useContext } from 'react';
import { tokenContext } from '../context/tokenContext';
import { useRouter } from 'next/router';



export default function Navbar() {
  let { token,setToken } = useContext(tokenContext);
  // const router = useRouter();

  function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("data")
    setToken(null);
    // router.push("/login")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" href="/">
          Trello
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" href="/">
                Home
              </Link>
            </li>
            {token ? (
              <>
              <li className="nav-item">
                <Link className="nav-link" href="/user">
                  Profile
                </Link>
                </li>
                <li className="nav-item">
                <button className="nav-link" onClick={logout} >
                  Logout
                </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" href="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/signup">
                    Signup
                  </Link>
                </li>
              </>
            )}
           
          </ul>
        </div>
      </div>
    </nav>
  );
}
