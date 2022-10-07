import { useState } from 'react';
import ProductList from '../ProductList/productList';

import './expiredProducts.css';

const productListTest = [
	{
		number: '41370B',
		name: 'FLEX FOAM-IT! 25 5-GAL PART-B (40# 18.14KGS)',
		lotNumber: '2009164',
		category: 'EXPANDABLE FOAM',
		expMonths: 24,
		age: 25,
		monthsPastExpirationBy: 1,
		status: 'EXPIRED',
	},
	{
		number: '12345',
		name: 'SOMETING FAKE 2',
		lotNumber: '2009164',
		category: 'EXPANDABLE FOAM',
		expMonths: 24,
		age: 25,
		monthsUntilExpiration: 2,
		expiresOnMonth: '12 / 22',
		status: 'EXPIRING SOON',
	},
	{
		number: '41370B',
		name: 'SOME OTHER FAKE PRODUCT',
		lotNumber: '2009164',
		category: 'EXPANDABLE FOAM',
		expMonths: 24,
		age: 25,
		monthsPastExpirationBy: 1,
		status: 'OKAY',
	},
	{
		number: '41323B',
		name: 'FLEX FOAM-IT! 25 5-GAL PART-B (40# 18.14KGS)',
		lotNumber: '2009164',
		category: 'EXPANDABLE FOAM',
		expMonths: 24,
		age: 25,
		monthsPastExpirationBy: 2,
		status: 'EXPIRED',
	},
	{
		number: '765756',
		name: 'SOMETING FAKE 2',
		lotNumber: '2009164',
		category: 'EXPANDABLE FOAM',
		expMonths: 24,
		age: 25,
		monthsUntilExpiration: 3,
		expiresOnMonth: '12 / 22',
		status: 'EXPIRING SOON',
	},
	{
		number: '567543',
		name: 'SOME OTHER FAKE PRODUCT',
		lotNumber: '2009164',
		category: 'EXPANDABLE FOAM',
		expMonths: 24,
		age: 25,
		monthsPastExpirationBy: 1,
		status: 'OKAY',
	},
];

export default function ExpiredProducts({ productList }) {
	const [currentTab, setCurrentTab] = useState('expired');
	// const expiredProducts = productList.filter(
	// 	(product) => product.status === 'EXPIRED'
	// );
	// const expiringSoon = productList.filter(
	// 	(product) => product.status === 'EXPIRING SOON'
	// );
	const expiredProducts = productListTest.filter(
		(product) => product.status === 'EXPIRED'
	);
	const expiringSoon = productListTest.filter(
		(product) => product.status === 'EXPIRING SOON'
	);

	return (
		<section className="products-container">
			<ul className="tab-nav">
				<li
					className={currentTab === 'expired' ? 'active-tab' : 'inactive-tab'}
					onClick={() => {
						setCurrentTab('expired');
					}}
				>
					<h2>Expired</h2>
				</li>
				<li
					className={
						currentTab === 'expiringSoon' ? 'active-tab' : 'inactive-tab'
					}
					onClick={() => {
						setCurrentTab('expiringSoon');
					}}
				>
					<h2>Expiring Soon</h2>
				</li>
			</ul>
			<div className="products-list">
				{currentTab === 'expired' && (
					<ProductList products={expiredProducts} currentTab={currentTab} />
				)}
				{currentTab === 'expiringSoon' && (
					<ProductList products={expiringSoon} currentTab={currentTab} />
				)}
			</div>
		</section>
	);
}
