/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/ts/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ts/library-interface.ts":
/*!*************************************!*\
  !*** ./src/ts/library-interface.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar LibraryInterface = function () {\n  var sidebar = document.getElementById('sidebar');\n  var ul = sidebar.querySelector('ul');\n\n  var resetList = function resetList() {\n    while (ul.firstChild) {\n      ul.removeChild(ul.lastChild);\n    }\n  };\n\n  var displayLibrary = function displayLibrary(projects) {\n    resetList();\n    var _iteratorNormalCompletion = true;\n    var _didIteratorError = false;\n    var _iteratorError = undefined;\n\n    try {\n      for (var _iterator = projects[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n        var project = _step.value;\n        var li = document.createElement('li');\n        li.innerText = project.title;\n        li.setAttribute('tabindex', '0');\n        ul.appendChild(li);\n      }\n    } catch (err) {\n      _didIteratorError = true;\n      _iteratorError = err;\n    } finally {\n      try {\n        if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n          _iterator[\"return\"]();\n        }\n      } finally {\n        if (_didIteratorError) {\n          throw _iteratorError;\n        }\n      }\n    }\n  };\n\n  return {\n    displayLibrary: displayLibrary\n  };\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (LibraryInterface);\n\n//# sourceURL=webpack:///./src/ts/library-interface.ts?");

/***/ }),

/***/ "./src/ts/library.ts":
/*!***************************!*\
  !*** ./src/ts/library.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ \"./src/ts/project.ts\");\n\nvar defaultProjectConfig = {\n  title: 'General',\n  description: 'Default space for tasks.'\n};\n\nvar Library = function () {\n  var projects = [new _project__WEBPACK_IMPORTED_MODULE_0__[\"Project\"](defaultProjectConfig)];\n\n  var getProjects = function getProjects() {\n    return [].concat(projects) || [];\n  };\n\n  var addProject = function addProject(project) {\n    if (project) {\n      projects.push(project);\n    }\n  };\n\n  var removeProject = function removeProject(index) {\n    if (index !== null && index > 0) {\n      projects.splice(index, 1);\n    }\n  };\n\n  return {\n    getProjects: getProjects,\n    addProject: addProject,\n    removeProject: removeProject\n  };\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Library);\n\n//# sourceURL=webpack:///./src/ts/library.ts?");

/***/ }),

/***/ "./src/ts/main.ts":
/*!************************!*\
  !*** ./src/ts/main.ts ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./library */ \"./src/ts/library.ts\");\n/* harmony import */ var _library_interface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./library-interface */ \"./src/ts/library-interface.ts\");\n/* harmony import */ var _project_interface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./project-interface */ \"./src/ts/project-interface.ts\");\n\n\n\nwindow.addEventListener('load', function () {\n  var projects = _library__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getProjects();\n  _library_interface__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayLibrary(projects);\n  _project_interface__WEBPACK_IMPORTED_MODULE_2__[\"default\"].displayProject(projects[0]);\n});\n\n//# sourceURL=webpack:///./src/ts/main.ts?");

/***/ }),

/***/ "./src/ts/project-interface.ts":
/*!*************************************!*\
  !*** ./src/ts/project-interface.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar ProjectInterface = function () {\n  var project = document.querySelector('.project');\n  var projectContainer = project.querySelector('.project__container');\n\n  var resetProject = function resetProject() {\n    projectContainer.innerHTML = '';\n  };\n\n  var displayProject = function displayProject(project) {\n    if (project) {\n      resetProject();\n      var title = document.createElement('h2');\n      title.innerText = project.title;\n      projectContainer.appendChild(title);\n\n      if (project.description) {\n        var description = document.createElement('p');\n        description.innerText = project.description;\n        projectContainer.appendChild(description);\n      }\n    }\n  };\n\n  return {\n    displayProject: displayProject\n  };\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ProjectInterface);\n\n//# sourceURL=webpack:///./src/ts/project-interface.ts?");

/***/ }),

/***/ "./src/ts/project.ts":
/*!***************************!*\
  !*** ./src/ts/project.ts ***!
  \***************************/
/*! exports provided: Project */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Project\", function() { return Project; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Project = /*#__PURE__*/function () {\n  function Project(config) {\n    _classCallCheck(this, Project);\n\n    this.title = config.title;\n    this.description = config.description;\n    this.dueDate = config.dueDate;\n    this.priority = config.priority;\n    this.tasks = config.tasks || [];\n  }\n\n  _createClass(Project, [{\n    key: \"getTasks\",\n    value: function getTasks() {\n      return this.tasks;\n    }\n  }, {\n    key: \"addSubtask\",\n    value: function addSubtask(task) {\n      if (task) {\n        this.tasks.push(task);\n      }\n    }\n  }, {\n    key: \"removeSubtask\",\n    value: function removeSubtask(index) {\n      if (index !== null && index >= 0) {\n        this.tasks.splice(index, 1);\n      }\n    }\n  }]);\n\n  return Project;\n}();\n\n\n\n//# sourceURL=webpack:///./src/ts/project.ts?");

/***/ })

/******/ });