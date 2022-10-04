import './scanning.css';
import axios from 'axios';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { scannerActions } from '../../store/scannerSlice';

export default function Scanner() {
	const input = useRef();
	const dispatch = useDispatch();
	const scannedItem = useSelector((state) => state.scanner.scannedItem);
	const isScanning = useSelector((state) => state.scanner.isScanning);

	async function getProduct() {
		console.log(`Getting info for ${scannedItem}`);
		const { data: productInfo } = await axios.get(
			`http://localhost:8080/api/scan/find-expired-product/`,
			{ params: { scannedItem } }
		);
		console.log(productInfo);
		dispatch(scannerActions.addProductToList(productInfo));
		dispatch(scannerActions.clearScanner());
		input.current.focus();
	}

	function startScanning() {
		dispatch(scannerActions.startScanning());
		input.current.focus();
	}

	function stopScanning() {
		dispatch(scannerActions.stopScanning());
	}

	return (
		<>
			<section className="search">
				<label>Find Product</label>
				<input
					ref={input}
					type="text"
					name="id"
					value={scannedItem}
					onChange={(e) => {
						dispatch(scannerActions.setScannedItem(e.target.value));
					}}
				/>
				<button onClick={getProduct}> Find Product </button>
			</section>
			<section className="scan-buttons">
				<button disabled={isScanning} onClick={startScanning}>
					Start Scanning
				</button>
				<button disabled={!isScanning} onClick={stopScanning}>
					Stop Scanning
				</button>
			</section>
		</>
	);
}
