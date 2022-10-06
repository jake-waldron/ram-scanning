import ProductInfo from '../ProductInfo/productInfo';

export default function ProductList({ products }) {
	return (
		<>
			{products.map((product) => (
				<ProductInfo product={product} key={product.number} />
			))}
		</>
	);
}
