import './scanner.css';
import axios from 'axios';
import { useRef, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux'
// import { scannerActions } from '../../store/scannerSlice';;

export default function Scanner({
	isScanning,
	startScanning,
	stopScanning,
	addProduct,
}) {
	const input = useRef();
	const [scannedItem, setScannedItem] = useState('');

	async function getProduct() {
		console.log(`Getting info for ${scannedItem}`);
		const { data: productInfo } = await axios.get(
			`http://localhost:8080/api/scan/find-expired-product/`,
			{ params: { scannedItem } }
		);
		console.log(productInfo);
		addProduct(productInfo);
		setScannedItem('');
		input.current.focus();
	}

	function onStartScanning() {
		startScanning();
		input.current.focus();
	}

	function onStopScanning() {
		stopScanning();
	}

	return (
		<section className="scanner">
			{isScanning && <h1>Scanning in progress</h1>}
			<div className="search">
				<label>Find Product</label>
				<input
					ref={input}
					type="text"
					name="id"
					value={scannedItem}
					onChange={(e) => {
						setScannedItem(e.target.value);
					}}
				/>
				<button onClick={getProduct}> Find Product </button>
			</div>
			<section className="scan-buttons">
				<button
					className="start"
					disabled={isScanning}
					onClick={onStartScanning}
				>
					Start Scanning
				</button>
				<button
					className="stop"
					disabled={!isScanning}
					onClick={onStopScanning}
				>
					Stop Scanning
				</button>
			</section>
		</section>
	);
}
