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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"NeuralNetwork\": () => (/* binding */ NeuralNetwork)\n/* harmony export */ });\n/* harmony import */ var _utils_activationFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/activationFunctions */ \"./src/utils/activationFunctions.js\");\n\n\nclass NeuralNetwork {\n\tconstructor(inodes, hnodes, onodes, lr, actFunc) {\n\t\tthis.inodes = inodes;\n\t\tthis.hnodes = hnodes;\n\t\tthis.onodes = onodes;\n\t\tthis.lr = lr;\n\t\tthis.actFunc = actFunc || _utils_activationFunctions__WEBPACK_IMPORTED_MODULE_0__.sigmoid;\n\n\t\tthis._initWeights();\n\t}\n\n\tasync _initWeights() {\n\t\ttry {\n\t\t\tfetch(\"weights/who.csv\")\n\t\t\t\t.then((res) => res.text())\n\t\t\t\t.then((data) => {\n\t\t\t\t\tconsole.log(data);\n\t\t\t\t});\n\t\t} catch (error) {\n\t\t\tconsole.log(error);\n\t\t}\n\n\t\ttry {\n\t\t\tfetch(\"weights/wih.csv\")\n\t\t\t\t.then((res) => res.text())\n\t\t\t\t.then((data) => {\n\t\t\t\t\tconsole.log(data);\n\t\t\t\t});\n\t\t} catch (error) {\n\t\t\tconsole.log(error);\n\t\t}\n\t}\n}\n\n\n//# sourceURL=webpack://neural-network/./src/NeuralNetwork/NeuralNetwork.js?");

/***/ }),

/***/ "./src/neural_network.js":
/*!*******************************!*\
  !*** ./src/neural_network.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _NeuralNetwork_NeuralNetwork__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NeuralNetwork/NeuralNetwork */ \"./src/NeuralNetwork/NeuralNetwork.js\");\n\n\nconst NN = new _NeuralNetwork_NeuralNetwork__WEBPACK_IMPORTED_MODULE_0__.NeuralNetwork(10, 10, 10, 0.1);\n\nconsole.log(NN);\n\n//# sourceURL=webpack://neural-network/./src/neural_network.js?");

/***/ }),

/***/ "./src/utils/activationFunctions.js":
/*!******************************************!*\
  !*** ./src/utils/activationFunctions.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"sigmoid\": () => (/* binding */ sigmoid)\n/* harmony export */ });\nconst sig = (z) => {\n\treturn 1.0 / (1.0 + Math.exp(-z));\n};\n\nconst sigmoid = (z) => {\n\tlet res;\n\tif (Array.isArray(z)) {\n\t\tres = new Array(z.length);\n\n\t\tfor (let i = 0; i < z.length; i++) {\n\t\t\tres[i] = sig(z);\n\t\t}\n\t} else {\n\t\tres = sig(z);\n\t}\n\n\treturn res;\n};\n\n\n//# sourceURL=webpack://neural-network/./src/utils/activationFunctions.js?");

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