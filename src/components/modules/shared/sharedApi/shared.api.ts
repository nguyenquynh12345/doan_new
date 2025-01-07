import axiosFactory from '@/shared/config/axios-interceptor';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUserById = createAsyncThunk(`get-info-by-id/user`, async (params: string, thunkAPI) => {
  try {
    const { data } = await axiosFactory.get(`user/${params}`);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
