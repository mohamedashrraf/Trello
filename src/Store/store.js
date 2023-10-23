"use client";

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import tasks from "@/tsakesSlice/tsakesSlice"
export default configureStore({
  reducer: { tasks },
  middleware: () =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})