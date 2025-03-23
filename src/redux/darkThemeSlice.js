import {createSlice} from '@reduxjs/toolkit';

const darkThemeSlice = createSlice({
  name : 'darkTheme',
  initialState : {
    value : false
  },
  reducers : {
    toggleTheme : state => {
      state.value= !state.value;
    },
    setTheme : (state, action) => {
      state.value = action.payload;
    }
  }
});

export const {toggleTheme, setTheme} = darkThemeSlice.actions;
export default darkThemeSlice.reducer;