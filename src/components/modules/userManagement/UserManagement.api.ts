import { IParams } from '@/shared/shared-interfaces';
import axiosFactory from '@/shared/config/axios-interceptor';
import { createAsyncThunk } from '@reduxjs/toolkit';

export interface IExpertSearchParams extends IParams { }

export const getEntities = createAsyncThunk(`get-list-user`, async (_, thunkAPI) => {
  try {
    const { data } = await axiosFactory.get(`users`);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateEntity = createAsyncThunk(`update-user`, async (body: any, thunkAPI) => {
  try {
    const { data } = await axiosFactory.put(`users/${body.id}`, body);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const removeEntity = createAsyncThunk(`remove-user`, async (id: string, thunkAPI) => {
  try {
    await axiosFactory.delete(`users/${id}`);
    return id;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});