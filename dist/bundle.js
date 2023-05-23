/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/NeuralNetwork/NeuralNetwork.js":
/*!********************************************!*\
  !*** ./src/NeuralNetwork/NeuralNetwork.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"NeuralNetwork\": () => (/* binding */ NeuralNetwork)\n/* harmony export */ });\n/* harmony import */ var _utils_activationFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/activationFunctions */ \"./src/utils/activationFunctions.js\");\n/* harmony import */ var _utils_numJs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/numJs */ \"./src/utils/numJs.js\");\n\n\n\nclass NeuralNetwork {\n\tconstructor(inodes, hnodes, onodes, lr, actFunc) {\n\t\tthis.inodes = inodes;\n\t\tthis.hnodes = hnodes;\n\t\tthis.onodes = onodes;\n\t\tthis.lr = lr;\n\t\tthis.actFunc = actFunc || _utils_activationFunctions__WEBPACK_IMPORTED_MODULE_0__.sigmoid;\n\n\t\tthis._initWeights(this.inodes, this.hnodes, this.onodes);\n\t}\n\n\t_initWeights(inodes, hnodes, onodes) {\n\t\ttry {\n\t\t\tfetch(\"weights/who.csv\")\n\t\t\t\t.then((res) => res.text())\n\t\t\t\t.then((data) => {\n\t\t\t\t\tconst who = this._parseCSV(data);\n\t\t\t\t\tconst reshaped = new _utils_numJs__WEBPACK_IMPORTED_MODULE_1__[\"default\"](who).reshape(onodes, hnodes);\n\t\t\t\t\tthis.who = reshaped;\n\t\t\t\t});\n\t\t} catch (error) {\n\t\t\tconsole.log(error);\n\t\t}\n\n\t\ttry {\n\t\t\tfetch(\"weights/wih.csv\")\n\t\t\t\t.then((res) => res.text())\n\t\t\t\t.then((data) => {\n\t\t\t\t\tconst wih = this._parseCSV(data);\n\t\t\t\t\tconst reshaped = new _utils_numJs__WEBPACK_IMPORTED_MODULE_1__[\"default\"](wih).reshape(hnodes, inodes);\n\t\t\t\t\tthis.wih = reshaped;\n\t\t\t\t});\n\t\t} catch (error) {}\n\t}\n\n\t_parseCSV(data) {\n\t\tconst split = data.split(\",\");\n\t\treturn split.map((num) => {\n\t\t\treturn parseFloat(num);\n\t\t});\n\t}\n\n\tquery(inputs) {\n\t\tconst initInputs = new _utils_numJs__WEBPACK_IMPORTED_MODULE_1__[\"default\"](inputs, 2).transpose();\n\n\t\tconst hiddenInputs = this.wih.dot(initInputs);\n\n\t\tconst hiddenOutputs = new _utils_numJs__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.actFunc(hiddenInputs.data));\n\n\t\tconst outputInputs = this.who.dot(hiddenOutputs);\n\n\t\tconst outputOutputs = new _utils_numJs__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.actFunc(outputInputs.data));\n\n\t\tconsole.log(outputOutputs);\n\t}\n}\n\n\n//# sourceURL=webpack://neural-network/./src/NeuralNetwork/NeuralNetwork.js?");

/***/ }),

/***/ "./src/neural_network.js":
/*!*******************************!*\
  !*** ./src/neural_network.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _NeuralNetwork_NeuralNetwork__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NeuralNetwork/NeuralNetwork */ \"./src/NeuralNetwork/NeuralNetwork.js\");\n\n\nconst canvas = document.getElementById(\"canvas\");\nconst clearButton = document.getElementById(\"clear\");\nconst guessButton = document.getElementById(\"guess\");\nconst ctx = canvas.getContext(\"2d\");\n\nconst NN = new _NeuralNetwork_NeuralNetwork__WEBPACK_IMPORTED_MODULE_0__.NeuralNetwork(28 * 28, 100, 10, 0.1);\n\nlet isDrawing = false;\nlet lastX = 0;\nlet lastY = 0;\nconst pixelSize = 15;\nconst canvasSize = canvas.width / pixelSize;\n\nconst cells = new Array(canvasSize ** 2).fill(0.01);\n\ncanvas.addEventListener(\"mousedown\", startDrawing);\ncanvas.addEventListener(\"mousemove\", draw);\ncanvas.addEventListener(\"mouseup\", stopDrawing);\ncanvas.addEventListener(\"mouseout\", stopDrawing);\nclearButton.addEventListener(\"click\", clearCanvas);\nguessButton.addEventListener(\"click\", predictOutput);\n\nfunction startDrawing(e) {\n\tisDrawing = true;\n\t[lastX, lastY] = [e.offsetX, e.offsetY];\n\ttrackCell(lastX, lastY);\n}\n\nfunction draw(e) {\n\tif (!isDrawing) return;\n\n\t[lastX, lastY] = [e.offsetX, e.offsetY];\n\ttrackCell(lastX, lastY);\n}\n\nfunction stopDrawing(_) {\n\tisDrawing = false;\n}\n\nfunction trackCell(x, y) {\n\tconst cellX = ~~(x / pixelSize) * 28;\n\tconst cellY = ~~(y / pixelSize) % 28;\n\n\tcells[cellX + cellY] = 1.0;\n\tfillRect();\n}\n\nfunction fillRect() {\n\tfor (let i = 0; i < cells.length; i++) {\n\t\tif (cells[i] > 0.1) {\n\t\t\tconst cellX = ~~(i / 28);\n\t\t\tconst cellY = ~~(i % 28);\n\n\t\t\tctx.fillRect(cellX * 15, cellY * 15, pixelSize, pixelSize);\n\t\t}\n\t}\n}\n\nfunction clearCanvas() {\n\tctx.clearRect(0, 0, canvas.width, canvas.height);\n\tfor (let i = 0; i < cells.length; i++) {\n\t\tcells[i] = 0;\n\t}\n}\n\nfunction predictOutput() {\n  console.table(cells)\n  NN.query(cells);\n\n}\n\n\n//# sourceURL=webpack://neural-network/./src/neural_network.js?");

/***/ }),

/***/ "./src/utils/activationFunctions.js":
/*!******************************************!*\
  !*** ./src/utils/activationFunctions.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"sigmoid\": () => (/* binding */ sigmoid)\n/* harmony export */ });\nconst sig = (z) => {\n\treturn 1.0 / (1.0 + Math.exp(-z));\n};\n\nconst sigmoid = (z) => {\n\tlet res;\n\tif (Array.isArray(z)) {\n\t\tres = Array.from({length: z.length}, () => Array.from({length: z[0].length}, () => 0));\n\n\t\tfor (let i = 0; i < z.length; i++) {\n\t\t\tfor (let j = 0; j < z[i].length; j++) {\n\t\t\t\tres[i][j] = sig(z[i][j]);\n\t\t\t}\n\t\t}\n\t} else {\n\t\tres = sig(z);\n\t}\n\n\treturn res;\n};\n\n\n//# sourceURL=webpack://neural-network/./src/utils/activationFunctions.js?");

/***/ }),

/***/ "./src/utils/numJs.js":
/*!****************************!*\
  !*** ./src/utils/numJs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ NumJs)\n/* harmony export */ });\nclass NumJs {\n\tconstructor(data) {\n\t\tthis.data = data;\n\t}\n\n\tshape() {\n\t\tconst rows = this.data.length;\n\t\tconst cols = Array.isArray(this.data[0]) ? this.data[0].length : 1;\n\t\treturn [rows, cols];\n\t}\n\n\treshape(rows, cols) {\n\t\tif (rows * cols !== this.data.length) {\n\t\t\tthrow new Error(\n\t\t\t\t`Cannot reshape array: incompatible dimension, (${rows}, ${cols}) with data size ${this.data.length}`\n\t\t\t);\n\t\t}\n\n\t\tconst newData = [];\n\t\tlet dataIdx = 0;\n\n\t\tfor (let i = 0; i < rows; i++) {\n\t\t\tconst newRow = [];\n\n\t\t\tfor (let j = 0; j < cols; j++) {\n\t\t\t\tnewRow.push(this.data[dataIdx++]);\n\t\t\t}\n\n\t\t\tnewData.push(newRow);\n\t\t}\n\n\t\tthis.data = newData;\n\t\treturn this.data;\n\t}\n\n\ttranspose() {\n\t\tconst [rows, cols] = this.shape();\n\n\t\tconst newData = [];\n\n\t\tfor (let j = 0; j < cols; j++) {\n\t\t\tconst newRow = [];\n\n\t\t\tfor (let i = 0; i < rows; i++) {\n\t\t\t\tnewRow.push(this.data[i][j]);\n\t\t\t}\n\n\t\t\tnewData.push(newRow);\n\t\t}\n\n\t\tthis.data = newData;\n\t\treturn this.data;\n\t}\n\n\tmatmul(otherMatrix) {\n\t\tconst [rowA, colA] = this.shape();\n\t\tconst [rowB, colB] = otherMatrix.shape();\n\n\t\tif (colA !== rowB) {\n\t\t\tthrow new Error(\n\t\t\t\t`Cannot perform matrix multiplication: Incompatible dimension (${rowA}, ${colA}) with (${rowB}, ${colB})`\n\t\t\t);\n\t\t}\n\n\t\tconst res = Array.from({ length: rowA }, () =>\n\t\t\tArray.from({ length: colB }, () => 0)\n\t\t);\n\n\t\tfor (let i = 0; i < rowA; i++) {\n\t\t\tfor (let k = 0; k < colA; k++) {\n\t\t\t\tconst AiK = this.data[i][k];\n\n\t\t\t\tfor (let j = 0; j < rowB; j++) {\n\t\t\t\t\tres[i][j] += AiK * otherMatrix[k][j];\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn new NumJs(res);\n\t}\n\n\tdot(otherMatrix) {\n\t\tconst [rowA, colA] = this.shape();\n\t\tconst [rowB, colB] = otherMatrix.shape();\n\n\t\tif (colA !== rowB) {\n\t\t\tthrow new Error(\n\t\t\t\t`Cannot perform matrix multiplication: Incompatible dimension (${rowA}, ${colA}) with (${rowB}, ${colB})`\n\t\t\t);\n\t\t}\n\n\t\tconst res = Array.from({ length: rowA }, () =>\n\t\t\tArray.from({ length: colB }, () => 0)\n\t\t);\n\n\t\tfor (let i = 0; i < rowA; i++) {\n\t\t\tfor (let k = 0; k < colA; k++) {e\n\t\t\t\tconst AiK = this.data[i][k];\n\n\t\t\t\tfor (let j = 0; j < rowB; j++) {\n\t\t\t\t\tres[i][j] += AiK * otherMatrix[k][j];\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn res;\n\t}\n}\n\n\n//# sourceURL=webpack://neural-network/./src/utils/numJs.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/neural_network.js");
/******/ 	
/******/ })()
;