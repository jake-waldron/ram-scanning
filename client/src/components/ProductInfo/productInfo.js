import styles from './productInfo.module.css';

export default function ProductInfo({ product }) {
	const { number, name, category, weight, months } = product;

	return (
		<div className={styles.product_info}>
			<div className={styles.product_info__section}>
				<h2>Name</h2>
				<p>{name}</p>
			</div>
			<div className={styles.product_info__section}>
				<h2>number</h2>
				<p>{number}</p>
			</div>
			<div className={styles.product_info__section}>
				<h2>category</h2>
				<p>{category}</p>
			</div>
			<div className={styles.product_info__section}>
				<h2>weight</h2>
				<p>{weight}</p>
			</div>
			<div className={styles.product_info__section}>
				<h2>months</h2>
				<p>{months}</p>
			</div>
		</div>
	);
}
