import { NeuralNetwork } from "./NeuralNetwork/NeuralNetwork";

const canvas = document.getElementById("canvas");
const clearButton = document.getElementById("clear");
const guessButton = document.getElementById("guess");
const ctx = canvas.getContext("2d");

const NN = new NeuralNetwork(28 * 28, 100, 10, 0.1);

let isDrawing = false;
let lastX = 0;
let lastY = 0;
const pixelSize = 15;
const canvasSize = canvas.width / pixelSize;

const cells = new Array(canvasSize ** 2).fill(0.01);

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);
clearButton.addEventListener("click", clearCanvas);
guessButton.addEventListener("click", predictOutput);

function startDrawing(e) {
	isDrawing = true;
	[lastX, lastY] = [e.offsetX, e.offsetY];
	trackCell(lastX, lastY);
}

function draw(e) {
	if (!isDrawing) return;

	[lastX, lastY] = [e.offsetX, e.offsetY];
	trackCell(lastX, lastY);
}

function stopDrawing(_) {
	isDrawing = false;
}

function trackCell(x, y) {
	const cellX = ~~(x / pixelSize) * 28;
	const cellY = ~~(y / pixelSize) % 28;

	cells[cellX + cellY] = 1.0;
	fillRect();
}

function fillRect() {
	for (let i = 0; i < cells.length; i++) {
		if (cells[i] > 0.1) {
			const cellX = ~~(i / 28);
			const cellY = ~~(i % 28);

			ctx.fillRect(cellX * 15, cellY * 15, pixelSize, pixelSize);
		}
	}
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < cells.length; i++) {
		cells[i] = 0;
	}
}

function predictOutput() {
  console.table(cells)
  NN.query(cells);

}
