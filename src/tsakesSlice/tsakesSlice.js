import { createSlice } from '@reduxjs/toolkit'

export const tsakesSlice = createSlice({
  name: 'tasks',
  initialState: {
    userId: JSON.parse(localStorage.getItem("data"))._id,
  }, reducers: {
    setRefetch(state, actions) {
      state.refetch = actions.payload
    }


  }
})
export const { setRefetch } = tsakesSlice.actions

export default tsakesSlice.reducer