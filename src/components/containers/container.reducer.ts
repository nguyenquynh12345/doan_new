import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IContainerState {
  sidebarShow: boolean;
  hiddenSidebar: boolean;
  unfoldable: boolean;
  asideShow: boolean;
  darkMode: boolean;
}

const initialState: IContainerState = {
  sidebarShow: true,
  hiddenSidebar: false,
  unfoldable: false,
  asideShow: false,
  darkMode: false,
};

const containerSlice = createSlice({
  name: 'containerSlice',
  initialState,
  reducers: {
    toggleSidebar: (state, { payload }: PayloadAction<boolean>) => {
      state.sidebarShow = payload;
    },
    setSidebarHidden: (state, { payload }: PayloadAction<boolean>) => {
      state.hiddenSidebar = payload;
    },
    toggleUnfoldable: (state, { payload }: PayloadAction<boolean>) => {
      state.unfoldable = payload;
    },
    toggleAside: (state, { payload }: PayloadAction<boolean>) => {
      state.asideShow = payload;
    },
    toggleDarkMode: (state, { payload }: PayloadAction<boolean>) => {
      state.darkMode = payload;
    },
  },
});

export default containerSlice.reducer;
export const { toggleSidebar, toggleAside, toggleDarkMode, toggleUnfoldable, setSidebarHidden } =
  containerSlice.actions;
