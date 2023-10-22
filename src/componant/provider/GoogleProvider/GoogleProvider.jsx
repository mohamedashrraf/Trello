"use client";
import store from "@/Store/store";
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from "react";
import { Provider } from "react-redux";

export default function GoogleProvider({ children }) {
  return <GoogleOAuthProvider clientId="880761381934-16eu08t3on4omt7mhtpspnds25quusdj.apps.googleusercontent.com">{children}</GoogleOAuthProvider>;
}


