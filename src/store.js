import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './features/login/loginSlice'

export default configureStore({
  reducer: {
      login: loginSlice
  }
})