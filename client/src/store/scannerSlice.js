import { createSlice } from '@reduxjs/toolkit';

const initialScanState = {
	scannedItem: '',
	productList: [],
	isScanning: false,
};

const scannerSlice = createSlice({
	name: 'scanner',
	initialState: initialScanState,
	reducers: {
		setScannedItem(state, action) {
			state.scannedItem = action.payload;
		},

		clearScanner(state) {
			state.scannedItem = '';
		},

		addProductToList(state, action) {
			state.productList.push(action.payload);
		},

		startScanning(state) {
			state.isScanning = true;
		},

		stopScanning(state) {
			state.isScanning = false;
		},
	},
});

export const scannerActions = scannerSlice.actions;

export default scannerSlice.reducer;
