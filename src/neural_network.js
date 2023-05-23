import { NeuralNetwork } from "./NeuralNetwork/NeuralNetwork";

const canvas = document.getElementById("canvas");
const clearButton = document.getElementById("clear");
const guessButton = document.getElementById("guess");
const ctx = canvas.getContext("2d");

ctx.lineWidth = 25;
ctx.lineCap = "round";
ctx.strokeStyle = "#000000";

const NN = new NeuralNetwork(28 * 28, 100, 10, 0.1);

let isDrawing = false;

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);

canvas.addEventListener("touchstart", startDrawing);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", stopDrawing);

clearButton.addEventListener("click", clearCanvas);
guessButton.addEventListener("click", predictOutput);

function startDrawing(e) {
	isDrawing = true;
	const { x, y } = getCursorPosition(e);
	ctx.beginPath();
	ctx.moveTo(x, y);
}

function draw(e) {
	if (!isDrawing) return;
	const { x, y } = getCursorPosition(e);
	ctx.lineTo(x, y);
	ctx.stroke();
}

function stopDrawing() {
	isDrawing = false;
}

function getCursorPosition(e) {
	let x, y;

	if (e.touches && e.touches.length === 1) {
		const touch = e.touches[0];
		x = touch.clientX;
		y = touch.clientY;
	} else {
		x = e.clientX;
		y = e.clientY;
	}

	const canvasRect = canvas.getBoundingClientRect();
	const offsetX = x - canvasRect.left;
	const offsetY = y - canvasRect.top;

	return { x: offsetX, y: offsetY };
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function resizeImageData(imageData, newWidth, newHeight) {
	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d");
	const tempCanvas = document.createElement("canvas");
	const tempContext = tempCanvas.getContext("2d");

	canvas.width = imageData.width;
	canvas.height = imageData.height;
	context.putImageData(imageData, 0, 0);

	// const canvas2 = document.getElementById("canvas2");
	// canvas2.append(canvas);

	tempCanvas.width = newWidth;
	tempCanvas.height = newHeight;
	tempContext.drawImage(canvas, 0, 0, newWidth, newHeight);

	return tempContext.getImageData(0, 0, newWidth, newHeight).data;
}

function U8IntToArr(uIntArr) {
	const regularArray = new Array(28 * 28).fill(0.01);

	uIntArr.forEach((pixel, i) => {
		if (pixel !== 0) {
      const index = Math.floor(i / 4);
      const normalized = pixel / 255;
      regularArray[index] = normalized;
		}
	});

	return regularArray;
}

function predictOutput() {
	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

	const resizedData = resizeImageData(imageData, 28, 28);

	const converted = U8IntToArr(resizedData);


	NN.query(converted);
}
