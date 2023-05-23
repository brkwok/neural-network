import { sigmoid } from "../utils/activationFunctions";
import NumJs from "../utils/numJs";

export class NeuralNetwork {
	constructor(inodes, hnodes, onodes, lr, actFunc) {
		this.inodes = inodes;
		this.hnodes = hnodes;
		this.onodes = onodes;
		this.lr = lr;
		this.actFunc = actFunc || sigmoid;

		this._initWeights(this.inodes, this.hnodes, this.onodes);
	}

	_initWeights(inodes, hnodes, onodes) {
		try {
			fetch("weights/who.csv")
				.then((res) => res.text())
				.then((data) => {
					const who = this._parseCSV(data);
					const reshaped = new NumJs(who).reshape(onodes, hnodes);
					this.who = reshaped;
				});
		} catch (error) {
			console.log(error);
		}

		try {
			fetch("weights/wih.csv")
				.then((res) => res.text())
				.then((data) => {
					const wih = this._parseCSV(data);
					const reshaped = new NumJs(wih).reshape(hnodes, inodes);
					this.wih = reshaped;
				});
		} catch (error) {}
	}

	_parseCSV(data) {
		const split = data.split(",");
		return split.map((num) => {
			return parseFloat(num);
		});
	}

	query(inputs) {
		const initInputs = new NumJs(inputs, 2).transpose();
		const hiddenInputs = this.wih.dot(initInputs);
		const hiddenOutputs = new NumJs(this.actFunc(hiddenInputs.data));
		const outputInputs = this.who.dot(hiddenOutputs);
		const outputOutputs = new NumJs(this.actFunc(outputInputs.data));

		const flattened = outputOutputs.data.flat();

		console.log(flattened);

		let maxIdx = 0;
		let max = 0;

		flattened.forEach((el, i) => {
			if (el > max) {
				max = el;
				maxIdx = i;
			}
		});

		const answer = document.getElementById("answer");
		answer.innerText = `The output is: ${maxIdx}`;
	}
}
