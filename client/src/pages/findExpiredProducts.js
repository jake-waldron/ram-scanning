import Scanner from '../components/Scanner/scanner';
import ProductInfo from '../components/ProductInfo/productInfo';
import { useState } from 'react';

export default function FindExpiredProducts() {
	const [showScanner, setShowScanner] = useState(true);
	const [isScanning, setIsScanning] = useState(false);
	const [productList, setProductList] = useState([]);

	function onStartScanning() {
		setIsScanning(true);
	}

	function onStopScanning() {
		setIsScanning(false);
		setShowScanner(false);
	}

	function onAddProduct(scannedProduct) {
		setProductList((prevList) => [...prevList, scannedProduct]);
	}

	return (
		<>
			{showScanner && (
				<Scanner
					startScanning={onStartScanning}
					stopScanning={onStopScanning}
					addProduct={onAddProduct}
					isScanning={isScanning}
				/>
			)}
			<section className="products">
				{!isScanning &&
					productList &&
					productList.map((product) => (
						<ProductInfo product={product} key={product.number} />
					))}
			</section>
		</>
	);
}
