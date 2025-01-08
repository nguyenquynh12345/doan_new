import { IParams } from '@/shared/shared-interfaces';
import axiosFactory from '@/shared/config/axios-interceptor';
import { createAsyncThunk } from '@reduxjs/toolkit';

export interface IExpertSearchParams extends IParams {}

export const getEntities = createAsyncThunk(`get-list-post`, async (_, thunkAPI) => {
  try {
    const { data } = await axiosFactory.get(`rooms`);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const getEntitie = createAsyncThunk(`get-detail-post`, async (id: any, thunkAPI) => {
  try {
    const { data } = await axiosFactory.get(`rooms/${id}`);
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
