const sig = (z) => {
	return 1.0 / (1.0 + Math.exp(-z));
};

export const sigmoid = (z) => {
	let res;
	if (Array.isArray(z)) {
		res = Array.from({length: z.length}, () => Array.from({length: z[0].length}, () => 0));

		for (let i = 0; i < z.length; i++) {
			for (let j = 0; j < z[i].length; j++) {
				res[i][j] = sig(z[i][j]);
			}
		}
	} else {
		res = sig(z);
	}

	return res;
};
