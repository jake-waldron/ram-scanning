import { useState } from 'react';
import ProductList from '../ProductList/productList';

import _ from 'lodash';

import './expiredProducts.css';
import axios from 'axios';

import PrintSVG from '../UI/PrintSVG';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || '';

function filterLists(productList) {
	const removeDuplicates = _.uniqWith(productList, _.isEqual);
	const expiredProducts = removeDuplicates.filter(
		(product) => product.status === 'EXPIRED'
	);
	const expiringSoon = removeDuplicates
		.filter((product) => product.status === 'EXPIRING SOON')
		.sort(
			(productA, productB) =>
				productA.monthsUntilExpiration - productB.monthsUntilExpiration
		);
	return [expiredProducts, expiringSoon];
}

export default function ExpiredProducts({ productList, resetScanning }) {
	const [currentTab, setCurrentTab] = useState('expired');
	const [expiredProducts, expiringSoon] = filterLists(productList);

	async function downloadPDF() {
		try {
			const response = await axios({
				url: `${API_ENDPOINT}/api/scan/generate-pdf`,
				method: 'post',
				responseType: 'blob',
				data: { expiredProducts, expiringSoon },
			});
			const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
			const url = URL.createObjectURL(pdfBlob);
			window.open(url);
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<section className="products-container">
			<button className="btn-pdf" onClick={downloadPDF} title="Print">
				<PrintSVG />
			</button>
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
			<button className="btn-reset" onClick={resetScanning}>
				Reset
			</button>
		</section>
	);
}
