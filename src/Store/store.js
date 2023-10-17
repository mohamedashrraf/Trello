import { configureStore } from '@reduxjs/toolkit'
import tasks from "@/tsakesSlice/tsakesSlice"
export default configureStore({
  reducer: {tasks},
})