import { sigmoid } from "../utils/activationFunctions";

export class NeuralNetwork {
	constructor(inodes, hnodes, onodes, lr, actFunc) {
		this.inodes = inodes;
		this.hnodes = hnodes;
		this.onodes = onodes;
		this.lr = lr;
		this.actFunc = actFunc || sigmoid;

		this._initWeights();
	}

	async _initWeights() {
		try {
			fetch("weights/who.csv")
				.then((res) => res.text())
				.then((data) => {
					console.log(data);
				});
		} catch (error) {
			console.log(error);
		}

		try {
			fetch("weights/wih.csv")
				.then((res) => res.text())
				.then((data) => {
					console.log(data);
				});
		} catch (error) {
			console.log(error);
		}
	}
}
