import './App.css';
import { useSelector } from 'react-redux';

import Scanner from './components/Scanner/scanner';
import ProductInfo from './components/ProductInfo/productInfo';

function App() {
	const isScanning = useSelector((state) => state.scanner.isScanning);
	const productList = useSelector((state) => state.scanner.productList);
	return (
		<main>
			<Scanner />
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
