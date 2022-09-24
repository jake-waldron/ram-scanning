export default function ProductInfo({ product }) {
	const {
		product_number,
		product_name,
		product_category,
		product_weight,
		months,
	} = product;

	return (
		<div>
			<h2>Name</h2>
			<p>{product_name}</p>
			<h2>number</h2>
			<p>{product_number}</p>
			<h2>category</h2>
			<p>{product_category}</p>
			<h2>weight</h2>
			<p>{product_weight}</p>
			<h2>months</h2>
			<p>{months}</p>
		</div>
	);
}
