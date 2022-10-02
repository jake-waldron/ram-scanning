import './App.css';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import Scanning from './components/Scanning/scanning';
import ProductInfo from './components/ProductInfo/productInfo';

function App() {
	const isScanning = useSelector((state) => state.scanner.isScanning);
	const productList = useSelector((state) => state.scanner.productList);
	return (
		<main>
			<Scanning />
			<section className="products">
				{!isScanning &&
					productList &&
					productList.map((product) => (
						<ProductInfo product={product} key={product.number} />
					))}
			</section>
		</main>
	);
}

export default App;
