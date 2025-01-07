import { ICountryInfo } from '@/shared/model/country.model';
import { IUser } from '@/shared/model/user.model';
import { IResponse } from '@/shared/shared-interfaces';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getUserById } from './shared.api';

interface IInitialSharedState {
  loading: boolean;
  errorMessage: string | null;

  // country state
  fetchCountryEntitiesSuccess: boolean;
  countryEntities: ICountryInfo[];
  dataToUser: IUser | null;
}

const initialState: IInitialSharedState = {
  loading: false,
  errorMessage: null,

  // country state
  fetchCountryEntitiesSuccess: false,
  countryEntities: [],
  //ifor user state
  dataToUser: null,
};

const { actions, reducer } = createSlice({
  name: 'sharedSlice',
  initialState,
  reducers: {
    fetching(state) {
      state.loading = true;
    },
    resetAll(state) {
      state.loading = false;
      state.errorMessage = null;
      state.fetchCountryEntitiesSuccess = false;
      state.countryEntities = [];
    },
    resetCountry(state) {
      state.fetchCountryEntitiesSuccess = false;
      state.countryEntities = [];
    },
    resetDataTouser(state) {
      state.dataToUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserById.fulfilled, (state, { payload }: PayloadAction<IResponse<any>>) => {
      state.dataToUser = payload.data;
      state.loading = false;
    });
    builder.addCase(getUserById.rejected, (state, { payload }: PayloadAction<any>) => {
      state.errorMessage = payload?.message;
      state.dataToUser = null;
      state.loading = false;
    });
  },
});

export const { fetching, resetAll, resetCountry, resetDataTouser } = actions;
export default reducer;
