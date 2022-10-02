import './scanning.css';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { scannerActions } from '../../store/scannerSlice';

export default function Scanning() {
	const input = useRef();
	const dispatch = useDispatch();
	const scannedItem = useSelector((state) => state.scanner.scannedItem);
	// const productList = useSelector((state) => state.scanner.productList);
	const isScanning = useSelector((state) => state.scanner.isScanning);

	// const [scan, setScan] = useState('');
	// const [productList, setProductList] = useState([]);
	// const [scanning, setScanning] = useState(false);

	async function getProduct() {
		console.log(`Getting info for ${scannedItem}`);
		const { data: productInfo } = await axios.get(
			`http://localhost:8080/api/scan/find-expired-product/`,
			{ params: { scannedItem } }
		);
		console.log(productInfo);
		dispatch(scannerActions.addProductToList(productInfo));
		// setProductList((prevList) => [...prevList, productInfo]);
		dispatch(scannerActions.clearScanner());
		// setScan('');
		input.current.focus();
	}

	function startScanning() {
		// setScanning(true);
		dispatch(scannerActions.startScanning());
		input.current.focus();
	}

	function stopScanning() {
		dispatch(scannerActions.stopScanning());
		// setScanning(false);
	}

	return (
		<>
			<section className="search">
				<h1>Find Product</h1>
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
