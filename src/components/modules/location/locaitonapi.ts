import { IParams } from '@/shared/shared-interfaces';
import axiosFactory from '@/shared/config/axios-interceptor';
import { createAsyncThunk } from '@reduxjs/toolkit';

export interface IExpertSearchParams extends IParams { }

export const getEntities = createAsyncThunk(`get-list-locations`, async (_, thunkAPI) => {
    try {
        const { data } = await axiosFactory.get(`locations`);
        return data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const createEntity = createAsyncThunk(`create-locations`, async (body: any, thunkAPI) => {
    try {
        const { data } = await axiosFactory.post(`locations`, body);
        return data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const updateEntity = createAsyncThunk(`update-locations`, async (body: any, thunkAPI) => {
    try {
        const { data } = await axiosFactory.put(`locations/${body.id}`, body);
        return data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const removeEntity = createAsyncThunk(`remove-locations`, async (id: string, thunkAPI) => {
    try {
        await axiosFactory.delete(`locations/${id}`);
        return id;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error);
    }
});