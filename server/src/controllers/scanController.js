const pool = require('../pool');
const SQL = require('sql-template-strings');

const productRepo = require('./../repos/productRepo');

async function getProduct(req, res, next) {
	console.log(req.params.scan);
	const processedScans = splitScans(req.params.scan);
	// ADD THIS BACK IN AFTER REFACTOR
	// const olderProducts = filterOutNewProducts(processedScans, 6);
	// const productInfo = await getProductInfo(olderProducts);
	const productInfo = await findProduct(processedScans);
	// const [expiredProducts, expiringSoon] = checkForExpiredProducts(productInfo);
	// res.status(200).json({
	// 	status: 'success',
	// 	scannedItems: processedScans.length,
	// 	data: {
	// 		expired: expiredProducts,
	// 		expiringSoon: expiringSoon,
	// 	},
	// });

	res.send(productInfo);
}

function splitScans(scannedItem) {
	const scanSplit = scannedItem.split('-');
	const product = {
		partNumber: scanSplit[0] || 'No Part Number',
		lotNumber: scanSplit[1] || 'No Lot Number',
	};
	return product;
}

async function getProductInfo(scannedList) {
	const product = findProduct(scannedList);
	return product;
}

async function findProduct(productToFind) {
	// find product in DB
	// - make alt numbers to check
	// - check alt numbers, if found (return that)
	// - if not, find original number, return that

	// doing two DB searches isn't ideal either - can I do it in one somehow?

	const altDBSearchNumbers = makeAltPartNumbers(productToFind.partNumber);
	const altSearchResults = await productRepo.findProductByIdList(
		altDBSearchNumbers
	);

	const originalPartNumber = await productRepo.findProductById(
		productToFind.partNumber
	);

	///// THIS NEEDS WORK
	// ex. 03060B (101 fast qt) returns 03061 (epoxamite 101 1-gal)

	const foundProduct = altSearchResults ?? originalPartNumber;

	if (foundProduct) {
		const { number, name, category, months } = foundProduct;
		const product = {
			number,
			name,
			category,
			expMonths: months,
			lotNumber: productToFind.lotNumber,
			age: getAge(productToFind),
		};
		return product;
	} else {
		return {
			partNumber: productToFind.partNumber || 0000,
			prodName: 'Product not found',
			prodGroup: 'No group',
			expMonths: 0,
			lotNumber: 0000,
		};
	}
}

function makeAltPartNumbers(partNumber) {
	const noLeadingZero = partNumber.slice(1);
	const trial = partNumber.slice(0, partNumber.length - 1) + '1';
	const fullKit = partNumber.slice(0, partNumber.length - 2) + '1';
	return [noLeadingZero, trial, fullKit];
}

function getAge(product) {
	const { lotNumber } = product;
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

function checkForExpiredProducts(products) {
	const expired = [];
	const expiringSoon = [];
	products.forEach((product) => {
		const monthsPastExpiration = product.expMonths - product.age;
		if (monthsPastExpiration <= 0) {
			product.monthsPastExpirationBy = Math.abs(monthsPastExpiration);
			expired.push(product);
		} else if (monthsPastExpiration <= 3) {
			product.expiresIn = monthsPastExpiration;
			const today = new Date();
			const expDate = new Date(
				today.setMonth(today.getMonth() + monthsPastExpiration)
			);
			product.expiresOnMonth = `${
				expDate.getMonth() + 1
			} / ${expDate.getFullYear()}`;
			expiringSoon.push(product);
		}
	});
	return [expired, expiringSoon];
}

function filterOutNewProducts(productList, monthThreshold) {
	// filters list down to anything over six months old - saves time by not searching database for things that can't possibly be expired (nothing expires in six months)
	return productList.filter((el) => getAge(el) > monthThreshold);
}

module.exports = {
	getProduct,
};
