import { RootState } from '@/reducers';
import { IInitialState, IResponseList } from '@/shared/shared-interfaces';
import { PayloadAction, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';

import { createEntity, getEntities } from './UserManagement.api';
import { IUser } from '@/shared/model/user.model';

export const initialExpertFilter = {
  page: 0,
  size: 10,
};

const initialState: IInitialState = {
  fetchEntitiesSuccess: false,
  fetchEntitySuccess: false,
  updateEntitySuccess: false,
  deleteEntitySuccess: false,
  loading: false,
  errorMessage: null,
  errorCode: null,
  totalItems: 0,
  totalPages: 0,
};

export const expertAdapter = createEntityAdapter({
  selectId: ({ id }: IUser) => id,
});

const { actions, reducer } = createSlice({
  name: 'userManagementSlice',
  initialState: expertAdapter.getInitialState({ initialState }),
  reducers: {
    fetching(state) {
      state.initialState.loading = true;
    },
    resetAll(state) {
      state.initialState.fetchEntitiesSuccess = false;
      state.initialState.fetchEntitySuccess = false;
      state.initialState.updateEntitySuccess = false;
      state.initialState.deleteEntitySuccess = false;
      state.initialState.loading = false;
      state.initialState.errorMessage = null;
      state.initialState.errorCode = null;
      state.initialState.totalItems = 0;
      state.initialState.totalPages = 0;
    },
    resetEntity(state) {
      state.initialState.fetchEntitiesSuccess = false;
      state.initialState.fetchEntitySuccess = false;
      state.initialState.updateEntitySuccess = false;
      state.initialState.deleteEntitySuccess = false;
      state.initialState.loading = false;
      state.initialState.errorMessage = null;
      state.initialState.errorCode = null;
    },
    resetState(state) {
      expertAdapter.removeAll(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEntities.fulfilled.type, (state, { payload }: PayloadAction<any>) => {
      expertAdapter.setAll(state, payload);
      state.initialState.fetchEntitiesSuccess = true;
      state.initialState.loading = false;
    });
    builder.addCase(getEntities.rejected.type, (state, { payload }: PayloadAction<any>) => {
      state.initialState.errorMessage = payload?.message;
      state.initialState.errorCode = payload?.code;
      state.initialState.fetchEntitiesSuccess = false;
      state.initialState.loading = false;
    });
    builder.addCase(createEntity.fulfilled.type, (state, _) => {
      state.initialState.updateEntitySuccess = true;
      state.initialState.loading = false;
    });
    builder.addCase(createEntity.rejected.type, (state, { payload }: PayloadAction<any>) => {
      state.initialState.errorMessage = payload?.message;
      state.initialState.errorCode = payload?.code;
      state.initialState.updateEntitySuccess = false;
      state.initialState.loading = false;
    });
  },
});

export const { fetching, resetAll, resetEntity, resetState } = actions;
export default reducer;

export const userManagementSelector = expertAdapter.getSelectors((state: RootState) => state.userManagementReducer);

const getExpertState = (state: RootState) => state.userManagementReducer;
const { selectById } = expertAdapter.getSelectors();

export const selectEntityById = (id: number) => {
  return createSelector(getExpertState, (state) => selectById(state, id));
};
