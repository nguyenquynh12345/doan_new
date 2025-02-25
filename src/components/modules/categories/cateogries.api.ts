import { IParams } from '@/shared/shared-interfaces';
import axiosFactory from '@/shared/config/axios-interceptor';
import { createAsyncThunk } from '@reduxjs/toolkit';

export interface IExpertSearchParams extends IParams { }

export const getEntities = createAsyncThunk(`get-list-categories`, async (_, thunkAPI) => {
    try {
        const { data } = await axiosFactory.get(`categories`);
        return data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const createEntity = createAsyncThunk(`create-categories`, async (body: any, thunkAPI) => {
    try {
        const { data } = await axiosFactory.post(`categories`, body);
        return data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const updateEntity = createAsyncThunk(`update-categories`, async (body: any, thunkAPI) => {
    try {
        const { data } = await axiosFactory.put(`categories/${body.id}`, body);
        return data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const removeEntity = createAsyncThunk(`remove-categories`, async (id: string, thunkAPI) => {
    try {
        await axiosFactory.delete(`categories/${id}`);
        return id;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error);
    }
});