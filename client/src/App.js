import './App.css';
import axios from 'axios';
import { useState } from 'react';

import ProductInfo from './components/ProductInfo/productInfo';

function App() {
	const [id, setId] = useState('');
	const [product, setProduct] = useState('');

	async function getProduct() {
		console.log(`Getting info for ${id}`);
		const { data: productInfo } = await axios.get(
			`http://localhost:8080/products/${id}`
		);
		console.log(productInfo);
		setProduct(productInfo);
	}

	return (
		<main>
			<section className="search">
				<h1>Find Product</h1>
				<input
					type="text"
					name="id"
					value={id}
					onChange={(e) => {
						setId(e.target.value);
					}}
				/>
				<button onClick={getProduct}> Find Product </button>
			</section>
			<section className="products">
				{product &&
					product.map((product) => (
						<ProductInfo product={product} key={product.number} />
					))}
			</section>
		</main>
	);
}

export default App;
