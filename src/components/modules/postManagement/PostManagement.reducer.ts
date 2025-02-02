import { RootState } from '@/reducers';
import { PayloadAction, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';

import { IUser } from '@/shared/model/user.model';
import { createEntity, getCategoriesRoom, getEntitie, getEntities, removeEntity, updateEntity } from './PostManagement.api';
import { IInitialState } from '@/shared/shared-interfaces';

export const initialExpertFilter = {
  page: 0,
  size: 10,
};
interface IInitialPostState extends IInitialState {
  detailPost: any;
  categoryRoom: any;
}
const initialState: IInitialPostState = {
  fetchEntitiesSuccess: false,
  fetchEntitySuccess: false,
  updateEntitySuccess: false,
  deleteEntitySuccess: false,
  loading: false,
  errorMessage: null,
  errorCode: null,
  totalItems: 0,
  totalPages: 0,
  detailPost: null,
  categoryRoom: null,
};

export const expertAdapter = createEntityAdapter({
  selectId: ({ id }: IUser) => id,
});

const { actions, reducer } = createSlice({
  name: 'postManagementSlice',
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
    builder.addCase(getEntitie.fulfilled.type, (state, { payload }: PayloadAction<any>) => {
      state.initialState.detailPost = payload;
      state.initialState.fetchEntitiesSuccess = true;
      state.initialState.loading = false;
    });
    builder.addCase(getEntitie.rejected.type, (state, { payload }: PayloadAction<any>) => {
      state.initialState.errorMessage = payload?.message;
      state.initialState.errorCode = payload?.code;
      state.initialState.fetchEntitiesSuccess = false;
      state.initialState.loading = false;
    });
    builder.addCase(getCategoriesRoom.fulfilled.type, (state, { payload }: PayloadAction<any>) => {
      state.initialState.categoryRoom = payload;
      state.initialState.fetchEntitiesSuccess = true;
      state.initialState.loading = false;
    });
    builder.addCase(getCategoriesRoom.rejected.type, (state, { payload }: PayloadAction<any>) => {
      state.initialState.errorMessage = payload?.message;
      state.initialState.categoryRoom = null;
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
    builder.addCase(updateEntity.fulfilled.type, (state, _) => {
      state.initialState.updateEntitySuccess = true;
      state.initialState.loading = false;
    });
    builder.addCase(updateEntity.rejected.type, (state, { payload }: PayloadAction<any>) => {
      state.initialState.errorMessage = payload?.message;
      state.initialState.errorCode = payload?.code;
      state.initialState.updateEntitySuccess = false;
      state.initialState.loading = false;
    });
    builder.addCase(removeEntity.fulfilled.type, (state, _) => {
      state.initialState.deleteEntitySuccess = true;
      state.initialState.loading = false;
    });
    builder.addCase(removeEntity.rejected.type, (state, { payload }: PayloadAction<any>) => {
      state.initialState.errorMessage = payload?.message;
      state.initialState.errorCode = payload?.code;
      state.initialState.deleteEntitySuccess = false;
      state.initialState.loading = false;
    });
  },
});

export const { fetching, resetAll, resetEntity, resetState } = actions;
export default reducer;

export const postManagementSelector = expertAdapter.getSelectors((state: RootState) => state.postManagementReducer);

const getExpertState = (state: RootState) => state.postManagementReducer;
const { selectById } = expertAdapter.getSelectors();

export const selectEntityById = (id: number) => {
  return createSelector(getExpertState, (state) => selectById(state, id));
};
