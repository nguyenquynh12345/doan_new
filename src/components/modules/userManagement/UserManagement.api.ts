import { IParams } from '@/shared/shared-interfaces';
import axiosFactory from '@/shared/config/axios-interceptor';
import { createAsyncThunk } from '@reduxjs/toolkit';

export interface IExpertSearchParams extends IParams {}

export const getEntities = createAsyncThunk(`get-list-user`, async (_, thunkAPI) => {
  try {
    const { data } = await axiosFactory.get(`users/list`);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createEntity = createAsyncThunk(`create-expert`, async (body: any, thunkAPI) => {
  try {
    const { data } = await axiosFactory.post(`apply-expert`, body);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getTokenHold = createAsyncThunk(`country-expert-condition/detail`, async (params: string, thunkAPI) => {
  try {
    const { data } = await axiosFactory.get(`country-expert-condition/detail?countryCode=${params}`);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const cancelExpert = createAsyncThunk(`cancel-expert`, async (id: number, thunkAPI) => {
  try {
    const { data } = await axiosFactory.put(`admin/user/cancel-expert/${id}`);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
