import { IParams } from '@/shared/shared-interfaces';
import axiosFactory from '@/shared/config/axios-interceptor';
import { createAsyncThunk } from '@reduxjs/toolkit';

export interface IExpertSearchParams extends IParams { }

export const getEntities = createAsyncThunk(`get-list-post`, async (_, thunkAPI) => {
  try {
    const { data } = await axiosFactory.get(`listings`);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const getCategoriesRoom = createAsyncThunk(`get-list-category-rooms`, async (_, thunkAPI) => {
  try {
    const { data } = await axiosFactory.get(`categories`);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const getLocationsRoom = createAsyncThunk(`get-list-locations-rooms`, async (_, thunkAPI) => {
  try {
    const { data } = await axiosFactory.get(`locations`);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const getEntitie = createAsyncThunk(`get-detail-post`, async (id: any, thunkAPI) => {
  try {
    const { data } = await axiosFactory.get(`listings/${id}`);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const createEntity = createAsyncThunk(`rooms-create`, async (body: any, thunkAPI) => {
  try {
    const { data } = await axiosFactory.post(`listings`, body);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const updateEntity = createAsyncThunk(`update-user`, async (body: any, thunkAPI) => {
  try {
    const { data } = await axiosFactory.put(`listings/${body.id}`, body);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const removeEntity = createAsyncThunk(`remove-rooms`, async (id: string, thunkAPI) => {
  try {
    await axiosFactory.delete(`rooms/${id}`);
    return id;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const uploadImage = createAsyncThunk(`upload/image`, async (body: { file: File }, thunkAPI) => {
  try {
    const formData = new FormData();
    formData.append('file', body.file);

    const { data } = await axiosFactory.post(`upload/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});
export const unapproved = createAsyncThunk(`get-unapproved-post`, async (_, thunkAPI) => {
  try {
    const { data } = await axiosFactory.get(`listings/unapproved`);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const approved = createAsyncThunk(`set-approve-post`, async (id: any, thunkAPI) => {
  try {
    const { data } = await axiosFactory.post(`listings/${id}/approve`);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});