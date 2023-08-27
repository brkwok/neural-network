# Neural Network JavaScript Library

A JavaScript library for creating and using neural networks.

- [Live Demo](https://brkwok.github.io/neural-network/)

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)

## Introduction

This library provides a simple implementation of a neural network in JavaScript. It allows you to create a neural network with customizable input, hidden, and output nodes, as well as a choice of activation function and learning rate. The library is designed to load pre-trained weights from CSV files to enable quick usage.

## Installation

To use this library in your project, follow these steps:

1. Clone the repository: <br>
   `git clone https://github.com/brkwok/neural-network-js.git`
2. Navigate to the project directory: `cd neural-network-js`
3. Include the `NeuralNetwork.js` file in your HTML or JavaScript project.

## Usage

Here's a basic example of how to use the library to create and query a neural network:

```javascript
// Import the necessary modules
import { NeuralNetwork } from "./src/NeuralNetwork/NeuralNetwork";
import { sigmoid } from "./src/utils/activationFunctions";

// Create a neural network instance
const inputNodes = 3;
const hiddenNodes = 4;
const outputNodes = 2;
const learningRate = 0.1;

const neuralNet = new NeuralNetwork(
	inputNodes,
	hiddenNodes,
	outputNodes,
	learningRate,
	sigmoid
);

// Provide input values
const inputs = [0.2, 0.5, 0.7];

// Query the neural network
neuralNet.query(inputs);
```

## API Reference

`NeuralNetwork` Constructor

```javascript
const neuralNet = new NeuralNetwork(
	inputNodes,
	hiddenNodes,
	outputNodes,
	learningRate,
	activationFunction
);
```

- `inputNodes` (number): Number of input nodes.
- `hiddenNodes` (number): Number of hidden nodes.
- `outputNodes` (number): Number of output nodes.
- `learningRate` (number): Learning rate for training (optional).
- `activationFunction` (function): Activation function for the network (optional).

`query`

```javascript
neuralNet.query(inputs);
```

- `inputs` (array): Input values for the neural network

## `NumJs` Class

The `NumJs` class provides basic array manipulation functionalities, particularly for matrix operations. This class is used within the `NeuralNetwork` class for handling matrix reshaping, transposition, matrix multiplication, and dot product operations.

### Usage

You can use the `NumJs` class to perform various matrix operations. Here's an example of how to create a `NumJs` instance and perform basic operations:

```javascript
import NumJs from './src/utils/NumJs';

// Create a NumJs instance
const data = [[1, 2, 3], [4, 5, 6]];
const matrix = new NumJs(data);

// Perform matrix operations
const shape = matrix.shape(); // Get the shape of the matrix
const transposed = matrix.transpose(); // Transpose the matrix
const reshaped = matrix.reshape(3, 2); // Reshape the matrix

// Perform matrix multiplication
const otherData = [[7, 8], [9, 10], [11, 12]];
const otherMatrix = new NumJs(otherData);
const resultMatmul = matrix.matmul(otherMatrix);

// Perform dot product
const resultDot = matrix.dot(otherMatrix);
```

## `neural_network.js` File

The `neural_network.js` file contains the initialization code for the HTML canvas element used in your project. It also includes event listeners for drawing on the canvas, clearing the canvas, and predicting the output using the neural network.

### Usage

This script sets up the canvas and handles user interactions to draw and predict using the neural network. Here's an overview of the key functionalities:

- Drawing on the Canvas: Users can draw on the canvas by clicking and dragging the mouse or using touch gestures on touchscreen devices.

- Clearing the Canvas: The "Clear" button allows users to reset the canvas and start over.

- Predicting the Output: The "Guess" button triggers the neural network to predict the output based on the drawn image. The drawn image is preprocessed, resized, and normalized before being passed to the neural network's `query` method.

### Example Code

Here's an example of how to use the functionalities provided by the `canvas_init.js` script in your HTML:

```html
<div class="h-screen w-screen flex flex-col items-center justify-center">
	<canvas
		id="canvas"
		width="420"
		height="420"
		class="border border-black m-2"
	></canvas>
	<div class="flex items-center justify-center space-x-2">
		<button id="clear" class="border border-black rounded-md py-1 px-2 text-md">
			Clear
		</button>
		<button id="guess" class="border border-black rounded-md py-1 px-2 text-md">
			Guess
		</button>
	</div>
	<span id="answer"> </span>
</div>
```
