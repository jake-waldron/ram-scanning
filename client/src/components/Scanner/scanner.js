import './scanner.css';
import axios from 'axios';
import { useRef, useState } from 'react';

export default function Scanner({
	isScanning,
	startScanning,
	stopScanning,
	addProduct,
}) {
	const input = useRef();
	const [scannedItem, setScannedItem] = useState('');

	async function getProduct(scannedItem) {
		console.log(`Getting info for ${scannedItem}`);
		try {
			const { data: productInfo } = await axios.get(
				`http://localhost:8080/api/scan/find-expired-product/`,
				{ params: { scannedItem } },
				{ headers: { 'Access-Control-Request-Private-Network': true } }
			);
			console.log(productInfo);
			addProduct(productInfo);
		} catch (err) {
			console.error(err);
		}
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
			<div className={`scanning-text ${isScanning ? '' : 'hidden'}`}>
				Scanning in progress
			</div>
			<div className="search">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						getProduct(scannedItem);
					}}
				>
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
					<button type="submit"> Find Product </button>
				</form>
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
