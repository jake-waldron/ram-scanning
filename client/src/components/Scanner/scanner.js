import './scanner.css';
import axios from 'axios';
import { useEffect, useRef, useState, useCallback } from 'react';

export default function Scanner({
	isScanning,
	startScanning,
	stopScanning,
	addProduct,
}) {
	const input = useRef();
	const [scanInput, setScanInput] = useState('');

	const clickHandler = useCallback(() => {
		input.current.focus();
	}, []);

	useEffect(() => {
		window.addEventListener('click', clickHandler);

		return () => {
			window.removeEventListener('click', clickHandler);
		};
	}, [clickHandler]);

	async function getProduct(product) {
		const scannedItem = product;
		setScanInput('');
		input.current.focus();
		console.log(`Getting info for ${scannedItem}`);
		try {
			const { data: productInfo } = await axios.get(
				`/api/scan/find-expired-product/`,
				{ params: { scannedItem } }
			);
			console.log(productInfo);
			addProduct(productInfo);
		} catch (err) {
			console.error(err);
		}
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
			<div className={`search ${isScanning ? '' : 'none'}`}>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						getProduct(scanInput);
					}}
				>
					<label>Find Product</label>
					<input
						ref={input}
						type="text"
						name="id"
						value={scanInput}
						onChange={(e) => {
							setScanInput(e.target.value);
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
