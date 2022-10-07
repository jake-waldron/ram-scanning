import ProductInfo from '../ProductInfo/productInfo';

export default function ProductList({ products, currentTab }) {
	let content;
	if (products.length === 0) {
		content = (
			<div className="products-not-found">
				<h2>
					No{' '}
					{currentTab === 'expired'
						? 'expired products'
						: 'products expiring soon'}{' '}
					found!
				</h2>
			</div>
		);
	}
	if (products.length > 0) {
		content = products.map((product) => (
			<ProductInfo product={product} key={product.number} />
		));
	}
	return <>{content}</>;
}
