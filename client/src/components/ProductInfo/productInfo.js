import styles from './productInfo.module.css';

export default function ProductInfo({ product }) {
	const { number, name, lotNumber, age, status } = product;

	return (
		<div className={styles.product_info}>
			<div className={styles.product_info__section}>
				<h2>Part Number</h2>
				<p>{name}</p>
			</div>
			<div className={styles.product_info__section}>
				<h2>Name</h2>
				<p>{number}</p>
			</div>
			<div className={styles.product_info__section}>
				<h2>Lot</h2>
				<p>{lotNumber}</p>
			</div>
			<div className={styles.product_info__section}>
				<h2>Age</h2>
				<p>{age}</p>
			</div>
			<div className={styles.product_info__section}>
				<h2>Status</h2>
				<p>{status}</p>
			</div>
		</div>
	);
}
