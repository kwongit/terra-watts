/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/config.js":
/*!*****************************!*\
  !*** ./assets/js/config.js ***!
  \*****************************/
/***/ (() => {

eval("// export const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;\n// export const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;\n\n//# sourceURL=webpack://story/./assets/js/config.js?");

/***/ }),

/***/ "./assets/js/contentful-integration.js":
/*!*********************************************!*\
  !*** ./assets/js/contentful-integration.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.js */ \"./assets/js/config.js\");\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_config_js__WEBPACK_IMPORTED_MODULE_0__);\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  var client = contentful.createClient({\n    // space: CONTENTFUL_SPACE_ID,\n    // accessToken: CONTENTFUL_ACCESS_TOKEN,\n    space: \"gxq41zi7q6dh\",\n    accessToken: \"gXpDSgdpbtZzG7Ze0_RvckuQLHLBWoHOw3e8zz-qoSQ\"\n  });\n\n  // Function to update a section\n  function updateSection(sectionId, title, content, imageUrl) {\n    var section = document.getElementById(sectionId);\n    if (section) {\n      var h2 = section.querySelector(\"h2\");\n      var p = section.querySelector(\"p\");\n      if (h2) {\n        h2.textContent = title;\n      }\n      if (p) {\n        p.textContent = content;\n      }\n    }\n    // Update image if available\n    if (imageUrl) {\n      var imageSection = document.querySelector(\"#\".concat(sectionId, \" .image img\"));\n      if (imageSection) {\n        imageSection.src = imageUrl;\n      }\n    }\n  }\n\n  // Function to create and append new gallery items\n  function updateGallery(items) {\n    var gallery = document.querySelector(\".gallery\");\n    if (gallery) {\n      // Reverse the array of items\n      items.reverse();\n      gallery.innerHTML = \"\"; // Clear existing content\n      items.forEach(function (item) {\n        var article = document.createElement(\"article\");\n        var link = document.createElement(\"a\");\n        link.href = item.link;\n        link.classList.add(\"image\");\n        link.target = \"#\";\n        var img = document.createElement(\"img\");\n        img.src = item.imageUrl;\n        img.alt = item.title;\n        link.appendChild(img);\n        var caption = document.createElement(\"div\");\n        caption.classList.add(\"caption\");\n        var h3 = document.createElement(\"h3\");\n        h3.textContent = item.title;\n        var p = document.createElement(\"p\");\n        p.textContent = item.description;\n        caption.appendChild(h3);\n        caption.appendChild(p);\n        article.appendChild(link);\n        article.appendChild(caption);\n        gallery.appendChild(article);\n      });\n    }\n  }\n  client.getEntries({\n    content_type: \"header\"\n  }).then(function (response) {\n    var headerEntry = response.items[0];\n    if (headerEntry) {\n      var title = headerEntry.fields.title;\n      var navLinkText = headerEntry.fields.navLinkText;\n      var headerTitle = document.querySelector(\"#header h1 a\");\n      var navLink = document.querySelector(\"#header nav a\");\n      if (headerTitle) {\n        headerTitle.textContent = title;\n      }\n      if (navLink) {\n        navLink.textContent = navLinkText;\n      }\n    }\n  })[\"catch\"](function (err) {\n    return console.error(\"Error fetching Contentful data:\", err);\n  });\n\n  // Fetch and update sections\n  client.getEntries({\n    content_type: \"section\"\n  }).then(function (response) {\n    response.items.forEach(function (entry) {\n      var sectionId = entry.fields.sectionId;\n      var title = entry.fields.title;\n      var content = entry.fields.content;\n      var imageUrl = entry.fields.image ? entry.fields.image.fields.file.url : null;\n      updateSection(sectionId, title, content, imageUrl);\n    });\n  })[\"catch\"](function (err) {\n    return console.error(\"Error fetching Contentful data:\", err);\n  });\n\n  // Fetch and update gallery\n  client.getEntries({\n    content_type: \"galleryItem\"\n  }).then(function (response) {\n    var galleryItems = response.items.map(function (entry) {\n      return {\n        title: entry.fields.title,\n        description: entry.fields.description,\n        imageUrl: entry.fields.image.fields.file.url,\n        link: entry.fields.link ? entry.fields.link : \"#\"\n      };\n    });\n    updateGallery(galleryItems);\n  })[\"catch\"](function (err) {\n    return console.error(\"Error fetching Contentful data:\", err);\n  });\n});\n\n//# sourceURL=webpack://story/./assets/js/contentful-integration.js?");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	var __webpack_exports__ = __webpack_require__("./assets/js/contentful-integration.js");
/******/ 	
/******/ })()
;