import { configureStore, createSlice, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import {persistReducer} from "redux-persist"

const initialuserState = {
  value: {
    logged: false,
    username: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: initialuserState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state, action) => {
      state.value = initialuserState.value
    },
  },
})

const presistConfig = {
    key: 'root',
    version: 1,
    storage,
}




const reducer = combineReducers({
    user:userSlice.reducer
})

const persistedReducer=persistReducer(presistConfig,reducer)

export const {login,logout}=userSlice.actions

export const store = configureStore({
    reducer:persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck:false
      })
})
