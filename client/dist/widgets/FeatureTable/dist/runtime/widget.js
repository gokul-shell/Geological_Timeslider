System.register(["jimu-core/react","esri/widgets/FeatureTable","calcite-components","esri/widgets/LayerList","esri/layers/FeatureLayer"], function(__WEBPACK_DYNAMIC_EXPORT__, __system_context__) {
	var __WEBPACK_EXTERNAL_MODULE_react__ = {};
	var __WEBPACK_EXTERNAL_MODULE__arcgis_core_widgets_FeatureTable__ = {};
	var __WEBPACK_EXTERNAL_MODULE_calcite_components__ = {};
	var __WEBPACK_EXTERNAL_MODULE_esri_widgets_LayerList__ = {};
	var __WEBPACK_EXTERNAL_MODULE__arcgis_core_layers_FeatureLayer__ = {};
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_react__, "__esModule", { value: true });
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE__arcgis_core_widgets_FeatureTable__, "__esModule", { value: true });
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_calcite_components__, "__esModule", { value: true });
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_esri_widgets_LayerList__, "__esModule", { value: true });
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE__arcgis_core_layers_FeatureLayer__, "__esModule", { value: true });
	return {
		setters: [
			function(module) {
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_react__[key] = module[key];
				});
			},
			function(module) {
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE__arcgis_core_widgets_FeatureTable__[key] = module[key];
				});
			},
			function(module) {
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_calcite_components__[key] = module[key];
				});
			},
			function(module) {
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_esri_widgets_LayerList__[key] = module[key];
				});
			},
			function(module) {
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE__arcgis_core_layers_FeatureLayer__[key] = module[key];
				});
			}
		],
		execute: function() {
			__WEBPACK_DYNAMIC_EXPORT__(
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "calcite-components":
/*!*************************************!*\
  !*** external "calcite-components" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_calcite_components__;

/***/ }),

/***/ "@arcgis/core/layers/FeatureLayer":
/*!*******************************************!*\
  !*** external "esri/layers/FeatureLayer" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__arcgis_core_layers_FeatureLayer__;

/***/ }),

/***/ "@arcgis/core/widgets/FeatureTable":
/*!********************************************!*\
  !*** external "esri/widgets/FeatureTable" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__arcgis_core_widgets_FeatureTable__;

/***/ }),

/***/ "esri/widgets/LayerList":
/*!*****************************************!*\
  !*** external "esri/widgets/LayerList" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_esri_widgets_LayerList__;

/***/ }),

/***/ "react":
/*!**********************************!*\
  !*** external "jimu-core/react" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!******************************************!*\
  !*** ./jimu-core/lib/set-public-path.ts ***!
  \******************************************/
/**
 * Webpack will replace __webpack_public_path__ with __webpack_require__.p to set the public path dynamically.
 * The reason why we can't set the publicPath in webpack config is: we change the publicPath when download.
 * */
// eslint-disable-next-line
// @ts-ignore
__webpack_require__.p = window.jimuConfig.baseUrl;

})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************************************************************!*\
  !*** ./your-extensions/widgets/FeatureTable/src/runtime/widget.tsx ***!
  \*********************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __set_webpack_public_path__: () => (/* binding */ __set_webpack_public_path__),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _arcgis_core_widgets_FeatureTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @arcgis/core/widgets/FeatureTable */ "@arcgis/core/widgets/FeatureTable");
/* harmony import */ var calcite_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! calcite-components */ "calcite-components");
/* harmony import */ var esri_widgets_LayerList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! esri/widgets/LayerList */ "esri/widgets/LayerList");
/* harmony import */ var _arcgis_core_layers_FeatureLayer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @arcgis/core/layers/FeatureLayer */ "@arcgis/core/layers/FeatureLayer");





const FeatureTableComponent = ({ jimuMapView }) => {
    const [tabNames, setTabNames] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]); // State variable for tab names
    const [activeTab, setActiveTab] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1); // State to manage active tab
    const [buttonStyle, setButtonStyle] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
        bottom: "0%",
        position: "fixed",
        left: "50%",
        backgroundColor: "green",
        width: "90px"
    });
    const [showFeatureTable, setShowFeatureTable] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [layerListVisible, setLayerListVisible] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [featureTable, setFeatureTable] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    function toggleLayerList() {
        console.log(layerListVisible);
        setLayerListVisible(!layerListVisible);
        const layerListDiv = document.getElementById("layerListDiv");
        if (layerListVisible) {
            var elements = document.getElementsByClassName("esri-basemap-gallery");
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                element.style.display = "none";
            }
            var elements1 = document.getElementsByClassName("esri-measurement-widget-content");
            for (var i = 0; i < elements1.length; i++) {
                var element1 = elements1[i];
                element1.style.display = "none";
            }
            layerListDiv.style.display = "block";
        }
        else {
            layerListDiv.style.display = "none";
        }
        console.log(layerListVisible);
    }
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (jimuMapView) {
            const layerList = new esri_widgets_LayerList__WEBPACK_IMPORTED_MODULE_3__["default"]({
                view: jimuMapView.view,
                container: "layerListDiv",
                listItemCreatedFunction: function (event) {
                    var item = event.item;
                    // Add actions for each layer
                    if (item.layer) {
                        item.actionsSections = [
                            [{
                                    title: "Zoom to",
                                    className: "esri-icon-zoom-in-magnifying-glass",
                                    id: "zoomTo"
                                }, {
                                    title: "Transparency",
                                    className: "esri-icon-opacity",
                                    id: "transparency"
                                }, {
                                    title: "Open Attribute Table",
                                    className: "esri-icon-table",
                                    id: "openAttributeTable"
                                }]
                        ];
                    }
                }
            });
            jimuMapView.view.ui.add(layerList);
            layerList.on("trigger-action", function (event) {
                const layer = event.item.layer;
                if (event.action.id === "zoomTo") {
                    jimuMapView.view.goTo(layer.fullExtent);
                }
                else if (event.action.id === "transparency") {
                    // Show a transparency slider or input field to adjust transparency
                    // You can adjust layer.opacity to change transparency
                    handleTransparencyAdjustment(layer);
                }
                else if (event.action.id === "openAttributeTable") {
                    // Open attribute table for the layer
                    setButtonStyle({
                        bottom: "50%",
                        position: "fixed",
                        left: "50%",
                        backgroundColor: "green",
                        width: "90px"
                    });
                    handleTabClick(layer["url"], layer["title"]);
                }
            });
            const newTabNames = []; // Create a new array to store tab names
            if (jimuMapView.view.map.layers) {
                jimuMapView.view.map.layers.items.forEach(function (lyr) {
                    console.log(lyr.title);
                    newTabNames.push({ title: lyr.title, url: lyr.url });
                });
                setTabNames(newTabNames); // Update the state with new array
            }
        }
    }, [jimuMapView]); // Trigger the effect when jimuMapView changes
    const toggleFeatureTable = () => {
        setShowFeatureTable(!showFeatureTable);
        if (showFeatureTable) {
            setButtonStyle({
                bottom: "0%",
                position: "fixed",
                left: "50%",
                backgroundColor: "green",
                width: "90px"
            });
        }
        else {
            const featureLayer = new _arcgis_core_layers_FeatureLayer__WEBPACK_IMPORTED_MODULE_4__["default"]({
                url: "https://mapserver1.europe.shell.com/arcgis/rest/services/Global/CrossSections_multi/MapServer",
                outFields: ["*"]
            });
            // Update the layer of the existing FeatureTable instance
            const table = new _arcgis_core_widgets_FeatureTable__WEBPACK_IMPORTED_MODULE_1__["default"]({
                layer: featureLayer,
                view: jimuMapView.view
            });
            setFeatureTable(table);
            setButtonStyle({
                bottom: "50%",
                position: "fixed",
                left: "50%",
                backgroundColor: "green",
                width: "90px"
            });
        }
    };
    const handleTabClick = (data, title) => {
        // setActiveTab(tab);
        setShowFeatureTable(true); // Show the feature table
        setButtonStyle({
            bottom: "50%",
            position: "fixed",
            left: "50%",
            backgroundColor: "green",
            width: "90px"
        });
        console.log(data);
        console.log(jimuMapView.view.map.layers.items);
        var bottomValue = localStorage.getItem("bottomValue");
        var topValue = localStorage.getItem("topValue");
        var ckd = JSON.parse(localStorage.getItem("ckd"));
        console.log(bottomValue);
        // const newDefinitionExpression = `YNG_AGE_MM >  ${bottomValue} AND OLD_AGE_MM < ${topValue}`;
        var newDefinitionExpression;
        if (data === "https://mapserver1.europe.shell.com/arcgis/rest/services/Global/DrilledHoleAnalysis_Shell/MapServer") {
            data = "https://mapserver1.europe.shell.com/arcgis/rest/services/Global/DrilledHoleAnalysis_Shell/MapServer/0";
            newDefinitionExpression = `YOUNG_AGE_MM >  ${bottomValue} AND OLD_AGE_MM < ${topValue}`;
        }
        else if (data === "https://mapserver1.europe.shell.com/arcgis/rest/services/Global/DrilledHoleAnalysis_Shell/MapServer/2") {
            newDefinitionExpression = `YOUNG_AGE_MM >  ${bottomValue} AND OLD_AGE_MM < ${topValue}`;
        }
        else {
            newDefinitionExpression = `YNG_AGE_MA >  ${bottomValue} AND OLD_AGE_MA < ${topValue}`;
        }
        if (ckd !== null) {
            if (ckd.includes(title) && ckd.length !== 0) {
                console.log(data);
                const featureLayer = new _arcgis_core_layers_FeatureLayer__WEBPACK_IMPORTED_MODULE_4__["default"]({
                    url: data,
                    outFields: ["*"]
                });
                const featureTable = new _arcgis_core_widgets_FeatureTable__WEBPACK_IMPORTED_MODULE_1__["default"]({
                    layer: featureLayer,
                    view: jimuMapView.view
                });
                featureLayer.definitionExpression = newDefinitionExpression;
                // featureTable.container =  "featureTableDiv"
                setFeatureTable(featureTable);
            }
            else {
                if (data === "https://mapserver1.europe.shell.com/arcgis/rest/services/Global/DrilledHoleAnalysis_Shell/MapServer/0") {
                    const featureLayer = new _arcgis_core_layers_FeatureLayer__WEBPACK_IMPORTED_MODULE_4__["default"]({
                        url: data,
                        outFields: ["*"]
                    });
                    const featureTable = new _arcgis_core_widgets_FeatureTable__WEBPACK_IMPORTED_MODULE_1__["default"]({
                        layer: featureLayer,
                        view: jimuMapView.view
                    });
                    // featureLayer.definitionExpression = newDefinitionExpression;
                    setFeatureTable(featureTable);
                }
                else if (data === "https://mapserver1.europe.shell.com/arcgis/rest/services/Global/DrilledHoleAnalysis_Shell/MapServer/2") {
                    const featureLayer = new _arcgis_core_layers_FeatureLayer__WEBPACK_IMPORTED_MODULE_4__["default"]({
                        url: data,
                        outFields: ["*"]
                    });
                    const featureTable = new _arcgis_core_widgets_FeatureTable__WEBPACK_IMPORTED_MODULE_1__["default"]({
                        layer: featureLayer,
                        view: jimuMapView.view
                    });
                    // featureLayer.definitionExpression = newDefinitionExpression;
                    setFeatureTable(featureTable);
                }
                else {
                    const existingLayer = jimuMapView.view.map.layers.find(layer => layer.url === data);
                    if (existingLayer) {
                        const featureTable = new _arcgis_core_widgets_FeatureTable__WEBPACK_IMPORTED_MODULE_1__["default"]({
                            layer: existingLayer,
                            view: jimuMapView.view
                        });
                        // existingLayer.definitionExpression = newDefinitionExpression;
                        setFeatureTable(featureTable);
                    }
                }
                //  }
            }
        }
    };
    function handleTransparencyAdjustment(layer) {
        // Prompt the user to adjust transparency
        const transparencyValue = prompt("Enter transparency value (0-1):");
        // Parse the transparency value to ensure it's a valid number between 0 and 1
        const opacity = parseFloat(transparencyValue);
        // Check if the opacity is a valid number between 0 and 1
        if (!isNaN(opacity) && opacity >= 0 && opacity <= 1) {
            // Set the layer's opacity to the provided value
            layer.opacity = opacity;
        }
        else {
            // Show an error message if the input is invalid
            alert("Please enter a valid transparency value between 0 and 1.");
        }
    }
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        // Clear the container when the featureTable changes
        const container = document.getElementById("featureTableDiv");
        if (container) {
            container.innerHTML = ""; // Remove all child elements
        }
        if (featureTable) {
            featureTable.container = "featureTableDiv"; // Assign the container to the FeatureTable instance
        }
    }, [featureTable]);
    return (react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(react__WEBPACK_IMPORTED_MODULE_0__["default"].Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", { style: { position: 'relative' } },
            react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("button", { style: buttonStyle, onClick: toggleFeatureTable },
                "  ",
                react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", { style: { marginLeft: '5px' } }, "\u25BC"),
                " "),
            showFeatureTable && (react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", { style: {
                    position: "fixed",
                    top: "50%",
                    left: "-9px",
                    zIndex: 1,
                    height: "50%",
                    width: "100%",
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    padding: "10px"
                } },
                react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", { className: "tab-pane" },
                    react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", { className: "tab-buttons" },
                        tabNames.map((tabName, index) => (react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("button", { key: index, onClick: () => handleTabClick(tabName["url"], tabName["title"]) }, tabName["title"]))),
                        react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("button", { onClick: () => handleTabClick("https://mapserver1.europe.shell.com/arcgis/rest/services/Global/Fields_Reservoirs_TQEUR_Shell/MapServer/1", "PVD.TEST_GLOBALTQEUR_NOGEOM") }, "PVD.TEST_GLOBALTQEUR_NOGEOM"))),
                react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", { id: "featureTableDiv" })))),
        react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", { id: "layerListDiv", style: { right: "50px", top: "17px", width: "30%" } },
            react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("button", { style: { border: "none", position: "relative",
                    left: "-41px",
                    padding: "inherit" }, onClick: () => handleTabClick("https://mapserver1.europe.shell.com/arcgis/rest/services/Global/Fields_Reservoirs_TQEUR_Shell/MapServer/1", "PVD.TEST_GLOBALTQEUR_NOGEOM") },
                "PVD.TEST_GLOBALTQEUR_NOGEOM",
                react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(calcite_components__WEBPACK_IMPORTED_MODULE_2__.CalciteIcon, { icon: "table", style: { position: "relative",
                        right: "-112px" }, scale: "s" }),
                " ")),
        react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("button", { style: { position: "fixed", top: "10px", right: "10px" }, onClick: toggleLayerList },
            " ",
            react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(calcite_components__WEBPACK_IMPORTED_MODULE_2__.CalciteIcon, { icon: "layers" }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FeatureTableComponent);
function __set_webpack_public_path__(url) { __webpack_require__.p = url; }

})();

/******/ 	return __webpack_exports__;
/******/ })()

			);
		}
	};
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0cy9GZWF0dXJlVGFibGUvZGlzdC9ydW50aW1lL3dpZGdldC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7QUNBQTs7O0tBR0s7QUFDTCwyQkFBMkI7QUFDM0IsYUFBYTtBQUNiLHFCQUF1QixHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOcUI7QUFFWDtBQUNaO0FBR0E7QUFDVTtBQUczRCxNQUFNLHFCQUFxQixHQUFHLENBQUMsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFO0lBQ2hELE1BQU0sQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLEdBQUcsK0NBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLCtCQUErQjtJQUM3RSxNQUFNLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxHQUFHLCtDQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyw2QkFBNkI7SUFDNUUsTUFBTSxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsR0FBRywrQ0FBUSxDQUFnQjtRQUM1RCxNQUFNLEVBQUUsSUFBSTtRQUNaLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLElBQUksRUFBRSxL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RUFBQztBQUU3QixTQUFTLDJCQUEyQixDQUFDLEdBQUcsSUFBSSxxQkFBdUIsR0FBRyxHQUFHLEVBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2V4Yi1jbGllbnQvZXh0ZXJuYWwgc3lzdGVtIFwiY2FsY2l0ZS1jb21wb25lbnRzXCIiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC9leHRlcm5hbCBzeXN0ZW0gXCJlc3JpL2xheWVycy9GZWF0dXJlTGF5ZXJcIiIsIndlYnBhY2s6Ly9leGItY2xpZW50L2V4dGVybmFsIHN5c3RlbSBcImVzcmkvd2lkZ2V0cy9GZWF0dXJlVGFibGVcIiIsIndlYnBhY2s6Ly9leGItY2xpZW50L2V4dGVybmFsIHN5c3RlbSBcImVzcmkvd2lkZ2V0cy9MYXllckxpc3RcIiIsIndlYnBhY2s6Ly9leGItY2xpZW50L2V4dGVybmFsIHN5c3RlbSBcImppbXUtY29yZS9yZWFjdFwiIiwid2VicGFjazovL2V4Yi1jbGllbnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2V4Yi1jbGllbnQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9leGItY2xpZW50L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2V4Yi1jbGllbnQvLi9qaW11LWNvcmUvbGliL3NldC1wdWJsaWMtcGF0aC50cyIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4veW91ci1leHRlbnNpb25zL3dpZGdldHMvRmVhdHVyZVRhYmxlL3NyYy9ydW50aW1lL3dpZGdldC50c3giXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2NhbGNpdGVfY29tcG9uZW50c19fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fYXJjZ2lzX2NvcmVfbGF5ZXJzX0ZlYXR1cmVMYXllcl9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fYXJjZ2lzX2NvcmVfd2lkZ2V0c19GZWF0dXJlVGFibGVfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZXNyaV93aWRnZXRzX0xheWVyTGlzdF9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9yZWFjdF9fOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjsiLCIvKipcclxuICogV2VicGFjayB3aWxsIHJlcGxhY2UgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gd2l0aCBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgdG8gc2V0IHRoZSBwdWJsaWMgcGF0aCBkeW5hbWljYWxseS5cclxuICogVGhlIHJlYXNvbiB3aHkgd2UgY2FuJ3Qgc2V0IHRoZSBwdWJsaWNQYXRoIGluIHdlYnBhY2sgY29uZmlnIGlzOiB3ZSBjaGFuZ2UgdGhlIHB1YmxpY1BhdGggd2hlbiBkb3dubG9hZC5cclxuICogKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbi8vIEB0cy1pZ25vcmVcclxuX193ZWJwYWNrX3B1YmxpY19wYXRoX18gPSB3aW5kb3cuamltdUNvbmZpZy5iYXNlVXJsXHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LHVzZVJlZixDU1NQcm9wZXJ0aWVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBsb2FkTW9kdWxlcyB9IGZyb20gJ2VzcmktbG9hZGVyJztcclxuaW1wb3J0IEZlYXR1cmVUYWJsZSBmcm9tICdAYXJjZ2lzL2NvcmUvd2lkZ2V0cy9GZWF0dXJlVGFibGUnO1xyXG5pbXBvcnQgeyBDYWxjaXRlSWNvbiB9IGZyb20gJ2NhbGNpdGUtY29tcG9uZW50cyc7XHJcbmltcG9ydCBNYXBJbWFnZUxheWVyIGZyb20gXCJlc3JpL2xheWVycy9NYXBJbWFnZUxheWVyXCI7XHJcbmltcG9ydCBXZWJNYXAgZnJvbSAnQGFyY2dpcy9jb3JlL1dlYk1hcCc7XHJcbmltcG9ydCAgTGF5ZXJMaXN0ICBmcm9tICdlc3JpL3dpZGdldHMvTGF5ZXJMaXN0JztcclxuaW1wb3J0IEZlYXR1cmVMYXllciBmcm9tICdAYXJjZ2lzL2NvcmUvbGF5ZXJzL0ZlYXR1cmVMYXllcidcclxuXHJcblxyXG5jb25zdCBGZWF0dXJlVGFibGVDb21wb25lbnQgPSAoeyBqaW11TWFwVmlldyB9KSA9PiB7XHJcbiAgY29uc3QgW3RhYk5hbWVzLCBzZXRUYWJOYW1lc10gPSB1c2VTdGF0ZShbXSk7IC8vIFN0YXRlIHZhcmlhYmxlIGZvciB0YWIgbmFtZXNcclxuICBjb25zdCBbYWN0aXZlVGFiLCBzZXRBY3RpdmVUYWJdID0gdXNlU3RhdGUoMSk7IC8vIFN0YXRlIHRvIG1hbmFnZSBhY3RpdmUgdGFiXHJcbiAgY29uc3QgW2J1dHRvblN0eWxlLCBzZXRCdXR0b25TdHlsZV0gPSB1c2VTdGF0ZTxDU1NQcm9wZXJ0aWVzPih7XHJcbiAgICBib3R0b206IFwiMCVcIixcclxuICAgIHBvc2l0aW9uOiBcImZpeGVkXCIsXHJcbiAgICBsZWZ0OiBcIjUwJVwiLFxyXG4gICAgYmFja2dyb3VuZENvbG9yOlwiZ3JlZW5cIixcclxuICAgIHdpZHRoOlwiOTBweFwiXHJcbiAgfSk7XHJcbiAgY29uc3QgW3Nob3dGZWF0dXJlVGFibGUsIHNldFNob3dGZWF0dXJlVGFibGVdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtsYXllckxpc3RWaXNpYmxlLCBzZXRMYXllckxpc3RWaXNpYmxlXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICAgY29uc3QgW2ZlYXR1cmVUYWJsZSwgc2V0RmVhdHVyZVRhYmxlXSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIFxyXG5cclxuICBmdW5jdGlvbiB0b2dnbGVMYXllckxpc3QoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhsYXllckxpc3RWaXNpYmxlKVxyXG4gICBcclxuICAgICAgc2V0TGF5ZXJMaXN0VmlzaWJsZSghbGF5ZXJMaXN0VmlzaWJsZSk7XHJcbiAgICBcclxuICAgICAgY29uc3QgbGF5ZXJMaXN0RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYXllckxpc3REaXZcIik7XHJcbiAgICAgIGlmIChsYXllckxpc3RWaXNpYmxlKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImVzcmktYmFzZW1hcC1nYWxsZXJ5XCIpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBlbGVtZW50c1tpXSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBlbGVtZW50czEgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZXNyaS1tZWFzdXJlbWVudC13aWRnZXQtY29udGVudFwiKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1lbnRzMS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgZWxlbWVudDEgPSBlbGVtZW50czFbaV0gYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGVsZW1lbnQxLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGF5ZXJMaXN0RGl2LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICBcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsYXllckxpc3REaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICB9IFxyXG4gICAgY29uc29sZS5sb2cobGF5ZXJMaXN0VmlzaWJsZSlcclxuICB9XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbmlmKGppbXVNYXBWaWV3KXtcclxuICAgIGNvbnN0IGxheWVyTGlzdCA9IG5ldyBMYXllckxpc3Qoe1xyXG4gICAgICAgICAgdmlldzogamltdU1hcFZpZXcudmlldyxcclxuICAgICAgICAgIGNvbnRhaW5lcjpcImxheWVyTGlzdERpdlwiLFxyXG4gICAgICAgICAgbGlzdEl0ZW1DcmVhdGVkRnVuY3Rpb246IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gZXZlbnQuaXRlbTtcclxuICAgICAgICAgICAgLy8gQWRkIGFjdGlvbnMgZm9yIGVhY2ggbGF5ZXJcclxuICAgICAgICAgICAgaWYgKGl0ZW0ubGF5ZXIpIHtcclxuICAgICAgICAgICAgICBpdGVtLmFjdGlvbnNTZWN0aW9ucyA9IFtcclxuICAgICAgICAgICAgICAgIFt7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlpvb20gdG9cIixcclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImVzcmktaWNvbi16b29tLWluLW1hZ25pZnlpbmctZ2xhc3NcIixcclxuICAgICAgICAgICAgICAgICAgaWQ6IFwiem9vbVRvXCJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVHJhbnNwYXJlbmN5XCIsXHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJlc3JpLWljb24tb3BhY2l0eVwiLFxyXG4gICAgICAgICAgICAgICAgICBpZDogXCJ0cmFuc3BhcmVuY3lcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogXCJPcGVuIEF0dHJpYnV0ZSBUYWJsZVwiLFxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiZXNyaS1pY29uLXRhYmxlXCIsXHJcbiAgICAgICAgICAgICAgICAgIGlkOiBcIm9wZW5BdHRyaWJ1dGVUYWJsZVwiXHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgIGppbXVNYXBWaWV3LnZpZXcudWkuYWRkKGxheWVyTGlzdCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGF5ZXJMaXN0Lm9uKFwidHJpZ2dlci1hY3Rpb25cIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgIGNvbnN0IGxheWVyID0gZXZlbnQuaXRlbS5sYXllcjtcclxuICAgICAgICAgIGlmIChldmVudC5hY3Rpb24uaWQgPT09IFwiem9vbVRvXCIpIHtcclxuICAgICAgICAgICAgamltdU1hcFZpZXcudmlldy5nb1RvKGxheWVyLmZ1bGxFeHRlbnQpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChldmVudC5hY3Rpb24uaWQgPT09IFwidHJhbnNwYXJlbmN5XCIpIHtcclxuICAgICAgICAgICAgLy8gU2hvdyBhIHRyYW5zcGFyZW5jeSBzbGlkZXIgb3IgaW5wdXQgZmllbGQgdG8gYWRqdXN0IHRyYW5zcGFyZW5jeVxyXG4gICAgICAgICAgICAvLyBZb3UgY2FuIGFkanVzdCBsYXllci5vcGFjaXR5IHRvIGNoYW5nZSB0cmFuc3BhcmVuY3lcclxuICAgICAgICAgICAgaGFuZGxlVHJhbnNwYXJlbmN5QWRqdXN0bWVudChsYXllcik7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmFjdGlvbi5pZCA9PT0gXCJvcGVuQXR0cmlidXRlVGFibGVcIikge1xyXG4gICAgICAgICAgICAvLyBPcGVuIGF0dHJpYnV0ZSB0YWJsZSBmb3IgdGhlIGxheWVyXHJcbiAgICAgICAgICAgIHNldEJ1dHRvblN0eWxlKHtcclxuICAgICAgYm90dG9tOiBcIjUwJVwiLFxyXG4gICAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxyXG4gICAgICBsZWZ0OiBcIjUwJVwiLFxyXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6XCJncmVlblwiLFxyXG4gICAgICB3aWR0aDpcIjkwcHhcIlxyXG4gICAgfSk7XHJcbiAgICAgICAgICAgIGhhbmRsZVRhYkNsaWNrKGxheWVyW1widXJsXCJdLGxheWVyW1widGl0bGVcIl0pO1xyXG5cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIGNvbnN0IG5ld1RhYk5hbWVzID0gW107IC8vIENyZWF0ZSBhIG5ldyBhcnJheSB0byBzdG9yZSB0YWIgbmFtZXNcclxuICAgIGlmIChqaW11TWFwVmlldy52aWV3Lm1hcC5sYXllcnMpIHtcclxuICAgICAgamltdU1hcFZpZXcudmlldy5tYXAubGF5ZXJzLml0ZW1zLmZvckVhY2goZnVuY3Rpb24obHlyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cobHlyLnRpdGxlKVxyXG4gICAgICAgIG5ld1RhYk5hbWVzLnB1c2goeyB0aXRsZTogbHlyLnRpdGxlLCB1cmw6IGx5ci51cmwgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgIFxyXG4gICAgICBzZXRUYWJOYW1lcyhuZXdUYWJOYW1lcyk7IC8vIFVwZGF0ZSB0aGUgc3RhdGUgd2l0aCBuZXcgYXJyYXlcclxuICAgIH1cclxuICB9XHJcbiAgfSwgW2ppbXVNYXBWaWV3XSk7IC8vIFRyaWdnZXIgdGhlIGVmZmVjdCB3aGVuIGppbXVNYXBWaWV3IGNoYW5nZXNcclxuICBcclxuICBjb25zdCB0b2dnbGVGZWF0dXJlVGFibGUgPSAoKSA9PiB7XHJcbiAgICBzZXRTaG93RmVhdHVyZVRhYmxlKCFzaG93RmVhdHVyZVRhYmxlKTtcclxuICAgIGlmIChzaG93RmVhdHVyZVRhYmxlKSB7XHJcbiAgICAgIHNldEJ1dHRvblN0eWxlKHtcclxuICAgICAgICBib3R0b206IFwiMCVcIixcclxuICAgICAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxyXG4gICAgICAgIGxlZnQ6IFwiNTAlXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOlwiZ3JlZW5cIixcclxuICAgICAgICB3aWR0aDpcIjkwcHhcIlxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGZlYXR1cmVMYXllciA9IG5ldyBGZWF0dXJlTGF5ZXIoe1xyXG4gICAgICAgIHVybDogXCJodHRwczovL21hcHNlcnZlcjEuZXVyb3BlLnNoZWxsLmNvbS9hcmNnaXMvcmVzdC9zZXJ2aWNlcy9HbG9iYWwvQ3Jvc3NTZWN0aW9uc19tdWx0aS9NYXBTZXJ2ZXJcIixcclxuICAgICAgICBvdXRGaWVsZHM6IFtcIipcIl1cclxuICAgIH0pO1xyXG4gICBcclxuICAgICAgLy8gVXBkYXRlIHRoZSBsYXllciBvZiB0aGUgZXhpc3RpbmcgRmVhdHVyZVRhYmxlIGluc3RhbmNlXHJcbiAgICAgIGNvbnN0IHRhYmxlID0gbmV3IEZlYXR1cmVUYWJsZSh7XHJcbiAgICAgICAgbGF5ZXI6IGZlYXR1cmVMYXllcixcclxuICAgICAgICB2aWV3OiBqaW11TWFwVmlldy52aWV3XHJcbiAgICAgIH0pO1xyXG4gICAgICBzZXRGZWF0dXJlVGFibGUodGFibGUpO1xyXG4gICAgICBzZXRCdXR0b25TdHlsZSh7XHJcbiAgICAgICAgYm90dG9tOiBcIjUwJVwiLFxyXG4gICAgICAgIHBvc2l0aW9uOiBcImZpeGVkXCIsXHJcbiAgICAgICAgbGVmdDogXCI1MCVcIixcclxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6XCJncmVlblwiLFxyXG4gICAgICAgIHdpZHRoOlwiOTBweFwiXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgXHJcbiAgY29uc3QgaGFuZGxlVGFiQ2xpY2sgPSAoZGF0YSx0aXRsZSkgPT4ge1xyXG4gICAgLy8gc2V0QWN0aXZlVGFiKHRhYik7XHJcbiAgICBzZXRTaG93RmVhdHVyZVRhYmxlKHRydWUpOyAvLyBTaG93IHRoZSBmZWF0dXJlIHRhYmxlXHJcbiAgICBzZXRCdXR0b25TdHlsZSh7XHJcbiAgICAgIGJvdHRvbTogXCI1MCVcIixcclxuICAgICAgcG9zaXRpb246IFwiZml4ZWRcIixcclxuICAgICAgbGVmdDogXCI1MCVcIixcclxuICAgICAgYmFja2dyb3VuZENvbG9yOlwiZ3JlZW5cIixcclxuICAgICAgd2lkdGg6XCI5MHB4XCJcclxuICAgIH0pO1xyXG4gICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgIGNvbnNvbGUubG9nKGppbXVNYXBWaWV3LnZpZXcubWFwLmxheWVycy5pdGVtcylcclxuICBcclxuICAgIFxyXG4gICAgdmFyIGJvdHRvbVZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJib3R0b21WYWx1ZVwiKVxyXG4gICAgdmFyIHRvcFZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b3BWYWx1ZVwiKVxyXG4gICAgdmFyIGNrZCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJja2RcIikpXHJcbiAgICBjb25zb2xlLmxvZyhib3R0b21WYWx1ZSlcclxuICAgIC8vIGNvbnN0IG5ld0RlZmluaXRpb25FeHByZXNzaW9uID0gYFlOR19BR0VfTU0gPiAgJHtib3R0b21WYWx1ZX0gQU5EIE9MRF9BR0VfTU0gPCAke3RvcFZhbHVlfWA7XHJcbiAgICB2YXIgbmV3RGVmaW5pdGlvbkV4cHJlc3Npb24gO1xyXG4gICAgaWYoZGF0YSA9PT0gXCJodHRwczovL21hcHNlcnZlcjEuZXVyb3BlLnNoZWxsLmNvbS9hcmNnaXMvcmVzdC9zZXJ2aWNlcy9HbG9iYWwvRHJpbGxlZEhvbGVBbmFseXNpc19TaGVsbC9NYXBTZXJ2ZXJcIil7XHJcbiAgICBcclxuICAgICAgZGF0YSA9IFwiaHR0cHM6Ly9tYXBzZXJ2ZXIxLmV1cm9wZS5zaGVsbC5jb20vYXJjZ2lzL3Jlc3Qvc2VydmljZXMvR2xvYmFsL0RyaWxsZWRIb2xlQW5hbHlzaXNfU2hlbGwvTWFwU2VydmVyLzBcIlxyXG4gICAgICAgbmV3RGVmaW5pdGlvbkV4cHJlc3Npb24gPSBgWU9VTkdfQUdFX01NID4gICR7Ym90dG9tVmFsdWV9IEFORCBPTERfQUdFX01NIDwgJHt0b3BWYWx1ZX1gO1xyXG4gIH1lbHNlIGlmKGRhdGEgPT09IFwiaHR0cHM6Ly9tYXBzZXJ2ZXIxLmV1cm9wZS5zaGVsbC5jb20vYXJjZ2lzL3Jlc3Qvc2VydmljZXMvR2xvYmFsL0RyaWxsZWRIb2xlQW5hbHlzaXNfU2hlbGwvTWFwU2VydmVyLzJcIil7XHJcbiAgIG5ld0RlZmluaXRpb25FeHByZXNzaW9uID0gYFlPVU5HX0FHRV9NTSA+ICAke2JvdHRvbVZhbHVlfSBBTkQgT0xEX0FHRV9NTSA8ICR7dG9wVmFsdWV9YDtcclxuICB9ZWxzZXtcclxuICAgbmV3RGVmaW5pdGlvbkV4cHJlc3Npb24gPSBgWU5HX0FHRV9NQSA+ICAke2JvdHRvbVZhbHVlfSBBTkQgT0xEX0FHRV9NQSA8ICR7dG9wVmFsdWV9YDtcclxuICB9XHJcbiAgICBpZihja2QgIT09IG51bGwpe1xyXG4gICAgXHJcbiAgICAgICBpZihja2QuaW5jbHVkZXModGl0bGUpICYmIGNrZC5sZW5ndGghPT0wKXtcclxuICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICAgICAgY29uc3QgZmVhdHVyZUxheWVyID0gbmV3IEZlYXR1cmVMYXllcih7XHJcbiAgICAgICAgICB1cmw6ZGF0YSwgXHJcbiAgICAgICAgICBvdXRGaWVsZHM6IFtcIipcIl1cclxuICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgZmVhdHVyZVRhYmxlID0gbmV3IEZlYXR1cmVUYWJsZSh7XHJcbiAgICAgICAgICBsYXllcjogZmVhdHVyZUxheWVyLFxyXG4gICAgICAgICAgdmlldzogamltdU1hcFZpZXcudmlld1xyXG4gICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgICAgZmVhdHVyZUxheWVyLmRlZmluaXRpb25FeHByZXNzaW9uID0gbmV3RGVmaW5pdGlvbkV4cHJlc3Npb247XHJcbiAgICAgIC8vIGZlYXR1cmVUYWJsZS5jb250YWluZXIgPSAgXCJmZWF0dXJlVGFibGVEaXZcIlxyXG4gICAgICAgIHNldEZlYXR1cmVUYWJsZShmZWF0dXJlVGFibGUpO1xyXG4gICAgICBcclxuICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgaWYoZGF0YSA9PT0gXCJodHRwczovL21hcHNlcnZlcjEuZXVyb3BlLnNoZWxsLmNvbS9hcmNnaXMvcmVzdC9zZXJ2aWNlcy9HbG9iYWwvRHJpbGxlZEhvbGVBbmFseXNpc19TaGVsbC9NYXBTZXJ2ZXIvMFwiKXtcclxuICAgICAgICAgICAgY29uc3QgZmVhdHVyZUxheWVyID0gbmV3IEZlYXR1cmVMYXllcih7XHJcbiAgICAgICAgICAgICAgdXJsOmRhdGEsIFxyXG4gICAgICAgICAgICAgIG91dEZpZWxkczogW1wiKlwiXVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgY29uc3QgZmVhdHVyZVRhYmxlID0gbmV3IEZlYXR1cmVUYWJsZSh7XHJcbiAgICAgICAgICAgICAgICBsYXllcjogZmVhdHVyZUxheWVyLFxyXG4gICAgICAgICAgICAgICAgdmlldzogamltdU1hcFZpZXcudmlld1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGZlYXR1cmVMYXllci5kZWZpbml0aW9uRXhwcmVzc2lvbiA9IG5ld0RlZmluaXRpb25FeHByZXNzaW9uO1xyXG4gICAgICAgICAgICAgIHNldEZlYXR1cmVUYWJsZShmZWF0dXJlVGFibGUpO1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGRhdGEgPT09IFwiaHR0cHM6Ly9tYXBzZXJ2ZXIxLmV1cm9wZS5zaGVsbC5jb20vYXJjZ2lzL3Jlc3Qvc2VydmljZXMvR2xvYmFsL0RyaWxsZWRIb2xlQW5hbHlzaXNfU2hlbGwvTWFwU2VydmVyLzJcIil7XHJcbiAgICAgICAgICBjb25zdCBmZWF0dXJlTGF5ZXIgPSBuZXcgRmVhdHVyZUxheWVyKHtcclxuICAgICAgICAgICAgdXJsOmRhdGEsIFxyXG4gICAgICAgICAgICBvdXRGaWVsZHM6IFtcIipcIl1cclxuICAgICAgICB9KTtcclxuICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGZlYXR1cmVUYWJsZSA9IG5ldyBGZWF0dXJlVGFibGUoe1xyXG4gICAgICAgICAgICAgIGxheWVyOiBmZWF0dXJlTGF5ZXIsXHJcbiAgICAgICAgICAgICAgdmlldzogamltdU1hcFZpZXcudmlld1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8vIGZlYXR1cmVMYXllci5kZWZpbml0aW9uRXhwcmVzc2lvbiA9IG5ld0RlZmluaXRpb25FeHByZXNzaW9uO1xyXG4gICAgICAgICAgICBzZXRGZWF0dXJlVGFibGUoZmVhdHVyZVRhYmxlKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgIFxyXG4gICAgICB9XHJcbiAgICAgIGVsc2V7XHJcbiAgICAgICAgICBjb25zdCBleGlzdGluZ0xheWVyID0gamltdU1hcFZpZXcudmlldy5tYXAubGF5ZXJzLmZpbmQobGF5ZXIgPT4gbGF5ZXIudXJsID09PSBkYXRhKVxyXG4gICAgICAgICAgaWYgKGV4aXN0aW5nTGF5ZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgZmVhdHVyZVRhYmxlID0gbmV3IEZlYXR1cmVUYWJsZSh7XHJcbiAgICAgICAgICAgICAgbGF5ZXI6IGV4aXN0aW5nTGF5ZXIsXHJcbiAgICAgICAgICAgICAgdmlldzogamltdU1hcFZpZXcudmlld1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gZXhpc3RpbmdMYXllci5kZWZpbml0aW9uRXhwcmVzc2lvbiA9IG5ld0RlZmluaXRpb25FeHByZXNzaW9uO1xyXG4gICAgICAgICAgICBzZXRGZWF0dXJlVGFibGUoZmVhdHVyZVRhYmxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICBcclxuICAgICAgICBcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAvLyAgfVxyXG4gICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gIFxyXG4gIH07XHJcblxyXG4gIGZ1bmN0aW9uIGhhbmRsZVRyYW5zcGFyZW5jeUFkanVzdG1lbnQobGF5ZXIpIHtcclxuICAgIC8vIFByb21wdCB0aGUgdXNlciB0byBhZGp1c3QgdHJhbnNwYXJlbmN5XHJcbiAgICBjb25zdCB0cmFuc3BhcmVuY3lWYWx1ZSA9IHByb21wdChcIkVudGVyIHRyYW5zcGFyZW5jeSB2YWx1ZSAoMC0xKTpcIik7XHJcbiAgICBcclxuICAgIC8vIFBhcnNlIHRoZSB0cmFuc3BhcmVuY3kgdmFsdWUgdG8gZW5zdXJlIGl0J3MgYSB2YWxpZCBudW1iZXIgYmV0d2VlbiAwIGFuZCAxXHJcbiAgICBjb25zdCBvcGFjaXR5ID0gcGFyc2VGbG9hdCh0cmFuc3BhcmVuY3lWYWx1ZSk7XHJcbiAgICBcclxuICAgIC8vIENoZWNrIGlmIHRoZSBvcGFjaXR5IGlzIGEgdmFsaWQgbnVtYmVyIGJldHdlZW4gMCBhbmQgMVxyXG4gICAgaWYgKCFpc05hTihvcGFjaXR5KSAmJiBvcGFjaXR5ID49IDAgJiYgb3BhY2l0eSA8PSAxKSB7XHJcbiAgICAgIC8vIFNldCB0aGUgbGF5ZXIncyBvcGFjaXR5IHRvIHRoZSBwcm92aWRlZCB2YWx1ZVxyXG4gICAgICBsYXllci5vcGFjaXR5ID0gb3BhY2l0eTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFNob3cgYW4gZXJyb3IgbWVzc2FnZSBpZiB0aGUgaW5wdXQgaXMgaW52YWxpZFxyXG4gICAgICBhbGVydChcIlBsZWFzZSBlbnRlciBhIHZhbGlkIHRyYW5zcGFyZW5jeSB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDEuXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIC8vIENsZWFyIHRoZSBjb250YWluZXIgd2hlbiB0aGUgZmVhdHVyZVRhYmxlIGNoYW5nZXNcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmVhdHVyZVRhYmxlRGl2XCIpO1xyXG4gICAgaWYoY29udGFpbmVyKXtcclxuICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7IC8vIFJlbW92ZSBhbGwgY2hpbGQgZWxlbWVudHNcclxuICBcclxuICAgIH1cclxuICAgIGlmIChmZWF0dXJlVGFibGUpIHsgXHJcbiAgICAgIGZlYXR1cmVUYWJsZS5jb250YWluZXIgPSBcImZlYXR1cmVUYWJsZURpdlwiOyAvLyBBc3NpZ24gdGhlIGNvbnRhaW5lciB0byB0aGUgRmVhdHVyZVRhYmxlIGluc3RhbmNlXHJcbiAgICB9XHJcbiAgfSwgW2ZlYXR1cmVUYWJsZV0pO1xyXG4gIFxyXG4gIHJldHVybiAoXHJcbiAgIDw+XHJcbiAgICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAncmVsYXRpdmUnIH19PlxyXG4gICAgICAgIDxidXR0b24gc3R5bGU9e2J1dHRvblN0eWxlfSBvbkNsaWNrPXt0b2dnbGVGZWF0dXJlVGFibGV9PiAgPHNwYW4gc3R5bGU9e3sgbWFyZ2luTGVmdDogJzVweCcgfX0+JiM5NjYwOzwvc3Bhbj4gPC9idXR0b24+XHJcbiAgICAgICBcclxuICAgICAgIHtzaG93RmVhdHVyZVRhYmxlICYmIChcclxuICAgICAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgICAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxyXG4gICAgICAgICAgdG9wOiBcIjUwJVwiLFxyXG4gICAgICAgICAgbGVmdDogXCItOXB4XCIsXHJcbiAgICAgICAgICB6SW5kZXg6IDEsXHJcbiAgICAgICAgICBoZWlnaHQ6IFwiNTAlXCIsXHJcbiAgICAgICAgICB3aWR0aDogXCIxMDAlXCIsXHJcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiI2ZmZlwiLFxyXG4gICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjY2NjXCIsXHJcbiAgICAgICAgICBwYWRkaW5nOiBcIjEwcHhcIlxyXG4gICAgICAgIH19PlxyXG4gICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYi1wYW5lXCI+XHJcbiAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLWJ1dHRvbnNcIj5cclxuICAgICAgICAge3RhYk5hbWVzLm1hcCgodGFiTmFtZSwgaW5kZXgpID0+IChcclxuICAgICAgICA8YnV0dG9uIGtleT17aW5kZXh9IG9uQ2xpY2s9eygpID0+IGhhbmRsZVRhYkNsaWNrKHRhYk5hbWVbXCJ1cmxcIl0sdGFiTmFtZVtcInRpdGxlXCJdKX0+e3RhYk5hbWVbXCJ0aXRsZVwiXX08L2J1dHRvbj5cclxuICAgICAgKSl9XHJcbiAgICAgIDxidXR0b24gIG9uQ2xpY2s9eygpID0+IGhhbmRsZVRhYkNsaWNrKFwiaHR0cHM6Ly9tYXBzZXJ2ZXIxLmV1cm9wZS5zaGVsbC5jb20vYXJjZ2lzL3Jlc3Qvc2VydmljZXMvR2xvYmFsL0ZpZWxkc19SZXNlcnZvaXJzX1RRRVVSX1NoZWxsL01hcFNlcnZlci8xXCIsXCJQVkQuVEVTVF9HTE9CQUxUUUVVUl9OT0dFT01cIil9PlBWRC5URVNUX0dMT0JBTFRRRVVSX05PR0VPTTwvYnV0dG9uPlxyXG4gICAgICB7LyogPGJ1dHRvbiAgb25DbGljaz17KCkgPT4gaGFuZGxlVGFiQ2xpY2soXCJodHRwczovL21hcHNlcnZlcjEuZXVyb3BlLnNoZWxsLmNvbS9hcmNnaXMvcmVzdC9zZXJ2aWNlcy9HbG9iYWwvRHJpbGxlZEhvbGVBbmFseXNpc19TaGVsbC9NYXBTZXJ2ZXIvMlwiLFwiUm9zZXR0ZVwiKX0+Um9zZXR0ZTwvYnV0dG9uPlxyXG4gICAgICA8YnV0dG9uICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVUYWJDbGljayhcImh0dHBzOi8vbWFwc2VydmVyMS5ldXJvcGUuc2hlbGwuY29tL2FyY2dpcy9yZXN0L3NlcnZpY2VzL0dsb2JhbC9EcmlsbGVkSG9sZUFuYWx5c2lzX1NoZWxsL01hcFNlcnZlci8zXCIsXCJQZW5ldHJhdGlvblwiKX0+UGVuZXRyYXRpb248L2J1dHRvbj5cclxuICAgICAqL31cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgXHJcbiAgICAgICA8L2Rpdj5cclxuICAgICAgICAgPGRpdiBpZD1cImZlYXR1cmVUYWJsZURpdlwiICA+XHJcbiAgICAgICAgICAgey8qIENvbnRlbnQgb2YgdGhlIGZlYXR1cmUgdGFibGUgKi99XHJcbiAgICAgICAgXHJcbiAgICAgIFxyXG4gICAgICA8L2Rpdj5cclxuPC9kaXY+XHJcbiAgICAgICApXHJcbiAgICAgICB9XHJcbiAgICAgICA8L2Rpdj5cclxuICAgICAgIDxkaXYgaWQ9XCJsYXllckxpc3REaXZcIiBzdHlsZT17e3JpZ2h0OlwiNTBweFwiLHRvcDpcIjE3cHhcIix3aWR0aDpcIjMwJVwifX0+XHJcbiAgICAgICA8YnV0dG9uICBzdHlsZT17e2JvcmRlcjpcIm5vbmVcIixwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxyXG4gICAgbGVmdDpcIi00MXB4XCIsXHJcbiAgICBwYWRkaW5nOiBcImluaGVyaXRcIn19b25DbGljaz17KCkgPT4gaGFuZGxlVGFiQ2xpY2soXCJodHRwczovL21hcHNlcnZlcjEuZXVyb3BlLnNoZWxsLmNvbS9hcmNnaXMvcmVzdC9zZXJ2aWNlcy9HbG9iYWwvRmllbGRzX1Jlc2Vydm9pcnNfVFFFVVJfU2hlbGwvTWFwU2VydmVyLzFcIixcIlBWRC5URVNUX0dMT0JBTFRRRVVSX05PR0VPTVwiKX0+UFZELlRFU1RfR0xPQkFMVFFFVVJfTk9HRU9NIFxyXG4gICAgPENhbGNpdGVJY29uIGljb249XCJ0YWJsZVwiIHN0eWxlPXt7cG9zaXRpb246IFwicmVsYXRpdmVcIixcclxuICAgIHJpZ2h0OiBcIi0xMTJweFwifX1zY2FsZT1cInNcIiAvPiA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICBcclxuICAgICAgIDwvZGl2PlxyXG4gICAgICAgXHJcbiAgICAgICA8YnV0dG9uIHN0eWxlPXt7cG9zaXRpb246XCJmaXhlZFwiLCB0b3A6XCIxMHB4XCIscmlnaHQ6XCIxMHB4XCJ9fSBvbkNsaWNrPXt0b2dnbGVMYXllckxpc3R9PiA8Q2FsY2l0ZUljb24gaWNvbj1cImxheWVyc1wiIC8+PC9idXR0b24+XHJcbiAgICBcclxuICAgPC8+XHJcbiAgKTtcclxufVxyXG4gIFxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRmVhdHVyZVRhYmxlQ29tcG9uZW50O1xyXG5cbiBleHBvcnQgZnVuY3Rpb24gX19zZXRfd2VicGFja19wdWJsaWNfcGF0aF9fKHVybCkgeyBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyA9IHVybCB9Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9