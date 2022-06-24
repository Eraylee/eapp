import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  User,
  LoginReq,
  apiAuthLlogin,
  apiSystemUserGetProfile,
} from '@eapp/client/api';
import { message } from 'antd';
import { Dispatch } from 'react';

export interface LoginState {
  user: Partial<User>;
}
const initialState: LoginState = {
  user: {},
};

const authService = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = initialState.user;
    },
  },
});

export const authServiceActions = authService.actions;

const login =
  (payload: LoginReq) =>
  async (dispatch: Dispatch<ReturnType<typeof authServiceActions.setUser>>) => {
    try {
      const token = await apiAuthLlogin(payload);
      if (token) {
        localStorage.setItem('TOKEN', token);
        const user = await apiSystemUserGetProfile();
        dispatch(authServiceActions.setUser(user));
        localStorage.setItem('USER_INFO', JSON.stringify(user));
        message.success('登录成功');
        return true;
      }
    } catch (error: any) {
      message.error(error?.message ?? '登录失败');
    }
    return false;
  };
/**
 * 退出登录
 */
const logout =
  () =>
  async (
    dispatch: Dispatch<ReturnType<typeof authServiceActions.clearUser>>
  ) => {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('USER_INFO');
    dispatch(authServiceActions.clearUser());
  };
export const authServiceThunks = {
  login,
  logout,
};

export default authService.reducer;
