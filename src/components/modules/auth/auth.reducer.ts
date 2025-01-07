import { IResponse } from '@/shared/shared-interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@shared/model/user.model';
import {
  createUpdateUserWalletLink,
  getManagerInfo,
  getUserInfo,
  login,
  registerBill,
  updateActiveUser,
  updateUserEmail,
  updateUserInfo,
  updateUserPin,
  updateUserWallet,
} from './auth.api';

interface IInitialLoginState {
  loading: boolean;
  errorMessage: string | null;
  errorCode: string | null;

  loginSuccess: boolean;
  token: string | null;
  refreshToken: string | null;

  // user
  userInfo: any;
  userKeycloakInfo: any | null;
  getAccountSuccess: boolean;
  loadingUserInfo: boolean;
  errorUserInfo: string | null;
  updateUserInfoSuccess: boolean;
  createUpdateUserWalletLinkSuccess: boolean;

  // manager
  managerInfo: any;
  getManagerInfoSuccess: boolean;
  activeAccountSuccess: boolean;
  registerSuccess: any;
}

const initialState: IInitialLoginState = {
  loading: false,
  errorMessage: null,
  errorCode: null,
  loginSuccess: false,
  registerSuccess: false,
  token: null,
  refreshToken: null,

  // user
  getAccountSuccess: false,
  loadingUserInfo: false,
  userInfo: null,
  userKeycloakInfo: null,
  errorUserInfo: null,
  updateUserInfoSuccess: false,
  createUpdateUserWalletLinkSuccess: false,

  // manageer
  managerInfo: null,
  getManagerInfoSuccess: false,
  activeAccountSuccess: false,
};

const { actions, reducer } = createSlice({
  name: 'authenticationSlice',
  initialState,
  reducers: {
    fetching(state) {
      state.loading = true;
    },
    fetchingUserInfo(state) {
      state.loadingUserInfo = true;
    },
    logout(state) {
      state.token = null;
      state.refreshToken = null;
      state.userInfo = null;
      state.userKeycloakInfo = null;
      localStorage.removeItem('authentication_token');
      localStorage.removeItem('refresh_token');
    },
    resetAll(state) {
      state.loading = false;
      state.loginSuccess = false;
      state.registerSuccess = false;
      state.token = null;
      state.refreshToken = null;
      state.errorMessage = null;
      state.errorCode = null;
    },
    resetAllUserInfo(state) {
      state.userInfo = null;
      state.userKeycloakInfo = null;
      state.errorUserInfo = null;
      state.getAccountSuccess = false;
      state.loadingUserInfo = false;
      state.updateUserInfoSuccess = false;
      state.createUpdateUserWalletLinkSuccess = false;
    },
    resetUserInfo(state) {
      state.errorUserInfo = null;
      state.getAccountSuccess = false;
      state.loadingUserInfo = false;
      state.updateUserInfoSuccess = false;
      state.createUpdateUserWalletLinkSuccess = false;
    },
    resetEntity(state) {
      state.loginSuccess = false;
      state.loading = false;
      state.errorMessage = null;
      state.errorCode = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }: PayloadAction<any>) => {
      console.log(payload.data.access_token, 'access_token');

      localStorage.setItem('authentication_token', payload.data.access_token);
      localStorage.setItem('refresh_token', payload.data.refresh_token);
      state.token = payload.access_token;
      state.refreshToken = payload.refresh_token;
      state.loginSuccess = true;
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, { payload }: PayloadAction<any>) => {
      localStorage.removeItem('authentication_token');
      localStorage.removeItem('refresh_token');
      state.errorMessage = payload?.message;
      state.errorCode = payload?.code;
      state.loading = false;
      state.loginSuccess = false;
    });

    builder.addCase(getUserInfo.fulfilled, (state, { payload }: PayloadAction<any>) => {
      state.userInfo = payload;
      state.getAccountSuccess = true;
      state.loadingUserInfo = false;
    });
    builder.addCase(getUserInfo.rejected, (state, { payload }: PayloadAction<any>) => {
      localStorage.removeItem('authentication_token');
      localStorage.removeItem('refresh_token');
      state.getAccountSuccess = false;
      state.loadingUserInfo = false;
      state.errorUserInfo = payload?.code;
    });

    builder.addCase(updateUserInfo.fulfilled, (state, { payload }: PayloadAction<IResponse<IUser>>) => {
      state.userInfo = payload.data;
      state.updateUserInfoSuccess = true;
      state.loadingUserInfo = false;
    });
    builder.addCase(updateUserInfo.rejected, (state, { payload }: PayloadAction<any>) => {
      state.updateUserInfoSuccess = false;
      state.loadingUserInfo = false;
      state.errorUserInfo = payload?.code;
    });

    builder.addCase(updateUserEmail.fulfilled, (state, { payload }: PayloadAction<IResponse<IUser>>) => {
      state.userInfo = payload.data;
      state.updateUserInfoSuccess = true;
      state.loadingUserInfo = false;
    });
    builder.addCase(updateUserEmail.rejected, (state, { payload }: PayloadAction<any>) => {
      state.updateUserInfoSuccess = false;
      state.loadingUserInfo = false;
      state.errorUserInfo = payload?.code;
    });

    builder.addCase(updateUserPin.fulfilled, (state) => {
      state.updateUserInfoSuccess = true;
      state.loadingUserInfo = false;
    });
    builder.addCase(updateUserPin.rejected, (state, { payload }: PayloadAction<any>) => {
      state.updateUserInfoSuccess = false;
      state.loadingUserInfo = false;
      state.errorUserInfo = payload?.code;
    });
    builder.addCase(createUpdateUserWalletLink.fulfilled, (state) => {
      state.createUpdateUserWalletLinkSuccess = true;
      state.loadingUserInfo = false;
    });

    builder.addCase(createUpdateUserWalletLink.rejected, (state, { payload }: PayloadAction<any>) => {
      state.createUpdateUserWalletLinkSuccess = false;
      state.loadingUserInfo = false;
      state.errorUserInfo = payload?.code;
    });

    builder.addCase(updateUserWallet.fulfilled, (state, { payload }: PayloadAction<IResponse<IUser>>) => {
      state.userInfo = payload.data;
      state.updateUserInfoSuccess = true;
      state.loadingUserInfo = false;
    });
    builder.addCase(updateUserWallet.rejected, (state, { payload }: PayloadAction<any>) => {
      state.updateUserInfoSuccess = false;
      state.loadingUserInfo = false;
      state.errorUserInfo = payload?.code;
    });
    builder.addCase(updateActiveUser.fulfilled, (state) => {
      state.activeAccountSuccess = true;
      state.loading = false;
    });
    builder.addCase(updateActiveUser.rejected, (state, { payload }: PayloadAction<any>) => {
      state.activeAccountSuccess = false;
      state.loading = false;
      state.errorCode = payload?.code;
    });

    builder.addCase(getManagerInfo.fulfilled, (state, { payload }: PayloadAction<IResponse<any>>) => {
      state.managerInfo = payload.data;
      state.getManagerInfoSuccess = true;
      state.loading = false;
    });
    builder.addCase(getManagerInfo.rejected, (state, { payload }: PayloadAction<any>) => {
      state.getManagerInfoSuccess = false;
      state.loading = false;
      state.errorCode = payload?.code;
    });
    builder.addCase(registerBill.fulfilled, (state) => {
      state.registerSuccess = true;
      state.loading = false;
    });
    builder.addCase(registerBill.rejected, (state, { payload }: PayloadAction<any>) => {
      state.registerSuccess = false;
      state.loading = false;
      state.errorCode = payload?.code;
    });
  },
});

export const { fetching, resetAll, resetEntity, logout, fetchingUserInfo, resetAllUserInfo, resetUserInfo } = actions;
export default reducer;
