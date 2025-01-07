import { Gender } from '@/shared/enumeration/userEnum';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@shared/config/axios-interceptor';
import { pickBy } from 'lodash';

const prefix = 'auth';
const userPrefix = 'user';

export interface ILoginForm {
  userName: string;
  password: string;
  rePassword?: string;
}

export const login = createAsyncThunk(`login`, async (body: ILoginForm, thunkAPI) => {
  try {
    const { data } = await axios.post(`/auth/login`, pickBy(body));
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const registerBill = createAsyncThunk(`register`, async (body: ILoginForm, thunkAPI) => {
  try {
    const { data } = await axios.post(`/auth/register`, pickBy(body));
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getUserInfo = createAsyncThunk(`get-${userPrefix}-info`, async (_, thunkAPI) => {
  try {
    const { data } = await axios.get(`/users/profile`);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export interface IUpdateUserInfo {
  firstName: string;
  lastName: string;
  dob: string;
  phoneNumber: string;
  imageUrl: string;
  gender?: Gender;
}

export const updateUserInfo = createAsyncThunk(`update-${userPrefix}-info`, async (body: IUpdateUserInfo, thunkAPI) => {
  try {
    const { data } = await axios.put(`${userPrefix}/update`, body);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export interface IUpdateUserEmail {
  newEmail: string;
  signature: string;
}

export const updateUserEmail = createAsyncThunk(
  `update-${userPrefix}-email`,
  async (body: IUpdateUserEmail, thunkAPI) => {
    try {
      const { data } = await axios.put(`${prefix}/change-mail`, body);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export interface IUpdateUserWallet {
  userId: string;
  tokenChangeWallet: string;
  newWalletAddress: string;
}

export const updateUserWallet = createAsyncThunk(
  `update-${userPrefix}-wallet`,
  async (body: IUpdateUserWallet, thunkAPI) => {
    try {
      const { data } = await axios.put(`${prefix}/change-wallet`, body);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export interface IUpdateUserWalletLink {
  newWalletAddress: string;
  signature: string;
}

export const createUpdateUserWalletLink = createAsyncThunk(
  `create-${userPrefix}-wallet-link`,
  async (body: IUpdateUserWalletLink, thunkAPI) => {
    try {
      const { data } = await axios.put(`${prefix}/verify-change-wallet`, body);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export interface IUpdateUserPin {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  signature: string;
}

export const updateUserPin = createAsyncThunk(`update-${userPrefix}-pin`, async (body: IUpdateUserPin, thunkAPI) => {
  try {
    const { data } = await axios.put(`${prefix}/change-pass`, body);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export interface IActiveAccount {
  id: string;
  publicAddress: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  signature: string;
  confirmTerms: boolean;
}

export const updateActiveUser = createAsyncThunk(`update-${prefix}-active`, async (body: IActiveAccount, thunkAPI) => {
  try {
    const { data } = await axios.put(`${prefix}/set-pass`, body);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getManagerInfo = createAsyncThunk(`get-${userPrefix}-manager-info`, async (id: string, thunkAPI) => {
  try {
    const { data } = await axios.get(`manager/${id}`);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
