// import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// import thunk from "redux-thunk";
import { rootReducers } from '@eapp/client/service';
// export const store = configureStore (rootReducer);
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
export const store = configureStore({
  reducer: rootReducers,
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type RootDispatch = typeof store.dispatch;
export const useAppDispatch: () => RootDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
