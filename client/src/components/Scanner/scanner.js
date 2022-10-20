import './scanner.css';
import axios from 'axios';
import { useEffect, useRef, useState, useCallback } from 'react';

export default function Scanner({
	isScanning,
	startScanning,
	stopScanning,
	addProduct,
	productList,
}) {
	const input = useRef();
	const [scanInput, setScanInput] = useState('');
	const [showFeedback, setShowFeedback] = useState(false);

	const clickHandler = useCallback(() => {
		input.current.focus();
	}, []);

	useEffect(() => {
		window.addEventListener('click', clickHandler);

		return () => {
			window.removeEventListener('click', clickHandler);
		};
	}, [clickHandler]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowFeedback(false);
		}, 1000);

		return () => {
			clearTimeout(timer);
		};
	}, [productList]);

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
			setShowFeedback(true);
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

	function formatName(productName) {
		if (!productName) return 'Product not Found';
		if (productName.indexOf('(') !== -1) {
			return productName.split('(')[0];
		}
		return productName;
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
			<div className={`scan-feedback ${showFeedback ? '' : 'hidden'}`}>
				Scanned{' '}
				{productList.length > 0 && `${formatName(productList.at(-1).name)}`}
			</div>
		</section>
	);
}
