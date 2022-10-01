import './App.css';
import axios from 'axios';
import { useRef, useState } from 'react';

import ProductInfo from './components/ProductInfo/productInfo';

function App() {
	const input = useRef();
	const [scan, setScan] = useState('');
	const [productList, setProductList] = useState([]);
	const [scanning, setScanning] = useState(false);

	async function getProduct() {
		console.log(`Getting info for ${scan}`);
		const { data: productInfo } = await axios.get(
			`http://localhost:8080/api/scan/find-expired-product/`,
			{ params: { scan } }
		);
		console.log(productInfo);
		setProductList((prevList) => [...prevList, productInfo]);
		setScan('');
		input.current.focus();
	}

	function startScanning() {
		setScanning(true);
		input.current.focus();
	}

	function stopScanning() {
		setScanning(false);
	}

	return (
		<main>
			<section className="search">
				<h1>Find Product</h1>
				<input
					ref={input}
					type="text"
					name="id"
					value={scan}
					onChange={(e) => {
						setScan(e.target.value);
					}}
				/>
				<button onClick={getProduct}> Find Product </button>
			</section>
			<section className="scan-buttons">
				<button disabled={scanning} onClick={startScanning}>
					Start Scanning
				</button>
				<button disabled={!scanning} onClick={stopScanning}>
					Stop Scanning
				</button>
			</section>
			<section className="products">
				{!scanning &&
					productList &&
					productList.map((product) => (
						<ProductInfo product={product} key={product.number} />
					))}
			</section>
		</main>
	);
}

export default App;
