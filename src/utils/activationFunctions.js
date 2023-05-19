const sig = (z) => {
	return 1.0 / (1.0 + Math.exp(-z));
};

export const sigmoid = (z) => {
	let res;
	if (Array.isArray(z)) {
		res = new Array(z.length);

		for (let i = 0; i < z.length; i++) {
			res[i] = sig(z);
		}
	} else {
		res = sig(z);
	}

	return res;
};
