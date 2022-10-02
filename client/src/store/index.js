import { configureStore } from '@reduxjs/toolkit';

import scannerReducer from './scannerSlice';

const store = configureStore({
	reducer: {
		scanner: scannerReducer,
	},
});

export default store;
