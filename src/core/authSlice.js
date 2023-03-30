import { createSlice } from '@reduxjs/toolkit'
import { onGetUser } from './api_users'

const userAuthFromLocalStorage = () => {
  const isAuth = localStorage.getItem('isAuth')

  if (isAuth && JSON.parse(isAuth) === true) {
    return true
  }

  return false
}

const initialState = {
  isAuth: userAuthFromLocalStorage(),
  userRole: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticateUser: (state) => {
      state.isAuth = true
    },
    unauthenticateUser: (state) => {
      state.isAuth = false
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload
    },
  },
})

export const { authenticateUser, unauthenticateUser, setUserRole } = authSlice.actions

export const getUserRole = () => async (dispatch) => {
  try {
    const users = await onGetUser()
    if (users) {
      dispatch(setUserRole(users.role))
    }
  } catch (error) {
    console.log(error)
  }
}

export default authSlice.reducer




