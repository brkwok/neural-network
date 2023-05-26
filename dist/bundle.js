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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"NeuralNetwork\": () => (/* binding */ NeuralNetwork)\n/* harmony export */ });\n/* harmony import */ var _utils_activationFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/activationFunctions */ \"./src/utils/activationFunctions.js\");\n/* harmony import */ var _utils_numJs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/numJs */ \"./src/utils/numJs.js\");\n\n\n\nclass NeuralNetwork {\n\tconstructor(inodes, hnodes, onodes, lr, actFunc) {\n\t\tthis.inodes = inodes;\n\t\tthis.hnodes = hnodes;\n\t\tthis.onodes = onodes;\n\t\tthis.lr = lr;\n\t\tthis.actFunc = actFunc || _utils_activationFunctions__WEBPACK_IMPORTED_MODULE_0__.sigmoid;\n\n\t\tthis._initWeights(this.inodes, this.hnodes, this.onodes);\n\t}\n\n\t_initWeights(inodes, hnodes, onodes) {\n\t\ttry {\n\t\t\tfetch(\"weights/who.csv\")\n\t\t\t\t.then((res) => res.text())\n\t\t\t\t.then((data) => {\n\t\t\t\t\tconst who = this._parseCSV(data);\n\t\t\t\t\tconst reshaped = new _utils_numJs__WEBPACK_IMPORTED_MODULE_1__[\"default\"](who).reshape(onodes, hnodes);\n\t\t\t\t\tthis.who = reshaped;\n\t\t\t\t});\n\t\t} catch (error) {\n\t\t\tconsole.error(error);\n\t\t}\n\n\t\ttry {\n\t\t\tfetch(\"weights/wih.csv\")\n\t\t\t\t.then((res) => res.text())\n\t\t\t\t.then((data) => {\n\t\t\t\t\tconst wih = this._parseCSV(data);\n\t\t\t\t\tconst reshaped = new _utils_numJs__WEBPACK_IMPORTED_MODULE_1__[\"default\"](wih).reshape(hnodes, inodes);\n\t\t\t\t\tthis.wih = reshaped;\n\t\t\t\t});\n\t\t} catch (error) {\n\t\t\tconsole.error(error);\n\t\t}\n\t}\n\n\t_parseCSV(data) {\n\t\tconst split = data.split(\",\");\n\t\treturn split.map((num) => {\n\t\t\treturn parseFloat(num);\n\t\t});\n\t}\n\n\tquery(inputs) {\n\t\tconst initInputs = new _utils_numJs__WEBPACK_IMPORTED_MODULE_1__[\"default\"](inputs, 2).transpose();\n\t\tconst hiddenInputs = this.wih.dot(initInputs);\n\t\tconst hiddenOutputs = new _utils_numJs__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.actFunc(hiddenInputs.data));\n\t\tconst outputInputs = this.who.dot(hiddenOutputs);\n\t\tconst outputOutputs = new _utils_numJs__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.actFunc(outputInputs.data));\n\n\t\tconst flattened = outputOutputs.data.flat();\n\n\t\tlet maxIdx = 0;\n\t\tlet max = 0;\n\n\t\tflattened.forEach((el, i) => {\n\t\t\tif (el > max) {\n\t\t\t\tmax = el;\n\t\t\t\tmaxIdx = i;\n\t\t\t}\n\t\t});\n\n\t\tconst answer = document.getElementById(\"answer\");\n\t\tanswer.innerText = `The output is: ${maxIdx}`;\n\t}\n}\n\n\n//# sourceURL=webpack://neural-network/./src/NeuralNetwork/NeuralNetwork.js?");

/***/ }),

/***/ "./src/neural_network.js":
/*!*******************************!*\
  !*** ./src/neural_network.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _NeuralNetwork_NeuralNetwork__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NeuralNetwork/NeuralNetwork */ \"./src/NeuralNetwork/NeuralNetwork.js\");\n\n\nconst canvas = document.getElementById(\"canvas\");\nconst clearButton = document.getElementById(\"clear\");\nconst guessButton = document.getElementById(\"guess\");\nconst ctx = canvas.getContext(\"2d\");\n\nctx.lineWidth = 25;\nctx.lineCap = \"round\";\nctx.strokeStyle = \"#000000\";\n\nconst NN = new _NeuralNetwork_NeuralNetwork__WEBPACK_IMPORTED_MODULE_0__.NeuralNetwork(28 * 28, 100, 10, 0.1);\n\nlet isDrawing = false;\n\ncanvas.addEventListener(\"mousedown\", startDrawing);\ncanvas.addEventListener(\"mousemove\", draw);\ncanvas.addEventListener(\"mouseup\", stopDrawing);\ncanvas.addEventListener(\"mouseleave\", stopDrawing);\n\ncanvas.addEventListener(\"touchstart\", startDrawing);\ncanvas.addEventListener(\"touchmove\", draw);\ncanvas.addEventListener(\"touchend\", stopDrawing);\n\nclearButton.addEventListener(\"click\", clearCanvas);\nguessButton.addEventListener(\"click\", predictOutput);\n\nfunction startDrawing(e) {\n\tisDrawing = true;\n\tconst { x, y } = getCursorPosition(e);\n\tctx.beginPath();\n\tctx.moveTo(x, y);\n}\n\nfunction draw(e) {\n\tif (!isDrawing) return;\n\tconst { x, y } = getCursorPosition(e);\n\tctx.lineTo(x, y);\n\tctx.stroke();\n}\n\nfunction stopDrawing() {\n\tisDrawing = false;\n}\n\nfunction getCursorPosition(e) {\n\tlet x, y;\n\n\tif (e.touches && e.touches.length === 1) {\n\t\tconst touch = e.touches[0];\n\t\tx = touch.clientX;\n\t\ty = touch.clientY;\n\t} else {\n\t\tx = e.clientX;\n\t\ty = e.clientY;\n\t}\n\n\tconst canvasRect = canvas.getBoundingClientRect();\n\tconst offsetX = x - canvasRect.left;\n\tconst offsetY = y - canvasRect.top;\n\n\treturn { x: offsetX, y: offsetY };\n}\n\nfunction clearCanvas() {\n\tctx.clearRect(0, 0, canvas.width, canvas.height);\n}\n\nfunction resizeImageData(imageData, newWidth, newHeight) {\n\tconst canvas = document.createElement(\"canvas\");\n\tconst context = canvas.getContext(\"2d\");\n\tconst tempCanvas = document.createElement(\"canvas\");\n\tconst tempContext = tempCanvas.getContext(\"2d\");\n\n\tcanvas.width = imageData.width;\n\tcanvas.height = imageData.height;\n\tcontext.putImageData(imageData, 0, 0);\n\n\t// const canvas2 = document.getElementById(\"canvas2\");\n\t// canvas2.append(canvas);\n\n\ttempCanvas.width = newWidth;\n\ttempCanvas.height = newHeight;\n\ttempContext.drawImage(canvas, 0, 0, newWidth, newHeight);\n\n\treturn tempContext.getImageData(0, 0, newWidth, newHeight).data;\n}\n\nfunction U8IntToArr(uIntArr) {\n\tconst regularArray = new Array(28 * 28).fill(0.01);\n\n\tuIntArr.forEach((pixel, i) => {\n\t\tif (pixel !== 0) {\n      const index = Math.floor(i / 4);\n      const normalized = pixel / 255;\n      regularArray[index] = normalized;\n\t\t}\n\t});\n\n\treturn regularArray;\n}\n\nfunction predictOutput() {\n\tconst imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);\n\n\tconst resizedData = resizeImageData(imageData, 28, 28);\n\n\tconst converted = U8IntToArr(resizedData);\n\n\n\tNN.query(converted);\n}\n\n\n//# sourceURL=webpack://neural-network/./src/neural_network.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ NumJs)\n/* harmony export */ });\nclass NumJs {\n\tconstructor(data, dim = 1) {\n\t\tthis.data = dim === 2 ? [data] : data;\n\t}\n\n\tshape() {\n\t\tconst rows = this.data.length;\n\t\tconst cols = Array.isArray(this.data[0]) ? this.data[0].length : 1;\n\t\treturn [rows, cols];\n\t}\n\n\treshape(rows, cols) {\n\t\tif (rows * cols !== this.data.length) {\n\t\t\tthrow new Error(\n\t\t\t\t`Cannot reshape array: incompatible dimension, (${rows}, ${cols}) with data size ${this.data.length}`\n\t\t\t);\n\t\t}\n\n\t\tconst newData = [];\n\t\tlet dataIdx = 0;\n\n\t\tfor (let i = 0; i < rows; i++) {\n\t\t\tconst newRow = [];\n\n\t\t\tfor (let j = 0; j < cols; j++) {\n\t\t\t\tnewRow.push(this.data[dataIdx++]);\n\t\t\t}\n\n\t\t\tnewData.push(newRow);\n\t\t}\n\n    return new NumJs(newData);\n\t}\n\n\ttranspose() {\n\t\tconst [rows, cols] = this.shape();\n\n\t\tconst newData = [];\n\n\t\tfor (let j = 0; j < cols; j++) {\n\t\t\tconst newRow = [];\n\n\t\t\tfor (let i = 0; i < rows; i++) {\n\t\t\t\tnewRow.push(this.data[i][j]);\n\t\t\t}\n\n\t\t\tnewData.push(newRow);\n\t\t}\n\n\t\treturn new NumJs(newData);\n\t}\n\n\tmatmul(otherMatrix) {\n\t\tconst [rowA, colA] = this.shape();\n\t\tconst [rowB, colB] = otherMatrix.shape();\n\n\t\tif (colA !== rowB) {\n\t\t\tthrow new Error(\n\t\t\t\t`Cannot perform matrix multiplication: Incompatible dimension (${rowA}, ${colA}) with (${rowB}, ${colB})`\n\t\t\t);\n\t\t}\n\n\t\tconst res = Array.from({ length: rowA }, () =>\n\t\t\tArray.from({ length: colB }, () => 0)\n\t\t);\n\n\t\tfor (let i = 0; i < rowA; i++) {\n\t\t\tfor (let k = 0; k < colA; k++) {\n\t\t\t\tconst AiK = this.data[i][k];\n\n\t\t\t\tfor (let j = 0; j < rowB; j++) {\n\t\t\t\t\tres[i][j] += AiK * otherMatrix.data[k][j];\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn new NumJs(res);\n\t}\n\n\tdot(otherMatrix) {\n\t\tconst [rowA, colA] = this.shape();\n\t\tconst [rowB, colB] = otherMatrix.shape();\n\n\t\tif (colA !== rowB) {\n\t\t\tthrow new Error(\n\t\t\t\t`Cannot perform dot product: Incompatible dimension (${rowA}, ${colA}) with (${rowB}, ${colB})`\n\t\t\t);\n\t\t}\n\n\t\tconst res = Array.from({ length: rowA }, () =>\n\t\t\tArray.from({ length: colB }, () => 0)\n\t\t);\n\n\t\tfor (let i = 0; i < rowA; i++) {\n\t\t\tfor (let k = 0; k < colA; k++) {\n\t\t\t\tconst AiK = this.data[i][k];\n\n\t\t\t\tfor (let j = 0; j < colB; j++) {\n\t\t\t\t\tres[i][j] += AiK * otherMatrix.data[k][j];\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\treturn new NumJs(res);\n\t}\n}\n\n\n//# sourceURL=webpack://neural-network/./src/utils/numJs.js?");

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