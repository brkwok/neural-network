export default class NumJs {
	constructor(data, dim = 1) {
		this.data = dim === 2 ? [data] : data;
	}

	shape() {
		const rows = this.data.length;
		const cols = Array.isArray(this.data[0]) ? this.data[0].length : 1;
		return [rows, cols];
	}

	reshape(rows, cols) {
		if (rows * cols !== this.data.length) {
			throw new Error(
				`Cannot reshape array: incompatible dimension, (${rows}, ${cols}) with data size ${this.data.length}`
			);
		}

		const newData = [];
		let dataIdx = 0;

		for (let i = 0; i < rows; i++) {
			const newRow = [];

			for (let j = 0; j < cols; j++) {
				newRow.push(this.data[dataIdx++]);
			}

			newData.push(newRow);
		}

    return new NumJs(newData);
	}

	transpose() {
		const [rows, cols] = this.shape();

		const newData = [];

		for (let j = 0; j < cols; j++) {
			const newRow = [];

			for (let i = 0; i < rows; i++) {
				newRow.push(this.data[i][j]);
			}

			newData.push(newRow);
		}

		return new NumJs(newData);
	}

	matmul(otherMatrix) {
		const [rowA, colA] = this.shape();
		const [rowB, colB] = otherMatrix.shape();

		if (colA !== rowB) {
			throw new Error(
				`Cannot perform matrix multiplication: Incompatible dimension (${rowA}, ${colA}) with (${rowB}, ${colB})`
			);
		}

		const res = Array.from({ length: rowA }, () =>
			Array.from({ length: colB }, () => 0)
		);

		for (let i = 0; i < rowA; i++) {
			for (let k = 0; k < colA; k++) {
				const AiK = this.data[i][k];

				for (let j = 0; j < rowB; j++) {
					res[i][j] += AiK * otherMatrix.data[k][j];
				}
			}
		}

		return new NumJs(res);
	}

	dot(otherMatrix) {
		const [rowA, colA] = this.shape();
		const [rowB, colB] = otherMatrix.shape();

		if (colA !== rowB) {
			throw new Error(
				`Cannot perform dot product: Incompatible dimension (${rowA}, ${colA}) with (${rowB}, ${colB})`
			);
		}

		const res = Array.from({ length: rowA }, () =>
			Array.from({ length: colB }, () => 0)
		);

		for (let i = 0; i < rowA; i++) {
			for (let k = 0; k < colA; k++) {
				const AiK = this.data[i][k];

				for (let j = 0; j < colB; j++) {
					res[i][j] += AiK * otherMatrix.data[k][j];
				}
			}
		}
		return new NumJs(res);
	}
}
