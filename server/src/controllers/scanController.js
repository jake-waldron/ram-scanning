const pool = require('../pool');
const SQL = require('sql-template-strings');

const productRepo = require('./../repos/productRepo');

async function findExpiredProduct(req, res, next) {
	const scanInput = req.query.scannedItem;
	const product = await getProduct(scanInput);
	const productStatus = getProductStatus(product);
	res.send(productStatus);
}

async function getProduct(scanInput) {
	// const scanInput = req.query.scan;
	// console.log(scanInput);
	const processedScan = splitScan(scanInput);
	const productInfo = await getProductInfo(processedScan);
	// ADD THIS BACK IN AFTER REFACTOR
	// const olderProducts = filterOutNewProducts(processedScans, 6);
	// const productInfo = await getProductInfo(olderProducts);
	// const [expiredProducts, expiringSoon] = checkForExpiredProducts(productInfo);
	// res.status(200).json({
	// 	status: 'success',
	// 	scannedItems: processedScans.length,
	// 	data: {
	// 		expired: expiredProducts,
	// 		expiringSoon: expiringSoon,
	// 	},
	// });
	return productInfo;
}

function splitScan(scannedItem) {
	const scanSplit = scannedItem.split('-');
	const product = {
		partNumber: scanSplit[0] || 'No Part Number',
		lotNumber: scanSplit[1] || 'No Lot Number',
	};
	return product;
}

async function getProductInfo(productToFind) {
	const { partNumber, lotNumber } = productToFind;
	const foundProduct = await productRepo.findProductById(partNumber);

	if (foundProduct) {
		const { number, name, category, months } = foundProduct;
		const product = {
			number,
			name,
			lotNumber,
			category,
			expMonths: months,
			age: getAge(lotNumber),
		};
		return product;
	} else {
		return {
			partNumber: partNumber || 0000,
			prodName: 'Product not found',
			lotNumber: 0000,
			prodGroup: 'No group',
			expMonths: 0,
		};
	}
}

function getAge(lotNumber) {
	// Lot number 2204265 = made in 04/22
	const date = lotNumber.slice(0, 4);
	const year = parseInt('20' + date.slice(0, 2));
	const month = +date.slice(2, 4) - 1;
	const madeOn = new Date(year, month, 1);
	const today = new Date();

	const ageInMonths =
		madeOn.getMonth() -
		today.getMonth() +
		12 * (madeOn.getFullYear() - today.getFullYear());
	return Math.abs(ageInMonths);
}

function getProductStatus(product) {
	const monthsUntilExpiration = product.expMonths - product.age;
	if (product.prodName === 'Product not found') {
		return {
			...product,
			status: 'NOT FOUND',
		};
	}
	if (monthsUntilExpiration <= 0) {
		return {
			...product,
			monthsPastExpirationBy: Math.abs(monthsUntilExpiration),
			status: 'EXPIRED',
		};
	} else if (monthsUntilExpiration <= 3) {
		product.expiresIn = monthsUntilExpiration;
		const today = new Date();
		const expDate = new Date(
			today.setMonth(today.getMonth() + monthsUntilExpiration)
		);
		return {
			...product,
			expiresIn: monthsUntilExpiration,
			expiresOnMonth: `${expDate.getMonth() + 1}/${expDate.getFullYear()}`,
			status: 'EXPIRING SOON',
		};
	}
	return {
		...product,
		status: 'OKAY',
	};
}

module.exports = {
	findExpiredProduct,
};
