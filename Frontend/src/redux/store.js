import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice"
import hotelSlice from "./hotelSlice"

export const store = configureStore({
    reducer:{
        user:userSlice,
        hotel:hotelSlice
    }
})

// import { createStore } from 'redux'
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
// import rootReducer from './reducers'
 
// const persistConfig = {
//   key: 'root',
//   storage,
// }
 
// const persistedReducer = persistReducer(persistConfig, rootReducer)
 
// export default () => {
//   let store = createStore(persistedReducer)
//   let persistor = persistStore(store)
//   return { store, persistor }
// }