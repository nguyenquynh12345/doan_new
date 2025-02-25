import container from '@/components/containers/container.reducer';
import authentication from '@components/modules/auth/auth.reducer';
import userManagementReducer from '@components/modules/userManagement/UserManagement.reducer';
import postManagementReducer from '@components/modules/postManagement/PostManagement.reducer';
import sharedReducer from '@components/modules/shared/sharedApi/shared.reducer';
import categoriesManagementReducer from '@/components/modules/categories/categoriesManagement.reducer';
import locationManagementReducer from '@/components/modules/location/locationManagement.reducer';

import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  container,
  authentication,
  sharedReducer,
  userManagementReducer,
  postManagementReducer, categoriesManagementReducer, locationManagementReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
