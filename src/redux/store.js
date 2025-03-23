import darkThemeReducer from './darkThemeSlice';
import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
  reducer : {
    darkTheme : darkThemeReducer
  }
});