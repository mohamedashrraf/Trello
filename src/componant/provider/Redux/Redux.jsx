"use client";
import store from "@/Store/store";

import React from "react";
import { Provider } from "react-redux";

export default function Redux({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
