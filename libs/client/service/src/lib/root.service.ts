import authReducer from './auth.service';
import globalReducer from './global.service';
import menuReducer from './menu.service';
import userReducer from './user.service';
import roleReducer from './role.service';
import dataDictionaryReducer from './data-dictionary.service';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const rootReducers = {
  authReducer,
  globalReducer,
  menuReducer,
  userReducer,
  roleReducer,
  dataDictionaryReducer,
};
const store = configureStore({
  reducer: rootReducers,
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type RootDispatch = typeof store.dispatch;
export const useRootDispatch: () => RootDispatch = useDispatch;
export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
