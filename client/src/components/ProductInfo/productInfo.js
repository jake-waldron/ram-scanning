import styles from './productInfo.module.css';

export default function ProductInfo({ product }) {
	const { number, name, lotNumber, age, status } = product;

	return (
		<div className={styles.product_info}>
			<div className={styles.product_info__item}>
				<h2>{name}</h2>
				<span>{number}</span>
			</div>
			<div className={styles.product_info__item}>
				<h3>Lot:</h3>
				<span>{lotNumber}</span>
			</div>
			<div className={styles.product_info__item}>
				<h3>Age:</h3>
				<span>{age} months</span>
			</div>
			{status === 'EXPIRED' && (
				<div className={styles.product_info__item}>
					<h3>Over limit by:</h3>
					<span>
						{product.monthsPastExpirationBy === 0
							? 'Just expired this'
							: product.monthsPastExpirationBy}{' '}
						{product.monthsPastExpirationBy > 1 ? 'months' : 'month'}
					</span>
				</div>
			)}
			{status === 'EXPIRING SOON' && (
				<div className={styles.product_info__item}>
					<h3>Expires in:</h3>
					<span>
						{product.monthsUntilExpiration}{' '}
						{product.monthsUntilExpiration !== 1 ? 'months' : 'month'} (
						{product.expiresOnMonth})
					</span>
				</div>
			)}
		</div>
	);
	// return (
	// 	<div className={styles.product_info}>
	// 		<div className={styles.product_info__section}>
	// 			<h2>Part Number</h2>
	// 			<p>{name}</p>
	// 		</div>
	// 		<div className={styles.product_info__section}>
	// 			<h2>Name</h2>
	// 			<p>{number}</p>
	// 		</div>
	// 		<div className={styles.product_info__section}>
	// 			<h2>Lot</h2>
	// 			<p>{lotNumber}</p>
	// 		</div>
	// 		<div className={styles.product_info__section}>
	// 			<h2>Age</h2>
	// 			<p>{age}</p>
	// 		</div>
	// 		<div className={styles.product_info__section}>
	// 			<h2>Status</h2>
	// 			<p>{status}</p>
	// 		</div>
	// 	</div>
	// );
}
