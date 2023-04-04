import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSageMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootSaga from "./sagas";
import authReducer from "./features/auth/authSlice";
import userReducer from "./features/user/userSlice";

const sagaMiddleware = createSageMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth", "user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(
      sagaMiddleware
    ),
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
