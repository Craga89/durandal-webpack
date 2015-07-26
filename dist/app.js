/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);

/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".chunk.js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/durandal-webpack/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(23);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.1.0 Copyright (c) 2012 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * The system module encapsulates the most basic features used by other modules.
	 * @module system
	 * @requires require
	 * @requires jquery
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function(require, $) {
	    var isDebugging = false,
	        nativeKeys = Object.keys,
	        hasOwnProperty = Object.prototype.hasOwnProperty,
	        toString = Object.prototype.toString,
	        system,
	        treatAsIE8 = false,
	        nativeIsArray = Array.isArray,
	        slice = Array.prototype.slice;

	    //polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
	    if (!String.prototype.trim) {
	        String.prototype.trim = function () {
	            return this.replace(/^\s+|\s+$/g, '');
	        };
	    }

	    //see http://patik.com/blog/complete-cross-browser-console-log/
	    // Tell IE9 to use its built-in console
	    if (Function.prototype.bind && (typeof console === 'object' || typeof console === 'function') && typeof console.log == 'object') {
	        try {
	            ['log', 'info', 'warn', 'error', 'assert', 'dir', 'clear', 'profile', 'profileEnd']
	                .forEach(function(method) {
	                    console[method] = this.call(console[method], console);
	                }, Function.prototype.bind);
	        } catch (ex) {
	            treatAsIE8 = true;
	        }
	    }

	    // callback for dojo's loader 
	    // note: if you wish to use Durandal with dojo's AMD loader,
	    // currently you must fork the dojo source with the following
	    // dojo/dojo.js, line 1187, the last line of the finishExec() function: 
	    //  (add) signal("moduleLoaded", [module.result, module.mid]);
	    // an enhancement request has been submitted to dojo to make this
	    // a permanent change. To view the status of this request, visit:
	    // http://bugs.dojotoolkit.org/ticket/16727

	    if (__webpack_require__(16).on) {
	        __webpack_require__(16).on("moduleLoaded", function(module, mid) {
	            system.setModuleId(module, mid);
	        });
	    }

	    // callback for require.js loader
	    if (typeof requirejs !== 'undefined') {
	        requirejs.onResourceLoad = function(context, map, depArray) {
	            system.setModuleId(context.defined[map.id], map.id);
	        };
	    }

	    var noop = function() { };

	    var log = function() {
	        try {
	            // Modern browsers
	            if (typeof console != 'undefined' && typeof console.log == 'function') {
	                // Opera 11
	                if (window.opera) {
	                    var i = 0;
	                    while (i < arguments.length) {
	                        console.log('Item ' + (i + 1) + ': ' + arguments[i]);
	                        i++;
	                    }
	                }
	                // All other modern browsers
	                else if ((slice.call(arguments)).length == 1 && typeof slice.call(arguments)[0] == 'string') {
	                    console.log((slice.call(arguments)).toString());
	                } else {
	                    console.log.apply(console, slice.call(arguments));
	                }
	            }
	            // IE8
	            else if ((!Function.prototype.bind || treatAsIE8) && typeof console != 'undefined' && typeof console.log == 'object') {
	                Function.prototype.call.call(console.log, console, slice.call(arguments));
	            }

	            // IE7 and lower, and other old browsers
	        } catch (ignore) { }
	    };

	    var logError = function(error, err) {
	        var exception;
	        
	        if(error instanceof Error){
	            exception = error;
	        } else {
	            exception = new Error(error);
	        }
	        
	        exception.innerError = err;
	        
	        //Report the error as an error, not as a log
	        try {
	            // Modern browsers (it's only a single item, no need for argument splitting as in log() above)
	            if (typeof console != 'undefined' && typeof console.error == 'function') {
	                console.error(exception);
	            }
	            // IE8
	            else if ((!Function.prototype.bind || treatAsIE8) && typeof console != 'undefined' && typeof console.error == 'object') {
	                Function.prototype.call.call(console.error, console, exception);
	            }
	            // IE7 and lower, and other old browsers
	        } catch (ignore) { }

	        throw exception;
	    };

	    /**
	     * @class SystemModule
	     * @static
	     */
	    system = {
	        /**
	         * Durandal's version.
	         * @property {string} version
	         */
	        version: "2.1.0",
	        /**
	         * A noop function.
	         * @method noop
	         */
	        noop: noop,
	        /**
	         * Gets the module id for the specified object.
	         * @method getModuleId
	         * @param {object} obj The object whose module id you wish to determine.
	         * @return {string} The module id.
	         */
	        getModuleId: function(obj) {
	            if (!obj) {
	                return null;
	            }

	            if (typeof obj == 'function' && obj.prototype) {
	                return obj.prototype.__moduleId__;
	            }

	            if (typeof obj == 'string') {
	                return null;
	            }

	            return obj.__moduleId__;
	        },
	        /**
	         * Sets the module id for the specified object.
	         * @method setModuleId
	         * @param {object} obj The object whose module id you wish to set.
	         * @param {string} id The id to set for the specified object.
	         */
	        setModuleId: function(obj, id) {
	            if (!obj) {
	                return;
	            }

	            if (typeof obj == 'function' && obj.prototype) {
	                obj.prototype.__moduleId__ = id;
	                return;
	            }

	            if (typeof obj == 'string') {
	                return;
	            }

	            obj.__moduleId__ = id;
	        },
	        /**
	         * Resolves the default object instance for a module. If the module is an object, the module is returned. If the module is a function, that function is called with `new` and it's result is returned.
	         * @method resolveObject
	         * @param {object} module The module to use to get/create the default object for.
	         * @return {object} The default object for the module.
	         */
	        resolveObject: function(module) {
	            if (system.isFunction(module)) {
	                return new module();
	            } else {
	                return module;
	            }
	        },
	        /**
	         * Gets/Sets whether or not Durandal is in debug mode.
	         * @method debug
	         * @param {boolean} [enable] Turns on/off debugging.
	         * @return {boolean} Whether or not Durandal is current debugging.
	         */
	        debug: function(enable) {
	            if (arguments.length == 1) {
	                isDebugging = enable;
	                if (isDebugging) {
	                    this.log = log;
	                    this.error = logError;
	                    this.log('Debug:Enabled');
	                } else {
	                    this.log('Debug:Disabled');
	                    this.log = noop;
	                    this.error = noop;
	                }
	            }

	            return isDebugging;
	        },
	        /**
	         * Logs data to the console. Pass any number of parameters to be logged. Log output is not processed if the framework is not running in debug mode.
	         * @method log
	         * @param {object} info* The objects to log.
	         */
	        log: noop,
	        /**
	         * Logs an error.
	         * @method error
	         * @param {string|Error} obj The error to report.
	         */
	        error: noop,
	        /**
	         * Asserts a condition by throwing an error if the condition fails.
	         * @method assert
	         * @param {boolean} condition The condition to check.
	         * @param {string} message The message to report in the error if the condition check fails.
	         */
	        assert: function (condition, message) {
	            if (!condition) {
	                system.error(new Error(message || 'Assert:Failed'));
	            }
	        },
	        /**
	         * Creates a deferred object which can be used to create a promise. Optionally pass a function action to perform which will be passed an object used in resolving the promise.
	         * @method defer
	         * @param {function} [action] The action to defer. You will be passed the deferred object as a paramter.
	         * @return {Deferred} The deferred object.
	         */
	        defer: function(action) {
	            return $.Deferred(action);
	        },
	        /**
	         * Creates a simple V4 UUID. This should not be used as a PK in your database. It can be used to generate internal, unique ids. For a more robust solution see [node-uuid](https://github.com/broofa/node-uuid).
	         * @method guid
	         * @return {string} The guid.
	         */
	        guid: function() {
	            var d = new Date().getTime();
	            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	                var r = (d + Math.random() * 16) % 16 | 0;
	                d = Math.floor(d/16);
	                return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
	            });
	        },
	        /**
	         * Uses require.js to obtain a module. This function returns a promise which resolves with the module instance. You can pass more than one module id to this function or an array of ids. If more than one or an array is passed, then the promise will resolve with an array of module instances.
	         * @method acquire
	         * @param {string|string[]} moduleId The id(s) of the modules to load.
	         * @return {Promise} A promise for the loaded module(s).
	         */
	        acquire: function() {
	            var modules,
	                first = arguments[0],
	                arrayRequest = false;

	            if(system.isArray(first)){
	                modules = first;
	                arrayRequest = true;
	            }else{
	                modules = slice.call(arguments, 0);
	            }

	            return this.defer(function(dfd) {
	                __webpack_require__(16)(modules, function() {
	                    var args = arguments;
	                    setTimeout(function() {
	                        if(args.length > 1 || arrayRequest){
	                            dfd.resolve(slice.call(args, 0));
	                        }else{
	                            dfd.resolve(args[0]);
	                        }
	                    }, 1);
	                }, function(err){
	                    dfd.reject(err);
	                });
	            }).promise();
	        },
	        /**
	         * Extends the first object with the properties of the following objects.
	         * @method extend
	         * @param {object} obj The target object to extend.
	         * @param {object} extension* Uses to extend the target object.
	         */
	        extend: function(obj) {
	            var rest = slice.call(arguments, 1);

	            for (var i = 0; i < rest.length; i++) {
	                var source = rest[i];

	                if (source) {
	                    for (var prop in source) {
	                        obj[prop] = source[prop];
	                    }
	                }
	            }

	            return obj;
	        },
	        /**
	         * Uses a setTimeout to wait the specified milliseconds.
	         * @method wait
	         * @param {number} milliseconds The number of milliseconds to wait.
	         * @return {Promise}
	         */
	        wait: function(milliseconds) {
	            return system.defer(function(dfd) {
	                setTimeout(dfd.resolve, milliseconds);
	            }).promise();
	        }
	    };

	    /**
	     * Gets all the owned keys of the specified object.
	     * @method keys
	     * @param {object} object The object whose owned keys should be returned.
	     * @return {string[]} The keys.
	     */
	    system.keys = nativeKeys || function(obj) {
	        if (obj !== Object(obj)) {
	            throw new TypeError('Invalid object');
	        }

	        var keys = [];

	        for (var key in obj) {
	            if (hasOwnProperty.call(obj, key)) {
	                keys[keys.length] = key;
	            }
	        }

	        return keys;
	    };

	    /**
	     * Determines if the specified object is an html element.
	     * @method isElement
	     * @param {object} object The object to check.
	     * @return {boolean} True if matches the type, false otherwise.
	     */
	    system.isElement = function(obj) {
	        return !!(obj && obj.nodeType === 1);
	    };

	    /**
	     * Determines if the specified object is an array.
	     * @method isArray
	     * @param {object} object The object to check.
	     * @return {boolean} True if matches the type, false otherwise.
	     */
	    system.isArray = nativeIsArray || function(obj) {
	        return toString.call(obj) == '[object Array]';
	    };

	    /**
	     * Determines if the specified object is...an object. ie. Not an array, string, etc.
	     * @method isObject
	     * @param {object} object The object to check.
	     * @return {boolean} True if matches the type, false otherwise.
	     */
	    system.isObject = function(obj) {
	        return obj === Object(obj);
	    };

	    /**
	     * Determines if the specified object is a boolean.
	     * @method isBoolean
	     * @param {object} object The object to check.
	     * @return {boolean} True if matches the type, false otherwise.
	     */
	    system.isBoolean = function(obj) {
	        return typeof(obj) === "boolean";
	    };

	    /**
	     * Determines if the specified object is a promise.
	     * @method isPromise
	     * @param {object} object The object to check.
	     * @return {boolean} True if matches the type, false otherwise.
	     */
	    system.isPromise = function(obj) {
	        return obj && system.isFunction(obj.then);
	    };

	    /**
	     * Determines if the specified object is a function arguments object.
	     * @method isArguments
	     * @param {object} object The object to check.
	     * @return {boolean} True if matches the type, false otherwise.
	     */

	    /**
	     * Determines if the specified object is a function.
	     * @method isFunction
	     * @param {object} object The object to check.
	     * @return {boolean} True if matches the type, false otherwise.
	     */

	    /**
	     * Determines if the specified object is a string.
	     * @method isString
	     * @param {object} object The object to check.
	     * @return {boolean} True if matches the type, false otherwise.
	     */

	    /**
	     * Determines if the specified object is a number.
	     * @method isNumber
	     * @param {object} object The object to check.
	     * @return {boolean} True if matches the type, false otherwise.
	     */

	    /**
	     * Determines if the specified object is a date.
	     * @method isDate
	     * @param {object} object The object to check.
	     * @return {boolean} True if matches the type, false otherwise.
	     */

	    /**
	     * Determines if the specified object is a boolean.
	     * @method isBoolean
	     * @param {object} object The object to check.
	     * @return {boolean} True if matches the type, false otherwise.
	     */

	    //isArguments, isFunction, isString, isNumber, isDate, isRegExp.
	    var isChecks = ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'];

	    function makeIsFunction(name) {
	        var value = '[object ' + name + ']';
	        system['is' + name] = function(obj) {
	            return toString.call(obj) == value;
	        };
	    }

	    for (var i = 0; i < isChecks.length; i++) {
	        makeIsFunction(isChecks[i]);
	    }

	    return system;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {/*!
	 * Knockout JavaScript library v3.3.0
	 * (c) Steven Sanderson - http://knockoutjs.com/
	 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
	 */

	(function(){
	var DEBUG=true;
	(function(undefined){
	    // (0, eval)('this') is a robust way of getting a reference to the global object
	    // For details, see http://stackoverflow.com/questions/14119988/return-this-0-evalthis/14120023#14120023
	    var window = this || (0, eval)('this'),
	        document = window['document'],
	        navigator = window['navigator'],
	        jQueryInstance = window["jQuery"],
	        JSON = window["JSON"];
	(function(factory) {
	    // Support three module loading scenarios
	    if ("function" === 'function' && __webpack_require__(50)['amd']) {
	        // [1] AMD anonymous module
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (true) {
	        // [2] CommonJS/Node.js
	        factory(module['exports'] || exports);  // module.exports is for Node.js
	    } else {
	        // [3] No module loader (plain <script> tag) - put directly in global namespace
	        factory(window['ko'] = {});
	    }
	}(function(koExports, amdRequire){
	// Internally, all KO objects are attached to koExports (even the non-exported ones whose names will be minified by the closure compiler).
	// In the future, the following "ko" variable may be made distinct from "koExports" so that private objects are not externally reachable.
	var ko = typeof koExports !== 'undefined' ? koExports : {};
	// Google Closure Compiler helpers (used only to make the minified file smaller)
	ko.exportSymbol = function(koPath, object) {
	    var tokens = koPath.split(".");

	    // In the future, "ko" may become distinct from "koExports" (so that non-exported objects are not reachable)
	    // At that point, "target" would be set to: (typeof koExports !== "undefined" ? koExports : ko)
	    var target = ko;

	    for (var i = 0; i < tokens.length - 1; i++)
	        target = target[tokens[i]];
	    target[tokens[tokens.length - 1]] = object;
	};
	ko.exportProperty = function(owner, publicName, object) {
	    owner[publicName] = object;
	};
	ko.version = "3.3.0";

	ko.exportSymbol('version', ko.version);
	ko.utils = (function () {
	    function objectForEach(obj, action) {
	        for (var prop in obj) {
	            if (obj.hasOwnProperty(prop)) {
	                action(prop, obj[prop]);
	            }
	        }
	    }

	    function extend(target, source) {
	        if (source) {
	            for(var prop in source) {
	                if(source.hasOwnProperty(prop)) {
	                    target[prop] = source[prop];
	                }
	            }
	        }
	        return target;
	    }

	    function setPrototypeOf(obj, proto) {
	        obj.__proto__ = proto;
	        return obj;
	    }

	    var canSetPrototype = ({ __proto__: [] } instanceof Array);

	    // Represent the known event types in a compact way, then at runtime transform it into a hash with event name as key (for fast lookup)
	    var knownEvents = {}, knownEventTypesByEventName = {};
	    var keyEventTypeName = (navigator && /Firefox\/2/i.test(navigator.userAgent)) ? 'KeyboardEvent' : 'UIEvents';
	    knownEvents[keyEventTypeName] = ['keyup', 'keydown', 'keypress'];
	    knownEvents['MouseEvents'] = ['click', 'dblclick', 'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout', 'mouseenter', 'mouseleave'];
	    objectForEach(knownEvents, function(eventType, knownEventsForType) {
	        if (knownEventsForType.length) {
	            for (var i = 0, j = knownEventsForType.length; i < j; i++)
	                knownEventTypesByEventName[knownEventsForType[i]] = eventType;
	        }
	    });
	    var eventsThatMustBeRegisteredUsingAttachEvent = { 'propertychange': true }; // Workaround for an IE9 issue - https://github.com/SteveSanderson/knockout/issues/406

	    // Detect IE versions for bug workarounds (uses IE conditionals, not UA string, for robustness)
	    // Note that, since IE 10 does not support conditional comments, the following logic only detects IE < 10.
	    // Currently this is by design, since IE 10+ behaves correctly when treated as a standard browser.
	    // If there is a future need to detect specific versions of IE10+, we will amend this.
	    var ieVersion = document && (function() {
	        var version = 3, div = document.createElement('div'), iElems = div.getElementsByTagName('i');

	        // Keep constructing conditional HTML blocks until we hit one that resolves to an empty fragment
	        while (
	            div.innerHTML = '<!--[if gt IE ' + (++version) + ']><i></i><![endif]-->',
	            iElems[0]
	        ) {}
	        return version > 4 ? version : undefined;
	    }());
	    var isIe6 = ieVersion === 6,
	        isIe7 = ieVersion === 7;

	    function isClickOnCheckableElement(element, eventType) {
	        if ((ko.utils.tagNameLower(element) !== "input") || !element.type) return false;
	        if (eventType.toLowerCase() != "click") return false;
	        var inputType = element.type;
	        return (inputType == "checkbox") || (inputType == "radio");
	    }

	    // For details on the pattern for changing node classes
	    // see: https://github.com/knockout/knockout/issues/1597
	    var cssClassNameRegex = /\S+/g;

	    function toggleDomNodeCssClass(node, classNames, shouldHaveClass) {
	        var addOrRemoveFn;
	        if (classNames) {
	            if (typeof node.classList === 'object') {
	                addOrRemoveFn = node.classList[shouldHaveClass ? 'add' : 'remove'];
	                ko.utils.arrayForEach(classNames.match(cssClassNameRegex), function(className) {
	                    addOrRemoveFn.call(node.classList, className);
	                });
	            } else if (typeof node.className['baseVal'] === 'string') {
	                // SVG tag .classNames is an SVGAnimatedString instance
	                toggleObjectClassPropertyString(node.className, 'baseVal', classNames, shouldHaveClass);
	            } else {
	                // node.className ought to be a string.
	                toggleObjectClassPropertyString(node, 'className', classNames, shouldHaveClass);
	            }
	        }
	    }

	    function toggleObjectClassPropertyString(obj, prop, classNames, shouldHaveClass) {
	        // obj/prop is either a node/'className' or a SVGAnimatedString/'baseVal'.
	        var currentClassNames = obj[prop].match(cssClassNameRegex) || [];
	        ko.utils.arrayForEach(classNames.match(cssClassNameRegex), function(className) {
	            ko.utils.addOrRemoveItem(currentClassNames, className, shouldHaveClass);
	        });
	        obj[prop] = currentClassNames.join(" ");
	    }

	    return {
	        fieldsIncludedWithJsonPost: ['authenticity_token', /^__RequestVerificationToken(_.*)?$/],

	        arrayForEach: function (array, action) {
	            for (var i = 0, j = array.length; i < j; i++)
	                action(array[i], i);
	        },

	        arrayIndexOf: function (array, item) {
	            if (typeof Array.prototype.indexOf == "function")
	                return Array.prototype.indexOf.call(array, item);
	            for (var i = 0, j = array.length; i < j; i++)
	                if (array[i] === item)
	                    return i;
	            return -1;
	        },

	        arrayFirst: function (array, predicate, predicateOwner) {
	            for (var i = 0, j = array.length; i < j; i++)
	                if (predicate.call(predicateOwner, array[i], i))
	                    return array[i];
	            return null;
	        },

	        arrayRemoveItem: function (array, itemToRemove) {
	            var index = ko.utils.arrayIndexOf(array, itemToRemove);
	            if (index > 0) {
	                array.splice(index, 1);
	            }
	            else if (index === 0) {
	                array.shift();
	            }
	        },

	        arrayGetDistinctValues: function (array) {
	            array = array || [];
	            var result = [];
	            for (var i = 0, j = array.length; i < j; i++) {
	                if (ko.utils.arrayIndexOf(result, array[i]) < 0)
	                    result.push(array[i]);
	            }
	            return result;
	        },

	        arrayMap: function (array, mapping) {
	            array = array || [];
	            var result = [];
	            for (var i = 0, j = array.length; i < j; i++)
	                result.push(mapping(array[i], i));
	            return result;
	        },

	        arrayFilter: function (array, predicate) {
	            array = array || [];
	            var result = [];
	            for (var i = 0, j = array.length; i < j; i++)
	                if (predicate(array[i], i))
	                    result.push(array[i]);
	            return result;
	        },

	        arrayPushAll: function (array, valuesToPush) {
	            if (valuesToPush instanceof Array)
	                array.push.apply(array, valuesToPush);
	            else
	                for (var i = 0, j = valuesToPush.length; i < j; i++)
	                    array.push(valuesToPush[i]);
	            return array;
	        },

	        addOrRemoveItem: function(array, value, included) {
	            var existingEntryIndex = ko.utils.arrayIndexOf(ko.utils.peekObservable(array), value);
	            if (existingEntryIndex < 0) {
	                if (included)
	                    array.push(value);
	            } else {
	                if (!included)
	                    array.splice(existingEntryIndex, 1);
	            }
	        },

	        canSetPrototype: canSetPrototype,

	        extend: extend,

	        setPrototypeOf: setPrototypeOf,

	        setPrototypeOfOrExtend: canSetPrototype ? setPrototypeOf : extend,

	        objectForEach: objectForEach,

	        objectMap: function(source, mapping) {
	            if (!source)
	                return source;
	            var target = {};
	            for (var prop in source) {
	                if (source.hasOwnProperty(prop)) {
	                    target[prop] = mapping(source[prop], prop, source);
	                }
	            }
	            return target;
	        },

	        emptyDomNode: function (domNode) {
	            while (domNode.firstChild) {
	                ko.removeNode(domNode.firstChild);
	            }
	        },

	        moveCleanedNodesToContainerElement: function(nodes) {
	            // Ensure it's a real array, as we're about to reparent the nodes and
	            // we don't want the underlying collection to change while we're doing that.
	            var nodesArray = ko.utils.makeArray(nodes);
	            var templateDocument = (nodesArray[0] && nodesArray[0].ownerDocument) || document;

	            var container = templateDocument.createElement('div');
	            for (var i = 0, j = nodesArray.length; i < j; i++) {
	                container.appendChild(ko.cleanNode(nodesArray[i]));
	            }
	            return container;
	        },

	        cloneNodes: function (nodesArray, shouldCleanNodes) {
	            for (var i = 0, j = nodesArray.length, newNodesArray = []; i < j; i++) {
	                var clonedNode = nodesArray[i].cloneNode(true);
	                newNodesArray.push(shouldCleanNodes ? ko.cleanNode(clonedNode) : clonedNode);
	            }
	            return newNodesArray;
	        },

	        setDomNodeChildren: function (domNode, childNodes) {
	            ko.utils.emptyDomNode(domNode);
	            if (childNodes) {
	                for (var i = 0, j = childNodes.length; i < j; i++)
	                    domNode.appendChild(childNodes[i]);
	            }
	        },

	        replaceDomNodes: function (nodeToReplaceOrNodeArray, newNodesArray) {
	            var nodesToReplaceArray = nodeToReplaceOrNodeArray.nodeType ? [nodeToReplaceOrNodeArray] : nodeToReplaceOrNodeArray;
	            if (nodesToReplaceArray.length > 0) {
	                var insertionPoint = nodesToReplaceArray[0];
	                var parent = insertionPoint.parentNode;
	                for (var i = 0, j = newNodesArray.length; i < j; i++)
	                    parent.insertBefore(newNodesArray[i], insertionPoint);
	                for (var i = 0, j = nodesToReplaceArray.length; i < j; i++) {
	                    ko.removeNode(nodesToReplaceArray[i]);
	                }
	            }
	        },

	        fixUpContinuousNodeArray: function(continuousNodeArray, parentNode) {
	            // Before acting on a set of nodes that were previously outputted by a template function, we have to reconcile
	            // them against what is in the DOM right now. It may be that some of the nodes have already been removed, or that
	            // new nodes might have been inserted in the middle, for example by a binding. Also, there may previously have been
	            // leading comment nodes (created by rewritten string-based templates) that have since been removed during binding.
	            // So, this function translates the old "map" output array into its best guess of the set of current DOM nodes.
	            //
	            // Rules:
	            //   [A] Any leading nodes that have been removed should be ignored
	            //       These most likely correspond to memoization nodes that were already removed during binding
	            //       See https://github.com/SteveSanderson/knockout/pull/440
	            //   [B] We want to output a continuous series of nodes. So, ignore any nodes that have already been removed,
	            //       and include any nodes that have been inserted among the previous collection

	            if (continuousNodeArray.length) {
	                // The parent node can be a virtual element; so get the real parent node
	                parentNode = (parentNode.nodeType === 8 && parentNode.parentNode) || parentNode;

	                // Rule [A]
	                while (continuousNodeArray.length && continuousNodeArray[0].parentNode !== parentNode)
	                    continuousNodeArray.splice(0, 1);

	                // Rule [B]
	                if (continuousNodeArray.length > 1) {
	                    var current = continuousNodeArray[0], last = continuousNodeArray[continuousNodeArray.length - 1];
	                    // Replace with the actual new continuous node set
	                    continuousNodeArray.length = 0;
	                    while (current !== last) {
	                        continuousNodeArray.push(current);
	                        current = current.nextSibling;
	                        if (!current) // Won't happen, except if the developer has manually removed some DOM elements (then we're in an undefined scenario)
	                            return;
	                    }
	                    continuousNodeArray.push(last);
	                }
	            }
	            return continuousNodeArray;
	        },

	        setOptionNodeSelectionState: function (optionNode, isSelected) {
	            // IE6 sometimes throws "unknown error" if you try to write to .selected directly, whereas Firefox struggles with setAttribute. Pick one based on browser.
	            if (ieVersion < 7)
	                optionNode.setAttribute("selected", isSelected);
	            else
	                optionNode.selected = isSelected;
	        },

	        stringTrim: function (string) {
	            return string === null || string === undefined ? '' :
	                string.trim ?
	                    string.trim() :
	                    string.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g, '');
	        },

	        stringStartsWith: function (string, startsWith) {
	            string = string || "";
	            if (startsWith.length > string.length)
	                return false;
	            return string.substring(0, startsWith.length) === startsWith;
	        },

	        domNodeIsContainedBy: function (node, containedByNode) {
	            if (node === containedByNode)
	                return true;
	            if (node.nodeType === 11)
	                return false; // Fixes issue #1162 - can't use node.contains for document fragments on IE8
	            if (containedByNode.contains)
	                return containedByNode.contains(node.nodeType === 3 ? node.parentNode : node);
	            if (containedByNode.compareDocumentPosition)
	                return (containedByNode.compareDocumentPosition(node) & 16) == 16;
	            while (node && node != containedByNode) {
	                node = node.parentNode;
	            }
	            return !!node;
	        },

	        domNodeIsAttachedToDocument: function (node) {
	            return ko.utils.domNodeIsContainedBy(node, node.ownerDocument.documentElement);
	        },

	        anyDomNodeIsAttachedToDocument: function(nodes) {
	            return !!ko.utils.arrayFirst(nodes, ko.utils.domNodeIsAttachedToDocument);
	        },

	        tagNameLower: function(element) {
	            // For HTML elements, tagName will always be upper case; for XHTML elements, it'll be lower case.
	            // Possible future optimization: If we know it's an element from an XHTML document (not HTML),
	            // we don't need to do the .toLowerCase() as it will always be lower case anyway.
	            return element && element.tagName && element.tagName.toLowerCase();
	        },

	        registerEventHandler: function (element, eventType, handler) {
	            var mustUseAttachEvent = ieVersion && eventsThatMustBeRegisteredUsingAttachEvent[eventType];
	            if (!mustUseAttachEvent && jQueryInstance) {
	                jQueryInstance(element)['bind'](eventType, handler);
	            } else if (!mustUseAttachEvent && typeof element.addEventListener == "function")
	                element.addEventListener(eventType, handler, false);
	            else if (typeof element.attachEvent != "undefined") {
	                var attachEventHandler = function (event) { handler.call(element, event); },
	                    attachEventName = "on" + eventType;
	                element.attachEvent(attachEventName, attachEventHandler);

	                // IE does not dispose attachEvent handlers automatically (unlike with addEventListener)
	                // so to avoid leaks, we have to remove them manually. See bug #856
	                ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
	                    element.detachEvent(attachEventName, attachEventHandler);
	                });
	            } else
	                throw new Error("Browser doesn't support addEventListener or attachEvent");
	        },

	        triggerEvent: function (element, eventType) {
	            if (!(element && element.nodeType))
	                throw new Error("element must be a DOM node when calling triggerEvent");

	            // For click events on checkboxes and radio buttons, jQuery toggles the element checked state *after* the
	            // event handler runs instead of *before*. (This was fixed in 1.9 for checkboxes but not for radio buttons.)
	            // IE doesn't change the checked state when you trigger the click event using "fireEvent".
	            // In both cases, we'll use the click method instead.
	            var useClickWorkaround = isClickOnCheckableElement(element, eventType);

	            if (jQueryInstance && !useClickWorkaround) {
	                jQueryInstance(element)['trigger'](eventType);
	            } else if (typeof document.createEvent == "function") {
	                if (typeof element.dispatchEvent == "function") {
	                    var eventCategory = knownEventTypesByEventName[eventType] || "HTMLEvents";
	                    var event = document.createEvent(eventCategory);
	                    event.initEvent(eventType, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, element);
	                    element.dispatchEvent(event);
	                }
	                else
	                    throw new Error("The supplied element doesn't support dispatchEvent");
	            } else if (useClickWorkaround && element.click) {
	                element.click();
	            } else if (typeof element.fireEvent != "undefined") {
	                element.fireEvent("on" + eventType);
	            } else {
	                throw new Error("Browser doesn't support triggering events");
	            }
	        },

	        unwrapObservable: function (value) {
	            return ko.isObservable(value) ? value() : value;
	        },

	        peekObservable: function (value) {
	            return ko.isObservable(value) ? value.peek() : value;
	        },

	        toggleDomNodeCssClass: toggleDomNodeCssClass,

	        setTextContent: function(element, textContent) {
	            var value = ko.utils.unwrapObservable(textContent);
	            if ((value === null) || (value === undefined))
	                value = "";

	            // We need there to be exactly one child: a text node.
	            // If there are no children, more than one, or if it's not a text node,
	            // we'll clear everything and create a single text node.
	            var innerTextNode = ko.virtualElements.firstChild(element);
	            if (!innerTextNode || innerTextNode.nodeType != 3 || ko.virtualElements.nextSibling(innerTextNode)) {
	                ko.virtualElements.setDomNodeChildren(element, [element.ownerDocument.createTextNode(value)]);
	            } else {
	                innerTextNode.data = value;
	            }

	            ko.utils.forceRefresh(element);
	        },

	        setElementName: function(element, name) {
	            element.name = name;

	            // Workaround IE 6/7 issue
	            // - https://github.com/SteveSanderson/knockout/issues/197
	            // - http://www.matts411.com/post/setting_the_name_attribute_in_ie_dom/
	            if (ieVersion <= 7) {
	                try {
	                    element.mergeAttributes(document.createElement("<input name='" + element.name + "'/>"), false);
	                }
	                catch(e) {} // For IE9 with doc mode "IE9 Standards" and browser mode "IE9 Compatibility View"
	            }
	        },

	        forceRefresh: function(node) {
	            // Workaround for an IE9 rendering bug - https://github.com/SteveSanderson/knockout/issues/209
	            if (ieVersion >= 9) {
	                // For text nodes and comment nodes (most likely virtual elements), we will have to refresh the container
	                var elem = node.nodeType == 1 ? node : node.parentNode;
	                if (elem.style)
	                    elem.style.zoom = elem.style.zoom;
	            }
	        },

	        ensureSelectElementIsRenderedCorrectly: function(selectElement) {
	            // Workaround for IE9 rendering bug - it doesn't reliably display all the text in dynamically-added select boxes unless you force it to re-render by updating the width.
	            // (See https://github.com/SteveSanderson/knockout/issues/312, http://stackoverflow.com/questions/5908494/select-only-shows-first-char-of-selected-option)
	            // Also fixes IE7 and IE8 bug that causes selects to be zero width if enclosed by 'if' or 'with'. (See issue #839)
	            if (ieVersion) {
	                var originalWidth = selectElement.style.width;
	                selectElement.style.width = 0;
	                selectElement.style.width = originalWidth;
	            }
	        },

	        range: function (min, max) {
	            min = ko.utils.unwrapObservable(min);
	            max = ko.utils.unwrapObservable(max);
	            var result = [];
	            for (var i = min; i <= max; i++)
	                result.push(i);
	            return result;
	        },

	        makeArray: function(arrayLikeObject) {
	            var result = [];
	            for (var i = 0, j = arrayLikeObject.length; i < j; i++) {
	                result.push(arrayLikeObject[i]);
	            };
	            return result;
	        },

	        isIe6 : isIe6,
	        isIe7 : isIe7,
	        ieVersion : ieVersion,

	        getFormFields: function(form, fieldName) {
	            var fields = ko.utils.makeArray(form.getElementsByTagName("input")).concat(ko.utils.makeArray(form.getElementsByTagName("textarea")));
	            var isMatchingField = (typeof fieldName == 'string')
	                ? function(field) { return field.name === fieldName }
	                : function(field) { return fieldName.test(field.name) }; // Treat fieldName as regex or object containing predicate
	            var matches = [];
	            for (var i = fields.length - 1; i >= 0; i--) {
	                if (isMatchingField(fields[i]))
	                    matches.push(fields[i]);
	            };
	            return matches;
	        },

	        parseJson: function (jsonString) {
	            if (typeof jsonString == "string") {
	                jsonString = ko.utils.stringTrim(jsonString);
	                if (jsonString) {
	                    if (JSON && JSON.parse) // Use native parsing where available
	                        return JSON.parse(jsonString);
	                    return (new Function("return " + jsonString))(); // Fallback on less safe parsing for older browsers
	                }
	            }
	            return null;
	        },

	        stringifyJson: function (data, replacer, space) {   // replacer and space are optional
	            if (!JSON || !JSON.stringify)
	                throw new Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");
	            return JSON.stringify(ko.utils.unwrapObservable(data), replacer, space);
	        },

	        postJson: function (urlOrForm, data, options) {
	            options = options || {};
	            var params = options['params'] || {};
	            var includeFields = options['includeFields'] || this.fieldsIncludedWithJsonPost;
	            var url = urlOrForm;

	            // If we were given a form, use its 'action' URL and pick out any requested field values
	            if((typeof urlOrForm == 'object') && (ko.utils.tagNameLower(urlOrForm) === "form")) {
	                var originalForm = urlOrForm;
	                url = originalForm.action;
	                for (var i = includeFields.length - 1; i >= 0; i--) {
	                    var fields = ko.utils.getFormFields(originalForm, includeFields[i]);
	                    for (var j = fields.length - 1; j >= 0; j--)
	                        params[fields[j].name] = fields[j].value;
	                }
	            }

	            data = ko.utils.unwrapObservable(data);
	            var form = document.createElement("form");
	            form.style.display = "none";
	            form.action = url;
	            form.method = "post";
	            for (var key in data) {
	                // Since 'data' this is a model object, we include all properties including those inherited from its prototype
	                var input = document.createElement("input");
	                input.type = "hidden";
	                input.name = key;
	                input.value = ko.utils.stringifyJson(ko.utils.unwrapObservable(data[key]));
	                form.appendChild(input);
	            }
	            objectForEach(params, function(key, value) {
	                var input = document.createElement("input");
	                input.type = "hidden";
	                input.name = key;
	                input.value = value;
	                form.appendChild(input);
	            });
	            document.body.appendChild(form);
	            options['submitter'] ? options['submitter'](form) : form.submit();
	            setTimeout(function () { form.parentNode.removeChild(form); }, 0);
	        }
	    }
	}());

	ko.exportSymbol('utils', ko.utils);
	ko.exportSymbol('utils.arrayForEach', ko.utils.arrayForEach);
	ko.exportSymbol('utils.arrayFirst', ko.utils.arrayFirst);
	ko.exportSymbol('utils.arrayFilter', ko.utils.arrayFilter);
	ko.exportSymbol('utils.arrayGetDistinctValues', ko.utils.arrayGetDistinctValues);
	ko.exportSymbol('utils.arrayIndexOf', ko.utils.arrayIndexOf);
	ko.exportSymbol('utils.arrayMap', ko.utils.arrayMap);
	ko.exportSymbol('utils.arrayPushAll', ko.utils.arrayPushAll);
	ko.exportSymbol('utils.arrayRemoveItem', ko.utils.arrayRemoveItem);
	ko.exportSymbol('utils.extend', ko.utils.extend);
	ko.exportSymbol('utils.fieldsIncludedWithJsonPost', ko.utils.fieldsIncludedWithJsonPost);
	ko.exportSymbol('utils.getFormFields', ko.utils.getFormFields);
	ko.exportSymbol('utils.peekObservable', ko.utils.peekObservable);
	ko.exportSymbol('utils.postJson', ko.utils.postJson);
	ko.exportSymbol('utils.parseJson', ko.utils.parseJson);
	ko.exportSymbol('utils.registerEventHandler', ko.utils.registerEventHandler);
	ko.exportSymbol('utils.stringifyJson', ko.utils.stringifyJson);
	ko.exportSymbol('utils.range', ko.utils.range);
	ko.exportSymbol('utils.toggleDomNodeCssClass', ko.utils.toggleDomNodeCssClass);
	ko.exportSymbol('utils.triggerEvent', ko.utils.triggerEvent);
	ko.exportSymbol('utils.unwrapObservable', ko.utils.unwrapObservable);
	ko.exportSymbol('utils.objectForEach', ko.utils.objectForEach);
	ko.exportSymbol('utils.addOrRemoveItem', ko.utils.addOrRemoveItem);
	ko.exportSymbol('utils.setTextContent', ko.utils.setTextContent);
	ko.exportSymbol('unwrap', ko.utils.unwrapObservable); // Convenient shorthand, because this is used so commonly

	if (!Function.prototype['bind']) {
	    // Function.prototype.bind is a standard part of ECMAScript 5th Edition (December 2009, http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-262.pdf)
	    // In case the browser doesn't implement it natively, provide a JavaScript implementation. This implementation is based on the one in prototype.js
	    Function.prototype['bind'] = function (object) {
	        var originalFunction = this;
	        if (arguments.length === 1) {
	            return function () {
	                return originalFunction.apply(object, arguments);
	            };
	        } else {
	            var partialArgs = Array.prototype.slice.call(arguments, 1);
	            return function () {
	                var args = partialArgs.slice(0);
	                args.push.apply(args, arguments);
	                return originalFunction.apply(object, args);
	            };
	        }
	    };
	}

	ko.utils.domData = new (function () {
	    var uniqueId = 0;
	    var dataStoreKeyExpandoPropertyName = "__ko__" + (new Date).getTime();
	    var dataStore = {};

	    function getAll(node, createIfNotFound) {
	        var dataStoreKey = node[dataStoreKeyExpandoPropertyName];
	        var hasExistingDataStore = dataStoreKey && (dataStoreKey !== "null") && dataStore[dataStoreKey];
	        if (!hasExistingDataStore) {
	            if (!createIfNotFound)
	                return undefined;
	            dataStoreKey = node[dataStoreKeyExpandoPropertyName] = "ko" + uniqueId++;
	            dataStore[dataStoreKey] = {};
	        }
	        return dataStore[dataStoreKey];
	    }

	    return {
	        get: function (node, key) {
	            var allDataForNode = getAll(node, false);
	            return allDataForNode === undefined ? undefined : allDataForNode[key];
	        },
	        set: function (node, key, value) {
	            if (value === undefined) {
	                // Make sure we don't actually create a new domData key if we are actually deleting a value
	                if (getAll(node, false) === undefined)
	                    return;
	            }
	            var allDataForNode = getAll(node, true);
	            allDataForNode[key] = value;
	        },
	        clear: function (node) {
	            var dataStoreKey = node[dataStoreKeyExpandoPropertyName];
	            if (dataStoreKey) {
	                delete dataStore[dataStoreKey];
	                node[dataStoreKeyExpandoPropertyName] = null;
	                return true; // Exposing "did clean" flag purely so specs can infer whether things have been cleaned up as intended
	            }
	            return false;
	        },

	        nextKey: function () {
	            return (uniqueId++) + dataStoreKeyExpandoPropertyName;
	        }
	    };
	})();

	ko.exportSymbol('utils.domData', ko.utils.domData);
	ko.exportSymbol('utils.domData.clear', ko.utils.domData.clear); // Exporting only so specs can clear up after themselves fully

	ko.utils.domNodeDisposal = new (function () {
	    var domDataKey = ko.utils.domData.nextKey();
	    var cleanableNodeTypes = { 1: true, 8: true, 9: true };       // Element, Comment, Document
	    var cleanableNodeTypesWithDescendants = { 1: true, 9: true }; // Element, Document

	    function getDisposeCallbacksCollection(node, createIfNotFound) {
	        var allDisposeCallbacks = ko.utils.domData.get(node, domDataKey);
	        if ((allDisposeCallbacks === undefined) && createIfNotFound) {
	            allDisposeCallbacks = [];
	            ko.utils.domData.set(node, domDataKey, allDisposeCallbacks);
	        }
	        return allDisposeCallbacks;
	    }
	    function destroyCallbacksCollection(node) {
	        ko.utils.domData.set(node, domDataKey, undefined);
	    }

	    function cleanSingleNode(node) {
	        // Run all the dispose callbacks
	        var callbacks = getDisposeCallbacksCollection(node, false);
	        if (callbacks) {
	            callbacks = callbacks.slice(0); // Clone, as the array may be modified during iteration (typically, callbacks will remove themselves)
	            for (var i = 0; i < callbacks.length; i++)
	                callbacks[i](node);
	        }

	        // Erase the DOM data
	        ko.utils.domData.clear(node);

	        // Perform cleanup needed by external libraries (currently only jQuery, but can be extended)
	        ko.utils.domNodeDisposal["cleanExternalData"](node);

	        // Clear any immediate-child comment nodes, as these wouldn't have been found by
	        // node.getElementsByTagName("*") in cleanNode() (comment nodes aren't elements)
	        if (cleanableNodeTypesWithDescendants[node.nodeType])
	            cleanImmediateCommentTypeChildren(node);
	    }

	    function cleanImmediateCommentTypeChildren(nodeWithChildren) {
	        var child, nextChild = nodeWithChildren.firstChild;
	        while (child = nextChild) {
	            nextChild = child.nextSibling;
	            if (child.nodeType === 8)
	                cleanSingleNode(child);
	        }
	    }

	    return {
	        addDisposeCallback : function(node, callback) {
	            if (typeof callback != "function")
	                throw new Error("Callback must be a function");
	            getDisposeCallbacksCollection(node, true).push(callback);
	        },

	        removeDisposeCallback : function(node, callback) {
	            var callbacksCollection = getDisposeCallbacksCollection(node, false);
	            if (callbacksCollection) {
	                ko.utils.arrayRemoveItem(callbacksCollection, callback);
	                if (callbacksCollection.length == 0)
	                    destroyCallbacksCollection(node);
	            }
	        },

	        cleanNode : function(node) {
	            // First clean this node, where applicable
	            if (cleanableNodeTypes[node.nodeType]) {
	                cleanSingleNode(node);

	                // ... then its descendants, where applicable
	                if (cleanableNodeTypesWithDescendants[node.nodeType]) {
	                    // Clone the descendants list in case it changes during iteration
	                    var descendants = [];
	                    ko.utils.arrayPushAll(descendants, node.getElementsByTagName("*"));
	                    for (var i = 0, j = descendants.length; i < j; i++)
	                        cleanSingleNode(descendants[i]);
	                }
	            }
	            return node;
	        },

	        removeNode : function(node) {
	            ko.cleanNode(node);
	            if (node.parentNode)
	                node.parentNode.removeChild(node);
	        },

	        "cleanExternalData" : function (node) {
	            // Special support for jQuery here because it's so commonly used.
	            // Many jQuery plugins (including jquery.tmpl) store data using jQuery's equivalent of domData
	            // so notify it to tear down any resources associated with the node & descendants here.
	            if (jQueryInstance && (typeof jQueryInstance['cleanData'] == "function"))
	                jQueryInstance['cleanData']([node]);
	        }
	    };
	})();
	ko.cleanNode = ko.utils.domNodeDisposal.cleanNode; // Shorthand name for convenience
	ko.removeNode = ko.utils.domNodeDisposal.removeNode; // Shorthand name for convenience
	ko.exportSymbol('cleanNode', ko.cleanNode);
	ko.exportSymbol('removeNode', ko.removeNode);
	ko.exportSymbol('utils.domNodeDisposal', ko.utils.domNodeDisposal);
	ko.exportSymbol('utils.domNodeDisposal.addDisposeCallback', ko.utils.domNodeDisposal.addDisposeCallback);
	ko.exportSymbol('utils.domNodeDisposal.removeDisposeCallback', ko.utils.domNodeDisposal.removeDisposeCallback);
	(function () {
	    var leadingCommentRegex = /^(\s*)<!--(.*?)-->/;

	    function simpleHtmlParse(html, documentContext) {
	        documentContext || (documentContext = document);
	        var windowContext = documentContext['parentWindow'] || documentContext['defaultView'] || window;

	        // Based on jQuery's "clean" function, but only accounting for table-related elements.
	        // If you have referenced jQuery, this won't be used anyway - KO will use jQuery's "clean" function directly

	        // Note that there's still an issue in IE < 9 whereby it will discard comment nodes that are the first child of
	        // a descendant node. For example: "<div><!-- mycomment -->abc</div>" will get parsed as "<div>abc</div>"
	        // This won't affect anyone who has referenced jQuery, and there's always the workaround of inserting a dummy node
	        // (possibly a text node) in front of the comment. So, KO does not attempt to workaround this IE issue automatically at present.

	        // Trim whitespace, otherwise indexOf won't work as expected
	        var tags = ko.utils.stringTrim(html).toLowerCase(), div = documentContext.createElement("div");

	        // Finds the first match from the left column, and returns the corresponding "wrap" data from the right column
	        var wrap = tags.match(/^<(thead|tbody|tfoot)/)              && [1, "<table>", "</table>"] ||
	                   !tags.indexOf("<tr")                             && [2, "<table><tbody>", "</tbody></table>"] ||
	                   (!tags.indexOf("<td") || !tags.indexOf("<th"))   && [3, "<table><tbody><tr>", "</tr></tbody></table>"] ||
	                   /* anything else */                                 [0, "", ""];

	        // Go to html and back, then peel off extra wrappers
	        // Note that we always prefix with some dummy text, because otherwise, IE<9 will strip out leading comment nodes in descendants. Total madness.
	        var markup = "ignored<div>" + wrap[1] + html + wrap[2] + "</div>";
	        if (typeof windowContext['innerShiv'] == "function") {
	            div.appendChild(windowContext['innerShiv'](markup));
	        } else {
	            div.innerHTML = markup;
	        }

	        // Move to the right depth
	        while (wrap[0]--)
	            div = div.lastChild;

	        return ko.utils.makeArray(div.lastChild.childNodes);
	    }

	    function jQueryHtmlParse(html, documentContext) {
	        // jQuery's "parseHTML" function was introduced in jQuery 1.8.0 and is a documented public API.
	        if (jQueryInstance['parseHTML']) {
	            return jQueryInstance['parseHTML'](html, documentContext) || []; // Ensure we always return an array and never null
	        } else {
	            // For jQuery < 1.8.0, we fall back on the undocumented internal "clean" function.
	            var elems = jQueryInstance['clean']([html], documentContext);

	            // As of jQuery 1.7.1, jQuery parses the HTML by appending it to some dummy parent nodes held in an in-memory document fragment.
	            // Unfortunately, it never clears the dummy parent nodes from the document fragment, so it leaks memory over time.
	            // Fix this by finding the top-most dummy parent element, and detaching it from its owner fragment.
	            if (elems && elems[0]) {
	                // Find the top-most parent element that's a direct child of a document fragment
	                var elem = elems[0];
	                while (elem.parentNode && elem.parentNode.nodeType !== 11 /* i.e., DocumentFragment */)
	                    elem = elem.parentNode;
	                // ... then detach it
	                if (elem.parentNode)
	                    elem.parentNode.removeChild(elem);
	            }

	            return elems;
	        }
	    }

	    ko.utils.parseHtmlFragment = function(html, documentContext) {
	        return jQueryInstance ? jQueryHtmlParse(html, documentContext)   // As below, benefit from jQuery's optimisations where possible
	                              : simpleHtmlParse(html, documentContext);  // ... otherwise, this simple logic will do in most common cases.
	    };

	    ko.utils.setHtml = function(node, html) {
	        ko.utils.emptyDomNode(node);

	        // There's no legitimate reason to display a stringified observable without unwrapping it, so we'll unwrap it
	        html = ko.utils.unwrapObservable(html);

	        if ((html !== null) && (html !== undefined)) {
	            if (typeof html != 'string')
	                html = html.toString();

	            // jQuery contains a lot of sophisticated code to parse arbitrary HTML fragments,
	            // for example <tr> elements which are not normally allowed to exist on their own.
	            // If you've referenced jQuery we'll use that rather than duplicating its code.
	            if (jQueryInstance) {
	                jQueryInstance(node)['html'](html);
	            } else {
	                // ... otherwise, use KO's own parsing logic.
	                var parsedNodes = ko.utils.parseHtmlFragment(html, node.ownerDocument);
	                for (var i = 0; i < parsedNodes.length; i++)
	                    node.appendChild(parsedNodes[i]);
	            }
	        }
	    };
	})();

	ko.exportSymbol('utils.parseHtmlFragment', ko.utils.parseHtmlFragment);
	ko.exportSymbol('utils.setHtml', ko.utils.setHtml);

	ko.memoization = (function () {
	    var memos = {};

	    function randomMax8HexChars() {
	        return (((1 + Math.random()) * 0x100000000) | 0).toString(16).substring(1);
	    }
	    function generateRandomId() {
	        return randomMax8HexChars() + randomMax8HexChars();
	    }
	    function findMemoNodes(rootNode, appendToArray) {
	        if (!rootNode)
	            return;
	        if (rootNode.nodeType == 8) {
	            var memoId = ko.memoization.parseMemoText(rootNode.nodeValue);
	            if (memoId != null)
	                appendToArray.push({ domNode: rootNode, memoId: memoId });
	        } else if (rootNode.nodeType == 1) {
	            for (var i = 0, childNodes = rootNode.childNodes, j = childNodes.length; i < j; i++)
	                findMemoNodes(childNodes[i], appendToArray);
	        }
	    }

	    return {
	        memoize: function (callback) {
	            if (typeof callback != "function")
	                throw new Error("You can only pass a function to ko.memoization.memoize()");
	            var memoId = generateRandomId();
	            memos[memoId] = callback;
	            return "<!--[ko_memo:" + memoId + "]-->";
	        },

	        unmemoize: function (memoId, callbackParams) {
	            var callback = memos[memoId];
	            if (callback === undefined)
	                throw new Error("Couldn't find any memo with ID " + memoId + ". Perhaps it's already been unmemoized.");
	            try {
	                callback.apply(null, callbackParams || []);
	                return true;
	            }
	            finally { delete memos[memoId]; }
	        },

	        unmemoizeDomNodeAndDescendants: function (domNode, extraCallbackParamsArray) {
	            var memos = [];
	            findMemoNodes(domNode, memos);
	            for (var i = 0, j = memos.length; i < j; i++) {
	                var node = memos[i].domNode;
	                var combinedParams = [node];
	                if (extraCallbackParamsArray)
	                    ko.utils.arrayPushAll(combinedParams, extraCallbackParamsArray);
	                ko.memoization.unmemoize(memos[i].memoId, combinedParams);
	                node.nodeValue = ""; // Neuter this node so we don't try to unmemoize it again
	                if (node.parentNode)
	                    node.parentNode.removeChild(node); // If possible, erase it totally (not always possible - someone else might just hold a reference to it then call unmemoizeDomNodeAndDescendants again)
	            }
	        },

	        parseMemoText: function (memoText) {
	            var match = memoText.match(/^\[ko_memo\:(.*?)\]$/);
	            return match ? match[1] : null;
	        }
	    };
	})();

	ko.exportSymbol('memoization', ko.memoization);
	ko.exportSymbol('memoization.memoize', ko.memoization.memoize);
	ko.exportSymbol('memoization.unmemoize', ko.memoization.unmemoize);
	ko.exportSymbol('memoization.parseMemoText', ko.memoization.parseMemoText);
	ko.exportSymbol('memoization.unmemoizeDomNodeAndDescendants', ko.memoization.unmemoizeDomNodeAndDescendants);
	ko.extenders = {
	    'throttle': function(target, timeout) {
	        // Throttling means two things:

	        // (1) For dependent observables, we throttle *evaluations* so that, no matter how fast its dependencies
	        //     notify updates, the target doesn't re-evaluate (and hence doesn't notify) faster than a certain rate
	        target['throttleEvaluation'] = timeout;

	        // (2) For writable targets (observables, or writable dependent observables), we throttle *writes*
	        //     so the target cannot change value synchronously or faster than a certain rate
	        var writeTimeoutInstance = null;
	        return ko.dependentObservable({
	            'read': target,
	            'write': function(value) {
	                clearTimeout(writeTimeoutInstance);
	                writeTimeoutInstance = setTimeout(function() {
	                    target(value);
	                }, timeout);
	            }
	        });
	    },

	    'rateLimit': function(target, options) {
	        var timeout, method, limitFunction;

	        if (typeof options == 'number') {
	            timeout = options;
	        } else {
	            timeout = options['timeout'];
	            method = options['method'];
	        }

	        limitFunction = method == 'notifyWhenChangesStop' ?  debounce : throttle;
	        target.limit(function(callback) {
	            return limitFunction(callback, timeout);
	        });
	    },

	    'notify': function(target, notifyWhen) {
	        target["equalityComparer"] = notifyWhen == "always" ?
	            null :  // null equalityComparer means to always notify
	            valuesArePrimitiveAndEqual;
	    }
	};

	var primitiveTypes = { 'undefined':1, 'boolean':1, 'number':1, 'string':1 };
	function valuesArePrimitiveAndEqual(a, b) {
	    var oldValueIsPrimitive = (a === null) || (typeof(a) in primitiveTypes);
	    return oldValueIsPrimitive ? (a === b) : false;
	}

	function throttle(callback, timeout) {
	    var timeoutInstance;
	    return function () {
	        if (!timeoutInstance) {
	            timeoutInstance = setTimeout(function() {
	                timeoutInstance = undefined;
	                callback();
	            }, timeout);
	        }
	    };
	}

	function debounce(callback, timeout) {
	    var timeoutInstance;
	    return function () {
	        clearTimeout(timeoutInstance);
	        timeoutInstance = setTimeout(callback, timeout);
	    };
	}

	function applyExtenders(requestedExtenders) {
	    var target = this;
	    if (requestedExtenders) {
	        ko.utils.objectForEach(requestedExtenders, function(key, value) {
	            var extenderHandler = ko.extenders[key];
	            if (typeof extenderHandler == 'function') {
	                target = extenderHandler(target, value) || target;
	            }
	        });
	    }
	    return target;
	}

	ko.exportSymbol('extenders', ko.extenders);

	ko.subscription = function (target, callback, disposeCallback) {
	    this._target = target;
	    this.callback = callback;
	    this.disposeCallback = disposeCallback;
	    this.isDisposed = false;
	    ko.exportProperty(this, 'dispose', this.dispose);
	};
	ko.subscription.prototype.dispose = function () {
	    this.isDisposed = true;
	    this.disposeCallback();
	};

	ko.subscribable = function () {
	    ko.utils.setPrototypeOfOrExtend(this, ko.subscribable['fn']);
	    this._subscriptions = {};
	    this._versionNumber = 1;
	}

	var defaultEvent = "change";

	var ko_subscribable_fn = {
	    subscribe: function (callback, callbackTarget, event) {
	        var self = this;

	        event = event || defaultEvent;
	        var boundCallback = callbackTarget ? callback.bind(callbackTarget) : callback;

	        var subscription = new ko.subscription(self, boundCallback, function () {
	            ko.utils.arrayRemoveItem(self._subscriptions[event], subscription);
	            if (self.afterSubscriptionRemove)
	                self.afterSubscriptionRemove(event);
	        });

	        if (self.beforeSubscriptionAdd)
	            self.beforeSubscriptionAdd(event);

	        if (!self._subscriptions[event])
	            self._subscriptions[event] = [];
	        self._subscriptions[event].push(subscription);

	        return subscription;
	    },

	    "notifySubscribers": function (valueToNotify, event) {
	        event = event || defaultEvent;
	        if (event === defaultEvent) {
	            this.updateVersion();
	        }
	        if (this.hasSubscriptionsForEvent(event)) {
	            try {
	                ko.dependencyDetection.begin(); // Begin suppressing dependency detection (by setting the top frame to undefined)
	                for (var a = this._subscriptions[event].slice(0), i = 0, subscription; subscription = a[i]; ++i) {
	                    // In case a subscription was disposed during the arrayForEach cycle, check
	                    // for isDisposed on each subscription before invoking its callback
	                    if (!subscription.isDisposed)
	                        subscription.callback(valueToNotify);
	                }
	            } finally {
	                ko.dependencyDetection.end(); // End suppressing dependency detection
	            }
	        }
	    },

	    getVersion: function () {
	        return this._versionNumber;
	    },

	    hasChanged: function (versionToCheck) {
	        return this.getVersion() !== versionToCheck;
	    },

	    updateVersion: function () {
	        ++this._versionNumber;
	    },

	    limit: function(limitFunction) {
	        var self = this, selfIsObservable = ko.isObservable(self),
	            isPending, previousValue, pendingValue, beforeChange = 'beforeChange';

	        if (!self._origNotifySubscribers) {
	            self._origNotifySubscribers = self["notifySubscribers"];
	            self["notifySubscribers"] = function(value, event) {
	                if (!event || event === defaultEvent) {
	                    self._rateLimitedChange(value);
	                } else if (event === beforeChange) {
	                    self._rateLimitedBeforeChange(value);
	                } else {
	                    self._origNotifySubscribers(value, event);
	                }
	            };
	        }

	        var finish = limitFunction(function() {
	            // If an observable provided a reference to itself, access it to get the latest value.
	            // This allows computed observables to delay calculating their value until needed.
	            if (selfIsObservable && pendingValue === self) {
	                pendingValue = self();
	            }
	            isPending = false;
	            if (self.isDifferent(previousValue, pendingValue)) {
	                self._origNotifySubscribers(previousValue = pendingValue);
	            }
	        });

	        self._rateLimitedChange = function(value) {
	            isPending = true;
	            pendingValue = value;
	            finish();
	        };
	        self._rateLimitedBeforeChange = function(value) {
	            if (!isPending) {
	                previousValue = value;
	                self._origNotifySubscribers(value, beforeChange);
	            }
	        };
	    },

	    hasSubscriptionsForEvent: function(event) {
	        return this._subscriptions[event] && this._subscriptions[event].length;
	    },

	    getSubscriptionsCount: function (event) {
	        if (event) {
	            return this._subscriptions[event] && this._subscriptions[event].length || 0;
	        } else {
	            var total = 0;
	            ko.utils.objectForEach(this._subscriptions, function(eventName, subscriptions) {
	                total += subscriptions.length;
	            });
	            return total;
	        }
	    },

	    isDifferent: function(oldValue, newValue) {
	        return !this['equalityComparer'] || !this['equalityComparer'](oldValue, newValue);
	    },

	    extend: applyExtenders
	};

	ko.exportProperty(ko_subscribable_fn, 'subscribe', ko_subscribable_fn.subscribe);
	ko.exportProperty(ko_subscribable_fn, 'extend', ko_subscribable_fn.extend);
	ko.exportProperty(ko_subscribable_fn, 'getSubscriptionsCount', ko_subscribable_fn.getSubscriptionsCount);

	// For browsers that support proto assignment, we overwrite the prototype of each
	// observable instance. Since observables are functions, we need Function.prototype
	// to still be in the prototype chain.
	if (ko.utils.canSetPrototype) {
	    ko.utils.setPrototypeOf(ko_subscribable_fn, Function.prototype);
	}

	ko.subscribable['fn'] = ko_subscribable_fn;


	ko.isSubscribable = function (instance) {
	    return instance != null && typeof instance.subscribe == "function" && typeof instance["notifySubscribers"] == "function";
	};

	ko.exportSymbol('subscribable', ko.subscribable);
	ko.exportSymbol('isSubscribable', ko.isSubscribable);

	ko.computedContext = ko.dependencyDetection = (function () {
	    var outerFrames = [],
	        currentFrame,
	        lastId = 0;

	    // Return a unique ID that can be assigned to an observable for dependency tracking.
	    // Theoretically, you could eventually overflow the number storage size, resulting
	    // in duplicate IDs. But in JavaScript, the largest exact integral value is 2^53
	    // or 9,007,199,254,740,992. If you created 1,000,000 IDs per second, it would
	    // take over 285 years to reach that number.
	    // Reference http://blog.vjeux.com/2010/javascript/javascript-max_int-number-limits.html
	    function getId() {
	        return ++lastId;
	    }

	    function begin(options) {
	        outerFrames.push(currentFrame);
	        currentFrame = options;
	    }

	    function end() {
	        currentFrame = outerFrames.pop();
	    }

	    return {
	        begin: begin,

	        end: end,

	        registerDependency: function (subscribable) {
	            if (currentFrame) {
	                if (!ko.isSubscribable(subscribable))
	                    throw new Error("Only subscribable things can act as dependencies");
	                currentFrame.callback(subscribable, subscribable._id || (subscribable._id = getId()));
	            }
	        },

	        ignore: function (callback, callbackTarget, callbackArgs) {
	            try {
	                begin();
	                return callback.apply(callbackTarget, callbackArgs || []);
	            } finally {
	                end();
	            }
	        },

	        getDependenciesCount: function () {
	            if (currentFrame)
	                return currentFrame.computed.getDependenciesCount();
	        },

	        isInitial: function() {
	            if (currentFrame)
	                return currentFrame.isInitial;
	        }
	    };
	})();

	ko.exportSymbol('computedContext', ko.computedContext);
	ko.exportSymbol('computedContext.getDependenciesCount', ko.computedContext.getDependenciesCount);
	ko.exportSymbol('computedContext.isInitial', ko.computedContext.isInitial);
	ko.exportSymbol('computedContext.isSleeping', ko.computedContext.isSleeping);

	ko.exportSymbol('ignoreDependencies', ko.ignoreDependencies = ko.dependencyDetection.ignore);
	ko.observable = function (initialValue) {
	    var _latestValue = initialValue;

	    function observable() {
	        if (arguments.length > 0) {
	            // Write

	            // Ignore writes if the value hasn't changed
	            if (observable.isDifferent(_latestValue, arguments[0])) {
	                observable.valueWillMutate();
	                _latestValue = arguments[0];
	                if (DEBUG) observable._latestValue = _latestValue;
	                observable.valueHasMutated();
	            }
	            return this; // Permits chained assignments
	        }
	        else {
	            // Read
	            ko.dependencyDetection.registerDependency(observable); // The caller only needs to be notified of changes if they did a "read" operation
	            return _latestValue;
	        }
	    }
	    ko.subscribable.call(observable);
	    ko.utils.setPrototypeOfOrExtend(observable, ko.observable['fn']);

	    if (DEBUG) observable._latestValue = _latestValue;
	    observable.peek = function() { return _latestValue };
	    observable.valueHasMutated = function () { observable["notifySubscribers"](_latestValue); }
	    observable.valueWillMutate = function () { observable["notifySubscribers"](_latestValue, "beforeChange"); }

	    ko.exportProperty(observable, 'peek', observable.peek);
	    ko.exportProperty(observable, "valueHasMutated", observable.valueHasMutated);
	    ko.exportProperty(observable, "valueWillMutate", observable.valueWillMutate);

	    return observable;
	}

	ko.observable['fn'] = {
	    "equalityComparer": valuesArePrimitiveAndEqual
	};

	var protoProperty = ko.observable.protoProperty = "__ko_proto__";
	ko.observable['fn'][protoProperty] = ko.observable;

	// Note that for browsers that don't support proto assignment, the
	// inheritance chain is created manually in the ko.observable constructor
	if (ko.utils.canSetPrototype) {
	    ko.utils.setPrototypeOf(ko.observable['fn'], ko.subscribable['fn']);
	}

	ko.hasPrototype = function(instance, prototype) {
	    if ((instance === null) || (instance === undefined) || (instance[protoProperty] === undefined)) return false;
	    if (instance[protoProperty] === prototype) return true;
	    return ko.hasPrototype(instance[protoProperty], prototype); // Walk the prototype chain
	};

	ko.isObservable = function (instance) {
	    return ko.hasPrototype(instance, ko.observable);
	}
	ko.isWriteableObservable = function (instance) {
	    // Observable
	    if ((typeof instance == "function") && instance[protoProperty] === ko.observable)
	        return true;
	    // Writeable dependent observable
	    if ((typeof instance == "function") && (instance[protoProperty] === ko.dependentObservable) && (instance.hasWriteFunction))
	        return true;
	    // Anything else
	    return false;
	}


	ko.exportSymbol('observable', ko.observable);
	ko.exportSymbol('isObservable', ko.isObservable);
	ko.exportSymbol('isWriteableObservable', ko.isWriteableObservable);
	ko.exportSymbol('isWritableObservable', ko.isWriteableObservable);
	ko.observableArray = function (initialValues) {
	    initialValues = initialValues || [];

	    if (typeof initialValues != 'object' || !('length' in initialValues))
	        throw new Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");

	    var result = ko.observable(initialValues);
	    ko.utils.setPrototypeOfOrExtend(result, ko.observableArray['fn']);
	    return result.extend({'trackArrayChanges':true});
	};

	ko.observableArray['fn'] = {
	    'remove': function (valueOrPredicate) {
	        var underlyingArray = this.peek();
	        var removedValues = [];
	        var predicate = typeof valueOrPredicate == "function" && !ko.isObservable(valueOrPredicate) ? valueOrPredicate : function (value) { return value === valueOrPredicate; };
	        for (var i = 0; i < underlyingArray.length; i++) {
	            var value = underlyingArray[i];
	            if (predicate(value)) {
	                if (removedValues.length === 0) {
	                    this.valueWillMutate();
	                }
	                removedValues.push(value);
	                underlyingArray.splice(i, 1);
	                i--;
	            }
	        }
	        if (removedValues.length) {
	            this.valueHasMutated();
	        }
	        return removedValues;
	    },

	    'removeAll': function (arrayOfValues) {
	        // If you passed zero args, we remove everything
	        if (arrayOfValues === undefined) {
	            var underlyingArray = this.peek();
	            var allValues = underlyingArray.slice(0);
	            this.valueWillMutate();
	            underlyingArray.splice(0, underlyingArray.length);
	            this.valueHasMutated();
	            return allValues;
	        }
	        // If you passed an arg, we interpret it as an array of entries to remove
	        if (!arrayOfValues)
	            return [];
	        return this['remove'](function (value) {
	            return ko.utils.arrayIndexOf(arrayOfValues, value) >= 0;
	        });
	    },

	    'destroy': function (valueOrPredicate) {
	        var underlyingArray = this.peek();
	        var predicate = typeof valueOrPredicate == "function" && !ko.isObservable(valueOrPredicate) ? valueOrPredicate : function (value) { return value === valueOrPredicate; };
	        this.valueWillMutate();
	        for (var i = underlyingArray.length - 1; i >= 0; i--) {
	            var value = underlyingArray[i];
	            if (predicate(value))
	                underlyingArray[i]["_destroy"] = true;
	        }
	        this.valueHasMutated();
	    },

	    'destroyAll': function (arrayOfValues) {
	        // If you passed zero args, we destroy everything
	        if (arrayOfValues === undefined)
	            return this['destroy'](function() { return true });

	        // If you passed an arg, we interpret it as an array of entries to destroy
	        if (!arrayOfValues)
	            return [];
	        return this['destroy'](function (value) {
	            return ko.utils.arrayIndexOf(arrayOfValues, value) >= 0;
	        });
	    },

	    'indexOf': function (item) {
	        var underlyingArray = this();
	        return ko.utils.arrayIndexOf(underlyingArray, item);
	    },

	    'replace': function(oldItem, newItem) {
	        var index = this['indexOf'](oldItem);
	        if (index >= 0) {
	            this.valueWillMutate();
	            this.peek()[index] = newItem;
	            this.valueHasMutated();
	        }
	    }
	};

	// Populate ko.observableArray.fn with read/write functions from native arrays
	// Important: Do not add any additional functions here that may reasonably be used to *read* data from the array
	// because we'll eval them without causing subscriptions, so ko.computed output could end up getting stale
	ko.utils.arrayForEach(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (methodName) {
	    ko.observableArray['fn'][methodName] = function () {
	        // Use "peek" to avoid creating a subscription in any computed that we're executing in the context of
	        // (for consistency with mutating regular observables)
	        var underlyingArray = this.peek();
	        this.valueWillMutate();
	        this.cacheDiffForKnownOperation(underlyingArray, methodName, arguments);
	        var methodCallResult = underlyingArray[methodName].apply(underlyingArray, arguments);
	        this.valueHasMutated();
	        return methodCallResult;
	    };
	});

	// Populate ko.observableArray.fn with read-only functions from native arrays
	ko.utils.arrayForEach(["slice"], function (methodName) {
	    ko.observableArray['fn'][methodName] = function () {
	        var underlyingArray = this();
	        return underlyingArray[methodName].apply(underlyingArray, arguments);
	    };
	});

	// Note that for browsers that don't support proto assignment, the
	// inheritance chain is created manually in the ko.observableArray constructor
	if (ko.utils.canSetPrototype) {
	    ko.utils.setPrototypeOf(ko.observableArray['fn'], ko.observable['fn']);
	}

	ko.exportSymbol('observableArray', ko.observableArray);
	var arrayChangeEventName = 'arrayChange';
	ko.extenders['trackArrayChanges'] = function(target) {
	    // Only modify the target observable once
	    if (target.cacheDiffForKnownOperation) {
	        return;
	    }
	    var trackingChanges = false,
	        cachedDiff = null,
	        arrayChangeSubscription,
	        pendingNotifications = 0,
	        underlyingBeforeSubscriptionAddFunction = target.beforeSubscriptionAdd,
	        underlyingAfterSubscriptionRemoveFunction = target.afterSubscriptionRemove;

	    // Watch "subscribe" calls, and for array change events, ensure change tracking is enabled
	    target.beforeSubscriptionAdd = function (event) {
	        if (underlyingBeforeSubscriptionAddFunction)
	            underlyingBeforeSubscriptionAddFunction.call(target, event);
	        if (event === arrayChangeEventName) {
	            trackChanges();
	        }
	    };
	    // Watch "dispose" calls, and for array change events, ensure change tracking is disabled when all are disposed
	    target.afterSubscriptionRemove = function (event) {
	        if (underlyingAfterSubscriptionRemoveFunction)
	            underlyingAfterSubscriptionRemoveFunction.call(target, event);
	        if (event === arrayChangeEventName && !target.hasSubscriptionsForEvent(arrayChangeEventName)) {
	            arrayChangeSubscription.dispose();
	            trackingChanges = false;
	        }
	    };

	    function trackChanges() {
	        // Calling 'trackChanges' multiple times is the same as calling it once
	        if (trackingChanges) {
	            return;
	        }

	        trackingChanges = true;

	        // Intercept "notifySubscribers" to track how many times it was called.
	        var underlyingNotifySubscribersFunction = target['notifySubscribers'];
	        target['notifySubscribers'] = function(valueToNotify, event) {
	            if (!event || event === defaultEvent) {
	                ++pendingNotifications;
	            }
	            return underlyingNotifySubscribersFunction.apply(this, arguments);
	        };

	        // Each time the array changes value, capture a clone so that on the next
	        // change it's possible to produce a diff
	        var previousContents = [].concat(target.peek() || []);
	        cachedDiff = null;
	        arrayChangeSubscription = target.subscribe(function(currentContents) {
	            // Make a copy of the current contents and ensure it's an array
	            currentContents = [].concat(currentContents || []);

	            // Compute the diff and issue notifications, but only if someone is listening
	            if (target.hasSubscriptionsForEvent(arrayChangeEventName)) {
	                var changes = getChanges(previousContents, currentContents);
	            }

	            // Eliminate references to the old, removed items, so they can be GCed
	            previousContents = currentContents;
	            cachedDiff = null;
	            pendingNotifications = 0;

	            if (changes && changes.length) {
	                target['notifySubscribers'](changes, arrayChangeEventName);
	            }
	        });
	    }

	    function getChanges(previousContents, currentContents) {
	        // We try to re-use cached diffs.
	        // The scenarios where pendingNotifications > 1 are when using rate-limiting or the Deferred Updates
	        // plugin, which without this check would not be compatible with arrayChange notifications. Normally,
	        // notifications are issued immediately so we wouldn't be queueing up more than one.
	        if (!cachedDiff || pendingNotifications > 1) {
	            cachedDiff = ko.utils.compareArrays(previousContents, currentContents, { 'sparse': true });
	        }

	        return cachedDiff;
	    }

	    target.cacheDiffForKnownOperation = function(rawArray, operationName, args) {
	        // Only run if we're currently tracking changes for this observable array
	        // and there aren't any pending deferred notifications.
	        if (!trackingChanges || pendingNotifications) {
	            return;
	        }
	        var diff = [],
	            arrayLength = rawArray.length,
	            argsLength = args.length,
	            offset = 0;

	        function pushDiff(status, value, index) {
	            return diff[diff.length] = { 'status': status, 'value': value, 'index': index };
	        }
	        switch (operationName) {
	            case 'push':
	                offset = arrayLength;
	            case 'unshift':
	                for (var index = 0; index < argsLength; index++) {
	                    pushDiff('added', args[index], offset + index);
	                }
	                break;

	            case 'pop':
	                offset = arrayLength - 1;
	            case 'shift':
	                if (arrayLength) {
	                    pushDiff('deleted', rawArray[offset], offset);
	                }
	                break;

	            case 'splice':
	                // Negative start index means 'from end of array'. After that we clamp to [0...arrayLength].
	                // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
	                var startIndex = Math.min(Math.max(0, args[0] < 0 ? arrayLength + args[0] : args[0]), arrayLength),
	                    endDeleteIndex = argsLength === 1 ? arrayLength : Math.min(startIndex + (args[1] || 0), arrayLength),
	                    endAddIndex = startIndex + argsLength - 2,
	                    endIndex = Math.max(endDeleteIndex, endAddIndex),
	                    additions = [], deletions = [];
	                for (var index = startIndex, argsIndex = 2; index < endIndex; ++index, ++argsIndex) {
	                    if (index < endDeleteIndex)
	                        deletions.push(pushDiff('deleted', rawArray[index], index));
	                    if (index < endAddIndex)
	                        additions.push(pushDiff('added', args[argsIndex], index));
	                }
	                ko.utils.findMovesInArrayComparison(deletions, additions);
	                break;

	            default:
	                return;
	        }
	        cachedDiff = diff;
	    };
	};
	ko.computed = ko.dependentObservable = function (evaluatorFunctionOrOptions, evaluatorFunctionTarget, options) {
	    var _latestValue,
	        _needsEvaluation = true,
	        _isBeingEvaluated = false,
	        _suppressDisposalUntilDisposeWhenReturnsFalse = false,
	        _isDisposed = false,
	        readFunction = evaluatorFunctionOrOptions,
	        pure = false,
	        isSleeping = false;

	    if (readFunction && typeof readFunction == "object") {
	        // Single-parameter syntax - everything is on this "options" param
	        options = readFunction;
	        readFunction = options["read"];
	    } else {
	        // Multi-parameter syntax - construct the options according to the params passed
	        options = options || {};
	        if (!readFunction)
	            readFunction = options["read"];
	    }
	    if (typeof readFunction != "function")
	        throw new Error("Pass a function that returns the value of the ko.computed");

	    function addDependencyTracking(id, target, trackingObj) {
	        if (pure && target === dependentObservable) {
	            throw Error("A 'pure' computed must not be called recursively");
	        }

	        dependencyTracking[id] = trackingObj;
	        trackingObj._order = _dependenciesCount++;
	        trackingObj._version = target.getVersion();
	    }

	    function haveDependenciesChanged() {
	        var id, dependency;
	        for (id in dependencyTracking) {
	            if (dependencyTracking.hasOwnProperty(id)) {
	                dependency = dependencyTracking[id];
	                if (dependency._target.hasChanged(dependency._version)) {
	                    return true;
	                }
	            }
	        }
	    }

	    function disposeComputed() {
	        if (!isSleeping && dependencyTracking) {
	            ko.utils.objectForEach(dependencyTracking, function (id, dependency) {
	                if (dependency.dispose)
	                    dependency.dispose();
	            });
	        }
	        dependencyTracking = null;
	        _dependenciesCount = 0;
	        _isDisposed = true;
	        _needsEvaluation = false;
	        isSleeping = false;
	    }

	    function evaluatePossiblyAsync() {
	        var throttleEvaluationTimeout = dependentObservable['throttleEvaluation'];
	        if (throttleEvaluationTimeout && throttleEvaluationTimeout >= 0) {
	            clearTimeout(evaluationTimeoutInstance);
	            evaluationTimeoutInstance = setTimeout(function () {
	                evaluateImmediate(true /*notifyChange*/);
	            }, throttleEvaluationTimeout);
	        } else if (dependentObservable._evalRateLimited) {
	            dependentObservable._evalRateLimited();
	        } else {
	            evaluateImmediate(true /*notifyChange*/);
	        }
	    }

	    function evaluateImmediate(notifyChange) {
	        if (_isBeingEvaluated) {
	            // If the evaluation of a ko.computed causes side effects, it's possible that it will trigger its own re-evaluation.
	            // This is not desirable (it's hard for a developer to realise a chain of dependencies might cause this, and they almost
	            // certainly didn't intend infinite re-evaluations). So, for predictability, we simply prevent ko.computeds from causing
	            // their own re-evaluation. Further discussion at https://github.com/SteveSanderson/knockout/pull/387
	            return;
	        }

	        // Do not evaluate (and possibly capture new dependencies) if disposed
	        if (_isDisposed) {
	            return;
	        }

	        if (disposeWhen && disposeWhen()) {
	            // See comment below about _suppressDisposalUntilDisposeWhenReturnsFalse
	            if (!_suppressDisposalUntilDisposeWhenReturnsFalse) {
	                dispose();
	                return;
	            }
	        } else {
	            // It just did return false, so we can stop suppressing now
	            _suppressDisposalUntilDisposeWhenReturnsFalse = false;
	        }

	        _isBeingEvaluated = true;

	        try {
	            // Initially, we assume that none of the subscriptions are still being used (i.e., all are candidates for disposal).
	            // Then, during evaluation, we cross off any that are in fact still being used.
	            var disposalCandidates = dependencyTracking,
	                disposalCount = _dependenciesCount,
	                isInitial = pure ? undefined : !_dependenciesCount;   // If we're evaluating when there are no previous dependencies, it must be the first time

	            ko.dependencyDetection.begin({
	                callback: function(subscribable, id) {
	                    if (!_isDisposed) {
	                        if (disposalCount && disposalCandidates[id]) {
	                            // Don't want to dispose this subscription, as it's still being used
	                            addDependencyTracking(id, subscribable, disposalCandidates[id]);
	                            delete disposalCandidates[id];
	                            --disposalCount;
	                        } else if (!dependencyTracking[id]) {
	                            // Brand new subscription - add it
	                            addDependencyTracking(id, subscribable, isSleeping ? { _target: subscribable } : subscribable.subscribe(evaluatePossiblyAsync));
	                        }
	                    }
	                },
	                computed: dependentObservable,
	                isInitial: isInitial
	            });

	            dependencyTracking = {};
	            _dependenciesCount = 0;

	            try {
	                var newValue = evaluatorFunctionTarget ? readFunction.call(evaluatorFunctionTarget) : readFunction();

	            } finally {
	                ko.dependencyDetection.end();

	                // For each subscription no longer being used, remove it from the active subscriptions list and dispose it
	                if (disposalCount && !isSleeping) {
	                    ko.utils.objectForEach(disposalCandidates, function(id, toDispose) {
	                        if (toDispose.dispose)
	                            toDispose.dispose();
	                    });
	                }

	                _needsEvaluation = false;
	            }

	            if (dependentObservable.isDifferent(_latestValue, newValue)) {
	                if (!isSleeping) {
	                    notify(_latestValue, "beforeChange");
	                }

	                _latestValue = newValue;
	                if (DEBUG) dependentObservable._latestValue = _latestValue;

	                if (isSleeping) {
	                    dependentObservable.updateVersion();
	                } else if (notifyChange) {
	                    notify(_latestValue);
	                }
	            }

	            if (isInitial) {
	                notify(_latestValue, "awake");
	            }
	        } finally {
	            _isBeingEvaluated = false;
	        }

	        if (!_dependenciesCount)
	            dispose();
	    }

	    function dependentObservable() {
	        if (arguments.length > 0) {
	            if (typeof writeFunction === "function") {
	                // Writing a value
	                writeFunction.apply(evaluatorFunctionTarget, arguments);
	            } else {
	                throw new Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.");
	            }
	            return this; // Permits chained assignments
	        } else {
	            // Reading the value
	            ko.dependencyDetection.registerDependency(dependentObservable);
	            if (_needsEvaluation || (isSleeping && haveDependenciesChanged())) {
	                evaluateImmediate();
	            }
	            return _latestValue;
	        }
	    }

	    function peek() {
	        // Peek won't re-evaluate, except while the computed is sleeping or to get the initial value when "deferEvaluation" is set.
	        if ((_needsEvaluation && !_dependenciesCount) || (isSleeping && haveDependenciesChanged())) {
	            evaluateImmediate();
	        }
	        return _latestValue;
	    }

	    function isActive() {
	        return _needsEvaluation || _dependenciesCount > 0;
	    }

	    function notify(value, event) {
	        dependentObservable["notifySubscribers"](value, event);
	    }

	    // By here, "options" is always non-null
	    var writeFunction = options["write"],
	        disposeWhenNodeIsRemoved = options["disposeWhenNodeIsRemoved"] || options.disposeWhenNodeIsRemoved || null,
	        disposeWhenOption = options["disposeWhen"] || options.disposeWhen,
	        disposeWhen = disposeWhenOption,
	        dispose = disposeComputed,
	        dependencyTracking = {},
	        _dependenciesCount = 0,
	        evaluationTimeoutInstance = null;

	    if (!evaluatorFunctionTarget)
	        evaluatorFunctionTarget = options["owner"];

	    ko.subscribable.call(dependentObservable);
	    ko.utils.setPrototypeOfOrExtend(dependentObservable, ko.dependentObservable['fn']);

	    dependentObservable.peek = peek;
	    dependentObservable.getDependenciesCount = function () { return _dependenciesCount; };
	    dependentObservable.hasWriteFunction = typeof writeFunction === "function";
	    dependentObservable.dispose = function () { dispose(); };
	    dependentObservable.isActive = isActive;

	    // Replace the limit function with one that delays evaluation as well.
	    var originalLimit = dependentObservable.limit;
	    dependentObservable.limit = function(limitFunction) {
	        originalLimit.call(dependentObservable, limitFunction);
	        dependentObservable._evalRateLimited = function() {
	            dependentObservable._rateLimitedBeforeChange(_latestValue);

	            _needsEvaluation = true;    // Mark as dirty

	            // Pass the observable to the rate-limit code, which will access it when
	            // it's time to do the notification.
	            dependentObservable._rateLimitedChange(dependentObservable);
	        }
	    };

	    if (options['pure']) {
	        pure = true;
	        isSleeping = true;     // Starts off sleeping; will awake on the first subscription
	        dependentObservable.beforeSubscriptionAdd = function (event) {
	            // If asleep, wake up the computed by subscribing to any dependencies.
	            if (!_isDisposed && isSleeping && event == 'change') {
	                isSleeping = false;
	                if (_needsEvaluation || haveDependenciesChanged()) {
	                    dependencyTracking = null;
	                    _dependenciesCount = 0;
	                    _needsEvaluation = true;
	                    evaluateImmediate();
	                } else {
	                    // First put the dependencies in order
	                    var dependeciesOrder = [];
	                    ko.utils.objectForEach(dependencyTracking, function (id, dependency) {
	                        dependeciesOrder[dependency._order] = id;
	                    });
	                    // Next, subscribe to each one
	                    ko.utils.arrayForEach(dependeciesOrder, function(id, order) {
	                        var dependency = dependencyTracking[id],
	                            subscription = dependency._target.subscribe(evaluatePossiblyAsync);
	                        subscription._order = order;
	                        subscription._version = dependency._version;
	                        dependencyTracking[id] = subscription;
	                    });
	                }
	                if (!_isDisposed) {     // test since evaluating could trigger disposal
	                    notify(_latestValue, "awake");
	                }
	            }
	        };

	        dependentObservable.afterSubscriptionRemove = function (event) {
	            if (!_isDisposed && event == 'change' && !dependentObservable.hasSubscriptionsForEvent('change')) {
	                ko.utils.objectForEach(dependencyTracking, function (id, dependency) {
	                    if (dependency.dispose) {
	                        dependencyTracking[id] = {
	                            _target: dependency._target,
	                            _order: dependency._order,
	                            _version: dependency._version
	                        };
	                        dependency.dispose();
	                    }
	                });
	                isSleeping = true;
	                notify(undefined, "asleep");
	            }
	        };

	        // Because a pure computed is not automatically updated while it is sleeping, we can't
	        // simply return the version number. Instead, we check if any of the dependencies have
	        // changed and conditionally re-evaluate the computed observable.
	        dependentObservable._originalGetVersion = dependentObservable.getVersion;
	        dependentObservable.getVersion = function () {
	            if (isSleeping && (_needsEvaluation || haveDependenciesChanged())) {
	                evaluateImmediate();
	            }
	            return dependentObservable._originalGetVersion();
	        };
	    } else if (options['deferEvaluation']) {
	        // This will force a computed with deferEvaluation to evaluate when the first subscriptions is registered.
	        dependentObservable.beforeSubscriptionAdd = function (event) {
	            if (event == 'change' || event == 'beforeChange') {
	                peek();
	            }
	        }
	    }

	    ko.exportProperty(dependentObservable, 'peek', dependentObservable.peek);
	    ko.exportProperty(dependentObservable, 'dispose', dependentObservable.dispose);
	    ko.exportProperty(dependentObservable, 'isActive', dependentObservable.isActive);
	    ko.exportProperty(dependentObservable, 'getDependenciesCount', dependentObservable.getDependenciesCount);

	    // Add a "disposeWhen" callback that, on each evaluation, disposes if the node was removed without using ko.removeNode.
	    if (disposeWhenNodeIsRemoved) {
	        // Since this computed is associated with a DOM node, and we don't want to dispose the computed
	        // until the DOM node is *removed* from the document (as opposed to never having been in the document),
	        // we'll prevent disposal until "disposeWhen" first returns false.
	        _suppressDisposalUntilDisposeWhenReturnsFalse = true;

	        // Only watch for the node's disposal if the value really is a node. It might not be,
	        // e.g., { disposeWhenNodeIsRemoved: true } can be used to opt into the "only dispose
	        // after first false result" behaviour even if there's no specific node to watch. This
	        // technique is intended for KO's internal use only and shouldn't be documented or used
	        // by application code, as it's likely to change in a future version of KO.
	        if (disposeWhenNodeIsRemoved.nodeType) {
	            disposeWhen = function () {
	                return !ko.utils.domNodeIsAttachedToDocument(disposeWhenNodeIsRemoved) || (disposeWhenOption && disposeWhenOption());
	            };
	        }
	    }

	    // Evaluate, unless sleeping or deferEvaluation is true
	    if (!isSleeping && !options['deferEvaluation'])
	        evaluateImmediate();

	    // Attach a DOM node disposal callback so that the computed will be proactively disposed as soon as the node is
	    // removed using ko.removeNode. But skip if isActive is false (there will never be any dependencies to dispose).
	    if (disposeWhenNodeIsRemoved && isActive() && disposeWhenNodeIsRemoved.nodeType) {
	        dispose = function() {
	            ko.utils.domNodeDisposal.removeDisposeCallback(disposeWhenNodeIsRemoved, dispose);
	            disposeComputed();
	        };
	        ko.utils.domNodeDisposal.addDisposeCallback(disposeWhenNodeIsRemoved, dispose);
	    }

	    return dependentObservable;
	};

	ko.isComputed = function(instance) {
	    return ko.hasPrototype(instance, ko.dependentObservable);
	};

	var protoProp = ko.observable.protoProperty; // == "__ko_proto__"
	ko.dependentObservable[protoProp] = ko.observable;

	ko.dependentObservable['fn'] = {
	    "equalityComparer": valuesArePrimitiveAndEqual
	};
	ko.dependentObservable['fn'][protoProp] = ko.dependentObservable;

	// Note that for browsers that don't support proto assignment, the
	// inheritance chain is created manually in the ko.dependentObservable constructor
	if (ko.utils.canSetPrototype) {
	    ko.utils.setPrototypeOf(ko.dependentObservable['fn'], ko.subscribable['fn']);
	}

	ko.exportSymbol('dependentObservable', ko.dependentObservable);
	ko.exportSymbol('computed', ko.dependentObservable); // Make "ko.computed" an alias for "ko.dependentObservable"
	ko.exportSymbol('isComputed', ko.isComputed);

	ko.pureComputed = function (evaluatorFunctionOrOptions, evaluatorFunctionTarget) {
	    if (typeof evaluatorFunctionOrOptions === 'function') {
	        return ko.computed(evaluatorFunctionOrOptions, evaluatorFunctionTarget, {'pure':true});
	    } else {
	        evaluatorFunctionOrOptions = ko.utils.extend({}, evaluatorFunctionOrOptions);   // make a copy of the parameter object
	        evaluatorFunctionOrOptions['pure'] = true;
	        return ko.computed(evaluatorFunctionOrOptions, evaluatorFunctionTarget);
	    }
	}
	ko.exportSymbol('pureComputed', ko.pureComputed);

	(function() {
	    var maxNestedObservableDepth = 10; // Escape the (unlikely) pathalogical case where an observable's current value is itself (or similar reference cycle)

	    ko.toJS = function(rootObject) {
	        if (arguments.length == 0)
	            throw new Error("When calling ko.toJS, pass the object you want to convert.");

	        // We just unwrap everything at every level in the object graph
	        return mapJsObjectGraph(rootObject, function(valueToMap) {
	            // Loop because an observable's value might in turn be another observable wrapper
	            for (var i = 0; ko.isObservable(valueToMap) && (i < maxNestedObservableDepth); i++)
	                valueToMap = valueToMap();
	            return valueToMap;
	        });
	    };

	    ko.toJSON = function(rootObject, replacer, space) {     // replacer and space are optional
	        var plainJavaScriptObject = ko.toJS(rootObject);
	        return ko.utils.stringifyJson(plainJavaScriptObject, replacer, space);
	    };

	    function mapJsObjectGraph(rootObject, mapInputCallback, visitedObjects) {
	        visitedObjects = visitedObjects || new objectLookup();

	        rootObject = mapInputCallback(rootObject);
	        var canHaveProperties = (typeof rootObject == "object") && (rootObject !== null) && (rootObject !== undefined) && (!(rootObject instanceof Date)) && (!(rootObject instanceof String)) && (!(rootObject instanceof Number)) && (!(rootObject instanceof Boolean));
	        if (!canHaveProperties)
	            return rootObject;

	        var outputProperties = rootObject instanceof Array ? [] : {};
	        visitedObjects.save(rootObject, outputProperties);

	        visitPropertiesOrArrayEntries(rootObject, function(indexer) {
	            var propertyValue = mapInputCallback(rootObject[indexer]);

	            switch (typeof propertyValue) {
	                case "boolean":
	                case "number":
	                case "string":
	                case "function":
	                    outputProperties[indexer] = propertyValue;
	                    break;
	                case "object":
	                case "undefined":
	                    var previouslyMappedValue = visitedObjects.get(propertyValue);
	                    outputProperties[indexer] = (previouslyMappedValue !== undefined)
	                        ? previouslyMappedValue
	                        : mapJsObjectGraph(propertyValue, mapInputCallback, visitedObjects);
	                    break;
	            }
	        });

	        return outputProperties;
	    }

	    function visitPropertiesOrArrayEntries(rootObject, visitorCallback) {
	        if (rootObject instanceof Array) {
	            for (var i = 0; i < rootObject.length; i++)
	                visitorCallback(i);

	            // For arrays, also respect toJSON property for custom mappings (fixes #278)
	            if (typeof rootObject['toJSON'] == 'function')
	                visitorCallback('toJSON');
	        } else {
	            for (var propertyName in rootObject) {
	                visitorCallback(propertyName);
	            }
	        }
	    };

	    function objectLookup() {
	        this.keys = [];
	        this.values = [];
	    };

	    objectLookup.prototype = {
	        constructor: objectLookup,
	        save: function(key, value) {
	            var existingIndex = ko.utils.arrayIndexOf(this.keys, key);
	            if (existingIndex >= 0)
	                this.values[existingIndex] = value;
	            else {
	                this.keys.push(key);
	                this.values.push(value);
	            }
	        },
	        get: function(key) {
	            var existingIndex = ko.utils.arrayIndexOf(this.keys, key);
	            return (existingIndex >= 0) ? this.values[existingIndex] : undefined;
	        }
	    };
	})();

	ko.exportSymbol('toJS', ko.toJS);
	ko.exportSymbol('toJSON', ko.toJSON);
	(function () {
	    var hasDomDataExpandoProperty = '__ko__hasDomDataOptionValue__';

	    // Normally, SELECT elements and their OPTIONs can only take value of type 'string' (because the values
	    // are stored on DOM attributes). ko.selectExtensions provides a way for SELECTs/OPTIONs to have values
	    // that are arbitrary objects. This is very convenient when implementing things like cascading dropdowns.
	    ko.selectExtensions = {
	        readValue : function(element) {
	            switch (ko.utils.tagNameLower(element)) {
	                case 'option':
	                    if (element[hasDomDataExpandoProperty] === true)
	                        return ko.utils.domData.get(element, ko.bindingHandlers.options.optionValueDomDataKey);
	                    return ko.utils.ieVersion <= 7
	                        ? (element.getAttributeNode('value') && element.getAttributeNode('value').specified ? element.value : element.text)
	                        : element.value;
	                case 'select':
	                    return element.selectedIndex >= 0 ? ko.selectExtensions.readValue(element.options[element.selectedIndex]) : undefined;
	                default:
	                    return element.value;
	            }
	        },

	        writeValue: function(element, value, allowUnset) {
	            switch (ko.utils.tagNameLower(element)) {
	                case 'option':
	                    switch(typeof value) {
	                        case "string":
	                            ko.utils.domData.set(element, ko.bindingHandlers.options.optionValueDomDataKey, undefined);
	                            if (hasDomDataExpandoProperty in element) { // IE <= 8 throws errors if you delete non-existent properties from a DOM node
	                                delete element[hasDomDataExpandoProperty];
	                            }
	                            element.value = value;
	                            break;
	                        default:
	                            // Store arbitrary object using DomData
	                            ko.utils.domData.set(element, ko.bindingHandlers.options.optionValueDomDataKey, value);
	                            element[hasDomDataExpandoProperty] = true;

	                            // Special treatment of numbers is just for backward compatibility. KO 1.2.1 wrote numerical values to element.value.
	                            element.value = typeof value === "number" ? value : "";
	                            break;
	                    }
	                    break;
	                case 'select':
	                    if (value === "" || value === null)       // A blank string or null value will select the caption
	                        value = undefined;
	                    var selection = -1;
	                    for (var i = 0, n = element.options.length, optionValue; i < n; ++i) {
	                        optionValue = ko.selectExtensions.readValue(element.options[i]);
	                        // Include special check to handle selecting a caption with a blank string value
	                        if (optionValue == value || (optionValue == "" && value === undefined)) {
	                            selection = i;
	                            break;
	                        }
	                    }
	                    if (allowUnset || selection >= 0 || (value === undefined && element.size > 1)) {
	                        element.selectedIndex = selection;
	                    }
	                    break;
	                default:
	                    if ((value === null) || (value === undefined))
	                        value = "";
	                    element.value = value;
	                    break;
	            }
	        }
	    };
	})();

	ko.exportSymbol('selectExtensions', ko.selectExtensions);
	ko.exportSymbol('selectExtensions.readValue', ko.selectExtensions.readValue);
	ko.exportSymbol('selectExtensions.writeValue', ko.selectExtensions.writeValue);
	ko.expressionRewriting = (function () {
	    var javaScriptReservedWords = ["true", "false", "null", "undefined"];

	    // Matches something that can be assigned to--either an isolated identifier or something ending with a property accessor
	    // This is designed to be simple and avoid false negatives, but could produce false positives (e.g., a+b.c).
	    // This also will not properly handle nested brackets (e.g., obj1[obj2['prop']]; see #911).
	    var javaScriptAssignmentTarget = /^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i;

	    function getWriteableValue(expression) {
	        if (ko.utils.arrayIndexOf(javaScriptReservedWords, expression) >= 0)
	            return false;
	        var match = expression.match(javaScriptAssignmentTarget);
	        return match === null ? false : match[1] ? ('Object(' + match[1] + ')' + match[2]) : expression;
	    }

	    // The following regular expressions will be used to split an object-literal string into tokens

	        // These two match strings, either with double quotes or single quotes
	    var stringDouble = '"(?:[^"\\\\]|\\\\.)*"',
	        stringSingle = "'(?:[^'\\\\]|\\\\.)*'",
	        // Matches a regular expression (text enclosed by slashes), but will also match sets of divisions
	        // as a regular expression (this is handled by the parsing loop below).
	        stringRegexp = '/(?:[^/\\\\]|\\\\.)*/\w*',
	        // These characters have special meaning to the parser and must not appear in the middle of a
	        // token, except as part of a string.
	        specials = ',"\'{}()/:[\\]',
	        // Match text (at least two characters) that does not contain any of the above special characters,
	        // although some of the special characters are allowed to start it (all but the colon and comma).
	        // The text can contain spaces, but leading or trailing spaces are skipped.
	        everyThingElse = '[^\\s:,/][^' + specials + ']*[^\\s' + specials + ']',
	        // Match any non-space character not matched already. This will match colons and commas, since they're
	        // not matched by "everyThingElse", but will also match any other single character that wasn't already
	        // matched (for example: in "a: 1, b: 2", each of the non-space characters will be matched by oneNotSpace).
	        oneNotSpace = '[^\\s]',

	        // Create the actual regular expression by or-ing the above strings. The order is important.
	        bindingToken = RegExp(stringDouble + '|' + stringSingle + '|' + stringRegexp + '|' + everyThingElse + '|' + oneNotSpace, 'g'),

	        // Match end of previous token to determine whether a slash is a division or regex.
	        divisionLookBehind = /[\])"'A-Za-z0-9_$]+$/,
	        keywordRegexLookBehind = {'in':1,'return':1,'typeof':1};

	    function parseObjectLiteral(objectLiteralString) {
	        // Trim leading and trailing spaces from the string
	        var str = ko.utils.stringTrim(objectLiteralString);

	        // Trim braces '{' surrounding the whole object literal
	        if (str.charCodeAt(0) === 123) str = str.slice(1, -1);

	        // Split into tokens
	        var result = [], toks = str.match(bindingToken), key, values = [], depth = 0;

	        if (toks) {
	            // Append a comma so that we don't need a separate code block to deal with the last item
	            toks.push(',');

	            for (var i = 0, tok; tok = toks[i]; ++i) {
	                var c = tok.charCodeAt(0);
	                // A comma signals the end of a key/value pair if depth is zero
	                if (c === 44) { // ","
	                    if (depth <= 0) {
	                        result.push((key && values.length) ? {key: key, value: values.join('')} : {'unknown': key || values.join('')});
	                        key = depth = 0;
	                        values = [];
	                        continue;
	                    }
	                // Simply skip the colon that separates the name and value
	                } else if (c === 58) { // ":"
	                    if (!depth && !key && values.length === 1) {
	                        key = values.pop();
	                        continue;
	                    }
	                // A set of slashes is initially matched as a regular expression, but could be division
	                } else if (c === 47 && i && tok.length > 1) {  // "/"
	                    // Look at the end of the previous token to determine if the slash is actually division
	                    var match = toks[i-1].match(divisionLookBehind);
	                    if (match && !keywordRegexLookBehind[match[0]]) {
	                        // The slash is actually a division punctuator; re-parse the remainder of the string (not including the slash)
	                        str = str.substr(str.indexOf(tok) + 1);
	                        toks = str.match(bindingToken);
	                        toks.push(',');
	                        i = -1;
	                        // Continue with just the slash
	                        tok = '/';
	                    }
	                // Increment depth for parentheses, braces, and brackets so that interior commas are ignored
	                } else if (c === 40 || c === 123 || c === 91) { // '(', '{', '['
	                    ++depth;
	                } else if (c === 41 || c === 125 || c === 93) { // ')', '}', ']'
	                    --depth;
	                // The key will be the first token; if it's a string, trim the quotes
	                } else if (!key && !values.length && (c === 34 || c === 39)) { // '"', "'"
	                    tok = tok.slice(1, -1);
	                }
	                values.push(tok);
	            }
	        }
	        return result;
	    }

	    // Two-way bindings include a write function that allow the handler to update the value even if it's not an observable.
	    var twoWayBindings = {};

	    function preProcessBindings(bindingsStringOrKeyValueArray, bindingOptions) {
	        bindingOptions = bindingOptions || {};

	        function processKeyValue(key, val) {
	            var writableVal;
	            function callPreprocessHook(obj) {
	                return (obj && obj['preprocess']) ? (val = obj['preprocess'](val, key, processKeyValue)) : true;
	            }
	            if (!bindingParams) {
	                if (!callPreprocessHook(ko['getBindingHandler'](key)))
	                    return;

	                if (twoWayBindings[key] && (writableVal = getWriteableValue(val))) {
	                    // For two-way bindings, provide a write method in case the value
	                    // isn't a writable observable.
	                    propertyAccessorResultStrings.push("'" + key + "':function(_z){" + writableVal + "=_z}");
	                }
	            }
	            // Values are wrapped in a function so that each value can be accessed independently
	            if (makeValueAccessors) {
	                val = 'function(){return ' + val + ' }';
	            }
	            resultStrings.push("'" + key + "':" + val);
	        }

	        var resultStrings = [],
	            propertyAccessorResultStrings = [],
	            makeValueAccessors = bindingOptions['valueAccessors'],
	            bindingParams = bindingOptions['bindingParams'],
	            keyValueArray = typeof bindingsStringOrKeyValueArray === "string" ?
	                parseObjectLiteral(bindingsStringOrKeyValueArray) : bindingsStringOrKeyValueArray;

	        ko.utils.arrayForEach(keyValueArray, function(keyValue) {
	            processKeyValue(keyValue.key || keyValue['unknown'], keyValue.value);
	        });

	        if (propertyAccessorResultStrings.length)
	            processKeyValue('_ko_property_writers', "{" + propertyAccessorResultStrings.join(",") + " }");

	        return resultStrings.join(",");
	    }

	    return {
	        bindingRewriteValidators: [],

	        twoWayBindings: twoWayBindings,

	        parseObjectLiteral: parseObjectLiteral,

	        preProcessBindings: preProcessBindings,

	        keyValueArrayContainsKey: function(keyValueArray, key) {
	            for (var i = 0; i < keyValueArray.length; i++)
	                if (keyValueArray[i]['key'] == key)
	                    return true;
	            return false;
	        },

	        // Internal, private KO utility for updating model properties from within bindings
	        // property:            If the property being updated is (or might be) an observable, pass it here
	        //                      If it turns out to be a writable observable, it will be written to directly
	        // allBindings:         An object with a get method to retrieve bindings in the current execution context.
	        //                      This will be searched for a '_ko_property_writers' property in case you're writing to a non-observable
	        // key:                 The key identifying the property to be written. Example: for { hasFocus: myValue }, write to 'myValue' by specifying the key 'hasFocus'
	        // value:               The value to be written
	        // checkIfDifferent:    If true, and if the property being written is a writable observable, the value will only be written if
	        //                      it is !== existing value on that writable observable
	        writeValueToProperty: function(property, allBindings, key, value, checkIfDifferent) {
	            if (!property || !ko.isObservable(property)) {
	                var propWriters = allBindings.get('_ko_property_writers');
	                if (propWriters && propWriters[key])
	                    propWriters[key](value);
	            } else if (ko.isWriteableObservable(property) && (!checkIfDifferent || property.peek() !== value)) {
	                property(value);
	            }
	        }
	    };
	})();

	ko.exportSymbol('expressionRewriting', ko.expressionRewriting);
	ko.exportSymbol('expressionRewriting.bindingRewriteValidators', ko.expressionRewriting.bindingRewriteValidators);
	ko.exportSymbol('expressionRewriting.parseObjectLiteral', ko.expressionRewriting.parseObjectLiteral);
	ko.exportSymbol('expressionRewriting.preProcessBindings', ko.expressionRewriting.preProcessBindings);

	// Making bindings explicitly declare themselves as "two way" isn't ideal in the long term (it would be better if
	// all bindings could use an official 'property writer' API without needing to declare that they might). However,
	// since this is not, and has never been, a public API (_ko_property_writers was never documented), it's acceptable
	// as an internal implementation detail in the short term.
	// For those developers who rely on _ko_property_writers in their custom bindings, we expose _twoWayBindings as an
	// undocumented feature that makes it relatively easy to upgrade to KO 3.0. However, this is still not an official
	// public API, and we reserve the right to remove it at any time if we create a real public property writers API.
	ko.exportSymbol('expressionRewriting._twoWayBindings', ko.expressionRewriting.twoWayBindings);

	// For backward compatibility, define the following aliases. (Previously, these function names were misleading because
	// they referred to JSON specifically, even though they actually work with arbitrary JavaScript object literal expressions.)
	ko.exportSymbol('jsonExpressionRewriting', ko.expressionRewriting);
	ko.exportSymbol('jsonExpressionRewriting.insertPropertyAccessorsIntoJson', ko.expressionRewriting.preProcessBindings);
	(function() {
	    // "Virtual elements" is an abstraction on top of the usual DOM API which understands the notion that comment nodes
	    // may be used to represent hierarchy (in addition to the DOM's natural hierarchy).
	    // If you call the DOM-manipulating functions on ko.virtualElements, you will be able to read and write the state
	    // of that virtual hierarchy
	    //
	    // The point of all this is to support containerless templates (e.g., <!-- ko foreach:someCollection -->blah<!-- /ko -->)
	    // without having to scatter special cases all over the binding and templating code.

	    // IE 9 cannot reliably read the "nodeValue" property of a comment node (see https://github.com/SteveSanderson/knockout/issues/186)
	    // but it does give them a nonstandard alternative property called "text" that it can read reliably. Other browsers don't have that property.
	    // So, use node.text where available, and node.nodeValue elsewhere
	    var commentNodesHaveTextProperty = document && document.createComment("test").text === "<!--test-->";

	    var startCommentRegex = commentNodesHaveTextProperty ? /^<!--\s*ko(?:\s+([\s\S]+))?\s*-->$/ : /^\s*ko(?:\s+([\s\S]+))?\s*$/;
	    var endCommentRegex =   commentNodesHaveTextProperty ? /^<!--\s*\/ko\s*-->$/ : /^\s*\/ko\s*$/;
	    var htmlTagsWithOptionallyClosingChildren = { 'ul': true, 'ol': true };

	    function isStartComment(node) {
	        return (node.nodeType == 8) && startCommentRegex.test(commentNodesHaveTextProperty ? node.text : node.nodeValue);
	    }

	    function isEndComment(node) {
	        return (node.nodeType == 8) && endCommentRegex.test(commentNodesHaveTextProperty ? node.text : node.nodeValue);
	    }

	    function getVirtualChildren(startComment, allowUnbalanced) {
	        var currentNode = startComment;
	        var depth = 1;
	        var children = [];
	        while (currentNode = currentNode.nextSibling) {
	            if (isEndComment(currentNode)) {
	                depth--;
	                if (depth === 0)
	                    return children;
	            }

	            children.push(currentNode);

	            if (isStartComment(currentNode))
	                depth++;
	        }
	        if (!allowUnbalanced)
	            throw new Error("Cannot find closing comment tag to match: " + startComment.nodeValue);
	        return null;
	    }

	    function getMatchingEndComment(startComment, allowUnbalanced) {
	        var allVirtualChildren = getVirtualChildren(startComment, allowUnbalanced);
	        if (allVirtualChildren) {
	            if (allVirtualChildren.length > 0)
	                return allVirtualChildren[allVirtualChildren.length - 1].nextSibling;
	            return startComment.nextSibling;
	        } else
	            return null; // Must have no matching end comment, and allowUnbalanced is true
	    }

	    function getUnbalancedChildTags(node) {
	        // e.g., from <div>OK</div><!-- ko blah --><span>Another</span>, returns: <!-- ko blah --><span>Another</span>
	        //       from <div>OK</div><!-- /ko --><!-- /ko -->,             returns: <!-- /ko --><!-- /ko -->
	        var childNode = node.firstChild, captureRemaining = null;
	        if (childNode) {
	            do {
	                if (captureRemaining)                   // We already hit an unbalanced node and are now just scooping up all subsequent nodes
	                    captureRemaining.push(childNode);
	                else if (isStartComment(childNode)) {
	                    var matchingEndComment = getMatchingEndComment(childNode, /* allowUnbalanced: */ true);
	                    if (matchingEndComment)             // It's a balanced tag, so skip immediately to the end of this virtual set
	                        childNode = matchingEndComment;
	                    else
	                        captureRemaining = [childNode]; // It's unbalanced, so start capturing from this point
	                } else if (isEndComment(childNode)) {
	                    captureRemaining = [childNode];     // It's unbalanced (if it wasn't, we'd have skipped over it already), so start capturing
	                }
	            } while (childNode = childNode.nextSibling);
	        }
	        return captureRemaining;
	    }

	    ko.virtualElements = {
	        allowedBindings: {},

	        childNodes: function(node) {
	            return isStartComment(node) ? getVirtualChildren(node) : node.childNodes;
	        },

	        emptyNode: function(node) {
	            if (!isStartComment(node))
	                ko.utils.emptyDomNode(node);
	            else {
	                var virtualChildren = ko.virtualElements.childNodes(node);
	                for (var i = 0, j = virtualChildren.length; i < j; i++)
	                    ko.removeNode(virtualChildren[i]);
	            }
	        },

	        setDomNodeChildren: function(node, childNodes) {
	            if (!isStartComment(node))
	                ko.utils.setDomNodeChildren(node, childNodes);
	            else {
	                ko.virtualElements.emptyNode(node);
	                var endCommentNode = node.nextSibling; // Must be the next sibling, as we just emptied the children
	                for (var i = 0, j = childNodes.length; i < j; i++)
	                    endCommentNode.parentNode.insertBefore(childNodes[i], endCommentNode);
	            }
	        },

	        prepend: function(containerNode, nodeToPrepend) {
	            if (!isStartComment(containerNode)) {
	                if (containerNode.firstChild)
	                    containerNode.insertBefore(nodeToPrepend, containerNode.firstChild);
	                else
	                    containerNode.appendChild(nodeToPrepend);
	            } else {
	                // Start comments must always have a parent and at least one following sibling (the end comment)
	                containerNode.parentNode.insertBefore(nodeToPrepend, containerNode.nextSibling);
	            }
	        },

	        insertAfter: function(containerNode, nodeToInsert, insertAfterNode) {
	            if (!insertAfterNode) {
	                ko.virtualElements.prepend(containerNode, nodeToInsert);
	            } else if (!isStartComment(containerNode)) {
	                // Insert after insertion point
	                if (insertAfterNode.nextSibling)
	                    containerNode.insertBefore(nodeToInsert, insertAfterNode.nextSibling);
	                else
	                    containerNode.appendChild(nodeToInsert);
	            } else {
	                // Children of start comments must always have a parent and at least one following sibling (the end comment)
	                containerNode.parentNode.insertBefore(nodeToInsert, insertAfterNode.nextSibling);
	            }
	        },

	        firstChild: function(node) {
	            if (!isStartComment(node))
	                return node.firstChild;
	            if (!node.nextSibling || isEndComment(node.nextSibling))
	                return null;
	            return node.nextSibling;
	        },

	        nextSibling: function(node) {
	            if (isStartComment(node))
	                node = getMatchingEndComment(node);
	            if (node.nextSibling && isEndComment(node.nextSibling))
	                return null;
	            return node.nextSibling;
	        },

	        hasBindingValue: isStartComment,

	        virtualNodeBindingValue: function(node) {
	            var regexMatch = (commentNodesHaveTextProperty ? node.text : node.nodeValue).match(startCommentRegex);
	            return regexMatch ? regexMatch[1] : null;
	        },

	        normaliseVirtualElementDomStructure: function(elementVerified) {
	            // Workaround for https://github.com/SteveSanderson/knockout/issues/155
	            // (IE <= 8 or IE 9 quirks mode parses your HTML weirdly, treating closing </li> tags as if they don't exist, thereby moving comment nodes
	            // that are direct descendants of <ul> into the preceding <li>)
	            if (!htmlTagsWithOptionallyClosingChildren[ko.utils.tagNameLower(elementVerified)])
	                return;

	            // Scan immediate children to see if they contain unbalanced comment tags. If they do, those comment tags
	            // must be intended to appear *after* that child, so move them there.
	            var childNode = elementVerified.firstChild;
	            if (childNode) {
	                do {
	                    if (childNode.nodeType === 1) {
	                        var unbalancedTags = getUnbalancedChildTags(childNode);
	                        if (unbalancedTags) {
	                            // Fix up the DOM by moving the unbalanced tags to where they most likely were intended to be placed - *after* the child
	                            var nodeToInsertBefore = childNode.nextSibling;
	                            for (var i = 0; i < unbalancedTags.length; i++) {
	                                if (nodeToInsertBefore)
	                                    elementVerified.insertBefore(unbalancedTags[i], nodeToInsertBefore);
	                                else
	                                    elementVerified.appendChild(unbalancedTags[i]);
	                            }
	                        }
	                    }
	                } while (childNode = childNode.nextSibling);
	            }
	        }
	    };
	})();
	ko.exportSymbol('virtualElements', ko.virtualElements);
	ko.exportSymbol('virtualElements.allowedBindings', ko.virtualElements.allowedBindings);
	ko.exportSymbol('virtualElements.emptyNode', ko.virtualElements.emptyNode);
	//ko.exportSymbol('virtualElements.firstChild', ko.virtualElements.firstChild);     // firstChild is not minified
	ko.exportSymbol('virtualElements.insertAfter', ko.virtualElements.insertAfter);
	//ko.exportSymbol('virtualElements.nextSibling', ko.virtualElements.nextSibling);   // nextSibling is not minified
	ko.exportSymbol('virtualElements.prepend', ko.virtualElements.prepend);
	ko.exportSymbol('virtualElements.setDomNodeChildren', ko.virtualElements.setDomNodeChildren);
	(function() {
	    var defaultBindingAttributeName = "data-bind";

	    ko.bindingProvider = function() {
	        this.bindingCache = {};
	    };

	    ko.utils.extend(ko.bindingProvider.prototype, {
	        'nodeHasBindings': function(node) {
	            switch (node.nodeType) {
	                case 1: // Element
	                    return node.getAttribute(defaultBindingAttributeName) != null
	                        || ko.components['getComponentNameForNode'](node);
	                case 8: // Comment node
	                    return ko.virtualElements.hasBindingValue(node);
	                default: return false;
	            }
	        },

	        'getBindings': function(node, bindingContext) {
	            var bindingsString = this['getBindingsString'](node, bindingContext),
	                parsedBindings = bindingsString ? this['parseBindingsString'](bindingsString, bindingContext, node) : null;
	            return ko.components.addBindingsForCustomElement(parsedBindings, node, bindingContext, /* valueAccessors */ false);
	        },

	        'getBindingAccessors': function(node, bindingContext) {
	            var bindingsString = this['getBindingsString'](node, bindingContext),
	                parsedBindings = bindingsString ? this['parseBindingsString'](bindingsString, bindingContext, node, { 'valueAccessors': true }) : null;
	            return ko.components.addBindingsForCustomElement(parsedBindings, node, bindingContext, /* valueAccessors */ true);
	        },

	        // The following function is only used internally by this default provider.
	        // It's not part of the interface definition for a general binding provider.
	        'getBindingsString': function(node, bindingContext) {
	            switch (node.nodeType) {
	                case 1: return node.getAttribute(defaultBindingAttributeName);   // Element
	                case 8: return ko.virtualElements.virtualNodeBindingValue(node); // Comment node
	                default: return null;
	            }
	        },

	        // The following function is only used internally by this default provider.
	        // It's not part of the interface definition for a general binding provider.
	        'parseBindingsString': function(bindingsString, bindingContext, node, options) {
	            try {
	                var bindingFunction = createBindingsStringEvaluatorViaCache(bindingsString, this.bindingCache, options);
	                return bindingFunction(bindingContext, node);
	            } catch (ex) {
	                ex.message = "Unable to parse bindings.\nBindings value: " + bindingsString + "\nMessage: " + ex.message;
	                throw ex;
	            }
	        }
	    });

	    ko.bindingProvider['instance'] = new ko.bindingProvider();

	    function createBindingsStringEvaluatorViaCache(bindingsString, cache, options) {
	        var cacheKey = bindingsString + (options && options['valueAccessors'] || '');
	        return cache[cacheKey]
	            || (cache[cacheKey] = createBindingsStringEvaluator(bindingsString, options));
	    }

	    function createBindingsStringEvaluator(bindingsString, options) {
	        // Build the source for a function that evaluates "expression"
	        // For each scope variable, add an extra level of "with" nesting
	        // Example result: with(sc1) { with(sc0) { return (expression) } }
	        var rewrittenBindings = ko.expressionRewriting.preProcessBindings(bindingsString, options),
	            functionBody = "with($context){with($data||{}){return{" + rewrittenBindings + "}}}";
	        return new Function("$context", "$element", functionBody);
	    }
	})();

	ko.exportSymbol('bindingProvider', ko.bindingProvider);
	(function () {
	    ko.bindingHandlers = {};

	    // The following element types will not be recursed into during binding. In the future, we
	    // may consider adding <template> to this list, because such elements' contents are always
	    // intended to be bound in a different context from where they appear in the document.
	    var bindingDoesNotRecurseIntoElementTypes = {
	        // Don't want bindings that operate on text nodes to mutate <script> and <textarea> contents,
	        // because it's unexpected and a potential XSS issue
	        'script': true,
	        'textarea': true
	    };

	    // Use an overridable method for retrieving binding handlers so that a plugins may support dynamically created handlers
	    ko['getBindingHandler'] = function(bindingKey) {
	        return ko.bindingHandlers[bindingKey];
	    };

	    // The ko.bindingContext constructor is only called directly to create the root context. For child
	    // contexts, use bindingContext.createChildContext or bindingContext.extend.
	    ko.bindingContext = function(dataItemOrAccessor, parentContext, dataItemAlias, extendCallback) {

	        // The binding context object includes static properties for the current, parent, and root view models.
	        // If a view model is actually stored in an observable, the corresponding binding context object, and
	        // any child contexts, must be updated when the view model is changed.
	        function updateContext() {
	            // Most of the time, the context will directly get a view model object, but if a function is given,
	            // we call the function to retrieve the view model. If the function accesses any obsevables or returns
	            // an observable, the dependency is tracked, and those observables can later cause the binding
	            // context to be updated.
	            var dataItemOrObservable = isFunc ? dataItemOrAccessor() : dataItemOrAccessor,
	                dataItem = ko.utils.unwrapObservable(dataItemOrObservable);

	            if (parentContext) {
	                // When a "parent" context is given, register a dependency on the parent context. Thus whenever the
	                // parent context is updated, this context will also be updated.
	                if (parentContext._subscribable)
	                    parentContext._subscribable();

	                // Copy $root and any custom properties from the parent context
	                ko.utils.extend(self, parentContext);

	                // Because the above copy overwrites our own properties, we need to reset them.
	                // During the first execution, "subscribable" isn't set, so don't bother doing the update then.
	                if (subscribable) {
	                    self._subscribable = subscribable;
	                }
	            } else {
	                self['$parents'] = [];
	                self['$root'] = dataItem;

	                // Export 'ko' in the binding context so it will be available in bindings and templates
	                // even if 'ko' isn't exported as a global, such as when using an AMD loader.
	                // See https://github.com/SteveSanderson/knockout/issues/490
	                self['ko'] = ko;
	            }
	            self['$rawData'] = dataItemOrObservable;
	            self['$data'] = dataItem;
	            if (dataItemAlias)
	                self[dataItemAlias] = dataItem;

	            // The extendCallback function is provided when creating a child context or extending a context.
	            // It handles the specific actions needed to finish setting up the binding context. Actions in this
	            // function could also add dependencies to this binding context.
	            if (extendCallback)
	                extendCallback(self, parentContext, dataItem);

	            return self['$data'];
	        }
	        function disposeWhen() {
	            return nodes && !ko.utils.anyDomNodeIsAttachedToDocument(nodes);
	        }

	        var self = this,
	            isFunc = typeof(dataItemOrAccessor) == "function" && !ko.isObservable(dataItemOrAccessor),
	            nodes,
	            subscribable = ko.dependentObservable(updateContext, null, { disposeWhen: disposeWhen, disposeWhenNodeIsRemoved: true });

	        // At this point, the binding context has been initialized, and the "subscribable" computed observable is
	        // subscribed to any observables that were accessed in the process. If there is nothing to track, the
	        // computed will be inactive, and we can safely throw it away. If it's active, the computed is stored in
	        // the context object.
	        if (subscribable.isActive()) {
	            self._subscribable = subscribable;

	            // Always notify because even if the model ($data) hasn't changed, other context properties might have changed
	            subscribable['equalityComparer'] = null;

	            // We need to be able to dispose of this computed observable when it's no longer needed. This would be
	            // easy if we had a single node to watch, but binding contexts can be used by many different nodes, and
	            // we cannot assume that those nodes have any relation to each other. So instead we track any node that
	            // the context is attached to, and dispose the computed when all of those nodes have been cleaned.

	            // Add properties to *subscribable* instead of *self* because any properties added to *self* may be overwritten on updates
	            nodes = [];
	            subscribable._addNode = function(node) {
	                nodes.push(node);
	                ko.utils.domNodeDisposal.addDisposeCallback(node, function(node) {
	                    ko.utils.arrayRemoveItem(nodes, node);
	                    if (!nodes.length) {
	                        subscribable.dispose();
	                        self._subscribable = subscribable = undefined;
	                    }
	                });
	            };
	        }
	    }

	    // Extend the binding context hierarchy with a new view model object. If the parent context is watching
	    // any obsevables, the new child context will automatically get a dependency on the parent context.
	    // But this does not mean that the $data value of the child context will also get updated. If the child
	    // view model also depends on the parent view model, you must provide a function that returns the correct
	    // view model on each update.
	    ko.bindingContext.prototype['createChildContext'] = function (dataItemOrAccessor, dataItemAlias, extendCallback) {
	        return new ko.bindingContext(dataItemOrAccessor, this, dataItemAlias, function(self, parentContext) {
	            // Extend the context hierarchy by setting the appropriate pointers
	            self['$parentContext'] = parentContext;
	            self['$parent'] = parentContext['$data'];
	            self['$parents'] = (parentContext['$parents'] || []).slice(0);
	            self['$parents'].unshift(self['$parent']);
	            if (extendCallback)
	                extendCallback(self);
	        });
	    };

	    // Extend the binding context with new custom properties. This doesn't change the context hierarchy.
	    // Similarly to "child" contexts, provide a function here to make sure that the correct values are set
	    // when an observable view model is updated.
	    ko.bindingContext.prototype['extend'] = function(properties) {
	        // If the parent context references an observable view model, "_subscribable" will always be the
	        // latest view model object. If not, "_subscribable" isn't set, and we can use the static "$data" value.
	        return new ko.bindingContext(this._subscribable || this['$data'], this, null, function(self, parentContext) {
	            // This "child" context doesn't directly track a parent observable view model,
	            // so we need to manually set the $rawData value to match the parent.
	            self['$rawData'] = parentContext['$rawData'];
	            ko.utils.extend(self, typeof(properties) == "function" ? properties() : properties);
	        });
	    };

	    // Returns the valueAccesor function for a binding value
	    function makeValueAccessor(value) {
	        return function() {
	            return value;
	        };
	    }

	    // Returns the value of a valueAccessor function
	    function evaluateValueAccessor(valueAccessor) {
	        return valueAccessor();
	    }

	    // Given a function that returns bindings, create and return a new object that contains
	    // binding value-accessors functions. Each accessor function calls the original function
	    // so that it always gets the latest value and all dependencies are captured. This is used
	    // by ko.applyBindingsToNode and getBindingsAndMakeAccessors.
	    function makeAccessorsFromFunction(callback) {
	        return ko.utils.objectMap(ko.dependencyDetection.ignore(callback), function(value, key) {
	            return function() {
	                return callback()[key];
	            };
	        });
	    }

	    // Given a bindings function or object, create and return a new object that contains
	    // binding value-accessors functions. This is used by ko.applyBindingsToNode.
	    function makeBindingAccessors(bindings, context, node) {
	        if (typeof bindings === 'function') {
	            return makeAccessorsFromFunction(bindings.bind(null, context, node));
	        } else {
	            return ko.utils.objectMap(bindings, makeValueAccessor);
	        }
	    }

	    // This function is used if the binding provider doesn't include a getBindingAccessors function.
	    // It must be called with 'this' set to the provider instance.
	    function getBindingsAndMakeAccessors(node, context) {
	        return makeAccessorsFromFunction(this['getBindings'].bind(this, node, context));
	    }

	    function validateThatBindingIsAllowedForVirtualElements(bindingName) {
	        var validator = ko.virtualElements.allowedBindings[bindingName];
	        if (!validator)
	            throw new Error("The binding '" + bindingName + "' cannot be used with virtual elements")
	    }

	    function applyBindingsToDescendantsInternal (bindingContext, elementOrVirtualElement, bindingContextsMayDifferFromDomParentElement) {
	        var currentChild,
	            nextInQueue = ko.virtualElements.firstChild(elementOrVirtualElement),
	            provider = ko.bindingProvider['instance'],
	            preprocessNode = provider['preprocessNode'];

	        // Preprocessing allows a binding provider to mutate a node before bindings are applied to it. For example it's
	        // possible to insert new siblings after it, and/or replace the node with a different one. This can be used to
	        // implement custom binding syntaxes, such as {{ value }} for string interpolation, or custom element types that
	        // trigger insertion of <template> contents at that point in the document.
	        if (preprocessNode) {
	            while (currentChild = nextInQueue) {
	                nextInQueue = ko.virtualElements.nextSibling(currentChild);
	                preprocessNode.call(provider, currentChild);
	            }
	            // Reset nextInQueue for the next loop
	            nextInQueue = ko.virtualElements.firstChild(elementOrVirtualElement);
	        }

	        while (currentChild = nextInQueue) {
	            // Keep a record of the next child *before* applying bindings, in case the binding removes the current child from its position
	            nextInQueue = ko.virtualElements.nextSibling(currentChild);
	            applyBindingsToNodeAndDescendantsInternal(bindingContext, currentChild, bindingContextsMayDifferFromDomParentElement);
	        }
	    }

	    function applyBindingsToNodeAndDescendantsInternal (bindingContext, nodeVerified, bindingContextMayDifferFromDomParentElement) {
	        var shouldBindDescendants = true;

	        // Perf optimisation: Apply bindings only if...
	        // (1) We need to store the binding context on this node (because it may differ from the DOM parent node's binding context)
	        //     Note that we can't store binding contexts on non-elements (e.g., text nodes), as IE doesn't allow expando properties for those
	        // (2) It might have bindings (e.g., it has a data-bind attribute, or it's a marker for a containerless template)
	        var isElement = (nodeVerified.nodeType === 1);
	        if (isElement) // Workaround IE <= 8 HTML parsing weirdness
	            ko.virtualElements.normaliseVirtualElementDomStructure(nodeVerified);

	        var shouldApplyBindings = (isElement && bindingContextMayDifferFromDomParentElement)             // Case (1)
	                               || ko.bindingProvider['instance']['nodeHasBindings'](nodeVerified);       // Case (2)
	        if (shouldApplyBindings)
	            shouldBindDescendants = applyBindingsToNodeInternal(nodeVerified, null, bindingContext, bindingContextMayDifferFromDomParentElement)['shouldBindDescendants'];

	        if (shouldBindDescendants && !bindingDoesNotRecurseIntoElementTypes[ko.utils.tagNameLower(nodeVerified)]) {
	            // We're recursing automatically into (real or virtual) child nodes without changing binding contexts. So,
	            //  * For children of a *real* element, the binding context is certainly the same as on their DOM .parentNode,
	            //    hence bindingContextsMayDifferFromDomParentElement is false
	            //  * For children of a *virtual* element, we can't be sure. Evaluating .parentNode on those children may
	            //    skip over any number of intermediate virtual elements, any of which might define a custom binding context,
	            //    hence bindingContextsMayDifferFromDomParentElement is true
	            applyBindingsToDescendantsInternal(bindingContext, nodeVerified, /* bindingContextsMayDifferFromDomParentElement: */ !isElement);
	        }
	    }

	    var boundElementDomDataKey = ko.utils.domData.nextKey();


	    function topologicalSortBindings(bindings) {
	        // Depth-first sort
	        var result = [],                // The list of key/handler pairs that we will return
	            bindingsConsidered = {},    // A temporary record of which bindings are already in 'result'
	            cyclicDependencyStack = []; // Keeps track of a depth-search so that, if there's a cycle, we know which bindings caused it
	        ko.utils.objectForEach(bindings, function pushBinding(bindingKey) {
	            if (!bindingsConsidered[bindingKey]) {
	                var binding = ko['getBindingHandler'](bindingKey);
	                if (binding) {
	                    // First add dependencies (if any) of the current binding
	                    if (binding['after']) {
	                        cyclicDependencyStack.push(bindingKey);
	                        ko.utils.arrayForEach(binding['after'], function(bindingDependencyKey) {
	                            if (bindings[bindingDependencyKey]) {
	                                if (ko.utils.arrayIndexOf(cyclicDependencyStack, bindingDependencyKey) !== -1) {
	                                    throw Error("Cannot combine the following bindings, because they have a cyclic dependency: " + cyclicDependencyStack.join(", "));
	                                } else {
	                                    pushBinding(bindingDependencyKey);
	                                }
	                            }
	                        });
	                        cyclicDependencyStack.length--;
	                    }
	                    // Next add the current binding
	                    result.push({ key: bindingKey, handler: binding });
	                }
	                bindingsConsidered[bindingKey] = true;
	            }
	        });

	        return result;
	    }

	    function applyBindingsToNodeInternal(node, sourceBindings, bindingContext, bindingContextMayDifferFromDomParentElement) {
	        // Prevent multiple applyBindings calls for the same node, except when a binding value is specified
	        var alreadyBound = ko.utils.domData.get(node, boundElementDomDataKey);
	        if (!sourceBindings) {
	            if (alreadyBound) {
	                throw Error("You cannot apply bindings multiple times to the same element.");
	            }
	            ko.utils.domData.set(node, boundElementDomDataKey, true);
	        }

	        // Optimization: Don't store the binding context on this node if it's definitely the same as on node.parentNode, because
	        // we can easily recover it just by scanning up the node's ancestors in the DOM
	        // (note: here, parent node means "real DOM parent" not "virtual parent", as there's no O(1) way to find the virtual parent)
	        if (!alreadyBound && bindingContextMayDifferFromDomParentElement)
	            ko.storedBindingContextForNode(node, bindingContext);

	        // Use bindings if given, otherwise fall back on asking the bindings provider to give us some bindings
	        var bindings;
	        if (sourceBindings && typeof sourceBindings !== 'function') {
	            bindings = sourceBindings;
	        } else {
	            var provider = ko.bindingProvider['instance'],
	                getBindings = provider['getBindingAccessors'] || getBindingsAndMakeAccessors;

	            // Get the binding from the provider within a computed observable so that we can update the bindings whenever
	            // the binding context is updated or if the binding provider accesses observables.
	            var bindingsUpdater = ko.dependentObservable(
	                function() {
	                    bindings = sourceBindings ? sourceBindings(bindingContext, node) : getBindings.call(provider, node, bindingContext);
	                    // Register a dependency on the binding context to support obsevable view models.
	                    if (bindings && bindingContext._subscribable)
	                        bindingContext._subscribable();
	                    return bindings;
	                },
	                null, { disposeWhenNodeIsRemoved: node }
	            );

	            if (!bindings || !bindingsUpdater.isActive())
	                bindingsUpdater = null;
	        }

	        var bindingHandlerThatControlsDescendantBindings;
	        if (bindings) {
	            // Return the value accessor for a given binding. When bindings are static (won't be updated because of a binding
	            // context update), just return the value accessor from the binding. Otherwise, return a function that always gets
	            // the latest binding value and registers a dependency on the binding updater.
	            var getValueAccessor = bindingsUpdater
	                ? function(bindingKey) {
	                    return function() {
	                        return evaluateValueAccessor(bindingsUpdater()[bindingKey]);
	                    };
	                } : function(bindingKey) {
	                    return bindings[bindingKey];
	                };

	            // Use of allBindings as a function is maintained for backwards compatibility, but its use is deprecated
	            function allBindings() {
	                return ko.utils.objectMap(bindingsUpdater ? bindingsUpdater() : bindings, evaluateValueAccessor);
	            }
	            // The following is the 3.x allBindings API
	            allBindings['get'] = function(key) {
	                return bindings[key] && evaluateValueAccessor(getValueAccessor(key));
	            };
	            allBindings['has'] = function(key) {
	                return key in bindings;
	            };

	            // First put the bindings into the right order
	            var orderedBindings = topologicalSortBindings(bindings);

	            // Go through the sorted bindings, calling init and update for each
	            ko.utils.arrayForEach(orderedBindings, function(bindingKeyAndHandler) {
	                // Note that topologicalSortBindings has already filtered out any nonexistent binding handlers,
	                // so bindingKeyAndHandler.handler will always be nonnull.
	                var handlerInitFn = bindingKeyAndHandler.handler["init"],
	                    handlerUpdateFn = bindingKeyAndHandler.handler["update"],
	                    bindingKey = bindingKeyAndHandler.key;

	                if (node.nodeType === 8) {
	                    validateThatBindingIsAllowedForVirtualElements(bindingKey);
	                }

	                try {
	                    // Run init, ignoring any dependencies
	                    if (typeof handlerInitFn == "function") {
	                        ko.dependencyDetection.ignore(function() {
	                            var initResult = handlerInitFn(node, getValueAccessor(bindingKey), allBindings, bindingContext['$data'], bindingContext);

	                            // If this binding handler claims to control descendant bindings, make a note of this
	                            if (initResult && initResult['controlsDescendantBindings']) {
	                                if (bindingHandlerThatControlsDescendantBindings !== undefined)
	                                    throw new Error("Multiple bindings (" + bindingHandlerThatControlsDescendantBindings + " and " + bindingKey + ") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.");
	                                bindingHandlerThatControlsDescendantBindings = bindingKey;
	                            }
	                        });
	                    }

	                    // Run update in its own computed wrapper
	                    if (typeof handlerUpdateFn == "function") {
	                        ko.dependentObservable(
	                            function() {
	                                handlerUpdateFn(node, getValueAccessor(bindingKey), allBindings, bindingContext['$data'], bindingContext);
	                            },
	                            null,
	                            { disposeWhenNodeIsRemoved: node }
	                        );
	                    }
	                } catch (ex) {
	                    ex.message = "Unable to process binding \"" + bindingKey + ": " + bindings[bindingKey] + "\"\nMessage: " + ex.message;
	                    throw ex;
	                }
	            });
	        }

	        return {
	            'shouldBindDescendants': bindingHandlerThatControlsDescendantBindings === undefined
	        };
	    };

	    var storedBindingContextDomDataKey = ko.utils.domData.nextKey();
	    ko.storedBindingContextForNode = function (node, bindingContext) {
	        if (arguments.length == 2) {
	            ko.utils.domData.set(node, storedBindingContextDomDataKey, bindingContext);
	            if (bindingContext._subscribable)
	                bindingContext._subscribable._addNode(node);
	        } else {
	            return ko.utils.domData.get(node, storedBindingContextDomDataKey);
	        }
	    }

	    function getBindingContext(viewModelOrBindingContext) {
	        return viewModelOrBindingContext && (viewModelOrBindingContext instanceof ko.bindingContext)
	            ? viewModelOrBindingContext
	            : new ko.bindingContext(viewModelOrBindingContext);
	    }

	    ko.applyBindingAccessorsToNode = function (node, bindings, viewModelOrBindingContext) {
	        if (node.nodeType === 1) // If it's an element, workaround IE <= 8 HTML parsing weirdness
	            ko.virtualElements.normaliseVirtualElementDomStructure(node);
	        return applyBindingsToNodeInternal(node, bindings, getBindingContext(viewModelOrBindingContext), true);
	    };

	    ko.applyBindingsToNode = function (node, bindings, viewModelOrBindingContext) {
	        var context = getBindingContext(viewModelOrBindingContext);
	        return ko.applyBindingAccessorsToNode(node, makeBindingAccessors(bindings, context, node), context);
	    };

	    ko.applyBindingsToDescendants = function(viewModelOrBindingContext, rootNode) {
	        if (rootNode.nodeType === 1 || rootNode.nodeType === 8)
	            applyBindingsToDescendantsInternal(getBindingContext(viewModelOrBindingContext), rootNode, true);
	    };

	    ko.applyBindings = function (viewModelOrBindingContext, rootNode) {
	        // If jQuery is loaded after Knockout, we won't initially have access to it. So save it here.
	        if (!jQueryInstance && window['jQuery']) {
	            jQueryInstance = window['jQuery'];
	        }

	        if (rootNode && (rootNode.nodeType !== 1) && (rootNode.nodeType !== 8))
	            throw new Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node");
	        rootNode = rootNode || window.document.body; // Make "rootNode" parameter optional

	        applyBindingsToNodeAndDescendantsInternal(getBindingContext(viewModelOrBindingContext), rootNode, true);
	    };

	    // Retrieving binding context from arbitrary nodes
	    ko.contextFor = function(node) {
	        // We can only do something meaningful for elements and comment nodes (in particular, not text nodes, as IE can't store domdata for them)
	        switch (node.nodeType) {
	            case 1:
	            case 8:
	                var context = ko.storedBindingContextForNode(node);
	                if (context) return context;
	                if (node.parentNode) return ko.contextFor(node.parentNode);
	                break;
	        }
	        return undefined;
	    };
	    ko.dataFor = function(node) {
	        var context = ko.contextFor(node);
	        return context ? context['$data'] : undefined;
	    };

	    ko.exportSymbol('bindingHandlers', ko.bindingHandlers);
	    ko.exportSymbol('applyBindings', ko.applyBindings);
	    ko.exportSymbol('applyBindingsToDescendants', ko.applyBindingsToDescendants);
	    ko.exportSymbol('applyBindingAccessorsToNode', ko.applyBindingAccessorsToNode);
	    ko.exportSymbol('applyBindingsToNode', ko.applyBindingsToNode);
	    ko.exportSymbol('contextFor', ko.contextFor);
	    ko.exportSymbol('dataFor', ko.dataFor);
	})();
	(function(undefined) {
	    var loadingSubscribablesCache = {}, // Tracks component loads that are currently in flight
	        loadedDefinitionsCache = {};    // Tracks component loads that have already completed

	    ko.components = {
	        get: function(componentName, callback) {
	            var cachedDefinition = getObjectOwnProperty(loadedDefinitionsCache, componentName);
	            if (cachedDefinition) {
	                // It's already loaded and cached. Reuse the same definition object.
	                // Note that for API consistency, even cache hits complete asynchronously by default.
	                // You can bypass this by putting synchronous:true on your component config.
	                if (cachedDefinition.isSynchronousComponent) {
	                    ko.dependencyDetection.ignore(function() { // See comment in loaderRegistryBehaviors.js for reasoning
	                        callback(cachedDefinition.definition);
	                    });
	                } else {
	                    setTimeout(function() { callback(cachedDefinition.definition); }, 0);
	                }
	            } else {
	                // Join the loading process that is already underway, or start a new one.
	                loadComponentAndNotify(componentName, callback);
	            }
	        },

	        clearCachedDefinition: function(componentName) {
	            delete loadedDefinitionsCache[componentName];
	        },

	        _getFirstResultFromLoaders: getFirstResultFromLoaders
	    };

	    function getObjectOwnProperty(obj, propName) {
	        return obj.hasOwnProperty(propName) ? obj[propName] : undefined;
	    }

	    function loadComponentAndNotify(componentName, callback) {
	        var subscribable = getObjectOwnProperty(loadingSubscribablesCache, componentName),
	            completedAsync;
	        if (!subscribable) {
	            // It's not started loading yet. Start loading, and when it's done, move it to loadedDefinitionsCache.
	            subscribable = loadingSubscribablesCache[componentName] = new ko.subscribable();
	            subscribable.subscribe(callback);

	            beginLoadingComponent(componentName, function(definition, config) {
	                var isSynchronousComponent = !!(config && config['synchronous']);
	                loadedDefinitionsCache[componentName] = { definition: definition, isSynchronousComponent: isSynchronousComponent };
	                delete loadingSubscribablesCache[componentName];

	                // For API consistency, all loads complete asynchronously. However we want to avoid
	                // adding an extra setTimeout if it's unnecessary (i.e., the completion is already
	                // async) since setTimeout(..., 0) still takes about 16ms or more on most browsers.
	                //
	                // You can bypass the 'always synchronous' feature by putting the synchronous:true
	                // flag on your component configuration when you register it.
	                if (completedAsync || isSynchronousComponent) {
	                    // Note that notifySubscribers ignores any dependencies read within the callback.
	                    // See comment in loaderRegistryBehaviors.js for reasoning
	                    subscribable['notifySubscribers'](definition);
	                } else {
	                    setTimeout(function() {
	                        subscribable['notifySubscribers'](definition);
	                    }, 0);
	                }
	            });
	            completedAsync = true;
	        } else {
	            subscribable.subscribe(callback);
	        }
	    }

	    function beginLoadingComponent(componentName, callback) {
	        getFirstResultFromLoaders('getConfig', [componentName], function(config) {
	            if (config) {
	                // We have a config, so now load its definition
	                getFirstResultFromLoaders('loadComponent', [componentName, config], function(definition) {
	                    callback(definition, config);
	                });
	            } else {
	                // The component has no config - it's unknown to all the loaders.
	                // Note that this is not an error (e.g., a module loading error) - that would abort the
	                // process and this callback would not run. For this callback to run, all loaders must
	                // have confirmed they don't know about this component.
	                callback(null, null);
	            }
	        });
	    }

	    function getFirstResultFromLoaders(methodName, argsExceptCallback, callback, candidateLoaders) {
	        // On the first call in the stack, start with the full set of loaders
	        if (!candidateLoaders) {
	            candidateLoaders = ko.components['loaders'].slice(0); // Use a copy, because we'll be mutating this array
	        }

	        // Try the next candidate
	        var currentCandidateLoader = candidateLoaders.shift();
	        if (currentCandidateLoader) {
	            var methodInstance = currentCandidateLoader[methodName];
	            if (methodInstance) {
	                var wasAborted = false,
	                    synchronousReturnValue = methodInstance.apply(currentCandidateLoader, argsExceptCallback.concat(function(result) {
	                        if (wasAborted) {
	                            callback(null);
	                        } else if (result !== null) {
	                            // This candidate returned a value. Use it.
	                            callback(result);
	                        } else {
	                            // Try the next candidate
	                            getFirstResultFromLoaders(methodName, argsExceptCallback, callback, candidateLoaders);
	                        }
	                    }));

	                // Currently, loaders may not return anything synchronously. This leaves open the possibility
	                // that we'll extend the API to support synchronous return values in the future. It won't be
	                // a breaking change, because currently no loader is allowed to return anything except undefined.
	                if (synchronousReturnValue !== undefined) {
	                    wasAborted = true;

	                    // Method to suppress exceptions will remain undocumented. This is only to keep
	                    // KO's specs running tidily, since we can observe the loading got aborted without
	                    // having exceptions cluttering up the console too.
	                    if (!currentCandidateLoader['suppressLoaderExceptions']) {
	                        throw new Error('Component loaders must supply values by invoking the callback, not by returning values synchronously.');
	                    }
	                }
	            } else {
	                // This candidate doesn't have the relevant handler. Synchronously move on to the next one.
	                getFirstResultFromLoaders(methodName, argsExceptCallback, callback, candidateLoaders);
	            }
	        } else {
	            // No candidates returned a value
	            callback(null);
	        }
	    }

	    // Reference the loaders via string name so it's possible for developers
	    // to replace the whole array by assigning to ko.components.loaders
	    ko.components['loaders'] = [];

	    ko.exportSymbol('components', ko.components);
	    ko.exportSymbol('components.get', ko.components.get);
	    ko.exportSymbol('components.clearCachedDefinition', ko.components.clearCachedDefinition);
	})();
	(function(undefined) {

	    // The default loader is responsible for two things:
	    // 1. Maintaining the default in-memory registry of component configuration objects
	    //    (i.e., the thing you're writing to when you call ko.components.register(someName, ...))
	    // 2. Answering requests for components by fetching configuration objects
	    //    from that default in-memory registry and resolving them into standard
	    //    component definition objects (of the form { createViewModel: ..., template: ... })
	    // Custom loaders may override either of these facilities, i.e.,
	    // 1. To supply configuration objects from some other source (e.g., conventions)
	    // 2. Or, to resolve configuration objects by loading viewmodels/templates via arbitrary logic.

	    var defaultConfigRegistry = {};

	    ko.components.register = function(componentName, config) {
	        if (!config) {
	            throw new Error('Invalid configuration for ' + componentName);
	        }

	        if (ko.components.isRegistered(componentName)) {
	            throw new Error('Component ' + componentName + ' is already registered');
	        }

	        defaultConfigRegistry[componentName] = config;
	    }

	    ko.components.isRegistered = function(componentName) {
	        return componentName in defaultConfigRegistry;
	    }

	    ko.components.unregister = function(componentName) {
	        delete defaultConfigRegistry[componentName];
	        ko.components.clearCachedDefinition(componentName);
	    }

	    ko.components.defaultLoader = {
	        'getConfig': function(componentName, callback) {
	            var result = defaultConfigRegistry.hasOwnProperty(componentName)
	                ? defaultConfigRegistry[componentName]
	                : null;
	            callback(result);
	        },

	        'loadComponent': function(componentName, config, callback) {
	            var errorCallback = makeErrorCallback(componentName);
	            possiblyGetConfigFromAmd(errorCallback, config, function(loadedConfig) {
	                resolveConfig(componentName, errorCallback, loadedConfig, callback);
	            });
	        },

	        'loadTemplate': function(componentName, templateConfig, callback) {
	            resolveTemplate(makeErrorCallback(componentName), templateConfig, callback);
	        },

	        'loadViewModel': function(componentName, viewModelConfig, callback) {
	            resolveViewModel(makeErrorCallback(componentName), viewModelConfig, callback);
	        }
	    };

	    var createViewModelKey = 'createViewModel';

	    // Takes a config object of the form { template: ..., viewModel: ... }, and asynchronously convert it
	    // into the standard component definition format:
	    //    { template: <ArrayOfDomNodes>, createViewModel: function(params, componentInfo) { ... } }.
	    // Since both template and viewModel may need to be resolved asynchronously, both tasks are performed
	    // in parallel, and the results joined when both are ready. We don't depend on any promises infrastructure,
	    // so this is implemented manually below.
	    function resolveConfig(componentName, errorCallback, config, callback) {
	        var result = {},
	            makeCallBackWhenZero = 2,
	            tryIssueCallback = function() {
	                if (--makeCallBackWhenZero === 0) {
	                    callback(result);
	                }
	            },
	            templateConfig = config['template'],
	            viewModelConfig = config['viewModel'];

	        if (templateConfig) {
	            possiblyGetConfigFromAmd(errorCallback, templateConfig, function(loadedConfig) {
	                ko.components._getFirstResultFromLoaders('loadTemplate', [componentName, loadedConfig], function(resolvedTemplate) {
	                    result['template'] = resolvedTemplate;
	                    tryIssueCallback();
	                });
	            });
	        } else {
	            tryIssueCallback();
	        }

	        if (viewModelConfig) {
	            possiblyGetConfigFromAmd(errorCallback, viewModelConfig, function(loadedConfig) {
	                ko.components._getFirstResultFromLoaders('loadViewModel', [componentName, loadedConfig], function(resolvedViewModel) {
	                    result[createViewModelKey] = resolvedViewModel;
	                    tryIssueCallback();
	                });
	            });
	        } else {
	            tryIssueCallback();
	        }
	    }

	    function resolveTemplate(errorCallback, templateConfig, callback) {
	        if (typeof templateConfig === 'string') {
	            // Markup - parse it
	            callback(ko.utils.parseHtmlFragment(templateConfig));
	        } else if (templateConfig instanceof Array) {
	            // Assume already an array of DOM nodes - pass through unchanged
	            callback(templateConfig);
	        } else if (isDocumentFragment(templateConfig)) {
	            // Document fragment - use its child nodes
	            callback(ko.utils.makeArray(templateConfig.childNodes));
	        } else if (templateConfig['element']) {
	            var element = templateConfig['element'];
	            if (isDomElement(element)) {
	                // Element instance - copy its child nodes
	                callback(cloneNodesFromTemplateSourceElement(element));
	            } else if (typeof element === 'string') {
	                // Element ID - find it, then copy its child nodes
	                var elemInstance = document.getElementById(element);
	                if (elemInstance) {
	                    callback(cloneNodesFromTemplateSourceElement(elemInstance));
	                } else {
	                    errorCallback('Cannot find element with ID ' + element);
	                }
	            } else {
	                errorCallback('Unknown element type: ' + element);
	            }
	        } else {
	            errorCallback('Unknown template value: ' + templateConfig);
	        }
	    }

	    function resolveViewModel(errorCallback, viewModelConfig, callback) {
	        if (typeof viewModelConfig === 'function') {
	            // Constructor - convert to standard factory function format
	            // By design, this does *not* supply componentInfo to the constructor, as the intent is that
	            // componentInfo contains non-viewmodel data (e.g., the component's element) that should only
	            // be used in factory functions, not viewmodel constructors.
	            callback(function (params /*, componentInfo */) {
	                return new viewModelConfig(params);
	            });
	        } else if (typeof viewModelConfig[createViewModelKey] === 'function') {
	            // Already a factory function - use it as-is
	            callback(viewModelConfig[createViewModelKey]);
	        } else if ('instance' in viewModelConfig) {
	            // Fixed object instance - promote to createViewModel format for API consistency
	            var fixedInstance = viewModelConfig['instance'];
	            callback(function (params, componentInfo) {
	                return fixedInstance;
	            });
	        } else if ('viewModel' in viewModelConfig) {
	            // Resolved AMD module whose value is of the form { viewModel: ... }
	            resolveViewModel(errorCallback, viewModelConfig['viewModel'], callback);
	        } else {
	            errorCallback('Unknown viewModel value: ' + viewModelConfig);
	        }
	    }

	    function cloneNodesFromTemplateSourceElement(elemInstance) {
	        switch (ko.utils.tagNameLower(elemInstance)) {
	            case 'script':
	                return ko.utils.parseHtmlFragment(elemInstance.text);
	            case 'textarea':
	                return ko.utils.parseHtmlFragment(elemInstance.value);
	            case 'template':
	                // For browsers with proper <template> element support (i.e., where the .content property
	                // gives a document fragment), use that document fragment.
	                if (isDocumentFragment(elemInstance.content)) {
	                    return ko.utils.cloneNodes(elemInstance.content.childNodes);
	                }
	        }

	        // Regular elements such as <div>, and <template> elements on old browsers that don't really
	        // understand <template> and just treat it as a regular container
	        return ko.utils.cloneNodes(elemInstance.childNodes);
	    }

	    function isDomElement(obj) {
	        if (window['HTMLElement']) {
	            return obj instanceof HTMLElement;
	        } else {
	            return obj && obj.tagName && obj.nodeType === 1;
	        }
	    }

	    function isDocumentFragment(obj) {
	        if (window['DocumentFragment']) {
	            return obj instanceof DocumentFragment;
	        } else {
	            return obj && obj.nodeType === 11;
	        }
	    }

	    function possiblyGetConfigFromAmd(errorCallback, config, callback) {
	        if (typeof config['require'] === 'string') {
	            // The config is the value of an AMD module
	            if (amdRequire || window['require']) {
	                (amdRequire || window['require'])([config['require']], callback);
	            } else {
	                errorCallback('Uses require, but no AMD loader is present');
	            }
	        } else {
	            callback(config);
	        }
	    }

	    function makeErrorCallback(componentName) {
	        return function (message) {
	            throw new Error('Component \'' + componentName + '\': ' + message);
	        };
	    }

	    ko.exportSymbol('components.register', ko.components.register);
	    ko.exportSymbol('components.isRegistered', ko.components.isRegistered);
	    ko.exportSymbol('components.unregister', ko.components.unregister);

	    // Expose the default loader so that developers can directly ask it for configuration
	    // or to resolve configuration
	    ko.exportSymbol('components.defaultLoader', ko.components.defaultLoader);

	    // By default, the default loader is the only registered component loader
	    ko.components['loaders'].push(ko.components.defaultLoader);

	    // Privately expose the underlying config registry for use in old-IE shim
	    ko.components._allRegisteredComponents = defaultConfigRegistry;
	})();
	(function (undefined) {
	    // Overridable API for determining which component name applies to a given node. By overriding this,
	    // you can for example map specific tagNames to components that are not preregistered.
	    ko.components['getComponentNameForNode'] = function(node) {
	        var tagNameLower = ko.utils.tagNameLower(node);
	        return ko.components.isRegistered(tagNameLower) && tagNameLower;
	    };

	    ko.components.addBindingsForCustomElement = function(allBindings, node, bindingContext, valueAccessors) {
	        // Determine if it's really a custom element matching a component
	        if (node.nodeType === 1) {
	            var componentName = ko.components['getComponentNameForNode'](node);
	            if (componentName) {
	                // It does represent a component, so add a component binding for it
	                allBindings = allBindings || {};

	                if (allBindings['component']) {
	                    // Avoid silently overwriting some other 'component' binding that may already be on the element
	                    throw new Error('Cannot use the "component" binding on a custom element matching a component');
	                }

	                var componentBindingValue = { 'name': componentName, 'params': getComponentParamsFromCustomElement(node, bindingContext) };

	                allBindings['component'] = valueAccessors
	                    ? function() { return componentBindingValue; }
	                    : componentBindingValue;
	            }
	        }

	        return allBindings;
	    }

	    var nativeBindingProviderInstance = new ko.bindingProvider();

	    function getComponentParamsFromCustomElement(elem, bindingContext) {
	        var paramsAttribute = elem.getAttribute('params');

	        if (paramsAttribute) {
	            var params = nativeBindingProviderInstance['parseBindingsString'](paramsAttribute, bindingContext, elem, { 'valueAccessors': true, 'bindingParams': true }),
	                rawParamComputedValues = ko.utils.objectMap(params, function(paramValue, paramName) {
	                    return ko.computed(paramValue, null, { disposeWhenNodeIsRemoved: elem });
	                }),
	                result = ko.utils.objectMap(rawParamComputedValues, function(paramValueComputed, paramName) {
	                    var paramValue = paramValueComputed.peek();
	                    // Does the evaluation of the parameter value unwrap any observables?
	                    if (!paramValueComputed.isActive()) {
	                        // No it doesn't, so there's no need for any computed wrapper. Just pass through the supplied value directly.
	                        // Example: "someVal: firstName, age: 123" (whether or not firstName is an observable/computed)
	                        return paramValue;
	                    } else {
	                        // Yes it does. Supply a computed property that unwraps both the outer (binding expression)
	                        // level of observability, and any inner (resulting model value) level of observability.
	                        // This means the component doesn't have to worry about multiple unwrapping. If the value is a
	                        // writable observable, the computed will also be writable and pass the value on to the observable.
	                        return ko.computed({
	                            'read': function() {
	                                return ko.utils.unwrapObservable(paramValueComputed());
	                            },
	                            'write': ko.isWriteableObservable(paramValue) && function(value) {
	                                paramValueComputed()(value);
	                            },
	                            disposeWhenNodeIsRemoved: elem
	                        });
	                    }
	                });

	            // Give access to the raw computeds, as long as that wouldn't overwrite any custom param also called '$raw'
	            // This is in case the developer wants to react to outer (binding) observability separately from inner
	            // (model value) observability, or in case the model value observable has subobservables.
	            if (!result.hasOwnProperty('$raw')) {
	                result['$raw'] = rawParamComputedValues;
	            }

	            return result;
	        } else {
	            // For consistency, absence of a "params" attribute is treated the same as the presence of
	            // any empty one. Otherwise component viewmodels need special code to check whether or not
	            // 'params' or 'params.$raw' is null/undefined before reading subproperties, which is annoying.
	            return { '$raw': {} };
	        }
	    }

	    // --------------------------------------------------------------------------------
	    // Compatibility code for older (pre-HTML5) IE browsers

	    if (ko.utils.ieVersion < 9) {
	        // Whenever you preregister a component, enable it as a custom element in the current document
	        ko.components['register'] = (function(originalFunction) {
	            return function(componentName) {
	                document.createElement(componentName); // Allows IE<9 to parse markup containing the custom element
	                return originalFunction.apply(this, arguments);
	            }
	        })(ko.components['register']);

	        // Whenever you create a document fragment, enable all preregistered component names as custom elements
	        // This is needed to make innerShiv/jQuery HTML parsing correctly handle the custom elements
	        document.createDocumentFragment = (function(originalFunction) {
	            return function() {
	                var newDocFrag = originalFunction(),
	                    allComponents = ko.components._allRegisteredComponents;
	                for (var componentName in allComponents) {
	                    if (allComponents.hasOwnProperty(componentName)) {
	                        newDocFrag.createElement(componentName);
	                    }
	                }
	                return newDocFrag;
	            };
	        })(document.createDocumentFragment);
	    }
	})();(function(undefined) {

	    var componentLoadingOperationUniqueId = 0;

	    ko.bindingHandlers['component'] = {
	        'init': function(element, valueAccessor, ignored1, ignored2, bindingContext) {
	            var currentViewModel,
	                currentLoadingOperationId,
	                disposeAssociatedComponentViewModel = function () {
	                    var currentViewModelDispose = currentViewModel && currentViewModel['dispose'];
	                    if (typeof currentViewModelDispose === 'function') {
	                        currentViewModelDispose.call(currentViewModel);
	                    }

	                    // Any in-flight loading operation is no longer relevant, so make sure we ignore its completion
	                    currentLoadingOperationId = null;
	                },
	                originalChildNodes = ko.utils.makeArray(ko.virtualElements.childNodes(element));

	            ko.utils.domNodeDisposal.addDisposeCallback(element, disposeAssociatedComponentViewModel);

	            ko.computed(function () {
	                var value = ko.utils.unwrapObservable(valueAccessor()),
	                    componentName, componentParams;

	                if (typeof value === 'string') {
	                    componentName = value;
	                } else {
	                    componentName = ko.utils.unwrapObservable(value['name']);
	                    componentParams = ko.utils.unwrapObservable(value['params']);
	                }

	                if (!componentName) {
	                    throw new Error('No component name specified');
	                }

	                var loadingOperationId = currentLoadingOperationId = ++componentLoadingOperationUniqueId;
	                ko.components.get(componentName, function(componentDefinition) {
	                    // If this is not the current load operation for this element, ignore it.
	                    if (currentLoadingOperationId !== loadingOperationId) {
	                        return;
	                    }

	                    // Clean up previous state
	                    disposeAssociatedComponentViewModel();

	                    // Instantiate and bind new component. Implicitly this cleans any old DOM nodes.
	                    if (!componentDefinition) {
	                        throw new Error('Unknown component \'' + componentName + '\'');
	                    }
	                    cloneTemplateIntoElement(componentName, componentDefinition, element);
	                    var componentViewModel = createViewModel(componentDefinition, element, originalChildNodes, componentParams),
	                        childBindingContext = bindingContext['createChildContext'](componentViewModel, /* dataItemAlias */ undefined, function(ctx) {
	                            ctx['$component'] = componentViewModel;
	                            ctx['$componentTemplateNodes'] = originalChildNodes;
	                        });
	                    currentViewModel = componentViewModel;
	                    ko.applyBindingsToDescendants(childBindingContext, element);
	                });
	            }, null, { disposeWhenNodeIsRemoved: element });

	            return { 'controlsDescendantBindings': true };
	        }
	    };

	    ko.virtualElements.allowedBindings['component'] = true;

	    function cloneTemplateIntoElement(componentName, componentDefinition, element) {
	        var template = componentDefinition['template'];
	        if (!template) {
	            throw new Error('Component \'' + componentName + '\' has no template');
	        }

	        var clonedNodesArray = ko.utils.cloneNodes(template);
	        ko.virtualElements.setDomNodeChildren(element, clonedNodesArray);
	    }

	    function createViewModel(componentDefinition, element, originalChildNodes, componentParams) {
	        var componentViewModelFactory = componentDefinition['createViewModel'];
	        return componentViewModelFactory
	            ? componentViewModelFactory.call(componentDefinition, componentParams, { 'element': element, 'templateNodes': originalChildNodes })
	            : componentParams; // Template-only component
	    }

	})();
	var attrHtmlToJavascriptMap = { 'class': 'className', 'for': 'htmlFor' };
	ko.bindingHandlers['attr'] = {
	    'update': function(element, valueAccessor, allBindings) {
	        var value = ko.utils.unwrapObservable(valueAccessor()) || {};
	        ko.utils.objectForEach(value, function(attrName, attrValue) {
	            attrValue = ko.utils.unwrapObservable(attrValue);

	            // To cover cases like "attr: { checked:someProp }", we want to remove the attribute entirely
	            // when someProp is a "no value"-like value (strictly null, false, or undefined)
	            // (because the absence of the "checked" attr is how to mark an element as not checked, etc.)
	            var toRemove = (attrValue === false) || (attrValue === null) || (attrValue === undefined);
	            if (toRemove)
	                element.removeAttribute(attrName);

	            // In IE <= 7 and IE8 Quirks Mode, you have to use the Javascript property name instead of the
	            // HTML attribute name for certain attributes. IE8 Standards Mode supports the correct behavior,
	            // but instead of figuring out the mode, we'll just set the attribute through the Javascript
	            // property for IE <= 8.
	            if (ko.utils.ieVersion <= 8 && attrName in attrHtmlToJavascriptMap) {
	                attrName = attrHtmlToJavascriptMap[attrName];
	                if (toRemove)
	                    element.removeAttribute(attrName);
	                else
	                    element[attrName] = attrValue;
	            } else if (!toRemove) {
	                element.setAttribute(attrName, attrValue.toString());
	            }

	            // Treat "name" specially - although you can think of it as an attribute, it also needs
	            // special handling on older versions of IE (https://github.com/SteveSanderson/knockout/pull/333)
	            // Deliberately being case-sensitive here because XHTML would regard "Name" as a different thing
	            // entirely, and there's no strong reason to allow for such casing in HTML.
	            if (attrName === "name") {
	                ko.utils.setElementName(element, toRemove ? "" : attrValue.toString());
	            }
	        });
	    }
	};
	(function() {

	ko.bindingHandlers['checked'] = {
	    'after': ['value', 'attr'],
	    'init': function (element, valueAccessor, allBindings) {
	        var checkedValue = ko.pureComputed(function() {
	            // Treat "value" like "checkedValue" when it is included with "checked" binding
	            if (allBindings['has']('checkedValue')) {
	                return ko.utils.unwrapObservable(allBindings.get('checkedValue'));
	            } else if (allBindings['has']('value')) {
	                return ko.utils.unwrapObservable(allBindings.get('value'));
	            }

	            return element.value;
	        });

	        function updateModel() {
	            // This updates the model value from the view value.
	            // It runs in response to DOM events (click) and changes in checkedValue.
	            var isChecked = element.checked,
	                elemValue = useCheckedValue ? checkedValue() : isChecked;

	            // When we're first setting up this computed, don't change any model state.
	            if (ko.computedContext.isInitial()) {
	                return;
	            }

	            // We can ignore unchecked radio buttons, because some other radio
	            // button will be getting checked, and that one can take care of updating state.
	            if (isRadio && !isChecked) {
	                return;
	            }

	            var modelValue = ko.dependencyDetection.ignore(valueAccessor);
	            if (isValueArray) {
	                if (oldElemValue !== elemValue) {
	                    // When we're responding to the checkedValue changing, and the element is
	                    // currently checked, replace the old elem value with the new elem value
	                    // in the model array.
	                    if (isChecked) {
	                        ko.utils.addOrRemoveItem(modelValue, elemValue, true);
	                        ko.utils.addOrRemoveItem(modelValue, oldElemValue, false);
	                    }

	                    oldElemValue = elemValue;
	                } else {
	                    // When we're responding to the user having checked/unchecked a checkbox,
	                    // add/remove the element value to the model array.
	                    ko.utils.addOrRemoveItem(modelValue, elemValue, isChecked);
	                }
	            } else {
	                ko.expressionRewriting.writeValueToProperty(modelValue, allBindings, 'checked', elemValue, true);
	            }
	        };

	        function updateView() {
	            // This updates the view value from the model value.
	            // It runs in response to changes in the bound (checked) value.
	            var modelValue = ko.utils.unwrapObservable(valueAccessor());

	            if (isValueArray) {
	                // When a checkbox is bound to an array, being checked represents its value being present in that array
	                element.checked = ko.utils.arrayIndexOf(modelValue, checkedValue()) >= 0;
	            } else if (isCheckbox) {
	                // When a checkbox is bound to any other value (not an array), being checked represents the value being trueish
	                element.checked = modelValue;
	            } else {
	                // For radio buttons, being checked means that the radio button's value corresponds to the model value
	                element.checked = (checkedValue() === modelValue);
	            }
	        };

	        var isCheckbox = element.type == "checkbox",
	            isRadio = element.type == "radio";

	        // Only bind to check boxes and radio buttons
	        if (!isCheckbox && !isRadio) {
	            return;
	        }

	        var isValueArray = isCheckbox && (ko.utils.unwrapObservable(valueAccessor()) instanceof Array),
	            oldElemValue = isValueArray ? checkedValue() : undefined,
	            useCheckedValue = isRadio || isValueArray;

	        // IE 6 won't allow radio buttons to be selected unless they have a name
	        if (isRadio && !element.name)
	            ko.bindingHandlers['uniqueName']['init'](element, function() { return true });

	        // Set up two computeds to update the binding:

	        // The first responds to changes in the checkedValue value and to element clicks
	        ko.computed(updateModel, null, { disposeWhenNodeIsRemoved: element });
	        ko.utils.registerEventHandler(element, "click", updateModel);

	        // The second responds to changes in the model value (the one associated with the checked binding)
	        ko.computed(updateView, null, { disposeWhenNodeIsRemoved: element });
	    }
	};
	ko.expressionRewriting.twoWayBindings['checked'] = true;

	ko.bindingHandlers['checkedValue'] = {
	    'update': function (element, valueAccessor) {
	        element.value = ko.utils.unwrapObservable(valueAccessor());
	    }
	};

	})();var classesWrittenByBindingKey = '__ko__cssValue';
	ko.bindingHandlers['css'] = {
	    'update': function (element, valueAccessor) {
	        var value = ko.utils.unwrapObservable(valueAccessor());
	        if (value !== null && typeof value == "object") {
	            ko.utils.objectForEach(value, function(className, shouldHaveClass) {
	                shouldHaveClass = ko.utils.unwrapObservable(shouldHaveClass);
	                ko.utils.toggleDomNodeCssClass(element, className, shouldHaveClass);
	            });
	        } else {
	            value = String(value || ''); // Make sure we don't try to store or set a non-string value
	            ko.utils.toggleDomNodeCssClass(element, element[classesWrittenByBindingKey], false);
	            element[classesWrittenByBindingKey] = value;
	            ko.utils.toggleDomNodeCssClass(element, value, true);
	        }
	    }
	};
	ko.bindingHandlers['enable'] = {
	    'update': function (element, valueAccessor) {
	        var value = ko.utils.unwrapObservable(valueAccessor());
	        if (value && element.disabled)
	            element.removeAttribute("disabled");
	        else if ((!value) && (!element.disabled))
	            element.disabled = true;
	    }
	};

	ko.bindingHandlers['disable'] = {
	    'update': function (element, valueAccessor) {
	        ko.bindingHandlers['enable']['update'](element, function() { return !ko.utils.unwrapObservable(valueAccessor()) });
	    }
	};
	// For certain common events (currently just 'click'), allow a simplified data-binding syntax
	// e.g. click:handler instead of the usual full-length event:{click:handler}
	function makeEventHandlerShortcut(eventName) {
	    ko.bindingHandlers[eventName] = {
	        'init': function(element, valueAccessor, allBindings, viewModel, bindingContext) {
	            var newValueAccessor = function () {
	                var result = {};
	                result[eventName] = valueAccessor();
	                return result;
	            };
	            return ko.bindingHandlers['event']['init'].call(this, element, newValueAccessor, allBindings, viewModel, bindingContext);
	        }
	    }
	}

	ko.bindingHandlers['event'] = {
	    'init' : function (element, valueAccessor, allBindings, viewModel, bindingContext) {
	        var eventsToHandle = valueAccessor() || {};
	        ko.utils.objectForEach(eventsToHandle, function(eventName) {
	            if (typeof eventName == "string") {
	                ko.utils.registerEventHandler(element, eventName, function (event) {
	                    var handlerReturnValue;
	                    var handlerFunction = valueAccessor()[eventName];
	                    if (!handlerFunction)
	                        return;

	                    try {
	                        // Take all the event args, and prefix with the viewmodel
	                        var argsForHandler = ko.utils.makeArray(arguments);
	                        viewModel = bindingContext['$data'];
	                        argsForHandler.unshift(viewModel);
	                        handlerReturnValue = handlerFunction.apply(viewModel, argsForHandler);
	                    } finally {
	                        if (handlerReturnValue !== true) { // Normally we want to prevent default action. Developer can override this be explicitly returning true.
	                            if (event.preventDefault)
	                                event.preventDefault();
	                            else
	                                event.returnValue = false;
	                        }
	                    }

	                    var bubble = allBindings.get(eventName + 'Bubble') !== false;
	                    if (!bubble) {
	                        event.cancelBubble = true;
	                        if (event.stopPropagation)
	                            event.stopPropagation();
	                    }
	                });
	            }
	        });
	    }
	};
	// "foreach: someExpression" is equivalent to "template: { foreach: someExpression }"
	// "foreach: { data: someExpression, afterAdd: myfn }" is equivalent to "template: { foreach: someExpression, afterAdd: myfn }"
	ko.bindingHandlers['foreach'] = {
	    makeTemplateValueAccessor: function(valueAccessor) {
	        return function() {
	            var modelValue = valueAccessor(),
	                unwrappedValue = ko.utils.peekObservable(modelValue);    // Unwrap without setting a dependency here

	            // If unwrappedValue is the array, pass in the wrapped value on its own
	            // The value will be unwrapped and tracked within the template binding
	            // (See https://github.com/SteveSanderson/knockout/issues/523)
	            if ((!unwrappedValue) || typeof unwrappedValue.length == "number")
	                return { 'foreach': modelValue, 'templateEngine': ko.nativeTemplateEngine.instance };

	            // If unwrappedValue.data is the array, preserve all relevant options and unwrap again value so we get updates
	            ko.utils.unwrapObservable(modelValue);
	            return {
	                'foreach': unwrappedValue['data'],
	                'as': unwrappedValue['as'],
	                'includeDestroyed': unwrappedValue['includeDestroyed'],
	                'afterAdd': unwrappedValue['afterAdd'],
	                'beforeRemove': unwrappedValue['beforeRemove'],
	                'afterRender': unwrappedValue['afterRender'],
	                'beforeMove': unwrappedValue['beforeMove'],
	                'afterMove': unwrappedValue['afterMove'],
	                'templateEngine': ko.nativeTemplateEngine.instance
	            };
	        };
	    },
	    'init': function(element, valueAccessor, allBindings, viewModel, bindingContext) {
	        return ko.bindingHandlers['template']['init'](element, ko.bindingHandlers['foreach'].makeTemplateValueAccessor(valueAccessor));
	    },
	    'update': function(element, valueAccessor, allBindings, viewModel, bindingContext) {
	        return ko.bindingHandlers['template']['update'](element, ko.bindingHandlers['foreach'].makeTemplateValueAccessor(valueAccessor), allBindings, viewModel, bindingContext);
	    }
	};
	ko.expressionRewriting.bindingRewriteValidators['foreach'] = false; // Can't rewrite control flow bindings
	ko.virtualElements.allowedBindings['foreach'] = true;
	var hasfocusUpdatingProperty = '__ko_hasfocusUpdating';
	var hasfocusLastValue = '__ko_hasfocusLastValue';
	ko.bindingHandlers['hasfocus'] = {
	    'init': function(element, valueAccessor, allBindings) {
	        var handleElementFocusChange = function(isFocused) {
	            // Where possible, ignore which event was raised and determine focus state using activeElement,
	            // as this avoids phantom focus/blur events raised when changing tabs in modern browsers.
	            // However, not all KO-targeted browsers (Firefox 2) support activeElement. For those browsers,
	            // prevent a loss of focus when changing tabs/windows by setting a flag that prevents hasfocus
	            // from calling 'blur()' on the element when it loses focus.
	            // Discussion at https://github.com/SteveSanderson/knockout/pull/352
	            element[hasfocusUpdatingProperty] = true;
	            var ownerDoc = element.ownerDocument;
	            if ("activeElement" in ownerDoc) {
	                var active;
	                try {
	                    active = ownerDoc.activeElement;
	                } catch(e) {
	                    // IE9 throws if you access activeElement during page load (see issue #703)
	                    active = ownerDoc.body;
	                }
	                isFocused = (active === element);
	            }
	            var modelValue = valueAccessor();
	            ko.expressionRewriting.writeValueToProperty(modelValue, allBindings, 'hasfocus', isFocused, true);

	            //cache the latest value, so we can avoid unnecessarily calling focus/blur in the update function
	            element[hasfocusLastValue] = isFocused;
	            element[hasfocusUpdatingProperty] = false;
	        };
	        var handleElementFocusIn = handleElementFocusChange.bind(null, true);
	        var handleElementFocusOut = handleElementFocusChange.bind(null, false);

	        ko.utils.registerEventHandler(element, "focus", handleElementFocusIn);
	        ko.utils.registerEventHandler(element, "focusin", handleElementFocusIn); // For IE
	        ko.utils.registerEventHandler(element, "blur",  handleElementFocusOut);
	        ko.utils.registerEventHandler(element, "focusout",  handleElementFocusOut); // For IE
	    },
	    'update': function(element, valueAccessor) {
	        var value = !!ko.utils.unwrapObservable(valueAccessor()); //force boolean to compare with last value
	        if (!element[hasfocusUpdatingProperty] && element[hasfocusLastValue] !== value) {
	            value ? element.focus() : element.blur();
	            ko.dependencyDetection.ignore(ko.utils.triggerEvent, null, [element, value ? "focusin" : "focusout"]); // For IE, which doesn't reliably fire "focus" or "blur" events synchronously
	        }
	    }
	};
	ko.expressionRewriting.twoWayBindings['hasfocus'] = true;

	ko.bindingHandlers['hasFocus'] = ko.bindingHandlers['hasfocus']; // Make "hasFocus" an alias
	ko.expressionRewriting.twoWayBindings['hasFocus'] = true;
	ko.bindingHandlers['html'] = {
	    'init': function() {
	        // Prevent binding on the dynamically-injected HTML (as developers are unlikely to expect that, and it has security implications)
	        return { 'controlsDescendantBindings': true };
	    },
	    'update': function (element, valueAccessor) {
	        // setHtml will unwrap the value if needed
	        ko.utils.setHtml(element, valueAccessor());
	    }
	};
	// Makes a binding like with or if
	function makeWithIfBinding(bindingKey, isWith, isNot, makeContextCallback) {
	    ko.bindingHandlers[bindingKey] = {
	        'init': function(element, valueAccessor, allBindings, viewModel, bindingContext) {
	            var didDisplayOnLastUpdate,
	                savedNodes;
	            ko.computed(function() {
	                var dataValue = ko.utils.unwrapObservable(valueAccessor()),
	                    shouldDisplay = !isNot !== !dataValue, // equivalent to isNot ? !dataValue : !!dataValue
	                    isFirstRender = !savedNodes,
	                    needsRefresh = isFirstRender || isWith || (shouldDisplay !== didDisplayOnLastUpdate);

	                if (needsRefresh) {
	                    // Save a copy of the inner nodes on the initial update, but only if we have dependencies.
	                    if (isFirstRender && ko.computedContext.getDependenciesCount()) {
	                        savedNodes = ko.utils.cloneNodes(ko.virtualElements.childNodes(element), true /* shouldCleanNodes */);
	                    }

	                    if (shouldDisplay) {
	                        if (!isFirstRender) {
	                            ko.virtualElements.setDomNodeChildren(element, ko.utils.cloneNodes(savedNodes));
	                        }
	                        ko.applyBindingsToDescendants(makeContextCallback ? makeContextCallback(bindingContext, dataValue) : bindingContext, element);
	                    } else {
	                        ko.virtualElements.emptyNode(element);
	                    }

	                    didDisplayOnLastUpdate = shouldDisplay;
	                }
	            }, null, { disposeWhenNodeIsRemoved: element });
	            return { 'controlsDescendantBindings': true };
	        }
	    };
	    ko.expressionRewriting.bindingRewriteValidators[bindingKey] = false; // Can't rewrite control flow bindings
	    ko.virtualElements.allowedBindings[bindingKey] = true;
	}

	// Construct the actual binding handlers
	makeWithIfBinding('if');
	makeWithIfBinding('ifnot', false /* isWith */, true /* isNot */);
	makeWithIfBinding('with', true /* isWith */, false /* isNot */,
	    function(bindingContext, dataValue) {
	        return bindingContext['createChildContext'](dataValue);
	    }
	);
	var captionPlaceholder = {};
	ko.bindingHandlers['options'] = {
	    'init': function(element) {
	        if (ko.utils.tagNameLower(element) !== "select")
	            throw new Error("options binding applies only to SELECT elements");

	        // Remove all existing <option>s.
	        while (element.length > 0) {
	            element.remove(0);
	        }

	        // Ensures that the binding processor doesn't try to bind the options
	        return { 'controlsDescendantBindings': true };
	    },
	    'update': function (element, valueAccessor, allBindings) {
	        function selectedOptions() {
	            return ko.utils.arrayFilter(element.options, function (node) { return node.selected; });
	        }

	        var selectWasPreviouslyEmpty = element.length == 0,
	            multiple = element.multiple,
	            previousScrollTop = (!selectWasPreviouslyEmpty && multiple) ? element.scrollTop : null,
	            unwrappedArray = ko.utils.unwrapObservable(valueAccessor()),
	            valueAllowUnset = allBindings.get('valueAllowUnset') && allBindings['has']('value'),
	            includeDestroyed = allBindings.get('optionsIncludeDestroyed'),
	            arrayToDomNodeChildrenOptions = {},
	            captionValue,
	            filteredArray,
	            previousSelectedValues = [];

	        if (!valueAllowUnset) {
	            if (multiple) {
	                previousSelectedValues = ko.utils.arrayMap(selectedOptions(), ko.selectExtensions.readValue);
	            } else if (element.selectedIndex >= 0) {
	                previousSelectedValues.push(ko.selectExtensions.readValue(element.options[element.selectedIndex]));
	            }
	        }

	        if (unwrappedArray) {
	            if (typeof unwrappedArray.length == "undefined") // Coerce single value into array
	                unwrappedArray = [unwrappedArray];

	            // Filter out any entries marked as destroyed
	            filteredArray = ko.utils.arrayFilter(unwrappedArray, function(item) {
	                return includeDestroyed || item === undefined || item === null || !ko.utils.unwrapObservable(item['_destroy']);
	            });

	            // If caption is included, add it to the array
	            if (allBindings['has']('optionsCaption')) {
	                captionValue = ko.utils.unwrapObservable(allBindings.get('optionsCaption'));
	                // If caption value is null or undefined, don't show a caption
	                if (captionValue !== null && captionValue !== undefined) {
	                    filteredArray.unshift(captionPlaceholder);
	                }
	            }
	        } else {
	            // If a falsy value is provided (e.g. null), we'll simply empty the select element
	        }

	        function applyToObject(object, predicate, defaultValue) {
	            var predicateType = typeof predicate;
	            if (predicateType == "function")    // Given a function; run it against the data value
	                return predicate(object);
	            else if (predicateType == "string") // Given a string; treat it as a property name on the data value
	                return object[predicate];
	            else                                // Given no optionsText arg; use the data value itself
	                return defaultValue;
	        }

	        // The following functions can run at two different times:
	        // The first is when the whole array is being updated directly from this binding handler.
	        // The second is when an observable value for a specific array entry is updated.
	        // oldOptions will be empty in the first case, but will be filled with the previously generated option in the second.
	        var itemUpdate = false;
	        function optionForArrayItem(arrayEntry, index, oldOptions) {
	            if (oldOptions.length) {
	                previousSelectedValues = !valueAllowUnset && oldOptions[0].selected ? [ ko.selectExtensions.readValue(oldOptions[0]) ] : [];
	                itemUpdate = true;
	            }
	            var option = element.ownerDocument.createElement("option");
	            if (arrayEntry === captionPlaceholder) {
	                ko.utils.setTextContent(option, allBindings.get('optionsCaption'));
	                ko.selectExtensions.writeValue(option, undefined);
	            } else {
	                // Apply a value to the option element
	                var optionValue = applyToObject(arrayEntry, allBindings.get('optionsValue'), arrayEntry);
	                ko.selectExtensions.writeValue(option, ko.utils.unwrapObservable(optionValue));

	                // Apply some text to the option element
	                var optionText = applyToObject(arrayEntry, allBindings.get('optionsText'), optionValue);
	                ko.utils.setTextContent(option, optionText);
	            }
	            return [option];
	        }

	        // By using a beforeRemove callback, we delay the removal until after new items are added. This fixes a selection
	        // problem in IE<=8 and Firefox. See https://github.com/knockout/knockout/issues/1208
	        arrayToDomNodeChildrenOptions['beforeRemove'] =
	            function (option) {
	                element.removeChild(option);
	            };

	        function setSelectionCallback(arrayEntry, newOptions) {
	            if (itemUpdate && valueAllowUnset) {
	                // The model value is authoritative, so make sure its value is the one selected
	                // There is no need to use dependencyDetection.ignore since setDomNodeChildrenFromArrayMapping does so already.
	                ko.selectExtensions.writeValue(element, ko.utils.unwrapObservable(allBindings.get('value')), true /* allowUnset */);
	            } else if (previousSelectedValues.length) {
	                // IE6 doesn't like us to assign selection to OPTION nodes before they're added to the document.
	                // That's why we first added them without selection. Now it's time to set the selection.
	                var isSelected = ko.utils.arrayIndexOf(previousSelectedValues, ko.selectExtensions.readValue(newOptions[0])) >= 0;
	                ko.utils.setOptionNodeSelectionState(newOptions[0], isSelected);

	                // If this option was changed from being selected during a single-item update, notify the change
	                if (itemUpdate && !isSelected) {
	                    ko.dependencyDetection.ignore(ko.utils.triggerEvent, null, [element, "change"]);
	                }
	            }
	        }

	        var callback = setSelectionCallback;
	        if (allBindings['has']('optionsAfterRender') && typeof allBindings.get('optionsAfterRender') == "function") {
	            callback = function(arrayEntry, newOptions) {
	                setSelectionCallback(arrayEntry, newOptions);
	                ko.dependencyDetection.ignore(allBindings.get('optionsAfterRender'), null, [newOptions[0], arrayEntry !== captionPlaceholder ? arrayEntry : undefined]);
	            }
	        }

	        ko.utils.setDomNodeChildrenFromArrayMapping(element, filteredArray, optionForArrayItem, arrayToDomNodeChildrenOptions, callback);

	        ko.dependencyDetection.ignore(function () {
	            if (valueAllowUnset) {
	                // The model value is authoritative, so make sure its value is the one selected
	                ko.selectExtensions.writeValue(element, ko.utils.unwrapObservable(allBindings.get('value')), true /* allowUnset */);
	            } else {
	                // Determine if the selection has changed as a result of updating the options list
	                var selectionChanged;
	                if (multiple) {
	                    // For a multiple-select box, compare the new selection count to the previous one
	                    // But if nothing was selected before, the selection can't have changed
	                    selectionChanged = previousSelectedValues.length && selectedOptions().length < previousSelectedValues.length;
	                } else {
	                    // For a single-select box, compare the current value to the previous value
	                    // But if nothing was selected before or nothing is selected now, just look for a change in selection
	                    selectionChanged = (previousSelectedValues.length && element.selectedIndex >= 0)
	                        ? (ko.selectExtensions.readValue(element.options[element.selectedIndex]) !== previousSelectedValues[0])
	                        : (previousSelectedValues.length || element.selectedIndex >= 0);
	                }

	                // Ensure consistency between model value and selected option.
	                // If the dropdown was changed so that selection is no longer the same,
	                // notify the value or selectedOptions binding.
	                if (selectionChanged) {
	                    ko.utils.triggerEvent(element, "change");
	                }
	            }
	        });

	        // Workaround for IE bug
	        ko.utils.ensureSelectElementIsRenderedCorrectly(element);

	        if (previousScrollTop && Math.abs(previousScrollTop - element.scrollTop) > 20)
	            element.scrollTop = previousScrollTop;
	    }
	};
	ko.bindingHandlers['options'].optionValueDomDataKey = ko.utils.domData.nextKey();
	ko.bindingHandlers['selectedOptions'] = {
	    'after': ['options', 'foreach'],
	    'init': function (element, valueAccessor, allBindings) {
	        ko.utils.registerEventHandler(element, "change", function () {
	            var value = valueAccessor(), valueToWrite = [];
	            ko.utils.arrayForEach(element.getElementsByTagName("option"), function(node) {
	                if (node.selected)
	                    valueToWrite.push(ko.selectExtensions.readValue(node));
	            });
	            ko.expressionRewriting.writeValueToProperty(value, allBindings, 'selectedOptions', valueToWrite);
	        });
	    },
	    'update': function (element, valueAccessor) {
	        if (ko.utils.tagNameLower(element) != "select")
	            throw new Error("values binding applies only to SELECT elements");

	        var newValue = ko.utils.unwrapObservable(valueAccessor());
	        if (newValue && typeof newValue.length == "number") {
	            ko.utils.arrayForEach(element.getElementsByTagName("option"), function(node) {
	                var isSelected = ko.utils.arrayIndexOf(newValue, ko.selectExtensions.readValue(node)) >= 0;
	                ko.utils.setOptionNodeSelectionState(node, isSelected);
	            });
	        }
	    }
	};
	ko.expressionRewriting.twoWayBindings['selectedOptions'] = true;
	ko.bindingHandlers['style'] = {
	    'update': function (element, valueAccessor) {
	        var value = ko.utils.unwrapObservable(valueAccessor() || {});
	        ko.utils.objectForEach(value, function(styleName, styleValue) {
	            styleValue = ko.utils.unwrapObservable(styleValue);

	            if (styleValue === null || styleValue === undefined || styleValue === false) {
	                // Empty string removes the value, whereas null/undefined have no effect
	                styleValue = "";
	            }

	            element.style[styleName] = styleValue;
	        });
	    }
	};
	ko.bindingHandlers['submit'] = {
	    'init': function (element, valueAccessor, allBindings, viewModel, bindingContext) {
	        if (typeof valueAccessor() != "function")
	            throw new Error("The value for a submit binding must be a function");
	        ko.utils.registerEventHandler(element, "submit", function (event) {
	            var handlerReturnValue;
	            var value = valueAccessor();
	            try { handlerReturnValue = value.call(bindingContext['$data'], element); }
	            finally {
	                if (handlerReturnValue !== true) { // Normally we want to prevent default action. Developer can override this be explicitly returning true.
	                    if (event.preventDefault)
	                        event.preventDefault();
	                    else
	                        event.returnValue = false;
	                }
	            }
	        });
	    }
	};
	ko.bindingHandlers['text'] = {
	    'init': function() {
	        // Prevent binding on the dynamically-injected text node (as developers are unlikely to expect that, and it has security implications).
	        // It should also make things faster, as we no longer have to consider whether the text node might be bindable.
	        return { 'controlsDescendantBindings': true };
	    },
	    'update': function (element, valueAccessor) {
	        ko.utils.setTextContent(element, valueAccessor());
	    }
	};
	ko.virtualElements.allowedBindings['text'] = true;
	(function () {

	if (window && window.navigator) {
	    var parseVersion = function (matches) {
	        if (matches) {
	            return parseFloat(matches[1]);
	        }
	    };

	    // Detect various browser versions because some old versions don't fully support the 'input' event
	    var operaVersion = window.opera && window.opera.version && parseInt(window.opera.version()),
	        userAgent = window.navigator.userAgent,
	        safariVersion = parseVersion(userAgent.match(/^(?:(?!chrome).)*version\/([^ ]*) safari/i)),
	        firefoxVersion = parseVersion(userAgent.match(/Firefox\/([^ ]*)/));
	}

	// IE 8 and 9 have bugs that prevent the normal events from firing when the value changes.
	// But it does fire the 'selectionchange' event on many of those, presumably because the
	// cursor is moving and that counts as the selection changing. The 'selectionchange' event is
	// fired at the document level only and doesn't directly indicate which element changed. We
	// set up just one event handler for the document and use 'activeElement' to determine which
	// element was changed.
	if (ko.utils.ieVersion < 10) {
	    var selectionChangeRegisteredName = ko.utils.domData.nextKey(),
	        selectionChangeHandlerName = ko.utils.domData.nextKey();
	    var selectionChangeHandler = function(event) {
	        var target = this.activeElement,
	            handler = target && ko.utils.domData.get(target, selectionChangeHandlerName);
	        if (handler) {
	            handler(event);
	        }
	    };
	    var registerForSelectionChangeEvent = function (element, handler) {
	        var ownerDoc = element.ownerDocument;
	        if (!ko.utils.domData.get(ownerDoc, selectionChangeRegisteredName)) {
	            ko.utils.domData.set(ownerDoc, selectionChangeRegisteredName, true);
	            ko.utils.registerEventHandler(ownerDoc, 'selectionchange', selectionChangeHandler);
	        }
	        ko.utils.domData.set(element, selectionChangeHandlerName, handler);
	    };
	}

	ko.bindingHandlers['textInput'] = {
	    'init': function (element, valueAccessor, allBindings) {

	        var previousElementValue = element.value,
	            timeoutHandle,
	            elementValueBeforeEvent;

	        var updateModel = function (event) {
	            clearTimeout(timeoutHandle);
	            elementValueBeforeEvent = timeoutHandle = undefined;

	            var elementValue = element.value;
	            if (previousElementValue !== elementValue) {
	                // Provide a way for tests to know exactly which event was processed
	                if (DEBUG && event) element['_ko_textInputProcessedEvent'] = event.type;
	                previousElementValue = elementValue;
	                ko.expressionRewriting.writeValueToProperty(valueAccessor(), allBindings, 'textInput', elementValue);
	            }
	        };

	        var deferUpdateModel = function (event) {
	            if (!timeoutHandle) {
	                // The elementValueBeforeEvent variable is set *only* during the brief gap between an
	                // event firing and the updateModel function running. This allows us to ignore model
	                // updates that are from the previous state of the element, usually due to techniques
	                // such as rateLimit. Such updates, if not ignored, can cause keystrokes to be lost.
	                elementValueBeforeEvent = element.value;
	                var handler = DEBUG ? updateModel.bind(element, {type: event.type}) : updateModel;
	                timeoutHandle = setTimeout(handler, 4);
	            }
	        };

	        var updateView = function () {
	            var modelValue = ko.utils.unwrapObservable(valueAccessor());

	            if (modelValue === null || modelValue === undefined) {
	                modelValue = '';
	            }

	            if (elementValueBeforeEvent !== undefined && modelValue === elementValueBeforeEvent) {
	                setTimeout(updateView, 4);
	                return;
	            }

	            // Update the element only if the element and model are different. On some browsers, updating the value
	            // will move the cursor to the end of the input, which would be bad while the user is typing.
	            if (element.value !== modelValue) {
	                previousElementValue = modelValue;  // Make sure we ignore events (propertychange) that result from updating the value
	                element.value = modelValue;
	            }
	        };

	        var onEvent = function (event, handler) {
	            ko.utils.registerEventHandler(element, event, handler);
	        };

	        if (DEBUG && ko.bindingHandlers['textInput']['_forceUpdateOn']) {
	            // Provide a way for tests to specify exactly which events are bound
	            ko.utils.arrayForEach(ko.bindingHandlers['textInput']['_forceUpdateOn'], function(eventName) {
	                if (eventName.slice(0,5) == 'after') {
	                    onEvent(eventName.slice(5), deferUpdateModel);
	                } else {
	                    onEvent(eventName, updateModel);
	                }
	            });
	        } else {
	            if (ko.utils.ieVersion < 10) {
	                // Internet Explorer <= 8 doesn't support the 'input' event, but does include 'propertychange' that fires whenever
	                // any property of an element changes. Unlike 'input', it also fires if a property is changed from JavaScript code,
	                // but that's an acceptable compromise for this binding. IE 9 does support 'input', but since it doesn't fire it
	                // when using autocomplete, we'll use 'propertychange' for it also.
	                onEvent('propertychange', function(event) {
	                    if (event.propertyName === 'value') {
	                        updateModel(event);
	                    }
	                });

	                if (ko.utils.ieVersion == 8) {
	                    // IE 8 has a bug where it fails to fire 'propertychange' on the first update following a value change from
	                    // JavaScript code. It also doesn't fire if you clear the entire value. To fix this, we bind to the following
	                    // events too.
	                    onEvent('keyup', updateModel);      // A single keystoke
	                    onEvent('keydown', updateModel);    // The first character when a key is held down
	                }
	                if (ko.utils.ieVersion >= 8) {
	                    // Internet Explorer 9 doesn't fire the 'input' event when deleting text, including using
	                    // the backspace, delete, or ctrl-x keys, clicking the 'x' to clear the input, dragging text
	                    // out of the field, and cutting or deleting text using the context menu. 'selectionchange'
	                    // can detect all of those except dragging text out of the field, for which we use 'dragend'.
	                    // These are also needed in IE8 because of the bug described above.
	                    registerForSelectionChangeEvent(element, updateModel);  // 'selectionchange' covers cut, paste, drop, delete, etc.
	                    onEvent('dragend', deferUpdateModel);
	                }
	            } else {
	                // All other supported browsers support the 'input' event, which fires whenever the content of the element is changed
	                // through the user interface.
	                onEvent('input', updateModel);

	                if (safariVersion < 5 && ko.utils.tagNameLower(element) === "textarea") {
	                    // Safari <5 doesn't fire the 'input' event for <textarea> elements (it does fire 'textInput'
	                    // but only when typing). So we'll just catch as much as we can with keydown, cut, and paste.
	                    onEvent('keydown', deferUpdateModel);
	                    onEvent('paste', deferUpdateModel);
	                    onEvent('cut', deferUpdateModel);
	                } else if (operaVersion < 11) {
	                    // Opera 10 doesn't always fire the 'input' event for cut, paste, undo & drop operations.
	                    // We can try to catch some of those using 'keydown'.
	                    onEvent('keydown', deferUpdateModel);
	                } else if (firefoxVersion < 4.0) {
	                    // Firefox <= 3.6 doesn't fire the 'input' event when text is filled in through autocomplete
	                    onEvent('DOMAutoComplete', updateModel);

	                    // Firefox <=3.5 doesn't fire the 'input' event when text is dropped into the input.
	                    onEvent('dragdrop', updateModel);       // <3.5
	                    onEvent('drop', updateModel);           // 3.5
	                }
	            }
	        }

	        // Bind to the change event so that we can catch programmatic updates of the value that fire this event.
	        onEvent('change', updateModel);

	        ko.computed(updateView, null, { disposeWhenNodeIsRemoved: element });
	    }
	};
	ko.expressionRewriting.twoWayBindings['textInput'] = true;

	// textinput is an alias for textInput
	ko.bindingHandlers['textinput'] = {
	    // preprocess is the only way to set up a full alias
	    'preprocess': function (value, name, addBinding) {
	        addBinding('textInput', value);
	    }
	};

	})();ko.bindingHandlers['uniqueName'] = {
	    'init': function (element, valueAccessor) {
	        if (valueAccessor()) {
	            var name = "ko_unique_" + (++ko.bindingHandlers['uniqueName'].currentIndex);
	            ko.utils.setElementName(element, name);
	        }
	    }
	};
	ko.bindingHandlers['uniqueName'].currentIndex = 0;
	ko.bindingHandlers['value'] = {
	    'after': ['options', 'foreach'],
	    'init': function (element, valueAccessor, allBindings) {
	        // If the value binding is placed on a radio/checkbox, then just pass through to checkedValue and quit
	        if (element.tagName.toLowerCase() == "input" && (element.type == "checkbox" || element.type == "radio")) {
	            ko.applyBindingAccessorsToNode(element, { 'checkedValue': valueAccessor });
	            return;
	        }

	        // Always catch "change" event; possibly other events too if asked
	        var eventsToCatch = ["change"];
	        var requestedEventsToCatch = allBindings.get("valueUpdate");
	        var propertyChangedFired = false;
	        var elementValueBeforeEvent = null;

	        if (requestedEventsToCatch) {
	            if (typeof requestedEventsToCatch == "string") // Allow both individual event names, and arrays of event names
	                requestedEventsToCatch = [requestedEventsToCatch];
	            ko.utils.arrayPushAll(eventsToCatch, requestedEventsToCatch);
	            eventsToCatch = ko.utils.arrayGetDistinctValues(eventsToCatch);
	        }

	        var valueUpdateHandler = function() {
	            elementValueBeforeEvent = null;
	            propertyChangedFired = false;
	            var modelValue = valueAccessor();
	            var elementValue = ko.selectExtensions.readValue(element);
	            ko.expressionRewriting.writeValueToProperty(modelValue, allBindings, 'value', elementValue);
	        }

	        // Workaround for https://github.com/SteveSanderson/knockout/issues/122
	        // IE doesn't fire "change" events on textboxes if the user selects a value from its autocomplete list
	        var ieAutoCompleteHackNeeded = ko.utils.ieVersion && element.tagName.toLowerCase() == "input" && element.type == "text"
	                                       && element.autocomplete != "off" && (!element.form || element.form.autocomplete != "off");
	        if (ieAutoCompleteHackNeeded && ko.utils.arrayIndexOf(eventsToCatch, "propertychange") == -1) {
	            ko.utils.registerEventHandler(element, "propertychange", function () { propertyChangedFired = true });
	            ko.utils.registerEventHandler(element, "focus", function () { propertyChangedFired = false });
	            ko.utils.registerEventHandler(element, "blur", function() {
	                if (propertyChangedFired) {
	                    valueUpdateHandler();
	                }
	            });
	        }

	        ko.utils.arrayForEach(eventsToCatch, function(eventName) {
	            // The syntax "after<eventname>" means "run the handler asynchronously after the event"
	            // This is useful, for example, to catch "keydown" events after the browser has updated the control
	            // (otherwise, ko.selectExtensions.readValue(this) will receive the control's value *before* the key event)
	            var handler = valueUpdateHandler;
	            if (ko.utils.stringStartsWith(eventName, "after")) {
	                handler = function() {
	                    // The elementValueBeforeEvent variable is non-null *only* during the brief gap between
	                    // a keyX event firing and the valueUpdateHandler running, which is scheduled to happen
	                    // at the earliest asynchronous opportunity. We store this temporary information so that
	                    // if, between keyX and valueUpdateHandler, the underlying model value changes separately,
	                    // we can overwrite that model value change with the value the user just typed. Otherwise,
	                    // techniques like rateLimit can trigger model changes at critical moments that will
	                    // override the user's inputs, causing keystrokes to be lost.
	                    elementValueBeforeEvent = ko.selectExtensions.readValue(element);
	                    setTimeout(valueUpdateHandler, 0);
	                };
	                eventName = eventName.substring("after".length);
	            }
	            ko.utils.registerEventHandler(element, eventName, handler);
	        });

	        var updateFromModel = function () {
	            var newValue = ko.utils.unwrapObservable(valueAccessor());
	            var elementValue = ko.selectExtensions.readValue(element);

	            if (elementValueBeforeEvent !== null && newValue === elementValueBeforeEvent) {
	                setTimeout(updateFromModel, 0);
	                return;
	            }

	            var valueHasChanged = (newValue !== elementValue);

	            if (valueHasChanged) {
	                if (ko.utils.tagNameLower(element) === "select") {
	                    var allowUnset = allBindings.get('valueAllowUnset');
	                    var applyValueAction = function () {
	                        ko.selectExtensions.writeValue(element, newValue, allowUnset);
	                    };
	                    applyValueAction();

	                    if (!allowUnset && newValue !== ko.selectExtensions.readValue(element)) {
	                        // If you try to set a model value that can't be represented in an already-populated dropdown, reject that change,
	                        // because you're not allowed to have a model value that disagrees with a visible UI selection.
	                        ko.dependencyDetection.ignore(ko.utils.triggerEvent, null, [element, "change"]);
	                    } else {
	                        // Workaround for IE6 bug: It won't reliably apply values to SELECT nodes during the same execution thread
	                        // right after you've changed the set of OPTION nodes on it. So for that node type, we'll schedule a second thread
	                        // to apply the value as well.
	                        setTimeout(applyValueAction, 0);
	                    }
	                } else {
	                    ko.selectExtensions.writeValue(element, newValue);
	                }
	            }
	        };

	        ko.computed(updateFromModel, null, { disposeWhenNodeIsRemoved: element });
	    },
	    'update': function() {} // Keep for backwards compatibility with code that may have wrapped value binding
	};
	ko.expressionRewriting.twoWayBindings['value'] = true;
	ko.bindingHandlers['visible'] = {
	    'update': function (element, valueAccessor) {
	        var value = ko.utils.unwrapObservable(valueAccessor());
	        var isCurrentlyVisible = !(element.style.display == "none");
	        if (value && !isCurrentlyVisible)
	            element.style.display = "";
	        else if ((!value) && isCurrentlyVisible)
	            element.style.display = "none";
	    }
	};
	// 'click' is just a shorthand for the usual full-length event:{click:handler}
	makeEventHandlerShortcut('click');
	// If you want to make a custom template engine,
	//
	// [1] Inherit from this class (like ko.nativeTemplateEngine does)
	// [2] Override 'renderTemplateSource', supplying a function with this signature:
	//
	//        function (templateSource, bindingContext, options) {
	//            // - templateSource.text() is the text of the template you should render
	//            // - bindingContext.$data is the data you should pass into the template
	//            //   - you might also want to make bindingContext.$parent, bindingContext.$parents,
	//            //     and bindingContext.$root available in the template too
	//            // - options gives you access to any other properties set on "data-bind: { template: options }"
	//            // - templateDocument is the document object of the template
	//            //
	//            // Return value: an array of DOM nodes
	//        }
	//
	// [3] Override 'createJavaScriptEvaluatorBlock', supplying a function with this signature:
	//
	//        function (script) {
	//            // Return value: Whatever syntax means "Evaluate the JavaScript statement 'script' and output the result"
	//            //               For example, the jquery.tmpl template engine converts 'someScript' to '${ someScript }'
	//        }
	//
	//     This is only necessary if you want to allow data-bind attributes to reference arbitrary template variables.
	//     If you don't want to allow that, you can set the property 'allowTemplateRewriting' to false (like ko.nativeTemplateEngine does)
	//     and then you don't need to override 'createJavaScriptEvaluatorBlock'.

	ko.templateEngine = function () { };

	ko.templateEngine.prototype['renderTemplateSource'] = function (templateSource, bindingContext, options, templateDocument) {
	    throw new Error("Override renderTemplateSource");
	};

	ko.templateEngine.prototype['createJavaScriptEvaluatorBlock'] = function (script) {
	    throw new Error("Override createJavaScriptEvaluatorBlock");
	};

	ko.templateEngine.prototype['makeTemplateSource'] = function(template, templateDocument) {
	    // Named template
	    if (typeof template == "string") {
	        templateDocument = templateDocument || document;
	        var elem = templateDocument.getElementById(template);
	        if (!elem)
	            throw new Error("Cannot find template with ID " + template);
	        return new ko.templateSources.domElement(elem);
	    } else if ((template.nodeType == 1) || (template.nodeType == 8)) {
	        // Anonymous template
	        return new ko.templateSources.anonymousTemplate(template);
	    } else
	        throw new Error("Unknown template type: " + template);
	};

	ko.templateEngine.prototype['renderTemplate'] = function (template, bindingContext, options, templateDocument) {
	    var templateSource = this['makeTemplateSource'](template, templateDocument);
	    return this['renderTemplateSource'](templateSource, bindingContext, options, templateDocument);
	};

	ko.templateEngine.prototype['isTemplateRewritten'] = function (template, templateDocument) {
	    // Skip rewriting if requested
	    if (this['allowTemplateRewriting'] === false)
	        return true;
	    return this['makeTemplateSource'](template, templateDocument)['data']("isRewritten");
	};

	ko.templateEngine.prototype['rewriteTemplate'] = function (template, rewriterCallback, templateDocument) {
	    var templateSource = this['makeTemplateSource'](template, templateDocument);
	    var rewritten = rewriterCallback(templateSource['text']());
	    templateSource['text'](rewritten);
	    templateSource['data']("isRewritten", true);
	};

	ko.exportSymbol('templateEngine', ko.templateEngine);

	ko.templateRewriting = (function () {
	    var memoizeDataBindingAttributeSyntaxRegex = /(<([a-z]+\d*)(?:\s+(?!data-bind\s*=\s*)[a-z0-9\-]+(?:=(?:\"[^\"]*\"|\'[^\']*\'|[^>]*))?)*\s+)data-bind\s*=\s*(["'])([\s\S]*?)\3/gi;
	    var memoizeVirtualContainerBindingSyntaxRegex = /<!--\s*ko\b\s*([\s\S]*?)\s*-->/g;

	    function validateDataBindValuesForRewriting(keyValueArray) {
	        var allValidators = ko.expressionRewriting.bindingRewriteValidators;
	        for (var i = 0; i < keyValueArray.length; i++) {
	            var key = keyValueArray[i]['key'];
	            if (allValidators.hasOwnProperty(key)) {
	                var validator = allValidators[key];

	                if (typeof validator === "function") {
	                    var possibleErrorMessage = validator(keyValueArray[i]['value']);
	                    if (possibleErrorMessage)
	                        throw new Error(possibleErrorMessage);
	                } else if (!validator) {
	                    throw new Error("This template engine does not support the '" + key + "' binding within its templates");
	                }
	            }
	        }
	    }

	    function constructMemoizedTagReplacement(dataBindAttributeValue, tagToRetain, nodeName, templateEngine) {
	        var dataBindKeyValueArray = ko.expressionRewriting.parseObjectLiteral(dataBindAttributeValue);
	        validateDataBindValuesForRewriting(dataBindKeyValueArray);
	        var rewrittenDataBindAttributeValue = ko.expressionRewriting.preProcessBindings(dataBindKeyValueArray, {'valueAccessors':true});

	        // For no obvious reason, Opera fails to evaluate rewrittenDataBindAttributeValue unless it's wrapped in an additional
	        // anonymous function, even though Opera's built-in debugger can evaluate it anyway. No other browser requires this
	        // extra indirection.
	        var applyBindingsToNextSiblingScript =
	            "ko.__tr_ambtns(function($context,$element){return(function(){return{ " + rewrittenDataBindAttributeValue + " } })()},'" + nodeName.toLowerCase() + "')";
	        return templateEngine['createJavaScriptEvaluatorBlock'](applyBindingsToNextSiblingScript) + tagToRetain;
	    }

	    return {
	        ensureTemplateIsRewritten: function (template, templateEngine, templateDocument) {
	            if (!templateEngine['isTemplateRewritten'](template, templateDocument))
	                templateEngine['rewriteTemplate'](template, function (htmlString) {
	                    return ko.templateRewriting.memoizeBindingAttributeSyntax(htmlString, templateEngine);
	                }, templateDocument);
	        },

	        memoizeBindingAttributeSyntax: function (htmlString, templateEngine) {
	            return htmlString.replace(memoizeDataBindingAttributeSyntaxRegex, function () {
	                return constructMemoizedTagReplacement(/* dataBindAttributeValue: */ arguments[4], /* tagToRetain: */ arguments[1], /* nodeName: */ arguments[2], templateEngine);
	            }).replace(memoizeVirtualContainerBindingSyntaxRegex, function() {
	                return constructMemoizedTagReplacement(/* dataBindAttributeValue: */ arguments[1], /* tagToRetain: */ "<!-- ko -->", /* nodeName: */ "#comment", templateEngine);
	            });
	        },

	        applyMemoizedBindingsToNextSibling: function (bindings, nodeName) {
	            return ko.memoization.memoize(function (domNode, bindingContext) {
	                var nodeToBind = domNode.nextSibling;
	                if (nodeToBind && nodeToBind.nodeName.toLowerCase() === nodeName) {
	                    ko.applyBindingAccessorsToNode(nodeToBind, bindings, bindingContext);
	                }
	            });
	        }
	    }
	})();


	// Exported only because it has to be referenced by string lookup from within rewritten template
	ko.exportSymbol('__tr_ambtns', ko.templateRewriting.applyMemoizedBindingsToNextSibling);
	(function() {
	    // A template source represents a read/write way of accessing a template. This is to eliminate the need for template loading/saving
	    // logic to be duplicated in every template engine (and means they can all work with anonymous templates, etc.)
	    //
	    // Two are provided by default:
	    //  1. ko.templateSources.domElement       - reads/writes the text content of an arbitrary DOM element
	    //  2. ko.templateSources.anonymousElement - uses ko.utils.domData to read/write text *associated* with the DOM element, but
	    //                                           without reading/writing the actual element text content, since it will be overwritten
	    //                                           with the rendered template output.
	    // You can implement your own template source if you want to fetch/store templates somewhere other than in DOM elements.
	    // Template sources need to have the following functions:
	    //   text() 			- returns the template text from your storage location
	    //   text(value)		- writes the supplied template text to your storage location
	    //   data(key)			- reads values stored using data(key, value) - see below
	    //   data(key, value)	- associates "value" with this template and the key "key". Is used to store information like "isRewritten".
	    //
	    // Optionally, template sources can also have the following functions:
	    //   nodes()            - returns a DOM element containing the nodes of this template, where available
	    //   nodes(value)       - writes the given DOM element to your storage location
	    // If a DOM element is available for a given template source, template engines are encouraged to use it in preference over text()
	    // for improved speed. However, all templateSources must supply text() even if they don't supply nodes().
	    //
	    // Once you've implemented a templateSource, make your template engine use it by subclassing whatever template engine you were
	    // using and overriding "makeTemplateSource" to return an instance of your custom template source.

	    ko.templateSources = {};

	    // ---- ko.templateSources.domElement -----

	    ko.templateSources.domElement = function(element) {
	        this.domElement = element;
	    }

	    ko.templateSources.domElement.prototype['text'] = function(/* valueToWrite */) {
	        var tagNameLower = ko.utils.tagNameLower(this.domElement),
	            elemContentsProperty = tagNameLower === "script" ? "text"
	                                 : tagNameLower === "textarea" ? "value"
	                                 : "innerHTML";

	        if (arguments.length == 0) {
	            return this.domElement[elemContentsProperty];
	        } else {
	            var valueToWrite = arguments[0];
	            if (elemContentsProperty === "innerHTML")
	                ko.utils.setHtml(this.domElement, valueToWrite);
	            else
	                this.domElement[elemContentsProperty] = valueToWrite;
	        }
	    };

	    var dataDomDataPrefix = ko.utils.domData.nextKey() + "_";
	    ko.templateSources.domElement.prototype['data'] = function(key /*, valueToWrite */) {
	        if (arguments.length === 1) {
	            return ko.utils.domData.get(this.domElement, dataDomDataPrefix + key);
	        } else {
	            ko.utils.domData.set(this.domElement, dataDomDataPrefix + key, arguments[1]);
	        }
	    };

	    // ---- ko.templateSources.anonymousTemplate -----
	    // Anonymous templates are normally saved/retrieved as DOM nodes through "nodes".
	    // For compatibility, you can also read "text"; it will be serialized from the nodes on demand.
	    // Writing to "text" is still supported, but then the template data will not be available as DOM nodes.

	    var anonymousTemplatesDomDataKey = ko.utils.domData.nextKey();
	    ko.templateSources.anonymousTemplate = function(element) {
	        this.domElement = element;
	    }
	    ko.templateSources.anonymousTemplate.prototype = new ko.templateSources.domElement();
	    ko.templateSources.anonymousTemplate.prototype.constructor = ko.templateSources.anonymousTemplate;
	    ko.templateSources.anonymousTemplate.prototype['text'] = function(/* valueToWrite */) {
	        if (arguments.length == 0) {
	            var templateData = ko.utils.domData.get(this.domElement, anonymousTemplatesDomDataKey) || {};
	            if (templateData.textData === undefined && templateData.containerData)
	                templateData.textData = templateData.containerData.innerHTML;
	            return templateData.textData;
	        } else {
	            var valueToWrite = arguments[0];
	            ko.utils.domData.set(this.domElement, anonymousTemplatesDomDataKey, {textData: valueToWrite});
	        }
	    };
	    ko.templateSources.domElement.prototype['nodes'] = function(/* valueToWrite */) {
	        if (arguments.length == 0) {
	            var templateData = ko.utils.domData.get(this.domElement, anonymousTemplatesDomDataKey) || {};
	            return templateData.containerData;
	        } else {
	            var valueToWrite = arguments[0];
	            ko.utils.domData.set(this.domElement, anonymousTemplatesDomDataKey, {containerData: valueToWrite});
	        }
	    };

	    ko.exportSymbol('templateSources', ko.templateSources);
	    ko.exportSymbol('templateSources.domElement', ko.templateSources.domElement);
	    ko.exportSymbol('templateSources.anonymousTemplate', ko.templateSources.anonymousTemplate);
	})();
	(function () {
	    var _templateEngine;
	    ko.setTemplateEngine = function (templateEngine) {
	        if ((templateEngine != undefined) && !(templateEngine instanceof ko.templateEngine))
	            throw new Error("templateEngine must inherit from ko.templateEngine");
	        _templateEngine = templateEngine;
	    }

	    function invokeForEachNodeInContinuousRange(firstNode, lastNode, action) {
	        var node, nextInQueue = firstNode, firstOutOfRangeNode = ko.virtualElements.nextSibling(lastNode);
	        while (nextInQueue && ((node = nextInQueue) !== firstOutOfRangeNode)) {
	            nextInQueue = ko.virtualElements.nextSibling(node);
	            action(node, nextInQueue);
	        }
	    }

	    function activateBindingsOnContinuousNodeArray(continuousNodeArray, bindingContext) {
	        // To be used on any nodes that have been rendered by a template and have been inserted into some parent element
	        // Walks through continuousNodeArray (which *must* be continuous, i.e., an uninterrupted sequence of sibling nodes, because
	        // the algorithm for walking them relies on this), and for each top-level item in the virtual-element sense,
	        // (1) Does a regular "applyBindings" to associate bindingContext with this node and to activate any non-memoized bindings
	        // (2) Unmemoizes any memos in the DOM subtree (e.g., to activate bindings that had been memoized during template rewriting)

	        if (continuousNodeArray.length) {
	            var firstNode = continuousNodeArray[0],
	                lastNode = continuousNodeArray[continuousNodeArray.length - 1],
	                parentNode = firstNode.parentNode,
	                provider = ko.bindingProvider['instance'],
	                preprocessNode = provider['preprocessNode'];

	            if (preprocessNode) {
	                invokeForEachNodeInContinuousRange(firstNode, lastNode, function(node, nextNodeInRange) {
	                    var nodePreviousSibling = node.previousSibling;
	                    var newNodes = preprocessNode.call(provider, node);
	                    if (newNodes) {
	                        if (node === firstNode)
	                            firstNode = newNodes[0] || nextNodeInRange;
	                        if (node === lastNode)
	                            lastNode = newNodes[newNodes.length - 1] || nodePreviousSibling;
	                    }
	                });

	                // Because preprocessNode can change the nodes, including the first and last nodes, update continuousNodeArray to match.
	                // We need the full set, including inner nodes, because the unmemoize step might remove the first node (and so the real
	                // first node needs to be in the array).
	                continuousNodeArray.length = 0;
	                if (!firstNode) { // preprocessNode might have removed all the nodes, in which case there's nothing left to do
	                    return;
	                }
	                if (firstNode === lastNode) {
	                    continuousNodeArray.push(firstNode);
	                } else {
	                    continuousNodeArray.push(firstNode, lastNode);
	                    ko.utils.fixUpContinuousNodeArray(continuousNodeArray, parentNode);
	                }
	            }

	            // Need to applyBindings *before* unmemoziation, because unmemoization might introduce extra nodes (that we don't want to re-bind)
	            // whereas a regular applyBindings won't introduce new memoized nodes
	            invokeForEachNodeInContinuousRange(firstNode, lastNode, function(node) {
	                if (node.nodeType === 1 || node.nodeType === 8)
	                    ko.applyBindings(bindingContext, node);
	            });
	            invokeForEachNodeInContinuousRange(firstNode, lastNode, function(node) {
	                if (node.nodeType === 1 || node.nodeType === 8)
	                    ko.memoization.unmemoizeDomNodeAndDescendants(node, [bindingContext]);
	            });

	            // Make sure any changes done by applyBindings or unmemoize are reflected in the array
	            ko.utils.fixUpContinuousNodeArray(continuousNodeArray, parentNode);
	        }
	    }

	    function getFirstNodeFromPossibleArray(nodeOrNodeArray) {
	        return nodeOrNodeArray.nodeType ? nodeOrNodeArray
	                                        : nodeOrNodeArray.length > 0 ? nodeOrNodeArray[0]
	                                        : null;
	    }

	    function executeTemplate(targetNodeOrNodeArray, renderMode, template, bindingContext, options) {
	        options = options || {};
	        var firstTargetNode = targetNodeOrNodeArray && getFirstNodeFromPossibleArray(targetNodeOrNodeArray);
	        var templateDocument = (firstTargetNode || template || {}).ownerDocument;
	        var templateEngineToUse = (options['templateEngine'] || _templateEngine);
	        ko.templateRewriting.ensureTemplateIsRewritten(template, templateEngineToUse, templateDocument);
	        var renderedNodesArray = templateEngineToUse['renderTemplate'](template, bindingContext, options, templateDocument);

	        // Loosely check result is an array of DOM nodes
	        if ((typeof renderedNodesArray.length != "number") || (renderedNodesArray.length > 0 && typeof renderedNodesArray[0].nodeType != "number"))
	            throw new Error("Template engine must return an array of DOM nodes");

	        var haveAddedNodesToParent = false;
	        switch (renderMode) {
	            case "replaceChildren":
	                ko.virtualElements.setDomNodeChildren(targetNodeOrNodeArray, renderedNodesArray);
	                haveAddedNodesToParent = true;
	                break;
	            case "replaceNode":
	                ko.utils.replaceDomNodes(targetNodeOrNodeArray, renderedNodesArray);
	                haveAddedNodesToParent = true;
	                break;
	            case "ignoreTargetNode": break;
	            default:
	                throw new Error("Unknown renderMode: " + renderMode);
	        }

	        if (haveAddedNodesToParent) {
	            activateBindingsOnContinuousNodeArray(renderedNodesArray, bindingContext);
	            if (options['afterRender'])
	                ko.dependencyDetection.ignore(options['afterRender'], null, [renderedNodesArray, bindingContext['$data']]);
	        }

	        return renderedNodesArray;
	    }

	    function resolveTemplateName(template, data, context) {
	        // The template can be specified as:
	        if (ko.isObservable(template)) {
	            // 1. An observable, with string value
	            return template();
	        } else if (typeof template === 'function') {
	            // 2. A function of (data, context) returning a string
	            return template(data, context);
	        } else {
	            // 3. A string
	            return template;
	        }
	    }

	    ko.renderTemplate = function (template, dataOrBindingContext, options, targetNodeOrNodeArray, renderMode) {
	        options = options || {};
	        if ((options['templateEngine'] || _templateEngine) == undefined)
	            throw new Error("Set a template engine before calling renderTemplate");
	        renderMode = renderMode || "replaceChildren";

	        if (targetNodeOrNodeArray) {
	            var firstTargetNode = getFirstNodeFromPossibleArray(targetNodeOrNodeArray);

	            var whenToDispose = function () { return (!firstTargetNode) || !ko.utils.domNodeIsAttachedToDocument(firstTargetNode); }; // Passive disposal (on next evaluation)
	            var activelyDisposeWhenNodeIsRemoved = (firstTargetNode && renderMode == "replaceNode") ? firstTargetNode.parentNode : firstTargetNode;

	            return ko.dependentObservable( // So the DOM is automatically updated when any dependency changes
	                function () {
	                    // Ensure we've got a proper binding context to work with
	                    var bindingContext = (dataOrBindingContext && (dataOrBindingContext instanceof ko.bindingContext))
	                        ? dataOrBindingContext
	                        : new ko.bindingContext(ko.utils.unwrapObservable(dataOrBindingContext));

	                    var templateName = resolveTemplateName(template, bindingContext['$data'], bindingContext),
	                        renderedNodesArray = executeTemplate(targetNodeOrNodeArray, renderMode, templateName, bindingContext, options);

	                    if (renderMode == "replaceNode") {
	                        targetNodeOrNodeArray = renderedNodesArray;
	                        firstTargetNode = getFirstNodeFromPossibleArray(targetNodeOrNodeArray);
	                    }
	                },
	                null,
	                { disposeWhen: whenToDispose, disposeWhenNodeIsRemoved: activelyDisposeWhenNodeIsRemoved }
	            );
	        } else {
	            // We don't yet have a DOM node to evaluate, so use a memo and render the template later when there is a DOM node
	            return ko.memoization.memoize(function (domNode) {
	                ko.renderTemplate(template, dataOrBindingContext, options, domNode, "replaceNode");
	            });
	        }
	    };

	    ko.renderTemplateForEach = function (template, arrayOrObservableArray, options, targetNode, parentBindingContext) {
	        // Since setDomNodeChildrenFromArrayMapping always calls executeTemplateForArrayItem and then
	        // activateBindingsCallback for added items, we can store the binding context in the former to use in the latter.
	        var arrayItemContext;

	        // This will be called by setDomNodeChildrenFromArrayMapping to get the nodes to add to targetNode
	        var executeTemplateForArrayItem = function (arrayValue, index) {
	            // Support selecting template as a function of the data being rendered
	            arrayItemContext = parentBindingContext['createChildContext'](arrayValue, options['as'], function(context) {
	                context['$index'] = index;
	            });

	            var templateName = resolveTemplateName(template, arrayValue, arrayItemContext);
	            return executeTemplate(null, "ignoreTargetNode", templateName, arrayItemContext, options);
	        }

	        // This will be called whenever setDomNodeChildrenFromArrayMapping has added nodes to targetNode
	        var activateBindingsCallback = function(arrayValue, addedNodesArray, index) {
	            activateBindingsOnContinuousNodeArray(addedNodesArray, arrayItemContext);
	            if (options['afterRender'])
	                options['afterRender'](addedNodesArray, arrayValue);

	            // release the "cache" variable, so that it can be collected by
	            // the GC when its value isn't used from within the bindings anymore.
	            arrayItemContext = null;
	        };

	        return ko.dependentObservable(function () {
	            var unwrappedArray = ko.utils.unwrapObservable(arrayOrObservableArray) || [];
	            if (typeof unwrappedArray.length == "undefined") // Coerce single value into array
	                unwrappedArray = [unwrappedArray];

	            // Filter out any entries marked as destroyed
	            var filteredArray = ko.utils.arrayFilter(unwrappedArray, function(item) {
	                return options['includeDestroyed'] || item === undefined || item === null || !ko.utils.unwrapObservable(item['_destroy']);
	            });

	            // Call setDomNodeChildrenFromArrayMapping, ignoring any observables unwrapped within (most likely from a callback function).
	            // If the array items are observables, though, they will be unwrapped in executeTemplateForArrayItem and managed within setDomNodeChildrenFromArrayMapping.
	            ko.dependencyDetection.ignore(ko.utils.setDomNodeChildrenFromArrayMapping, null, [targetNode, filteredArray, executeTemplateForArrayItem, options, activateBindingsCallback]);

	        }, null, { disposeWhenNodeIsRemoved: targetNode });
	    };

	    var templateComputedDomDataKey = ko.utils.domData.nextKey();
	    function disposeOldComputedAndStoreNewOne(element, newComputed) {
	        var oldComputed = ko.utils.domData.get(element, templateComputedDomDataKey);
	        if (oldComputed && (typeof(oldComputed.dispose) == 'function'))
	            oldComputed.dispose();
	        ko.utils.domData.set(element, templateComputedDomDataKey, (newComputed && newComputed.isActive()) ? newComputed : undefined);
	    }

	    ko.bindingHandlers['template'] = {
	        'init': function(element, valueAccessor) {
	            // Support anonymous templates
	            var bindingValue = ko.utils.unwrapObservable(valueAccessor());
	            if (typeof bindingValue == "string" || bindingValue['name']) {
	                // It's a named template - clear the element
	                ko.virtualElements.emptyNode(element);
	            } else if ('nodes' in bindingValue) {
	                // We've been given an array of DOM nodes. Save them as the template source.
	                // There is no known use case for the node array being an observable array (if the output
	                // varies, put that behavior *into* your template - that's what templates are for), and
	                // the implementation would be a mess, so assert that it's not observable.
	                var nodes = bindingValue['nodes'] || [];
	                if (ko.isObservable(nodes)) {
	                    throw new Error('The "nodes" option must be a plain, non-observable array.');
	                }
	                var container = ko.utils.moveCleanedNodesToContainerElement(nodes); // This also removes the nodes from their current parent
	                new ko.templateSources.anonymousTemplate(element)['nodes'](container);
	            } else {
	                // It's an anonymous template - store the element contents, then clear the element
	                var templateNodes = ko.virtualElements.childNodes(element),
	                    container = ko.utils.moveCleanedNodesToContainerElement(templateNodes); // This also removes the nodes from their current parent
	                new ko.templateSources.anonymousTemplate(element)['nodes'](container);
	            }
	            return { 'controlsDescendantBindings': true };
	        },
	        'update': function (element, valueAccessor, allBindings, viewModel, bindingContext) {
	            var value = valueAccessor(),
	                dataValue,
	                options = ko.utils.unwrapObservable(value),
	                shouldDisplay = true,
	                templateComputed = null,
	                templateName;

	            if (typeof options == "string") {
	                templateName = value;
	                options = {};
	            } else {
	                templateName = options['name'];

	                // Support "if"/"ifnot" conditions
	                if ('if' in options)
	                    shouldDisplay = ko.utils.unwrapObservable(options['if']);
	                if (shouldDisplay && 'ifnot' in options)
	                    shouldDisplay = !ko.utils.unwrapObservable(options['ifnot']);

	                dataValue = ko.utils.unwrapObservable(options['data']);
	            }

	            if ('foreach' in options) {
	                // Render once for each data point (treating data set as empty if shouldDisplay==false)
	                var dataArray = (shouldDisplay && options['foreach']) || [];
	                templateComputed = ko.renderTemplateForEach(templateName || element, dataArray, options, element, bindingContext);
	            } else if (!shouldDisplay) {
	                ko.virtualElements.emptyNode(element);
	            } else {
	                // Render once for this single data point (or use the viewModel if no data was provided)
	                var innerBindingContext = ('data' in options) ?
	                    bindingContext['createChildContext'](dataValue, options['as']) :  // Given an explitit 'data' value, we create a child binding context for it
	                    bindingContext;                                                        // Given no explicit 'data' value, we retain the same binding context
	                templateComputed = ko.renderTemplate(templateName || element, innerBindingContext, options, element);
	            }

	            // It only makes sense to have a single template computed per element (otherwise which one should have its output displayed?)
	            disposeOldComputedAndStoreNewOne(element, templateComputed);
	        }
	    };

	    // Anonymous templates can't be rewritten. Give a nice error message if you try to do it.
	    ko.expressionRewriting.bindingRewriteValidators['template'] = function(bindingValue) {
	        var parsedBindingValue = ko.expressionRewriting.parseObjectLiteral(bindingValue);

	        if ((parsedBindingValue.length == 1) && parsedBindingValue[0]['unknown'])
	            return null; // It looks like a string literal, not an object literal, so treat it as a named template (which is allowed for rewriting)

	        if (ko.expressionRewriting.keyValueArrayContainsKey(parsedBindingValue, "name"))
	            return null; // Named templates can be rewritten, so return "no error"
	        return "This template engine does not support anonymous templates nested within its templates";
	    };

	    ko.virtualElements.allowedBindings['template'] = true;
	})();

	ko.exportSymbol('setTemplateEngine', ko.setTemplateEngine);
	ko.exportSymbol('renderTemplate', ko.renderTemplate);
	// Go through the items that have been added and deleted and try to find matches between them.
	ko.utils.findMovesInArrayComparison = function (left, right, limitFailedCompares) {
	    if (left.length && right.length) {
	        var failedCompares, l, r, leftItem, rightItem;
	        for (failedCompares = l = 0; (!limitFailedCompares || failedCompares < limitFailedCompares) && (leftItem = left[l]); ++l) {
	            for (r = 0; rightItem = right[r]; ++r) {
	                if (leftItem['value'] === rightItem['value']) {
	                    leftItem['moved'] = rightItem['index'];
	                    rightItem['moved'] = leftItem['index'];
	                    right.splice(r, 1);         // This item is marked as moved; so remove it from right list
	                    failedCompares = r = 0;     // Reset failed compares count because we're checking for consecutive failures
	                    break;
	                }
	            }
	            failedCompares += r;
	        }
	    }
	};

	ko.utils.compareArrays = (function () {
	    var statusNotInOld = 'added', statusNotInNew = 'deleted';

	    // Simple calculation based on Levenshtein distance.
	    function compareArrays(oldArray, newArray, options) {
	        // For backward compatibility, if the third arg is actually a bool, interpret
	        // it as the old parameter 'dontLimitMoves'. Newer code should use { dontLimitMoves: true }.
	        options = (typeof options === 'boolean') ? { 'dontLimitMoves': options } : (options || {});
	        oldArray = oldArray || [];
	        newArray = newArray || [];

	        if (oldArray.length <= newArray.length)
	            return compareSmallArrayToBigArray(oldArray, newArray, statusNotInOld, statusNotInNew, options);
	        else
	            return compareSmallArrayToBigArray(newArray, oldArray, statusNotInNew, statusNotInOld, options);
	    }

	    function compareSmallArrayToBigArray(smlArray, bigArray, statusNotInSml, statusNotInBig, options) {
	        var myMin = Math.min,
	            myMax = Math.max,
	            editDistanceMatrix = [],
	            smlIndex, smlIndexMax = smlArray.length,
	            bigIndex, bigIndexMax = bigArray.length,
	            compareRange = (bigIndexMax - smlIndexMax) || 1,
	            maxDistance = smlIndexMax + bigIndexMax + 1,
	            thisRow, lastRow,
	            bigIndexMaxForRow, bigIndexMinForRow;

	        for (smlIndex = 0; smlIndex <= smlIndexMax; smlIndex++) {
	            lastRow = thisRow;
	            editDistanceMatrix.push(thisRow = []);
	            bigIndexMaxForRow = myMin(bigIndexMax, smlIndex + compareRange);
	            bigIndexMinForRow = myMax(0, smlIndex - 1);
	            for (bigIndex = bigIndexMinForRow; bigIndex <= bigIndexMaxForRow; bigIndex++) {
	                if (!bigIndex)
	                    thisRow[bigIndex] = smlIndex + 1;
	                else if (!smlIndex)  // Top row - transform empty array into new array via additions
	                    thisRow[bigIndex] = bigIndex + 1;
	                else if (smlArray[smlIndex - 1] === bigArray[bigIndex - 1])
	                    thisRow[bigIndex] = lastRow[bigIndex - 1];                  // copy value (no edit)
	                else {
	                    var northDistance = lastRow[bigIndex] || maxDistance;       // not in big (deletion)
	                    var westDistance = thisRow[bigIndex - 1] || maxDistance;    // not in small (addition)
	                    thisRow[bigIndex] = myMin(northDistance, westDistance) + 1;
	                }
	            }
	        }

	        var editScript = [], meMinusOne, notInSml = [], notInBig = [];
	        for (smlIndex = smlIndexMax, bigIndex = bigIndexMax; smlIndex || bigIndex;) {
	            meMinusOne = editDistanceMatrix[smlIndex][bigIndex] - 1;
	            if (bigIndex && meMinusOne === editDistanceMatrix[smlIndex][bigIndex-1]) {
	                notInSml.push(editScript[editScript.length] = {     // added
	                    'status': statusNotInSml,
	                    'value': bigArray[--bigIndex],
	                    'index': bigIndex });
	            } else if (smlIndex && meMinusOne === editDistanceMatrix[smlIndex - 1][bigIndex]) {
	                notInBig.push(editScript[editScript.length] = {     // deleted
	                    'status': statusNotInBig,
	                    'value': smlArray[--smlIndex],
	                    'index': smlIndex });
	            } else {
	                --bigIndex;
	                --smlIndex;
	                if (!options['sparse']) {
	                    editScript.push({
	                        'status': "retained",
	                        'value': bigArray[bigIndex] });
	                }
	            }
	        }

	        // Set a limit on the number of consecutive non-matching comparisons; having it a multiple of
	        // smlIndexMax keeps the time complexity of this algorithm linear.
	        ko.utils.findMovesInArrayComparison(notInSml, notInBig, smlIndexMax * 10);

	        return editScript.reverse();
	    }

	    return compareArrays;
	})();

	ko.exportSymbol('utils.compareArrays', ko.utils.compareArrays);
	(function () {
	    // Objective:
	    // * Given an input array, a container DOM node, and a function from array elements to arrays of DOM nodes,
	    //   map the array elements to arrays of DOM nodes, concatenate together all these arrays, and use them to populate the container DOM node
	    // * Next time we're given the same combination of things (with the array possibly having mutated), update the container DOM node
	    //   so that its children is again the concatenation of the mappings of the array elements, but don't re-map any array elements that we
	    //   previously mapped - retain those nodes, and just insert/delete other ones

	    // "callbackAfterAddingNodes" will be invoked after any "mapping"-generated nodes are inserted into the container node
	    // You can use this, for example, to activate bindings on those nodes.

	    function mapNodeAndRefreshWhenChanged(containerNode, mapping, valueToMap, callbackAfterAddingNodes, index) {
	        // Map this array value inside a dependentObservable so we re-map when any dependency changes
	        var mappedNodes = [];
	        var dependentObservable = ko.dependentObservable(function() {
	            var newMappedNodes = mapping(valueToMap, index, ko.utils.fixUpContinuousNodeArray(mappedNodes, containerNode)) || [];

	            // On subsequent evaluations, just replace the previously-inserted DOM nodes
	            if (mappedNodes.length > 0) {
	                ko.utils.replaceDomNodes(mappedNodes, newMappedNodes);
	                if (callbackAfterAddingNodes)
	                    ko.dependencyDetection.ignore(callbackAfterAddingNodes, null, [valueToMap, newMappedNodes, index]);
	            }

	            // Replace the contents of the mappedNodes array, thereby updating the record
	            // of which nodes would be deleted if valueToMap was itself later removed
	            mappedNodes.length = 0;
	            ko.utils.arrayPushAll(mappedNodes, newMappedNodes);
	        }, null, { disposeWhenNodeIsRemoved: containerNode, disposeWhen: function() { return !ko.utils.anyDomNodeIsAttachedToDocument(mappedNodes); } });
	        return { mappedNodes : mappedNodes, dependentObservable : (dependentObservable.isActive() ? dependentObservable : undefined) };
	    }

	    var lastMappingResultDomDataKey = ko.utils.domData.nextKey();

	    ko.utils.setDomNodeChildrenFromArrayMapping = function (domNode, array, mapping, options, callbackAfterAddingNodes) {
	        // Compare the provided array against the previous one
	        array = array || [];
	        options = options || {};
	        var isFirstExecution = ko.utils.domData.get(domNode, lastMappingResultDomDataKey) === undefined;
	        var lastMappingResult = ko.utils.domData.get(domNode, lastMappingResultDomDataKey) || [];
	        var lastArray = ko.utils.arrayMap(lastMappingResult, function (x) { return x.arrayEntry; });
	        var editScript = ko.utils.compareArrays(lastArray, array, options['dontLimitMoves']);

	        // Build the new mapping result
	        var newMappingResult = [];
	        var lastMappingResultIndex = 0;
	        var newMappingResultIndex = 0;

	        var nodesToDelete = [];
	        var itemsToProcess = [];
	        var itemsForBeforeRemoveCallbacks = [];
	        var itemsForMoveCallbacks = [];
	        var itemsForAfterAddCallbacks = [];
	        var mapData;

	        function itemMovedOrRetained(editScriptIndex, oldPosition) {
	            mapData = lastMappingResult[oldPosition];
	            if (newMappingResultIndex !== oldPosition)
	                itemsForMoveCallbacks[editScriptIndex] = mapData;
	            // Since updating the index might change the nodes, do so before calling fixUpContinuousNodeArray
	            mapData.indexObservable(newMappingResultIndex++);
	            ko.utils.fixUpContinuousNodeArray(mapData.mappedNodes, domNode);
	            newMappingResult.push(mapData);
	            itemsToProcess.push(mapData);
	        }

	        function callCallback(callback, items) {
	            if (callback) {
	                for (var i = 0, n = items.length; i < n; i++) {
	                    if (items[i]) {
	                        ko.utils.arrayForEach(items[i].mappedNodes, function(node) {
	                            callback(node, i, items[i].arrayEntry);
	                        });
	                    }
	                }
	            }
	        }

	        for (var i = 0, editScriptItem, movedIndex; editScriptItem = editScript[i]; i++) {
	            movedIndex = editScriptItem['moved'];
	            switch (editScriptItem['status']) {
	                case "deleted":
	                    if (movedIndex === undefined) {
	                        mapData = lastMappingResult[lastMappingResultIndex];

	                        // Stop tracking changes to the mapping for these nodes
	                        if (mapData.dependentObservable)
	                            mapData.dependentObservable.dispose();

	                        // Queue these nodes for later removal
	                        nodesToDelete.push.apply(nodesToDelete, ko.utils.fixUpContinuousNodeArray(mapData.mappedNodes, domNode));
	                        if (options['beforeRemove']) {
	                            itemsForBeforeRemoveCallbacks[i] = mapData;
	                            itemsToProcess.push(mapData);
	                        }
	                    }
	                    lastMappingResultIndex++;
	                    break;

	                case "retained":
	                    itemMovedOrRetained(i, lastMappingResultIndex++);
	                    break;

	                case "added":
	                    if (movedIndex !== undefined) {
	                        itemMovedOrRetained(i, movedIndex);
	                    } else {
	                        mapData = { arrayEntry: editScriptItem['value'], indexObservable: ko.observable(newMappingResultIndex++) };
	                        newMappingResult.push(mapData);
	                        itemsToProcess.push(mapData);
	                        if (!isFirstExecution)
	                            itemsForAfterAddCallbacks[i] = mapData;
	                    }
	                    break;
	            }
	        }

	        // Call beforeMove first before any changes have been made to the DOM
	        callCallback(options['beforeMove'], itemsForMoveCallbacks);

	        // Next remove nodes for deleted items (or just clean if there's a beforeRemove callback)
	        ko.utils.arrayForEach(nodesToDelete, options['beforeRemove'] ? ko.cleanNode : ko.removeNode);

	        // Next add/reorder the remaining items (will include deleted items if there's a beforeRemove callback)
	        for (var i = 0, nextNode = ko.virtualElements.firstChild(domNode), lastNode, node; mapData = itemsToProcess[i]; i++) {
	            // Get nodes for newly added items
	            if (!mapData.mappedNodes)
	                ko.utils.extend(mapData, mapNodeAndRefreshWhenChanged(domNode, mapping, mapData.arrayEntry, callbackAfterAddingNodes, mapData.indexObservable));

	            // Put nodes in the right place if they aren't there already
	            for (var j = 0; node = mapData.mappedNodes[j]; nextNode = node.nextSibling, lastNode = node, j++) {
	                if (node !== nextNode)
	                    ko.virtualElements.insertAfter(domNode, node, lastNode);
	            }

	            // Run the callbacks for newly added nodes (for example, to apply bindings, etc.)
	            if (!mapData.initialized && callbackAfterAddingNodes) {
	                callbackAfterAddingNodes(mapData.arrayEntry, mapData.mappedNodes, mapData.indexObservable);
	                mapData.initialized = true;
	            }
	        }

	        // If there's a beforeRemove callback, call it after reordering.
	        // Note that we assume that the beforeRemove callback will usually be used to remove the nodes using
	        // some sort of animation, which is why we first reorder the nodes that will be removed. If the
	        // callback instead removes the nodes right away, it would be more efficient to skip reordering them.
	        // Perhaps we'll make that change in the future if this scenario becomes more common.
	        callCallback(options['beforeRemove'], itemsForBeforeRemoveCallbacks);

	        // Finally call afterMove and afterAdd callbacks
	        callCallback(options['afterMove'], itemsForMoveCallbacks);
	        callCallback(options['afterAdd'], itemsForAfterAddCallbacks);

	        // Store a copy of the array items we just considered so we can difference it next time
	        ko.utils.domData.set(domNode, lastMappingResultDomDataKey, newMappingResult);
	    }
	})();

	ko.exportSymbol('utils.setDomNodeChildrenFromArrayMapping', ko.utils.setDomNodeChildrenFromArrayMapping);
	ko.nativeTemplateEngine = function () {
	    this['allowTemplateRewriting'] = false;
	}

	ko.nativeTemplateEngine.prototype = new ko.templateEngine();
	ko.nativeTemplateEngine.prototype.constructor = ko.nativeTemplateEngine;
	ko.nativeTemplateEngine.prototype['renderTemplateSource'] = function (templateSource, bindingContext, options, templateDocument) {
	    var useNodesIfAvailable = !(ko.utils.ieVersion < 9), // IE<9 cloneNode doesn't work properly
	        templateNodesFunc = useNodesIfAvailable ? templateSource['nodes'] : null,
	        templateNodes = templateNodesFunc ? templateSource['nodes']() : null;

	    if (templateNodes) {
	        return ko.utils.makeArray(templateNodes.cloneNode(true).childNodes);
	    } else {
	        var templateText = templateSource['text']();
	        return ko.utils.parseHtmlFragment(templateText, templateDocument);
	    }
	};

	ko.nativeTemplateEngine.instance = new ko.nativeTemplateEngine();
	ko.setTemplateEngine(ko.nativeTemplateEngine.instance);

	ko.exportSymbol('nativeTemplateEngine', ko.nativeTemplateEngine);
	(function() {
	    ko.jqueryTmplTemplateEngine = function () {
	        // Detect which version of jquery-tmpl you're using. Unfortunately jquery-tmpl
	        // doesn't expose a version number, so we have to infer it.
	        // Note that as of Knockout 1.3, we only support jQuery.tmpl 1.0.0pre and later,
	        // which KO internally refers to as version "2", so older versions are no longer detected.
	        var jQueryTmplVersion = this.jQueryTmplVersion = (function() {
	            if (!jQueryInstance || !(jQueryInstance['tmpl']))
	                return 0;
	            // Since it exposes no official version number, we use our own numbering system. To be updated as jquery-tmpl evolves.
	            try {
	                if (jQueryInstance['tmpl']['tag']['tmpl']['open'].toString().indexOf('__') >= 0) {
	                    // Since 1.0.0pre, custom tags should append markup to an array called "__"
	                    return 2; // Final version of jquery.tmpl
	                }
	            } catch(ex) { /* Apparently not the version we were looking for */ }

	            return 1; // Any older version that we don't support
	        })();

	        function ensureHasReferencedJQueryTemplates() {
	            if (jQueryTmplVersion < 2)
	                throw new Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.");
	        }

	        function executeTemplate(compiledTemplate, data, jQueryTemplateOptions) {
	            return jQueryInstance['tmpl'](compiledTemplate, data, jQueryTemplateOptions);
	        }

	        this['renderTemplateSource'] = function(templateSource, bindingContext, options, templateDocument) {
	            templateDocument = templateDocument || document;
	            options = options || {};
	            ensureHasReferencedJQueryTemplates();

	            // Ensure we have stored a precompiled version of this template (don't want to reparse on every render)
	            var precompiled = templateSource['data']('precompiled');
	            if (!precompiled) {
	                var templateText = templateSource['text']() || "";
	                // Wrap in "with($whatever.koBindingContext) { ... }"
	                templateText = "{{ko_with $item.koBindingContext}}" + templateText + "{{/ko_with}}";

	                precompiled = jQueryInstance['template'](null, templateText);
	                templateSource['data']('precompiled', precompiled);
	            }

	            var data = [bindingContext['$data']]; // Prewrap the data in an array to stop jquery.tmpl from trying to unwrap any arrays
	            var jQueryTemplateOptions = jQueryInstance['extend']({ 'koBindingContext': bindingContext }, options['templateOptions']);

	            var resultNodes = executeTemplate(precompiled, data, jQueryTemplateOptions);
	            resultNodes['appendTo'](templateDocument.createElement("div")); // Using "appendTo" forces jQuery/jQuery.tmpl to perform necessary cleanup work

	            jQueryInstance['fragments'] = {}; // Clear jQuery's fragment cache to avoid a memory leak after a large number of template renders
	            return resultNodes;
	        };

	        this['createJavaScriptEvaluatorBlock'] = function(script) {
	            return "{{ko_code ((function() { return " + script + " })()) }}";
	        };

	        this['addTemplate'] = function(templateName, templateMarkup) {
	            document.write("<script type='text/html' id='" + templateName + "'>" + templateMarkup + "<" + "/script>");
	        };

	        if (jQueryTmplVersion > 0) {
	            jQueryInstance['tmpl']['tag']['ko_code'] = {
	                open: "__.push($1 || '');"
	            };
	            jQueryInstance['tmpl']['tag']['ko_with'] = {
	                open: "with($1) {",
	                close: "} "
	            };
	        }
	    };

	    ko.jqueryTmplTemplateEngine.prototype = new ko.templateEngine();
	    ko.jqueryTmplTemplateEngine.prototype.constructor = ko.jqueryTmplTemplateEngine;

	    // Use this one by default *only if jquery.tmpl is referenced*
	    var jqueryTmplTemplateEngineInstance = new ko.jqueryTmplTemplateEngine();
	    if (jqueryTmplTemplateEngineInstance.jQueryTmplVersion > 0)
	        ko.setTemplateEngine(jqueryTmplTemplateEngineInstance);

	    ko.exportSymbol('jqueryTmplTemplateEngine', ko.jqueryTmplTemplateEngine);
	})();
	}));
	}());
	})();

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(3);

	function ViewModel(options) {
		options || (options = {});
		
		this.options = options;
		this.view = options.view;
	}

	// Override the default `getView` logic that Durandal utilises to
	// fetch the view for each ViewModel instance.
	ViewModel.prototype.getView = function() {
		var view = $.trim(this.view);
		return $.parseHTML(view)[0];
	};

	module.exports = ViewModel;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.1.0 Copyright (c) 2012 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * The composition module encapsulates all functionality related to visual composition.
	 * @module composition
	 * @requires system
	 * @requires viewLocator
	 * @requires binder
	 * @requires viewEngine
	 * @requires activator
	 * @requires jquery
	 * @requires knockout
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(14), __webpack_require__(11), __webpack_require__(7), __webpack_require__(8), __webpack_require__(3), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (system, viewLocator, binder, viewEngine, activator, $, ko) {
	    var dummyModel = {},
	        activeViewAttributeName = 'data-active-view',
	        composition,
	        compositionCompleteCallbacks = [],
	        compositionCount = 0,
	        compositionDataKey = 'durandal-composition-data',
	        partAttributeName = 'data-part',
	        bindableSettings = ['model', 'view', 'transition', 'area', 'strategy', 'activationData', 'onError'],
	        visibilityKey = "durandal-visibility-data",
	        composeBindings = ['compose:'];
	    
	    function onError(context, error, element) {
	        try {
	            if (context.onError) {
	                try {
	                    context.onError(error, element);
	                } catch (e) {
	                    system.error(e);
	                }
	            } else {
	                system.error(error);
	            }
	        } finally {
	            endComposition(context, element, true);
	        }
	    }

	    function getHostState(parent) {
	        var elements = [];
	        var state = {
	            childElements: elements,
	            activeView: null
	        };

	        var child = ko.virtualElements.firstChild(parent);

	        while (child) {
	            if (child.nodeType == 1) {
	                elements.push(child);
	                if (child.getAttribute(activeViewAttributeName)) {
	                    state.activeView = child;
	                }
	            }

	            child = ko.virtualElements.nextSibling(child);
	        }

	        if(!state.activeView){
	            state.activeView = elements[0];
	        }

	        return state;
	    }

	    function endComposition(context, element, error) {
	        compositionCount--;

	        if(compositionCount === 0) {
	            var callBacks = compositionCompleteCallbacks;
	            compositionCompleteCallbacks = [];
	            
	            if (!error) {
	                setTimeout(function () {
	                    var i = callBacks.length;

	                    while (i--) {
	                        try {
	                            callBacks[i]();
	                        } catch (e) {
	                            onError(context, e, element);
	                        }
	                    }
	                }, 1);
	            }
	        }

	        cleanUp(context);
	    }

	    function cleanUp(context){
	        delete context.activeView;
	        delete context.viewElements;
	    }

	    function tryActivate(context, successCallback, skipActivation, element) {
	        if(skipActivation){
	            successCallback();
	        } else if (context.activate && context.model && context.model.activate) {
	            var result;

	            try{
	                if(system.isArray(context.activationData)) {
	                    result = context.model.activate.apply(context.model, context.activationData);
	                } else {
	                    result = context.model.activate(context.activationData);
	                }

	                if(result && result.then) {
	                    result.then(successCallback, function(reason) {
	                        onError(context, reason, element);
	                        successCallback();
	                    });
	                } else if(result || result === undefined) {
	                    successCallback();
	                } else {
	                    endComposition(context, element);
	                }
	            }
	            catch(e){
	                onError(context, e, element);
	            }
	        } else {
	            successCallback();
	        }
	    }

	    function triggerAttach(context, element) {
	        var context = this;

	        if (context.activeView) {
	            context.activeView.removeAttribute(activeViewAttributeName);
	        }

	        if (context.child) {
	            try{
	                if (context.model && context.model.attached) {
	                    if (context.composingNewView || context.alwaysTriggerAttach) {
	                        context.model.attached(context.child, context.parent, context);
	                    }
	                }

	                if (context.attached) {
	                    context.attached(context.child, context.parent, context);
	                }

	                context.child.setAttribute(activeViewAttributeName, true);

	                if (context.composingNewView && context.model && context.model.detached) {
	                    ko.utils.domNodeDisposal.addDisposeCallback(context.child, function () {
	                        try{
	                            context.model.detached(context.child, context.parent, context);
	                        }catch(e2){
	                            onError(context, e2, element);
	                        }
	                    });
	                }
	            }catch(e){
	                onError(context, e, element);
	            }
	        }

	        context.triggerAttach = system.noop;
	    }

	    function shouldTransition(context) {
	        if (system.isString(context.transition)) {
	            if (context.activeView) {
	                if (context.activeView == context.child) {
	                    return false;
	                }

	                if (!context.child) {
	                    return true;
	                }

	                if (context.skipTransitionOnSameViewId) {
	                    var currentViewId = context.activeView.getAttribute('data-view');
	                    var newViewId = context.child.getAttribute('data-view');
	                    return currentViewId != newViewId;
	                }
	            }

	            return true;
	        }

	        return false;
	    }

	    function cloneNodes(nodesArray) {
	        for (var i = 0, j = nodesArray.length, newNodesArray = []; i < j; i++) {
	            var clonedNode = nodesArray[i].cloneNode(true);
	            newNodesArray.push(clonedNode);
	        }
	        return newNodesArray;
	    }

	    function replaceParts(context){
	        var parts = cloneNodes(context.parts);
	        var replacementParts = composition.getParts(parts);
	        var standardParts = composition.getParts(context.child);

	        for (var partId in replacementParts) {
	            var toReplace = standardParts[partId];
	            if (!toReplace) {
	                toReplace = $('[data-part="' + partId + '"]', context.child).get(0);
	                if (!toReplace) {
	                    system.log('Could not find part to override: ' + partId);
	                    continue;
	                }
	            }

	            toReplace.parentNode.replaceChild(replacementParts[partId], toReplace);
	        }
	    }

	    function removePreviousView(context){
	        var children = ko.virtualElements.childNodes(context.parent), i, len;

	        if(!system.isArray(children)){
	            var arrayChildren = [];
	            for(i = 0, len = children.length; i < len; i++){
	                arrayChildren[i] = children[i];
	            }
	            children = arrayChildren;
	        }

	        for(i = 1,len = children.length; i < len; i++){
	            ko.removeNode(children[i]);
	        }
	    }

	    function hide(view) {
	        ko.utils.domData.set(view, visibilityKey, view.style.display);
	        view.style.display = 'none';
	    }

	    function show(view) {
	        var displayStyle = ko.utils.domData.get(view, visibilityKey);
	        view.style.display = displayStyle === 'none' ? 'block' : displayStyle;
	    }

	    function hasComposition(element){
	        var dataBind = element.getAttribute('data-bind');
	        if(!dataBind){
	            return false;
	        }

	        for(var i = 0, length = composeBindings.length; i < length; i++){
	            if(dataBind.indexOf(composeBindings[i]) > -1){
	                return true;
	            }
	        }

	        return false;
	    }

	    /**
	     * @class CompositionTransaction
	     * @static
	     */
	    var compositionTransaction = {
	        /**
	         * Registers a callback which will be invoked when the current composition transaction has completed. The transaction includes all parent and children compositions.
	         * @method complete
	         * @param {function} callback The callback to be invoked when composition is complete.
	         */
	        complete: function (callback) {
	            compositionCompleteCallbacks.push(callback);
	        }
	    };

	    /**
	     * @class CompositionModule
	     * @static
	     */
	    composition = {
	        /**
	         * An array of all the binding handler names (includeing :) that trigger a composition.
	         * @property {string} composeBindings
	         * @default ['compose:']
	         */
	        composeBindings:composeBindings,
	        /**
	         * Converts a transition name to its moduleId.
	         * @method convertTransitionToModuleId
	         * @param {string} name The name of the transtion.
	         * @return {string} The moduleId.
	         */
	        convertTransitionToModuleId: function (name) {
	            return 'transitions/' + name;
	        },
	        /**
	         * The name of the transition to use in all compositions.
	         * @property {string} defaultTransitionName
	         * @default null
	         */
	        defaultTransitionName: null,
	        /**
	         * Represents the currently executing composition transaction.
	         * @property {CompositionTransaction} current
	         */
	        current: compositionTransaction,
	        /**
	         * Registers a binding handler that will be invoked when the current composition transaction is complete.
	         * @method addBindingHandler
	         * @param {string} name The name of the binding handler.
	         * @param {object} [config] The binding handler instance. If none is provided, the name will be used to look up an existing handler which will then be converted to a composition handler.
	         * @param {function} [initOptionsFactory] If the registered binding needs to return options from its init call back to knockout, this function will server as a factory for those options. It will receive the same parameters that the init function does.
	         */
	        addBindingHandler:function(name, config, initOptionsFactory){
	            var key,
	                dataKey = 'composition-handler-' + name,
	                handler;

	            config = config || ko.bindingHandlers[name];
	            initOptionsFactory = initOptionsFactory || function(){ return undefined;  };

	            handler = ko.bindingHandlers[name] = {
	                init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
	                    if(compositionCount > 0){
	                        var data = {
	                            trigger:ko.observable(null)
	                        };

	                        composition.current.complete(function(){
	                            if(config.init){
	                                config.init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
	                            }

	                            if(config.update){
	                                ko.utils.domData.set(element, dataKey, config);
	                                data.trigger('trigger');
	                            }
	                        });

	                        ko.utils.domData.set(element, dataKey, data);
	                    }else{
	                        ko.utils.domData.set(element, dataKey, config);

	                        if(config.init){
	                            config.init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
	                        }
	                    }

	                    return initOptionsFactory(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
	                },
	                update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
	                    var data = ko.utils.domData.get(element, dataKey);

	                    if(data.update){
	                        return data.update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
	                    }

	                    if(data.trigger){
	                        data.trigger();
	                    }
	                }
	            };

	            for (key in config) {
	                if (key !== "init" && key !== "update") {
	                    handler[key] = config[key];
	                }
	            }
	        },
	        /**
	         * Gets an object keyed with all the elements that are replacable parts, found within the supplied elements. The key will be the part name and the value will be the element itself.
	         * @method getParts
	         * @param {DOMElement\DOMElement[]} elements The element(s) to search for parts.
	         * @return {object} An object keyed by part.
	         */
	        getParts: function(elements, parts) {
	            parts = parts || {};

	            if (!elements) {
	                return parts;
	            }

	            if (elements.length === undefined) {
	                elements = [elements];
	            }

	            for (var i = 0, length = elements.length; i < length; i++) {
	                var element = elements[i],
	                    id;

	                if (element.getAttribute) {
	                    id = element.getAttribute(partAttributeName);
	                    if (id) {
	                        parts[id] = element;
	                    }

	                    if (element.hasChildNodes() && !hasComposition(element)) {
	                        composition.getParts(element.childNodes, parts);
	                    }
	                }
	            }

	            return parts;
	        },
	        cloneNodes:cloneNodes,
	        finalize: function (context, element) {
	            if(context.transition === undefined) {
	                context.transition = this.defaultTransitionName;
	            }

	            if(!context.child && !context.activeView){
	                if (!context.cacheViews) {
	                    ko.virtualElements.emptyNode(context.parent);
	                }

	                context.triggerAttach(context, element);
	                endComposition(context, element);
	            } else if (shouldTransition(context)) {
	                var transitionModuleId = this.convertTransitionToModuleId(context.transition);

	                system.acquire(transitionModuleId).then(function (transition) {
	                    context.transition = transition;

	                    transition(context).then(function () {
	                        if (!context.cacheViews) {
	                            if(!context.child){
	                                ko.virtualElements.emptyNode(context.parent);
	                            }else{
	                                removePreviousView(context);
	                            }
	                        }else if(context.activeView){
	                            var instruction = binder.getBindingInstruction(context.activeView);
	                            if(instruction && instruction.cacheViews != undefined && !instruction.cacheViews){
	                                ko.removeNode(context.activeView);
	                            }else{
	                                hide(context.activeView);
	                            }
	                        }

	                        if (context.child) {
	                            show(context.child);
	                        }

	                        context.triggerAttach(context, element);
	                        endComposition(context, element);
	                    });
	                }).fail(function(err){
	                    onError(context, 'Failed to load transition (' + transitionModuleId + '). Details: ' + err.message, element);
	                });
	            } else {
	                if (context.child != context.activeView) {
	                    if (context.cacheViews && context.activeView) {
	                        var instruction = binder.getBindingInstruction(context.activeView);
	                        if(!instruction || (instruction.cacheViews != undefined && !instruction.cacheViews)){
	                            ko.removeNode(context.activeView);
	                        }else{
	                            hide(context.activeView);
	                        }
	                    }

	                    if (!context.child) {
	                        if (!context.cacheViews) {
	                            ko.virtualElements.emptyNode(context.parent);
	                        }
	                    } else {
	                        if (!context.cacheViews) {
	                            removePreviousView(context);
	                        }

	                        show(context.child);
	                    }
	                }

	                context.triggerAttach(context, element);
	                endComposition(context, element);
	            }
	        },
	        bindAndShow: function (child, element, context, skipActivation) {
	            context.child = child;
	            context.parent.__composition_context = context;

	            if (context.cacheViews) {
	                context.composingNewView = (ko.utils.arrayIndexOf(context.viewElements, child) == -1);
	            } else {
	                context.composingNewView = true;
	            }

	            tryActivate(context, function () {
	                if (context.parent.__composition_context == context) {
	                    delete context.parent.__composition_context;

	                    if (context.binding) {
	                        context.binding(context.child, context.parent, context);
	                    }

	                    if (context.preserveContext && context.bindingContext) {
	                        if (context.composingNewView) {
	                            if(context.parts){
	                                replaceParts(context);
	                            }

	                            hide(child);
	                            ko.virtualElements.prepend(context.parent, child);

	                        binder.bindContext(context.bindingContext, child, context.model, context.as);
	                        }
	                    } else if (child) {
	                        var modelToBind = context.model || dummyModel;
	                        var currentModel = ko.dataFor(child);

	                        if (currentModel != modelToBind) {
	                            if (!context.composingNewView) {
	                                ko.removeNode(child);
	                                viewEngine.createView(child.getAttribute('data-view')).then(function(recreatedView) {
	                                    composition.bindAndShow(recreatedView, element, context, true);
	                                });
	                                return;
	                            }

	                            if(context.parts){
	                                replaceParts(context);
	                            }

	                            hide(child);
	                            ko.virtualElements.prepend(context.parent, child);

	                            binder.bind(modelToBind, child);
	                        }
	                    }

	                    composition.finalize(context, element);
	                } else {
	                    endComposition(context, element);
	                }
	            }, skipActivation, element);
	        },
	        /**
	         * Eecutes the default view location strategy.
	         * @method defaultStrategy
	         * @param {object} context The composition context containing the model and possibly existing viewElements.
	         * @return {promise} A promise for the view.
	         */
	        defaultStrategy: function (context) {
	            return viewLocator.locateViewForObject(context.model, context.area, context.viewElements);
	        },
	        getSettings: function (valueAccessor, element) {
	            var value = valueAccessor(),
	                settings = ko.utils.unwrapObservable(value) || {},
	                activatorPresent = activator.isActivator(value),
	                moduleId;

	            if (system.isString(settings)) {
	                if (viewEngine.isViewUrl(settings)) {
	                    settings = {
	                        view: settings
	                    };
	                } else {
	                    settings = {
	                        model: settings,
	                        activate: !activatorPresent
	                    };
	                }

	                return settings;
	            }

	            moduleId = system.getModuleId(settings);
	            if (moduleId) {
	                settings = {
	                    model: settings,
	                    activate: !activatorPresent
	                };

	                return settings;
	            }

	            if(!activatorPresent && settings.model) {
	                activatorPresent = activator.isActivator(settings.model);
	            }

	            for (var attrName in settings) {
	                if (ko.utils.arrayIndexOf(bindableSettings, attrName) != -1) {
	                    settings[attrName] = ko.utils.unwrapObservable(settings[attrName]);
	                } else {
	                    settings[attrName] = settings[attrName];
	                }
	            }

	            if (activatorPresent) {
	                settings.activate = false;
	            } else if (settings.activate === undefined) {
	                settings.activate = true;
	            }

	            return settings;
	        },
	        executeStrategy: function (context, element) {
	            context.strategy(context).then(function (child) {
	                composition.bindAndShow(child, element, context);
	            });
	        },
	        inject: function (context, element) {
	            if (!context.model) {
	                this.bindAndShow(null, element, context);
	                return;
	            }

	            if (context.view) {
	                viewLocator.locateView(context.view, context.area, context.viewElements).then(function (child) {
	                    composition.bindAndShow(child, element, context);
	                });
	                return;
	            }

	            if (!context.strategy) {
	                context.strategy = this.defaultStrategy;
	            }

	            if (system.isString(context.strategy)) {
	                system.acquire(context.strategy).then(function (strategy) {
	                    context.strategy = strategy;
	                    composition.executeStrategy(context, element);
	                }).fail(function (err) {
	                    onError(context, 'Failed to load view strategy (' + context.strategy + '). Details: ' + err.message, element);
	                });
	            } else {
	                this.executeStrategy(context, element);
	            }
	        },
	        /**
	         * Initiates a composition.
	         * @method compose
	         * @param {DOMElement} element The DOMElement or knockout virtual element that serves as the parent for the composition.
	         * @param {object} settings The composition settings.
	         * @param {object} [bindingContext] The current binding context.
	         */
	        compose: function (element, settings, bindingContext, fromBinding) {
	            compositionCount++;

	            if(!fromBinding){
	                settings = composition.getSettings(function() { return settings; }, element);
	            }

	            if (settings.compositionComplete) {
	                compositionCompleteCallbacks.push(function () {
	                    settings.compositionComplete(settings.child, settings.parent, settings);
	                });
	            }

	            compositionCompleteCallbacks.push(function () {
	                if(settings.composingNewView && settings.model && settings.model.compositionComplete){
	                    settings.model.compositionComplete(settings.child, settings.parent, settings);
	                }
	            });

	            var hostState = getHostState(element);

	            settings.activeView = hostState.activeView;
	            settings.parent = element;
	            settings.triggerAttach = triggerAttach;
	            settings.bindingContext = bindingContext;

	            if (settings.cacheViews && !settings.viewElements) {
	                settings.viewElements = hostState.childElements;
	            }

	            if (!settings.model) {
	                if (!settings.view) {
	                    this.bindAndShow(null, element, settings);
	                } else {
	                    settings.area = settings.area || 'partial';
	                    settings.preserveContext = true;

	                    viewLocator.locateView(settings.view, settings.area, settings.viewElements).then(function (child) {
	                        composition.bindAndShow(child, element, settings);
	                    });
	                }
	            } else if (system.isString(settings.model)) {
	                system.acquire(settings.model).then(function (module) {
	                    settings.model = system.resolveObject(module);
	                    composition.inject(settings, element);
	                }).fail(function (err) {
	                    onError(settings, 'Failed to load composed module (' + settings.model + '). Details: ' + err.message, element);
	                });
	            } else {
	                composition.inject(settings, element);
	            }
	        }
	    };

	    ko.bindingHandlers.compose = {
	        init: function() {
	            return { controlsDescendantBindings: true };
	        },
	        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
	            var settings = composition.getSettings(valueAccessor, element);
	            if(settings.mode){
	                var data = ko.utils.domData.get(element, compositionDataKey);
	                if(!data){
	                    var childNodes = ko.virtualElements.childNodes(element);
	                    data = {};

	                    if(settings.mode === 'inline'){
	                        data.view = viewEngine.ensureSingleElement(childNodes);
	                    }else if(settings.mode === 'templated'){
	                        data.parts = cloneNodes(childNodes);
	                    }

	                    ko.virtualElements.emptyNode(element);
	                    ko.utils.domData.set(element, compositionDataKey, data);
	                }

	                if(settings.mode === 'inline'){
	                    settings.view = data.view.cloneNode(true);
	                }else if(settings.mode === 'templated'){
	                    settings.parts = data.parts;
	                }

	                settings.preserveContext = true;
	            }

	            composition.compose(element, settings, bindingContext, true);
	        }
	    };

	    ko.virtualElements.allowedBindings.compose = true;

	    return composition;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.1.0 Copyright (c) 2012 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * Connects the history module's url and history tracking support to Durandal's activation and composition engine allowing you to easily build navigation-style applications.
	 * @module router
	 * @requires system
	 * @requires app
	 * @requires activator
	 * @requires events
	 * @requires composition
	 * @requires history
	 * @requires knockout
	 * @requires jquery
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(9), __webpack_require__(8), __webpack_require__(12), __webpack_require__(5), __webpack_require__(17), __webpack_require__(2), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function(system, app, activator, events, composition, history, ko, $) {
	    var optionalParam = /\((.*?)\)/g;
	    var namedParam = /(\(\?)?:\w+/g;
	    var splatParam = /\*\w+/g;
	    var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
	    var startDeferred, rootRouter;
	    var trailingSlash = /\/$/;
	    var routesAreCaseSensitive = false;
	    var lastUrl = '/', lastTryUrl = '/';

	    function routeStringToRegExp(routeString) {
	        routeString = routeString.replace(escapeRegExp, '\\$&')
	            .replace(optionalParam, '(?:$1)?')
	            .replace(namedParam, function(match, optional) {
	                return optional ? match : '([^\/]+)';
	            })
	            .replace(splatParam, '(.*?)');

	        return new RegExp('^' + routeString + '$', routesAreCaseSensitive ? undefined : 'i');
	    }

	    function stripParametersFromRoute(route) {
	        var colonIndex = route.indexOf(':');
	        var length = colonIndex > 0 ? colonIndex - 1 : route.length;
	        return route.substring(0, length);
	    }

	    function endsWith(str, suffix) {
	        return str.indexOf(suffix, str.length - suffix.length) !== -1;
	    }

	    function compareArrays(first, second) {
	        if (!first || !second){
	            return false;
	        }

	        if (first.length != second.length) {
	            return false;
	        }

	        for (var i = 0, len = first.length; i < len; i++) {
	            if (first[i] != second[i]) {
	                return false;
	            }
	        }

	        return true;
	    }

	    function reconstructUrl(instruction){
	        if(!instruction.queryString){
	            return instruction.fragment;
	        }

	        return instruction.fragment + '?' + instruction.queryString;
	    }

	    /**
	     * @class Router
	     * @uses Events
	     */

	    /**
	     * Triggered when the navigation logic has completed.
	     * @event router:navigation:complete
	     * @param {object} instance The activated instance.
	     * @param {object} instruction The routing instruction.
	     * @param {Router} router The router.
	     */

	    /**
	     * Triggered when the navigation has been cancelled.
	     * @event router:navigation:cancelled
	     * @param {object} instance The activated instance.
	     * @param {object} instruction The routing instruction.
	     * @param {Router} router The router.
	     */

	    /**
	     * Triggered when navigation begins.
	     * @event router:navigation:processing
	     * @param {object} instruction The routing instruction.
	     * @param {Router} router The router.
	     */

	    /**
	     * Triggered right before a route is activated.
	     * @event router:route:activating
	     * @param {object} instance The activated instance.
	     * @param {object} instruction The routing instruction.
	     * @param {Router} router The router.
	     */

	    /**
	     * Triggered right before a route is configured.
	     * @event router:route:before-config
	     * @param {object} config The route config.
	     * @param {Router} router The router.
	     */

	    /**
	     * Triggered just after a route is configured.
	     * @event router:route:after-config
	     * @param {object} config The route config.
	     * @param {Router} router The router.
	     */

	    /**
	     * Triggered when the view for the activated instance is attached.
	     * @event router:navigation:attached
	     * @param {object} instance The activated instance.
	     * @param {object} instruction The routing instruction.
	     * @param {Router} router The router.
	     */

	    /**
	     * Triggered when the composition that the activated instance participates in is complete.
	     * @event router:navigation:composition-complete
	     * @param {object} instance The activated instance.
	     * @param {object} instruction The routing instruction.
	     * @param {Router} router The router.
	     */

	    /**
	     * Triggered when the router does not find a matching route.
	     * @event router:route:not-found
	     * @param {string} fragment The url fragment.
	     * @param {Router} router The router.
	     */

	    var createRouter = function() {
	        var queue = [],
	            isProcessing = ko.observable(false),
	            currentActivation,
	            currentInstruction,
	            activeItem = activator.create();

	        var router = {
	            /**
	             * The route handlers that are registered. Each handler consists of a `routePattern` and a `callback`.
	             * @property {object[]} handlers
	             */
	            handlers: [],
	            /**
	             * The route configs that are registered.
	             * @property {object[]} routes
	             */
	            routes: [],
	            /**
	             * The route configurations that have been designated as displayable in a nav ui (nav:true).
	             * @property {KnockoutObservableArray} navigationModel
	             */
	            navigationModel: ko.observableArray([]),
	            /**
	             * The active item/screen based on the current navigation state.
	             * @property {Activator} activeItem
	             */
	            activeItem: activeItem,
	            /**
	             * Indicates that the router (or a child router) is currently in the process of navigating.
	             * @property {KnockoutComputed} isNavigating
	             */
	            isNavigating: ko.computed(function() {
	                var current = activeItem();
	                var processing = isProcessing();
	                var currentRouterIsProcesing = current
	                    && current.router
	                    && current.router != router
	                    && current.router.isNavigating() ? true : false;
	                return  processing || currentRouterIsProcesing;
	            }),
	            /**
	             * An observable surfacing the active routing instruction that is currently being processed or has recently finished processing.
	             * The instruction object has `config`, `fragment`, `queryString`, `params` and `queryParams` properties.
	             * @property {KnockoutObservable} activeInstruction
	             */
	            activeInstruction:ko.observable(null),
	            __router__:true
	        };

	        events.includeIn(router);

	        activeItem.settings.areSameItem = function (currentItem, newItem, currentActivationData, newActivationData) {
	            if (currentItem == newItem) {
	                return compareArrays(currentActivationData, newActivationData);
	            }

	            return false;
	        };

	        activeItem.settings.findChildActivator = function(item) {
	            if (item && item.router && item.router.parent == router) {
	                return item.router.activeItem;
	            }

	            return null;
	        };

	        function hasChildRouter(instance, parentRouter) {
	            return instance.router && instance.router.parent == parentRouter;
	        }

	        function setCurrentInstructionRouteIsActive(flag) {
	            if (currentInstruction && currentInstruction.config.isActive) {
	                currentInstruction.config.isActive(flag);
	            }
	        }

	        function completeNavigation(instance, instruction, mode) {
	            system.log('Navigation Complete', instance, instruction);

	            var fromModuleId = system.getModuleId(currentActivation);
	            if (fromModuleId) {
	                router.trigger('router:navigation:from:' + fromModuleId);
	            }

	            currentActivation = instance;

	            setCurrentInstructionRouteIsActive(false);
	            currentInstruction = instruction;
	            setCurrentInstructionRouteIsActive(true);

	            var toModuleId = system.getModuleId(currentActivation);
	            if (toModuleId) {
	                router.trigger('router:navigation:to:' + toModuleId);
	            }

	            if (!hasChildRouter(instance, router)) {
	                router.updateDocumentTitle(instance, instruction);
	            }

	            switch (mode) {
	                case 'rootRouter':
	                    lastUrl = reconstructUrl(currentInstruction);
	                    break;
	                case 'rootRouterWithChild':
	                    lastTryUrl = reconstructUrl(currentInstruction);
	                    break;
	                case 'lastChildRouter':
	                    lastUrl = lastTryUrl;
	                    break;
	            }

	            rootRouter.explicitNavigation = false;
	            rootRouter.navigatingBack = false;

	            router.trigger('router:navigation:complete', instance, instruction, router);
	        }

	        function cancelNavigation(instance, instruction) {
	            system.log('Navigation Cancelled');

	            router.activeInstruction(currentInstruction);

	            router.navigate(lastUrl, false);

	            isProcessing(false);
	            rootRouter.explicitNavigation = false;
	            rootRouter.navigatingBack = false;
	            router.trigger('router:navigation:cancelled', instance, instruction, router);
	        }

	        function redirect(url) {
	            system.log('Navigation Redirecting');

	            isProcessing(false);
	            rootRouter.explicitNavigation = false;
	            rootRouter.navigatingBack = false;
	            router.navigate(url, { trigger: true, replace: true });
	        }

	        function activateRoute(activator, instance, instruction) {
	            rootRouter.navigatingBack = !rootRouter.explicitNavigation && currentActivation != instruction.fragment;
	            router.trigger('router:route:activating', instance, instruction, router);

	            var options = {
	                canDeactivate: !router.parent
	            };

	            activator.activateItem(instance, instruction.params, options).then(function(succeeded) {
	                if (succeeded) {
	                    var previousActivation = currentActivation;
	                    var withChild = hasChildRouter(instance, router);
	                    var mode = '';

	                    if (router.parent) {
	                        if(!withChild) {
	                            mode = 'lastChildRouter';
	                        }
	                    } else {
	                        if (withChild) {
	                            mode = 'rootRouterWithChild';
	                        } else {
	                            mode = 'rootRouter';
	                        }
	                    }

	                    completeNavigation(instance, instruction, mode);

	                    if (withChild) {
	                        instance.router.trigger('router:route:before-child-routes', instance, instruction, router);

	                        var fullFragment = instruction.fragment;
	                        if (instruction.queryString) {
	                            fullFragment += "?" + instruction.queryString;
	                        }

	                        instance.router.loadUrl(fullFragment);
	                    }

	                    if (previousActivation == instance) {
	                        router.attached();
	                        router.compositionComplete();
	                    }
	                } else if(activator.settings.lifecycleData && activator.settings.lifecycleData.redirect){
	                    redirect(activator.settings.lifecycleData.redirect);
	                }else{
	                    cancelNavigation(instance, instruction);
	                }

	                if (startDeferred) {
	                    startDeferred.resolve();
	                    startDeferred = null;
	                }
	            }).fail(function(err){
	                system.error(err);
	            });
	        }

	        /**
	         * Inspects routes and modules before activation. Can be used to protect access by cancelling navigation or redirecting.
	         * @method guardRoute
	         * @param {object} instance The module instance that is about to be activated by the router.
	         * @param {object} instruction The route instruction. The instruction object has config, fragment, queryString, params and queryParams properties.
	         * @return {Promise|Boolean|String} If a boolean, determines whether or not the route should activate or be cancelled. If a string, causes a redirect to the specified route. Can also be a promise for either of these value types.
	         */
	        function handleGuardedRoute(activator, instance, instruction) {
	            var resultOrPromise = router.guardRoute(instance, instruction);
	            if (resultOrPromise || resultOrPromise === '') {
	                if (resultOrPromise.then) {
	                    resultOrPromise.then(function(result) {
	                        if (result) {
	                            if (system.isString(result)) {
	                                redirect(result);
	                            } else {
	                                activateRoute(activator, instance, instruction);
	                            }
	                        } else {
	                            cancelNavigation(instance, instruction);
	                        }
	                    });
	                } else {
	                    if (system.isString(resultOrPromise)) {
	                        redirect(resultOrPromise);
	                    } else {
	                        activateRoute(activator, instance, instruction);
	                    }
	                }
	            } else {
	                cancelNavigation(instance, instruction);
	            }
	        }

	        function ensureActivation(activator, instance, instruction) {
	            if (router.guardRoute) {
	                handleGuardedRoute(activator, instance, instruction);
	            } else {
	                activateRoute(activator, instance, instruction);
	            }
	        }

	        function canReuseCurrentActivation(instruction) {
	            return currentInstruction
	                && currentInstruction.config.moduleId == instruction.config.moduleId
	                && currentActivation
	                && ((currentActivation.canReuseForRoute && currentActivation.canReuseForRoute.apply(currentActivation, instruction.params))
	                || (!currentActivation.canReuseForRoute && currentActivation.router && currentActivation.router.loadUrl));
	        }

	        function dequeueInstruction() {
	            if (isProcessing()) {
	                return;
	            }

	            var instruction = queue.shift();
	            queue = [];

	            if (!instruction) {
	                return;
	            }

	            isProcessing(true);
	            router.activeInstruction(instruction);
	            router.trigger('router:navigation:processing', instruction, router);

	            if (canReuseCurrentActivation(instruction)) {
	                var tempActivator = activator.create();
	                tempActivator.forceActiveItem(currentActivation); //enforce lifecycle without re-compose
	                tempActivator.settings.areSameItem = activeItem.settings.areSameItem;
	                tempActivator.settings.findChildActivator = activeItem.settings.findChildActivator;
	                ensureActivation(tempActivator, currentActivation, instruction);
	            } else if(!instruction.config.moduleId) {
	                ensureActivation(activeItem, {
	                    viewUrl:instruction.config.viewUrl,
	                    canReuseForRoute:function() {
	                        return true;
	                    }
	                }, instruction);
	            } else {
	                system.acquire(instruction.config.moduleId).then(function(m) {
	                    var instance = system.resolveObject(m);

	                    if(instruction.config.viewUrl) {
	                        instance.viewUrl = instruction.config.viewUrl;
	                    }

	                    ensureActivation(activeItem, instance, instruction);
	                }).fail(function(err) {
	                    system.error('Failed to load routed module (' + instruction.config.moduleId + '). Details: ' + err.message, err);
	                });
	            }
	        }

	        function queueInstruction(instruction) {
	            queue.unshift(instruction);
	            dequeueInstruction();
	        }

	        // Given a route, and a URL fragment that it matches, return the array of
	        // extracted decoded parameters. Empty or unmatched parameters will be
	        // treated as `null` to normalize cross-browser behavior.
	        function createParams(routePattern, fragment, queryString) {
	            var params = routePattern.exec(fragment).slice(1);

	            for (var i = 0; i < params.length; i++) {
	                var current = params[i];
	                params[i] = current ? decodeURIComponent(current) : null;
	            }

	            var queryParams = router.parseQueryString(queryString);
	            if (queryParams) {
	                params.push(queryParams);
	            }

	            return {
	                params:params,
	                queryParams:queryParams
	            };
	        }

	        function configureRoute(config){
	            router.trigger('router:route:before-config', config, router);

	            if (!system.isRegExp(config.route)) {
	                config.title = config.title || router.convertRouteToTitle(config.route);

	                if (!config.viewUrl) {
	                    config.moduleId = config.moduleId || router.convertRouteToModuleId(config.route);
	                }
	                
	                config.hash = config.hash || router.convertRouteToHash(config.route);

	                if (config.hasChildRoutes) {
	                    config.route = config.route + '*childRoutes';
	                }

	                config.routePattern = routeStringToRegExp(config.route);
	            }else{
	                config.routePattern = config.route;
	            }

	            config.isActive = config.isActive || ko.observable(false);
	            router.trigger('router:route:after-config', config, router);
	            router.routes.push(config);

	            router.route(config.routePattern, function(fragment, queryString) {
	                var paramInfo = createParams(config.routePattern, fragment, queryString);
	                queueInstruction({
	                    fragment: fragment,
	                    queryString:queryString,
	                    config: config,
	                    params: paramInfo.params,
	                    queryParams:paramInfo.queryParams
	                });
	            });
	        };

	        function mapRoute(config) {
	            if(system.isArray(config.route)){
	                var isActive = config.isActive || ko.observable(false);

	                for(var i = 0, length = config.route.length; i < length; i++){
	                    var current = system.extend({}, config);

	                    current.route = config.route[i];
	                    current.isActive = isActive;

	                    if(i > 0){
	                        delete current.nav;
	                    }

	                    configureRoute(current);
	                }
	            }else{
	                configureRoute(config);
	            }

	            return router;
	        }

	        /**
	         * Parses a query string into an object.
	         * @method parseQueryString
	         * @param {string} queryString The query string to parse.
	         * @return {object} An object keyed according to the query string parameters.
	         */
	        router.parseQueryString = function (queryString) {
	            var queryObject, pairs;

	            if (!queryString) {
	                return null;
	            }

	            pairs = queryString.split('&');

	            if (pairs.length == 0) {
	                return null;
	            }

	            queryObject = {};

	            for (var i = 0; i < pairs.length; i++) {
	                var pair = pairs[i];
	                if (pair === '') {
	                    continue;
	                }

	                var parts = pair.split(/=(.+)?/),
	                    key = parts[0],
	                    value = parts[1] && decodeURIComponent(parts[1].replace(/\+/g, ' '));

	                var existing = queryObject[key];

	                if (existing) {
	                    if (system.isArray(existing)) {
	                        existing.push(value);
	                    } else {
	                        queryObject[key] = [existing, value];
	                    }
	                }
	                else {
	                    queryObject[key] = value;
	                }
	            }

	            return queryObject;
	        };

	        /**
	         * Add a route to be tested when the url fragment changes.
	         * @method route
	         * @param {RegEx} routePattern The route pattern to test against.
	         * @param {function} callback The callback to execute when the route pattern is matched.
	         */
	        router.route = function(routePattern, callback) {
	            router.handlers.push({ routePattern: routePattern, callback: callback });
	        };

	        /**
	         * Attempt to load the specified URL fragment. If a route succeeds with a match, returns `true`. If no defined routes matches the fragment, returns `false`.
	         * @method loadUrl
	         * @param {string} fragment The URL fragment to find a match for.
	         * @return {boolean} True if a match was found, false otherwise.
	         */
	        router.loadUrl = function(fragment) {
	            var handlers = router.handlers,
	                queryString = null,
	                coreFragment = fragment,
	                queryIndex = fragment.indexOf('?');

	            if (queryIndex != -1) {
	                coreFragment = fragment.substring(0, queryIndex);
	                queryString = fragment.substr(queryIndex + 1);
	            }

	            if(router.relativeToParentRouter){
	                var instruction = this.parent.activeInstruction();
					coreFragment = queryIndex == -1 ? instruction.params.join('/') : instruction.params.slice(0, -1).join('/');

	                if(coreFragment && coreFragment.charAt(0) == '/'){
	                    coreFragment = coreFragment.substr(1);
	                }

	                if(!coreFragment){
	                    coreFragment = '';
	                }

	                coreFragment = coreFragment.replace('//', '/').replace('//', '/');
	            }

	            coreFragment = coreFragment.replace(trailingSlash, '');

	            for (var i = 0; i < handlers.length; i++) {
	                var current = handlers[i];
	                if (current.routePattern.test(coreFragment)) {
	                    current.callback(coreFragment, queryString);
	                    return true;
	                }
	            }

	            system.log('Route Not Found', fragment, currentInstruction);
	            router.trigger('router:route:not-found', fragment, router);

	            if (router.parent) {
	                lastUrl = lastTryUrl;
	            }

	            history.navigate(lastUrl, { trigger:false, replace:true });

	            rootRouter.explicitNavigation = false;
	            rootRouter.navigatingBack = false;

	            return false;
	        };

	        var titleSubscription;
	        function setTitle(value) {
	            var appTitle = ko.unwrap(app.title);

	            if (appTitle) {
	                document.title = value + " | " + appTitle;
	            } else {
	                document.title = value;
	            }
	        }  
	        
	        // Allow observable to be used for app.title
	        if(ko.isObservable(app.title)) {
	            app.title.subscribe(function () {
	                var instruction = router.activeInstruction();
	                var title = instruction != null ? ko.unwrap(instruction.config.title) : '';
	                setTitle(title);
	            });
	        }
	        
	        /**
	         * Updates the document title based on the activated module instance, the routing instruction and the app.title.
	         * @method updateDocumentTitle
	         * @param {object} instance The activated module.
	         * @param {object} instruction The routing instruction associated with the action. It has a `config` property that references the original route mapping config.
	         */
	        router.updateDocumentTitle = function (instance, instruction) {
	            var appTitle = ko.unwrap(app.title),
	                title = instruction.config.title;
	                
	            if (titleSubscription) {
	                titleSubscription.dispose();
	            }

	            if (title) {
	                if (ko.isObservable(title)) {
	                    titleSubscription = title.subscribe(setTitle);
	                    setTitle(title());
	                } else {
	                    setTitle(title);
	                }
	            } else if (appTitle) {
	                document.title = appTitle;
	            }
	        };

	        /**
	         * Save a fragment into the hash history, or replace the URL state if the
	         * 'replace' option is passed. You are responsible for properly URL-encoding
	         * the fragment in advance.
	         * The options object can contain `trigger: false` if you wish to not have the
	         * route callback be fired, or `replace: true`, if
	         * you wish to modify the current URL without adding an entry to the history.
	         * @method navigate
	         * @param {string} fragment The url fragment to navigate to.
	         * @param {object|boolean} options An options object with optional trigger and replace flags. You can also pass a boolean directly to set the trigger option. Trigger is `true` by default.
	         * @return {boolean} Returns true/false from loading the url.
	         */
	        router.navigate = function(fragment, options) {
	            if(fragment && fragment.indexOf('://') != -1) {
	                window.location.href = fragment;
	                return true;
	            }

	            if(options === undefined || (system.isBoolean(options) && options) || (system.isObject(options) && options.trigger)) {
	                rootRouter.explicitNavigation = true;
	            }

	            if ((system.isBoolean(options) && !options) || (options && options.trigger != undefined && !options.trigger)) {
	                lastUrl = fragment;
	            }

	            return history.navigate(fragment, options);
	        };

	        /**
	         * Navigates back in the browser history.
	         * @method navigateBack
	         */
	        router.navigateBack = function() {
	            history.navigateBack();
	        };

	        router.attached = function() {
	            router.trigger('router:navigation:attached', currentActivation, currentInstruction, router);
	        };

	        router.compositionComplete = function(){
	            isProcessing(false);
	            router.trigger('router:navigation:composition-complete', currentActivation, currentInstruction, router);
	            dequeueInstruction();
	        };

	        /**
	         * Converts a route to a hash suitable for binding to a link's href.
	         * @method convertRouteToHash
	         * @param {string} route
	         * @return {string} The hash.
	         */
	        router.convertRouteToHash = function(route) {
	            route = route.replace(/\*.*$/, '');

	            if(router.relativeToParentRouter){
	                var instruction = router.parent.activeInstruction(),
	                    hash = route ? instruction.config.hash + '/' + route : instruction.config.hash;

	                if(history._hasPushState){
	                    hash = '/' + hash;
	                }

	                hash = hash.replace('//', '/').replace('//', '/');
	                return hash;
	            }

	            if(history._hasPushState){
	                return route;
	            }

	            return "#" + route;
	        };

	        /**
	         * Converts a route to a module id. This is only called if no module id is supplied as part of the route mapping.
	         * @method convertRouteToModuleId
	         * @param {string} route
	         * @return {string} The module id.
	         */
	        router.convertRouteToModuleId = function(route) {
	            return stripParametersFromRoute(route);
	        };

	        /**
	         * Converts a route to a displayable title. This is only called if no title is specified as part of the route mapping.
	         * @method convertRouteToTitle
	         * @param {string} route
	         * @return {string} The title.
	         */
	        router.convertRouteToTitle = function(route) {
	            var value = stripParametersFromRoute(route);
	            return value.substring(0, 1).toUpperCase() + value.substring(1);
	        };

	        /**
	         * Maps route patterns to modules.
	         * @method map
	         * @param {string|object|object[]} route A route, config or array of configs.
	         * @param {object} [config] The config for the specified route.
	         * @chainable
	         * @example
	         router.map([
	         { route: '', title:'Home', moduleId: 'homeScreen', nav: true },
	         { route: 'customer/:id', moduleId: 'customerDetails'}
	         ]);
	         */
	        router.map = function(route, config) {
	            if (system.isArray(route)) {
	                for (var i = 0; i < route.length; i++) {
	                    router.map(route[i]);
	                }

	                return router;
	            }

	            if (system.isString(route) || system.isRegExp(route)) {
	                if (!config) {
	                    config = {};
	                } else if (system.isString(config)) {
	                    config = { moduleId: config };
	                }

	                config.route = route;
	            } else {
	                config = route;
	            }

	            return mapRoute(config);
	        };

	        /**
	         * Builds an observable array designed to bind a navigation UI to. The model will exist in the `navigationModel` property.
	         * @method buildNavigationModel
	         * @param {number} defaultOrder The default order to use for navigation visible routes that don't specify an order. The default is 100 and each successive route will be one more than that.
	         * @chainable
	         */
	        router.buildNavigationModel = function(defaultOrder) {
	            var nav = [], routes = router.routes;
	            var fallbackOrder = defaultOrder || 100;

	            for (var i = 0; i < routes.length; i++) {
	                var current = routes[i];

	                if (current.nav) {
	                    if (!system.isNumber(current.nav)) {
	                        current.nav = ++fallbackOrder;
	                    }

	                    nav.push(current);
	                }
	            }

	            nav.sort(function(a, b) { return a.nav - b.nav; });
	            router.navigationModel(nav);

	            return router;
	        };

	        /**
	         * Configures how the router will handle unknown routes.
	         * @method mapUnknownRoutes
	         * @param {string|function} [config] If not supplied, then the router will map routes to modules with the same name.
	         * If a string is supplied, it represents the module id to route all unknown routes to.
	         * Finally, if config is a function, it will be called back with the route instruction containing the route info. The function can then modify the instruction by adding a moduleId and the router will take over from there.
	         * @param {string} [replaceRoute] If config is a module id, then you can optionally provide a route to replace the url with.
	         * @chainable
	         */
	        router.mapUnknownRoutes = function(config, replaceRoute) {
	            var catchAllRoute = "*catchall";
	            var catchAllPattern = routeStringToRegExp(catchAllRoute);

	            router.route(catchAllPattern, function (fragment, queryString) {
	                var paramInfo = createParams(catchAllPattern, fragment, queryString);
	                var instruction = {
	                    fragment: fragment,
	                    queryString: queryString,
	                    config: {
	                        route: catchAllRoute,
	                        routePattern: catchAllPattern
	                    },
	                    params: paramInfo.params,
	                    queryParams: paramInfo.queryParams
	                };

	                if (!config) {
	                    instruction.config.moduleId = fragment;
	                } else if (system.isString(config)) {
	                    instruction.config.moduleId = config;
	                    if(replaceRoute){
	                        history.navigate(replaceRoute, { trigger:false, replace:true });
	                    }
	                } else if (system.isFunction(config)) {
	                    var result = config(instruction);
	                    if (result && result.then) {
	                        result.then(function() {
	                            router.trigger('router:route:before-config', instruction.config, router);
	                            router.trigger('router:route:after-config', instruction.config, router);
	                            queueInstruction(instruction);
	                        });
	                        return;
	                    }
	                } else {
	                    instruction.config = config;
	                    instruction.config.route = catchAllRoute;
	                    instruction.config.routePattern = catchAllPattern;
	                }

	                router.trigger('router:route:before-config', instruction.config, router);
	                router.trigger('router:route:after-config', instruction.config, router);
	                queueInstruction(instruction);
	            });

	            return router;
	        };

	        /**
	         * Resets the router by removing handlers, routes, event handlers and previously configured options.
	         * @method reset
	         * @chainable
	         */
	        router.reset = function() {
	            currentInstruction = currentActivation = undefined;
	            router.handlers = [];
	            router.routes = [];
	            router.off();
	            delete router.options;
	            return router;
	        };

	        /**
	         * Makes all configured routes and/or module ids relative to a certain base url.
	         * @method makeRelative
	         * @param {string|object} settings If string, the value is used as the base for routes and module ids. If an object, you can specify `route` and `moduleId` separately. In place of specifying route, you can set `fromParent:true` to make routes automatically relative to the parent router's active route.
	         * @chainable
	         */
	        router.makeRelative = function(settings){
	            if(system.isString(settings)){
	                settings = {
	                    moduleId:settings,
	                    route:settings
	                };
	            }

	            if(settings.moduleId && !endsWith(settings.moduleId, '/')){
	                settings.moduleId += '/';
	            }

	            if(settings.route && !endsWith(settings.route, '/')){
	                settings.route += '/';
	            }

	            if(settings.fromParent){
	                router.relativeToParentRouter = true;
	            }

	            router.on('router:route:before-config').then(function(config){
	                if(settings.moduleId){
	                    config.moduleId = settings.moduleId + config.moduleId;
	                }

	                if(settings.route){
	                    if(config.route === ''){
	                        config.route = settings.route.substring(0, settings.route.length - 1);
	                    }else{
	                        config.route = settings.route + config.route;
	                    }
	                }
	            });

	            if (settings.dynamicHash) {
	                router.on('router:route:after-config').then(function (config) {
	                    config.routePattern = routeStringToRegExp(config.route ? settings.dynamicHash + '/' + config.route : settings.dynamicHash);
	                    config.dynamicHash = config.dynamicHash || ko.observable(config.hash);
	                });

	                router.on('router:route:before-child-routes').then(function(instance, instruction, parentRouter) {
	                    var childRouter = instance.router;

	                    for(var i = 0; i < childRouter.routes.length; i++) {
	                        var route = childRouter.routes[i];
	                        var params = instruction.params.slice(0);

	                        route.hash = childRouter.convertRouteToHash(route.route)
	                            .replace(namedParam, function(match) {
	                                return params.length > 0 ? params.shift() : match;
	                            });

	                        route.dynamicHash(route.hash);
	                    }
	                });
	            }

	            return router;
	        };

	        /**
	         * Creates a child router.
	         * @method createChildRouter
	         * @return {Router} The child router.
	         */
	        router.createChildRouter = function() {
	            var childRouter = createRouter();
	            childRouter.parent = router;
	            return childRouter;
	        };

	        return router;
	    };

	    /**
	     * @class RouterModule
	     * @extends Router
	     * @static
	     */
	    rootRouter = createRouter();
	    rootRouter.explicitNavigation = false;
	    rootRouter.navigatingBack = false;

	    /**
	     * Makes the RegExp generated for routes case sensitive, rather than the default of case insensitive.
	     * @method makeRoutesCaseSensitive
	     */
	    rootRouter.makeRoutesCaseSensitive = function(){
	        routesAreCaseSensitive = true;
	    };

	    /**
	     * Verify that the target is the current window
	     * @method targetIsThisWindow
	     * @return {boolean} True if the event's target is the current window, false otherwise.
	     */
	    rootRouter.targetIsThisWindow = function(event) {
	        var targetWindow = $(event.target).attr('target');

	        if (!targetWindow ||
	            targetWindow === window.name ||
	            targetWindow === '_self' ||
	            (targetWindow === 'top' && window === window.top)) { return true; }

	        return false;
	    };

	    /**
	     * Activates the router and the underlying history tracking mechanism.
	     * @method activate
	     * @return {Promise} A promise that resolves when the router is ready.
	     */
	    rootRouter.activate = function(options) {
	        return system.defer(function(dfd) {
	            startDeferred = dfd;
	            rootRouter.options = system.extend({ routeHandler: rootRouter.loadUrl }, rootRouter.options, options);

	            history.activate(rootRouter.options);

	            if(history._hasPushState){
	                var routes = rootRouter.routes,
	                    i = routes.length;

	                while(i--){
	                    var current = routes[i];
	                    current.hash = current.hash.replace('#', '/');
	                }
	            }

	            var rootStripper = rootRouter.options.root && new RegExp("^" + rootRouter.options.root + "/");

	            $(document).delegate("a", 'click', function(evt){
	                if(history._hasPushState){
	                    if(!evt.altKey && !evt.ctrlKey && !evt.metaKey && !evt.shiftKey && rootRouter.targetIsThisWindow(evt)){
	                        var href = $(this).attr("href");

	                        // Ensure the protocol is not part of URL, meaning its relative.
	                        // Stop the event bubbling to ensure the link will not cause a page refresh.
	                        if (href != null && !(href.charAt(0) === "#" || /^[a-z]+:/i.test(href))) {
	                            rootRouter.explicitNavigation = true;
	                            evt.preventDefault();

	                            if (rootStripper) {
	                                href = href.replace(rootStripper, "");
	                            }

	                            history.navigate(href);
	                        }
	                    }
	                }else{
	                    rootRouter.explicitNavigation = true;
	                }
	            });

	            if(history.options.silent && startDeferred){
	                startDeferred.resolve();
	                startDeferred = null;
	            }
	        }).promise();
	    };

	    /**
	     * Disable history, perhaps temporarily. Not useful in a real app, but possibly useful for unit testing Routers.
	     * @method deactivate
	     */
	    rootRouter.deactivate = function() {
	        history.deactivate();
	    };

	    /**
	     * Installs the router's custom ko binding handler.
	     * @method install
	     */
	    rootRouter.install = function(){
	        ko.bindingHandlers.router = {
	            init: function() {
	                return { controlsDescendantBindings: true };
	            },
	            update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
	                var settings = ko.utils.unwrapObservable(valueAccessor()) || {};

	                if (settings.__router__) {
	                    settings = {
	                        model:settings.activeItem(),
	                        attached:settings.attached,
	                        compositionComplete:settings.compositionComplete,
	                        activate: false
	                    };
	                } else {
	                    var theRouter = ko.utils.unwrapObservable(settings.router || viewModel.router) || rootRouter;
	                    settings.model = theRouter.activeItem();
	                    settings.attached = theRouter.attached;
	                    settings.compositionComplete = theRouter.compositionComplete;
	                    settings.activate = false;
	                }

	                composition.compose(element, settings, bindingContext);
	            }
	        };

	        ko.virtualElements.allowedBindings.router = true;
	    };

	    return rootRouter;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.1.0 Copyright (c) 2012 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * The viewEngine module provides information to the viewLocator module which is used to locate the view's source file. The viewEngine also transforms a view id into a view instance.
	 * @module viewEngine
	 * @requires system
	 * @requires jquery
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (system, $) {
	    var parseMarkup;

	    if ($.parseHTML) {
	        parseMarkup = function (html) {
	            return $.parseHTML(html);
	        };
	    } else {
	        parseMarkup = function (html) {
	            return $(html).get();
	        };
	    }

	    /**
	     * @class ViewEngineModule
	     * @static
	     */
	    return {
	        cache:{},
	        /**
	         * The file extension that view source files are expected to have.
	         * @property {string} viewExtension
	         * @default .html
	         */
	        viewExtension: '.html',
	        /**
	         * The name of the RequireJS loader plugin used by the viewLocator to obtain the view source. (Use requirejs to map the plugin's full path).
	         * @property {string} viewPlugin
	         * @default text
	         */
	        viewPlugin: 'text',
	        /**
	         * Parameters passed to the RequireJS loader plugin used by the viewLocator to obtain the view source.
	         * @property {string} viewPluginParameters
	         * @default The empty string by default.
	         */
	        viewPluginParameters: '',
	        /**
	         * Determines if the url is a url for a view, according to the view engine.
	         * @method isViewUrl
	         * @param {string} url The potential view url.
	         * @return {boolean} True if the url is a view url, false otherwise.
	         */
	        isViewUrl: function (url) {
	            return url.indexOf(this.viewExtension, url.length - this.viewExtension.length) !== -1;
	        },
	        /**
	         * Converts a view url into a view id.
	         * @method convertViewUrlToViewId
	         * @param {string} url The url to convert.
	         * @return {string} The view id.
	         */
	        convertViewUrlToViewId: function (url) {
	            return url.substring(0, url.length - this.viewExtension.length);
	        },
	        /**
	         * Converts a view id into a full RequireJS path.
	         * @method convertViewIdToRequirePath
	         * @param {string} viewId The view id to convert.
	         * @return {string} The require path.
	         */
	        convertViewIdToRequirePath: function (viewId) {
	            var plugin = this.viewPlugin ? this.viewPlugin + '!' : '';
	            return plugin + viewId + this.viewExtension + this.viewPluginParameters;
	        },
	        /**
	         * Parses the view engine recognized markup and returns DOM elements.
	         * @method parseMarkup
	         * @param {string} markup The markup to parse.
	         * @return {DOMElement[]} The elements.
	         */
	        parseMarkup: parseMarkup,
	        /**
	         * Calls `parseMarkup` and then pipes the results through `ensureSingleElement`.
	         * @method processMarkup
	         * @param {string} markup The markup to process.
	         * @return {DOMElement} The view.
	         */
	        processMarkup: function (markup) {
	            var allElements = this.parseMarkup(markup);
	            return this.ensureSingleElement(allElements);
	        },
	        /**
	         * Converts an array of elements into a single element. White space and comments are removed. If a single element does not remain, then the elements are wrapped.
	         * @method ensureSingleElement
	         * @param {DOMElement[]} allElements The elements.
	         * @return {DOMElement} A single element.
	         */
	        ensureSingleElement:function(allElements){
	            if (allElements.length == 1) {
	                return allElements[0];
	            }

	            var withoutCommentsOrEmptyText = [];

	            for (var i = 0; i < allElements.length; i++) {
	                var current = allElements[i];
	                if (current.nodeType != 8) {
	                    if (current.nodeType == 3) {
	                        var result = /\S/.test(current.nodeValue);
	                        if (!result) {
	                            continue;
	                        }
	                    }

	                    withoutCommentsOrEmptyText.push(current);
	                }
	            }

	            if (withoutCommentsOrEmptyText.length > 1) {
	                return $(withoutCommentsOrEmptyText).wrapAll('<div class="durandal-wrapper"></div>').parent().get(0);
	            }

	            return withoutCommentsOrEmptyText[0];
	        },
	        /**
	         * Gets the view associated with the id from the cache of parsed views.
	         * @method tryGetViewFromCache
	         * @param {string} id The view id to lookup in the cache.
	         * @return {DOMElement|null} The cached view or null if it's not in the cache.
	         */
	        tryGetViewFromCache:function(id) {
	            return this.cache[id];
	        },
	        /**
	         * Puts the view associated with the id into the cache of parsed views.
	         * @method putViewInCache
	         * @param {string} id The view id whose view should be cached.
	         * @param {DOMElement} view The view to cache.
	         */
	        putViewInCache: function (id, view) {
	            this.cache[id] = view;
	        },
	        /**
	         * Creates the view associated with the view id.
	         * @method createView
	         * @param {string} viewId The view id whose view should be created.
	         * @return {Promise} A promise of the view.
	         */
	        createView: function(viewId) {
	            var that = this;
	            var requirePath = this.convertViewIdToRequirePath(viewId);
	            var existing = this.tryGetViewFromCache(requirePath);

	            if (existing) {
	                return system.defer(function(dfd) {
	                    dfd.resolve(existing.cloneNode(true));
	                }).promise();
	            }

	            return system.defer(function(dfd) {
	                system.acquire(requirePath).then(function(markup) {
	                    var element = that.processMarkup(markup);
	                    element.setAttribute('data-view', viewId);
	                    that.putViewInCache(requirePath, element);
	                    dfd.resolve(element.cloneNode(true));
	                }).fail(function(err) {
	                    that.createFallbackView(viewId, requirePath, err).then(function(element) {
	                        element.setAttribute('data-view', viewId);
	                        that.cache[requirePath] = element;
	                        dfd.resolve(element.cloneNode(true));
	                    });
	                });
	            }).promise();
	        },
	        /**
	         * Called when a view cannot be found to provide the opportunity to locate or generate a fallback view. Mainly used to ease development.
	         * @method createFallbackView
	         * @param {string} viewId The view id whose view should be created.
	         * @param {string} requirePath The require path that was attempted.
	         * @param {Error} requirePath The error that was returned from the attempt to locate the default view.
	         * @return {Promise} A promise for the fallback view.
	         */
	        createFallbackView: function (viewId, requirePath, err) {
	            var that = this,
	                message = 'View Not Found. Searched for "' + viewId + '" via path "' + requirePath + '".';

	            return system.defer(function(dfd) {
	                dfd.resolve(that.processMarkup('<div class="durandal-view-404">' + message + '</div>'));
	            }).promise();
	        }
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.1.0 Copyright (c) 2012 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * The activator module encapsulates all logic related to screen/component activation.
	 * An activator is essentially an asynchronous state machine that understands a particular state transition protocol.
	 * The protocol ensures that the following series of events always occur: `canDeactivate` (previous state), `canActivate` (new state), `deactivate` (previous state), `activate` (new state).
	 * Each of the _can_ callbacks may return a boolean, affirmative value or promise for one of those. If either of the _can_ functions yields a false result, then activation halts.
	 * @module activator
	 * @requires system
	 * @requires knockout
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (system, ko) {
	    var activator;
	    var defaultOptions = {
	        canDeactivate:true
	    };

	    function ensureSettings(settings) {
	        if (settings == undefined) {
	            settings = {};
	        }

	        if (!system.isBoolean(settings.closeOnDeactivate)) {
	            settings.closeOnDeactivate = activator.defaults.closeOnDeactivate;
	        }

	        if (!settings.beforeActivate) {
	            settings.beforeActivate = activator.defaults.beforeActivate;
	        }

	        if (!settings.afterDeactivate) {
	            settings.afterDeactivate = activator.defaults.afterDeactivate;
	        }

	        if(!settings.affirmations){
	            settings.affirmations = activator.defaults.affirmations;
	        }

	        if (!settings.interpretResponse) {
	            settings.interpretResponse = activator.defaults.interpretResponse;
	        }

	        if (!settings.areSameItem) {
	            settings.areSameItem = activator.defaults.areSameItem;
	        }

	        if (!settings.findChildActivator) {
	            settings.findChildActivator = activator.defaults.findChildActivator;
	        }

	        return settings;
	    }

	    function invoke(target, method, data) {
	        if (system.isArray(data)) {
	            return target[method].apply(target, data);
	        }

	        return target[method](data);
	    }

	    function deactivate(item, close, settings, dfd, setter) {
	        if (item && item.deactivate) {
	            system.log('Deactivating', item);

	            var result;
	            try {
	                result = item.deactivate(close);
	            } catch(error) {
	                system.log('ERROR: ' + error.message, error);
	                dfd.resolve(false);
	                return;
	            }

	            if (result && result.then) {
	                result.then(function() {
	                    settings.afterDeactivate(item, close, setter);
	                    dfd.resolve(true);
	                }, function(reason) {
	                    system.log(reason);
	                    dfd.resolve(false);
	                });
	            } else {
	                settings.afterDeactivate(item, close, setter);
	                dfd.resolve(true);
	            }
	        } else {
	            if (item) {
	                settings.afterDeactivate(item, close, setter);
	            }

	            dfd.resolve(true);
	        }
	    }

	    function activate(newItem, activeItem, callback, activationData) {
	        var result;

	        if(newItem && newItem.activate) {
	            system.log('Activating', newItem);

	            try {
	                result = invoke(newItem, 'activate', activationData);
	            } catch(error) {
	                system.log('ERROR: ' + error.message, error);
	                callback(false);
	                return;
	            }
	        }

	        if(result && result.then) {
	            result.then(function() {
	                activeItem(newItem);
	                callback(true);
	            }, function(reason) {
	                system.log('ERROR: ' + reason.message, reason);
	                callback(false);
	            });
	        } else {
	            activeItem(newItem);
	            callback(true);
	        }
	    }

	    function canDeactivateItem(item, close, settings, options) {
	        options = system.extend({}, defaultOptions, options);
	        settings.lifecycleData = null;

	        return system.defer(function (dfd) {
	            function continueCanDeactivate() {
	                if (item && item.canDeactivate && options.canDeactivate) {
	                    var resultOrPromise;
	                    try {
	                        resultOrPromise = item.canDeactivate(close);
	                    } catch (error) {
	                        system.log('ERROR: ' + error.message, error);
	                        dfd.resolve(false);
	                        return;
	                    }

	                    if (resultOrPromise.then) {
	                        resultOrPromise.then(function (result) {
	                            settings.lifecycleData = result;
	                            dfd.resolve(settings.interpretResponse(result));
	                        }, function (reason) {
	                            system.log('ERROR: ' + reason.message, reason);
	                            dfd.resolve(false);
	                        });
	                    } else {
	                        settings.lifecycleData = resultOrPromise;
	                        dfd.resolve(settings.interpretResponse(resultOrPromise));
	                    }
	                } else {
	                    dfd.resolve(true);
	                }
	            }

	            var childActivator = settings.findChildActivator(item);
	            if (childActivator) {
	                childActivator.canDeactivate().then(function(result) {
	                    if (result) {
	                        continueCanDeactivate();
	                    } else {
	                        dfd.resolve(false);
	                    }
	                });
	            } else {
	                continueCanDeactivate();
	            }
	        }).promise();
	    };

	    function canActivateItem(newItem, activeItem, settings, activeData, newActivationData) {
	        settings.lifecycleData = null;

	        return system.defer(function (dfd) {
	            if (settings.areSameItem(activeItem(), newItem, activeData, newActivationData)) {
	                dfd.resolve(true);
	                return;
	            }

	            if (newItem && newItem.canActivate) {
	                var resultOrPromise;
	                try {
	                    resultOrPromise = invoke(newItem, 'canActivate', newActivationData);
	                } catch (error) {
	                    system.log('ERROR: ' + error.message, error);
	                    dfd.resolve(false);
	                    return;
	                }

	                if (resultOrPromise.then) {
	                    resultOrPromise.then(function(result) {
	                        settings.lifecycleData = result;
	                        dfd.resolve(settings.interpretResponse(result));
	                    }, function(reason) {
	                        system.log('ERROR: ' + reason.message, reason);
	                        dfd.resolve(false);
	                    });
	                } else {
	                    settings.lifecycleData = resultOrPromise;
	                    dfd.resolve(settings.interpretResponse(resultOrPromise));
	                }
	            } else {
	                dfd.resolve(true);
	            }
	        }).promise();
	    };

	    /**
	     * An activator is a read/write computed observable that enforces the activation lifecycle whenever changing values.
	     * @class Activator
	     */
	    function createActivator(initialActiveItem, settings) {
	        var activeItem = ko.observable(null);
	        var activeData;

	        settings = ensureSettings(settings);

	        var computed = ko.computed({
	            read: function () {
	                return activeItem();
	            },
	            write: function (newValue) {
	                computed.viaSetter = true;
	                computed.activateItem(newValue);
	            }
	        });

	        computed.__activator__ = true;

	        /**
	         * The settings for this activator.
	         * @property {ActivatorSettings} settings
	         */
	        computed.settings = settings;
	        settings.activator = computed;

	        /**
	         * An observable which indicates whether or not the activator is currently in the process of activating an instance.
	         * @method isActivating
	         * @return {boolean}
	         */
	        computed.isActivating = ko.observable(false);

	        computed.forceActiveItem = function (item) {
	            activeItem(item);
	        };

	        /**
	         * Determines whether or not the specified item can be deactivated.
	         * @method canDeactivateItem
	         * @param {object} item The item to check.
	         * @param {boolean} close Whether or not to check if close is possible.
	         * @param {object} options Options for controlling the activation process.
	         * @return {promise}
	         */
	        computed.canDeactivateItem = function (item, close, options) {
	            return canDeactivateItem(item, close, settings, options);
	        };

	        /**
	         * Deactivates the specified item.
	         * @method deactivateItem
	         * @param {object} item The item to deactivate.
	         * @param {boolean} close Whether or not to close the item.
	         * @return {promise}
	         */
	        computed.deactivateItem = function (item, close) {
	            return system.defer(function(dfd) {
	                computed.canDeactivateItem(item, close).then(function(canDeactivate) {
	                    if (canDeactivate) {
	                        deactivate(item, close, settings, dfd, activeItem);
	                    } else {
	                        computed.notifySubscribers();
	                        dfd.resolve(false);
	                    }
	                });
	            }).promise();
	        };

	        /**
	         * Determines whether or not the specified item can be activated.
	         * @method canActivateItem
	         * @param {object} item The item to check.
	         * @param {object} activationData Data associated with the activation.
	         * @return {promise}
	         */
	        computed.canActivateItem = function (newItem, activationData) {
	            return canActivateItem(newItem, activeItem, settings, activeData, activationData);
	        };

	        /**
	         * Activates the specified item.
	         * @method activateItem
	         * @param {object} newItem The item to activate.
	         * @param {object} newActivationData Data associated with the activation.
	         * @param {object} options Options for controlling the activation process.
	         * @return {promise}
	         */
	        computed.activateItem = function (newItem, newActivationData, options) {
	            var viaSetter = computed.viaSetter;
	            computed.viaSetter = false;

	            return system.defer(function (dfd) {
	                if (computed.isActivating()) {
	                    dfd.resolve(false);
	                    return;
	                }

	                computed.isActivating(true);

	                var currentItem = activeItem();
	                if (settings.areSameItem(currentItem, newItem, activeData, newActivationData)) {
	                    computed.isActivating(false);
	                    dfd.resolve(true);
	                    return;
	                }

	                computed.canDeactivateItem(currentItem, settings.closeOnDeactivate, options).then(function (canDeactivate) {
	                    if (canDeactivate) {
	                        computed.canActivateItem(newItem, newActivationData).then(function (canActivate) {
	                            if (canActivate) {
	                                system.defer(function (dfd2) {
	                                    deactivate(currentItem, settings.closeOnDeactivate, settings, dfd2);
	                                }).promise().then(function () {
	                                        newItem = settings.beforeActivate(newItem, newActivationData);
	                                        activate(newItem, activeItem, function (result) {
	                                            activeData = newActivationData;
	                                            computed.isActivating(false);
	                                            dfd.resolve(result);
	                                        }, newActivationData);
	                                    });
	                            } else {
	                                if (viaSetter) {
	                                    computed.notifySubscribers();
	                                }

	                                computed.isActivating(false);
	                                dfd.resolve(false);
	                            }
	                        });
	                    } else {
	                        if (viaSetter) {
	                            computed.notifySubscribers();
	                        }

	                        computed.isActivating(false);
	                        dfd.resolve(false);
	                    }
	                });
	            }).promise();
	        };

	        /**
	         * Determines whether or not the activator, in its current state, can be activated.
	         * @method canActivate
	         * @return {promise}
	         */
	        computed.canActivate = function () {
	            var toCheck;

	            if (initialActiveItem) {
	                toCheck = initialActiveItem;
	                initialActiveItem = false;
	            } else {
	                toCheck = computed();
	            }

	            return computed.canActivateItem(toCheck);
	        };

	        /**
	         * Activates the activator, in its current state.
	         * @method activate
	         * @return {promise}
	         */
	        computed.activate = function () {
	            var toActivate;

	            if (initialActiveItem) {
	                toActivate = initialActiveItem;
	                initialActiveItem = false;
	            } else {
	                toActivate = computed();
	            }

	            return computed.activateItem(toActivate);
	        };

	        /**
	         * Determines whether or not the activator, in its current state, can be deactivated.
	         * @method canDeactivate
	         * @return {promise}
	         */
	        computed.canDeactivate = function (close) {
	            return computed.canDeactivateItem(computed(), close);
	        };

	        /**
	         * Deactivates the activator, in its current state.
	         * @method deactivate
	         * @return {promise}
	         */
	        computed.deactivate = function (close) {
	            return computed.deactivateItem(computed(), close);
	        };

	        computed.includeIn = function (includeIn) {
	            includeIn.canActivate = function () {
	                return computed.canActivate();
	            };

	            includeIn.activate = function () {
	                return computed.activate();
	            };

	            includeIn.canDeactivate = function (close) {
	                return computed.canDeactivate(close);
	            };

	            includeIn.deactivate = function (close) {
	                return computed.deactivate(close);
	            };
	        };

	        if (settings.includeIn) {
	            computed.includeIn(settings.includeIn);
	        } else if (initialActiveItem) {
	            computed.activate();
	        }

	        computed.forItems = function (items) {
	            settings.closeOnDeactivate = false;

	            settings.determineNextItemToActivate = function (list, lastIndex) {
	                var toRemoveAt = lastIndex - 1;

	                if (toRemoveAt == -1 && list.length > 1) {
	                    return list[1];
	                }

	                if (toRemoveAt > -1 && toRemoveAt < list.length - 1) {
	                    return list[toRemoveAt];
	                }

	                return null;
	            };

	            settings.beforeActivate = function (newItem) {
	                var currentItem = computed();

	                if (!newItem) {
	                    newItem = settings.determineNextItemToActivate(items, currentItem ? items.indexOf(currentItem) : 0);
	                } else {
	                    var index = items.indexOf(newItem);

	                    if (index == -1) {
	                        items.push(newItem);
	                    } else {
	                        newItem = items()[index];
	                    }
	                }

	                return newItem;
	            };

	            settings.afterDeactivate = function (oldItem, close) {
	                if (close) {
	                    items.remove(oldItem);
	                }
	            };

	            var originalCanDeactivate = computed.canDeactivate;
	            computed.canDeactivate = function (close) {
	                if (close) {
	                    return system.defer(function (dfd) {
	                        var list = items();
	                        var results = [];

	                        function finish() {
	                            for (var j = 0; j < results.length; j++) {
	                                if (!results[j]) {
	                                    dfd.resolve(false);
	                                    return;
	                                }
	                            }

	                            dfd.resolve(true);
	                        }

	                        for (var i = 0; i < list.length; i++) {
	                            computed.canDeactivateItem(list[i], close).then(function (result) {
	                                results.push(result);
	                                if (results.length == list.length) {
	                                    finish();
	                                }
	                            });
	                        }
	                    }).promise();
	                } else {
	                    return originalCanDeactivate();
	                }
	            };

	            var originalDeactivate = computed.deactivate;
	            computed.deactivate = function (close) {
	                if (close) {
	                    return system.defer(function (dfd) {
	                        var list = items();
	                        var results = 0;
	                        var listLength = list.length;

	                        function doDeactivate(item) {
	                            setTimeout(function () {
	                                computed.deactivateItem(item, close).then(function () {
	                                    results++;
	                                    items.remove(item);
	                                    if (results == listLength) {
	                                        dfd.resolve();
	                                    }
	                                });
	                            }, 1);
	                        }

	                        for (var i = 0; i < listLength; i++) {
	                            doDeactivate(list[i]);
	                        }
	                    }).promise();
	                } else {
	                    return originalDeactivate();
	                }
	            };

	            return computed;
	        };

	        return computed;
	    }

	    /**
	     * @class ActivatorSettings
	     * @static
	     */
	    var activatorSettings = {
	        /**
	         * The default value passed to an object's deactivate function as its close parameter.
	         * @property {boolean} closeOnDeactivate
	         * @default true
	         */
	        closeOnDeactivate: true,
	        /**
	         * Lower-cased words which represent a truthy value.
	         * @property {string[]} affirmations
	         * @default ['yes', 'ok', 'true']
	         */
	        affirmations: ['yes', 'ok', 'true'],
	        /**
	         * Interprets the response of a `canActivate` or `canDeactivate` call using the known affirmative values in the `affirmations` array.
	         * @method interpretResponse
	         * @param {object} value
	         * @return {boolean}
	         */
	        interpretResponse: function(value) {
	            if(system.isObject(value)) {
	                value = value.can || false;
	            }

	            if(system.isString(value)) {
	                return ko.utils.arrayIndexOf(this.affirmations, value.toLowerCase()) !== -1;
	            }

	            return value;
	        },
	        /**
	         * Determines whether or not the current item and the new item are the same.
	         * @method areSameItem
	         * @param {object} currentItem
	         * @param {object} newItem
	         * @param {object} currentActivationData
	         * @param {object} newActivationData
	         * @return {boolean}
	         */
	        areSameItem: function(currentItem, newItem, currentActivationData, newActivationData) {
	            return currentItem == newItem;
	        },
	        /**
	         * Called immediately before the new item is activated.
	         * @method beforeActivate
	         * @param {object} newItem
	         */
	        beforeActivate: function(newItem) {
	            return newItem;
	        },
	        /**
	         * Called immediately after the old item is deactivated.
	         * @method afterDeactivate
	         * @param {object} oldItem The previous item.
	         * @param {boolean} close Whether or not the previous item was closed.
	         * @param {function} setter The activate item setter function.
	         */
	        afterDeactivate: function(oldItem, close, setter) {
	            if(close && setter) {
	                setter(null);
	            }
	        },
	        findChildActivator: function(item){
	            return null;
	        }
	    };

	    /**
	     * @class ActivatorModule
	     * @static
	     */
	    activator = {
	        /**
	         * The default settings used by activators.
	         * @property {ActivatorSettings} defaults
	         */
	        defaults: activatorSettings,
	        /**
	         * Creates a new activator.
	         * @method create
	         * @param {object} [initialActiveItem] The item which should be immediately activated upon creation of the ativator.
	         * @param {ActivatorSettings} [settings] Per activator overrides of the default activator settings.
	         * @return {Activator} The created activator.
	         */
	        create: createActivator,
	        /**
	         * Determines whether or not the provided object is an activator or not.
	         * @method isActivator
	         * @param {object} object Any object you wish to verify as an activator or not.
	         * @return {boolean} True if the object is an activator; false otherwise.
	         */
	        isActivator:function(object){
	            return object && object.__activator__;
	        }
	    };

	    return activator;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.1.0 Copyright (c) 2012 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * The app module controls app startup, plugin loading/configuration and root visual display.
	 * @module app
	 * @requires system
	 * @requires viewEngine
	 * @requires composition
	 * @requires events
	 * @requires jquery
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(7), __webpack_require__(5), __webpack_require__(12), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function(system, viewEngine, composition, Events, $) {
	    var app,
	        allPluginIds = [],
	        allPluginConfigs = [];

	    function loadPlugins(){
	        return system.defer(function(dfd){
	            if(allPluginIds.length == 0){
	                dfd.resolve();
	                return;
	            }

	            system.acquire(allPluginIds).then(function(loaded){
	                for(var i = 0; i < loaded.length; i++){
	                    var currentModule = loaded[i];

	                    if(currentModule.install){
	                        var config = allPluginConfigs[i];
	                        if(!system.isObject(config)){
	                            config = {};
	                        }

	                        currentModule.install(config);
	                        system.log('Plugin:Installed ' + allPluginIds[i]);
	                    }else{
	                        system.log('Plugin:Loaded ' + allPluginIds[i]);
	                    }
	                }

	                dfd.resolve();
	            }).fail(function(err){
	                system.error('Failed to load plugin(s). Details: ' + err.message);
	            });
	        }).promise();
	    }

	    /**
	     * @class AppModule
	     * @static
	     * @uses Events
	     */
	    app = {
	        /**
	         * The title of your application.
	         * @property {string} title
	         */
	        title: 'Application',
	        /**
	         * Configures one or more plugins to be loaded and installed into the application.
	         * @method configurePlugins
	         * @param {object} config Keys are plugin names. Values can be truthy, to simply install the plugin, or a configuration object to pass to the plugin.
	         * @param {string} [baseUrl] The base url to load the plugins from.
	         */
	        configurePlugins:function(config, baseUrl){
	            var pluginIds = system.keys(config);
	            baseUrl = baseUrl || 'plugins/';

	            if(baseUrl.indexOf('/', baseUrl.length - 1) === -1){
	                baseUrl += '/';
	            }

	            for(var i = 0; i < pluginIds.length; i++){
	                var key = pluginIds[i];
	                allPluginIds.push(baseUrl + key);
	                allPluginConfigs.push(config[key]);
	            }
	        },
	        /**
	         * Starts the application.
	         * @method start
	         * @return {promise}
	         */
	        start: function() {
	            system.log('Application:Starting');

	            if (this.title) {
	                document.title = this.title;
	            }

	            return system.defer(function (dfd) {
	                $(function() {
	                    loadPlugins().then(function(){
	                        dfd.resolve();
	                        system.log('Application:Started');
	                    });
	                });
	            }).promise();
	        },
	        /**
	         * Sets the root module/view for the application.
	         * @method setRoot
	         * @param {string} root The root view or module.
	         * @param {string} [transition] The transition to use from the previous root (or splash screen) into the new root.
	         * @param {string} [applicationHost] The application host element or id. By default the id 'applicationHost' will be used.
	         */
	        setRoot: function(root, transition, applicationHost) {
	            var hostElement, settings = { activate:true, transition: transition };

	            if (!applicationHost || system.isString(applicationHost)) {
	                hostElement = document.getElementById(applicationHost || 'applicationHost');
	            } else {
	                hostElement = applicationHost;
	            }

	            if (system.isString(root)) {
	                if (viewEngine.isViewUrl(root)) {
	                    settings.view = root;
	                } else {
	                    settings.model = root;
	                }
	            } else {
	                settings.model = root;
	            }

	            function finishComposition() {
	                if(settings.model) {
	                    if (settings.model.canActivate) {
	                        try {
	                            var result = settings.model.canActivate();
	                            if (result && result.then) {
	                                result.then(function (actualResult) {
	                                    if (actualResult) {
	                                        composition.compose(hostElement, settings);
	                                    }
	                                }).fail(function (err) {
	                                    system.error(err);
	                                });
	                            } else if (result) {
	                                composition.compose(hostElement, settings);
	                            }
	                        } catch (er) {
	                            system.error(er);
	                        }
	                    } else {
	                        composition.compose(hostElement, settings);
	                    }
	                } else {
	                    composition.compose(hostElement, settings);
	                }
	            }

	            if(system.isString(settings.model)) {
	                system.acquire(settings.model).then(function(module) {
	                    settings.model = system.resolveObject(module);
	                    finishComposition();
	                }).fail(function(err) {
	                    system.error('Failed to load root module (' + settings.model + '). Details: ' + err.message);
	                });
	            } else {
	                finishComposition();
	            }
	        }
	    };

	    Events.includeIn(app);

	    return app;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.1.0 Copyright (c) 2012 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * The dialog module enables the display of message boxes, custom modal dialogs and other overlays or slide-out UI abstractions. Dialogs are constructed by the composition system which interacts with a user defined dialog context. The dialog module enforced the activator lifecycle.
	 * @module dialog
	 * @requires system
	 * @requires app
	 * @requires composition
	 * @requires activator
	 * @requires viewEngine
	 * @requires jquery
	 * @requires knockout
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(9), __webpack_require__(5), __webpack_require__(8), __webpack_require__(7), __webpack_require__(3), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (system, app, composition, activator, viewEngine, $, ko) {
	    var contexts = {},
	        dialogCount = ko.observable(0),
	        dialog;

	    /**
	     * Models a message box's message, title and options.
	     * @class MessageBox
	     */
	    var MessageBox = function (message, title, options, autoclose, settings) {
	        this.message = message;
	        this.title = title || MessageBox.defaultTitle;
	        this.options = options || MessageBox.defaultOptions;
	        this.autoclose = autoclose || false;
	        this.settings = $.extend({}, MessageBox.defaultSettings, settings);
	    };

	    /**
	     * Selects an option and closes the message box, returning the selected option through the dialog system's promise.
	     * @method selectOption
	     * @param {string} dialogResult The result to select.
	     */
	    MessageBox.prototype.selectOption = function (dialogResult) {
	        dialog.close(this, dialogResult);
	    };

	    /**
	     * Provides the view to the composition system.
	     * @method getView
	     * @return {DOMElement} The view of the message box.
	     */
	    MessageBox.prototype.getView = function () {
	        return viewEngine.processMarkup(MessageBox.defaultViewMarkup);
	    };

	    /**
	     * Configures a custom view to use when displaying message boxes.
	     * @method setViewUrl
	     * @param {string} viewUrl The view url relative to the base url which the view locator will use to find the message box's view.
	     * @static
	     */
	    MessageBox.setViewUrl = function (viewUrl) {
	        delete MessageBox.prototype.getView;
	        MessageBox.prototype.viewUrl = viewUrl;
	    };

	    /**
	     * The title to be used for the message box if one is not provided.
	     * @property {string} defaultTitle
	     * @default Application
	     * @static
	     */
	    MessageBox.defaultTitle = app.title || 'Application';

	    /**
	     * The options to display in the message box if none are specified.
	     * @property {string[]} defaultOptions
	     * @default ['Ok']
	     * @static
	     */
	    MessageBox.defaultOptions = ['Ok'];

	    
	    MessageBox.defaultSettings = { buttonClass: "btn btn-default", primaryButtonClass: "btn-primary autofocus", secondaryButtonClass: "", "class": "modal-content messageBox", style: null };

	    /**
	    * Sets the classes and styles used throughout the message box markup.
	    * @method setDefaults
	    * @param {object} settings A settings object containing the following optional properties: buttonClass, primaryButtonClass, secondaryButtonClass, class, style.
	    */
	    MessageBox.setDefaults = function (settings) {
	        $.extend(MessageBox.defaultSettings, settings);
	    };

	    MessageBox.prototype.getButtonClass = function ($index) {
	        var c = "";
	        if (this.settings) {
	            if (this.settings.buttonClass) {
	                c = this.settings.buttonClass;
	            }
	            if ($index() === 0 && this.settings.primaryButtonClass) {
	                if (c.length > 0) {
	                    c += " ";
	                }
	                c += this.settings.primaryButtonClass;
	            }
	            if ($index() > 0 && this.settings.secondaryButtonClass) {
	                if (c.length > 0) {
	                    c += " ";
	                }
	                c += this.settings.secondaryButtonClass;
	            }
	        }
	        return c;
	    };

	    MessageBox.prototype.getClass = function () {
	        if (this.settings) {
	            return this.settings["class"];
	        }
	        return "messageBox";
	    };

	    MessageBox.prototype.getStyle = function () {
	        if (this.settings) {
	            return this.settings.style;
	        }
	        return null;
	    };

	    MessageBox.prototype.getButtonText = function (stringOrObject) {
	        var t = $.type(stringOrObject);
	        if (t === "string") {
	            return stringOrObject;
	        }
	        else if (t === "object") {
	            if ($.type(stringOrObject.text) === "string") {
	                return stringOrObject.text;
	            } else {
	                system.error('The object for a MessageBox button does not have a text property that is a string.');
	                return null;
	            }
	        }
	        system.error('Object for a MessageBox button is not a string or object but ' + t + '.');
	        return null;
	    };

	    MessageBox.prototype.getButtonValue = function (stringOrObject) {
	        var t = $.type(stringOrObject);
	        if (t === "string") {
	            return stringOrObject;
	        }
	        else if (t === "object") {
	            if ($.type(stringOrObject.text) === "undefined") {
	                system.error('The object for a MessageBox button does not have a value property defined.');
	                return null;
	            } else {
	                return stringOrObject.value;
	            }
	        }
	        system.error('Object for a MessageBox button is not a string or object but ' + t + '.');
	        return null;
	    };

	    /**
	     * The markup for the message box's view.
	     * @property {string} defaultViewMarkup
	     * @static
	     */
	    MessageBox.defaultViewMarkup = [
	        '<div data-view="plugins/messageBox" data-bind="css: getClass(), style: getStyle()">',
	            '<div class="modal-header">',
	                '<h3 data-bind="html: title"></h3>',
	            '</div>',
	            '<div class="modal-body">',
	                '<p class="message" data-bind="html: message"></p>',
	            '</div>',
	            '<div class="modal-footer">',
	                '<!-- ko foreach: options -->',
	                '<button data-bind="click: function () { $parent.selectOption($parent.getButtonValue($data)); }, text: $parent.getButtonText($data), css: $parent.getButtonClass($index)"></button>',
	                '<!-- /ko -->',
	                '<div style="clear:both;"></div>',
	            '</div>',
	        '</div>'
	    ].join('\n');

	    function ensureDialogInstance(objOrModuleId) {
	        return system.defer(function (dfd) {
	            if (system.isString(objOrModuleId)) {
	                system.acquire(objOrModuleId).then(function (module) {
	                    dfd.resolve(system.resolveObject(module));
	                }).fail(function (err) {
	                    system.error('Failed to load dialog module (' + objOrModuleId + '). Details: ' + err.message);
	                });
	            } else {
	                dfd.resolve(objOrModuleId);
	            }
	        }).promise();
	    }

	    /**
	     * @class DialogModule
	     * @static
	     */
	    dialog = {
	        /**
	         * The constructor function used to create message boxes.
	         * @property {MessageBox} MessageBox
	         */
	        MessageBox: MessageBox,
	        /**
	         * The css zIndex that the last dialog was displayed at.
	         * @property {number} currentZIndex
	         */
	        currentZIndex: 1050,
	        /**
	         * Gets the next css zIndex at which a dialog should be displayed.
	         * @method getNextZIndex
	         * @return {number} The next usable zIndex.
	         */
	        getNextZIndex: function () {
	            return ++this.currentZIndex;
	        },
	        /**
	         * Determines whether or not there are any dialogs open.
	         * @method isOpen
	         * @return {boolean} True if a dialog is open. false otherwise.
	         */
	        isOpen: ko.computed(function() {
	            return dialogCount() > 0;
	        }),
	        /**
	         * Gets the dialog context by name or returns the default context if no name is specified.
	         * @method getContext
	         * @param {string} [name] The name of the context to retrieve.
	         * @return {DialogContext} True context.
	         */
	        getContext: function (name) {
	            return contexts[name || 'default'];
	        },
	        /**
	         * Adds (or replaces) a dialog context.
	         * @method addContext
	         * @param {string} name The name of the context to add.
	         * @param {DialogContext} dialogContext The context to add.
	         */
	        addContext: function (name, dialogContext) {
	            dialogContext.name = name;
	            contexts[name] = dialogContext;

	            var helperName = 'show' + name.substr(0, 1).toUpperCase() + name.substr(1);
	            this[helperName] = function (obj, activationData) {
	                return this.show(obj, activationData, name);
	            };
	        },
	        createCompositionSettings: function (obj, dialogContext) {
	            var settings = {
	                model: obj,
	                activate: false,
	                transition: false
	            };

	            if (dialogContext.binding) {
	                settings.binding = dialogContext.binding;
	            }

	            if (dialogContext.attached) {
	                settings.attached = dialogContext.attached;
	            }

	            if (dialogContext.compositionComplete) {
	                settings.compositionComplete = dialogContext.compositionComplete;
	            }

	            return settings;
	        },
	        /**
	         * Gets the dialog model that is associated with the specified object.
	         * @method getDialog
	         * @param {object} obj The object for whom to retrieve the dialog.
	         * @return {Dialog} The dialog model.
	         */
	        getDialog: function (obj) {
	            if (obj) {
	                return obj.__dialog__;
	            }

	            return undefined;
	        },
	        /**
	         * Closes the dialog associated with the specified object.
	         * @method close
	         * @param {object} obj The object whose dialog should be closed.
	         * @param {object} results* The results to return back to the dialog caller after closing.
	         */
	        close: function (obj) {
	            var theDialog = this.getDialog(obj);
	            if (theDialog) {
	                var rest = Array.prototype.slice.call(arguments, 1);
	                theDialog.close.apply(theDialog, rest);
	            }
	        },
	        /**
	         * Shows a dialog.
	         * @method show
	         * @param {object|string} obj The object (or moduleId) to display as a dialog.
	         * @param {object} [activationData] The data that should be passed to the object upon activation.
	         * @param {string} [context] The name of the dialog context to use. Uses the default context if none is specified.
	         * @return {Promise} A promise that resolves when the dialog is closed and returns any data passed at the time of closing.
	         */
	        show: function (obj, activationData, context) {
	            var that = this;
	            var dialogContext = contexts[context || 'default'];

	            return system.defer(function (dfd) {
	                ensureDialogInstance(obj).then(function (instance) {
	                    var dialogActivator = activator.create();

	                    dialogActivator.activateItem(instance, activationData).then(function (success) {
	                        if (success) {
	                            var theDialog = instance.__dialog__ = {
	                                owner: instance,
	                                context: dialogContext,
	                                activator: dialogActivator,
	                                close: function () {
	                                    var args = arguments;
	                                    dialogActivator.deactivateItem(instance, true).then(function (closeSuccess) {
	                                        if (closeSuccess) {
	                                            dialogCount(dialogCount() - 1);
	                                            dialogContext.removeHost(theDialog);
	                                            delete instance.__dialog__;

	                                            if (args.length === 0) {
	                                                dfd.resolve();
	                                            } else if (args.length === 1) {
	                                                dfd.resolve(args[0]);
	                                            } else {
	                                                dfd.resolve.apply(dfd, args);
	                                            }
	                                        }
	                                    });
	                                }
	                            };

	                            theDialog.settings = that.createCompositionSettings(instance, dialogContext);
	                            dialogContext.addHost(theDialog);

	                            dialogCount(dialogCount() + 1);
	                            composition.compose(theDialog.host, theDialog.settings);
	                        } else {
	                            dfd.resolve(false);
	                        }
	                    });
	                });
	            }).promise();
	        },
	        /**
	         * Shows a message box.
	         * @method showMessage
	         * @param {string} message The message to display in the dialog.
	         * @param {string} [title] The title message.
	         * @param {string[]} [options] The options to provide to the user.
	         * @param {boolean} [autoclose] Automatically close the the message box when clicking outside?
	         * @param {Object} [settings] Custom settings for this instance of the messsage box, used to change classes and styles.
	         * @return {Promise} A promise that resolves when the message box is closed and returns the selected option.
	         */
	        showMessage: function (message, title, options, autoclose, settings) {
	            if (system.isString(this.MessageBox)) {
	                return dialog.show(this.MessageBox, [
	                    message,
	                    title || MessageBox.defaultTitle,
	                    options || MessageBox.defaultOptions,
	                    autoclose || false,
	                    settings || {}
	                ]);
	            }

	            return dialog.show(new this.MessageBox(message, title, options, autoclose, settings));
	        },
	        /**
	         * Installs this module into Durandal; called by the framework. Adds `app.showDialog` and `app.showMessage` convenience methods.
	         * @method install
	         * @param {object} [config] Add a `messageBox` property to supply a custom message box constructor. Add a `messageBoxView` property to supply custom view markup for the built-in message box. You can also use messageBoxViewUrl to specify the view url.
	         */
	        install: function (config) {
	            app.showDialog = function (obj, activationData, context) {
	                return dialog.show(obj, activationData, context);
	            };

	            app.closeDialog = function () {
	                return dialog.close.apply(dialog, arguments);
	            };

	            app.showMessage = function (message, title, options, autoclose, settings) {
	                return dialog.showMessage(message, title, options, autoclose, settings);
	            };

	            if (config.messageBox) {
	                dialog.MessageBox = config.messageBox;
	            }

	            if (config.messageBoxView) {
	                dialog.MessageBox.prototype.getView = function () {
	                    return viewEngine.processMarkup(config.messageBoxView);
	                };
	            }

	            if (config.messageBoxViewUrl) {
	                dialog.MessageBox.setViewUrl(config.messageBoxViewUrl);
	            }
	        }
	    };

	    /**
	     * @class DialogContext
	     */
	    dialog.addContext('default', {
	        blockoutOpacity: 0.2,
	        removeDelay: 200,
	        /**
	         * In this function, you are expected to add a DOM element to the tree which will serve as the "host" for the modal's composed view. You must add a property called host to the modalWindow object which references the dom element. It is this host which is passed to the composition module.
	         * @method addHost
	         * @param {Dialog} theDialog The dialog model.
	         */
	        addHost: function (theDialog) {
	            var body = $('body');
	            var blockout = $('<div class="modalBlockout"></div>')
	                .css({ 'z-index': dialog.getNextZIndex(), 'opacity': this.blockoutOpacity })
	                .appendTo(body);

	            var host = $('<div class="modalHost"></div>')
	                .css({ 'z-index': dialog.getNextZIndex() })
	                .appendTo(body);

	            theDialog.host = host.get(0);
	            theDialog.blockout = blockout.get(0);

	            if (!dialog.isOpen()) {
	                theDialog.oldBodyMarginRight = body.css("margin-right");
	                theDialog.oldInlineMarginRight = body.get(0).style.marginRight;

	                var html = $("html");
	                var oldBodyOuterWidth = body.outerWidth(true);
	                var oldScrollTop = html.scrollTop();
	                $("html").css("overflow-y", "hidden");
	                var newBodyOuterWidth = $("body").outerWidth(true);
	                body.css("margin-right", (newBodyOuterWidth - oldBodyOuterWidth + parseInt(theDialog.oldBodyMarginRight, 10)) + "px");
	                html.scrollTop(oldScrollTop); // necessary for Firefox
	            }
	        },
	        /**
	         * This function is expected to remove any DOM machinery associated with the specified dialog and do any other necessary cleanup.
	         * @method removeHost
	         * @param {Dialog} theDialog The dialog model.
	         */
	        removeHost: function (theDialog) {
	            $(theDialog.host).css('opacity', 0);
	            $(theDialog.blockout).css('opacity', 0);

	            setTimeout(function () {
	                ko.removeNode(theDialog.host);
	                ko.removeNode(theDialog.blockout);
	            }, this.removeDelay);

	            if (!dialog.isOpen()) {
	                var html = $("html");
	                var oldScrollTop = html.scrollTop(); // necessary for Firefox.
	                html.css("overflow-y", "").scrollTop(oldScrollTop);

	                if (theDialog.oldInlineMarginRight) {
	                    $("body").css("margin-right", theDialog.oldBodyMarginRight);
	                } else {
	                    $("body").css("margin-right", '');
	                }
	            }
	        },
	        attached: function (view) {
	            //To prevent flickering in IE8, we set visibility to hidden first, and later restore it
	            $(view).css("visibility", "hidden");
	        },
	        /**
	         * This function is called after the modal is fully composed into the DOM, allowing your implementation to do any final modifications, such as positioning or animation. You can obtain the original dialog object by using `getDialog` on context.model.
	         * @method compositionComplete
	         * @param {DOMElement} child The dialog view.
	         * @param {DOMElement} parent The parent view.
	         * @param {object} context The composition context.
	         */
	        compositionComplete: function (child, parent, context) {
	            var theDialog = dialog.getDialog(context.model);
	            var $child = $(child);
	            var loadables = $child.find("img").filter(function () {
	                //Remove images with known width and height
	                var $this = $(this);
	                return !(this.style.width && this.style.height) && !($this.attr("width") && $this.attr("height"));
	            });

	            $child.data("predefinedWidth", $child.get(0).style.width);

	            var setDialogPosition = function (childView, objDialog) {
	                //Setting a short timeout is need in IE8, otherwise we could do this straight away
	                setTimeout(function () {
	                    var $childView = $(childView);

	                    objDialog.context.reposition(childView);

	                    $(objDialog.host).css('opacity', 1);
	                    $childView.css("visibility", "visible");

	                    $childView.find('.autofocus').first().focus();
	                }, 1);
	            };

	            setDialogPosition(child, theDialog);
	            loadables.load(function () {
	                setDialogPosition(child, theDialog);
	            });

	            if ($child.hasClass('autoclose') || context.model.autoclose) {
	                $(theDialog.blockout).click(function () {
	                    theDialog.close();
	                });
	            }
	        },
	        /**
	         * This function is called to reposition the model view.
	         * @method reposition
	         * @param {DOMElement} view The dialog view.
	         */
	        reposition: function (view) {
	            var $view = $(view),
	                $window = $(window);

	            //We will clear and then set width for dialogs without width set 
	            if (!$view.data("predefinedWidth")) {
	                $view.css({ width: '' }); //Reset width
	            }
	            var width = $view.outerWidth(false),
	                height = $view.outerHeight(false),
	                windowHeight = $window.height() - 10, //leave at least 10 pixels free
	                windowWidth = $window.width() - 10, //leave at least 10 pixels free
	                constrainedHeight = Math.min(height, windowHeight),
	                constrainedWidth = Math.min(width, windowWidth);

	            $view.css({
	                'margin-top': (-constrainedHeight / 2).toString() + 'px',
	                'margin-left': (-constrainedWidth / 2).toString() + 'px'
	            });

	            if (height > windowHeight) {
	                $view.css("overflow-y", "auto").outerHeight(windowHeight);
	            } else {
	                $view.css({
	                    "overflow-y": "",
	                    "height": ""
	                });
	            }

	            if (width > windowWidth) {
	                $view.css("overflow-x", "auto").outerWidth(windowWidth);
	            } else {
	                $view.css("overflow-x", "");

	                if (!$view.data("predefinedWidth")) {
	                    //Ensure the correct width after margin-left has been set
	                    $view.outerWidth(constrainedWidth);
	                } else {
	                    $view.css("width", $view.data("predefinedWidth"));
	                }
	            }
	        }
	    });

	    return dialog;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.1.0 Copyright (c) 2012 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * The binder joins an object instance and a DOM element tree by applying databinding and/or invoking binding lifecycle callbacks (binding and bindingComplete).
	 * @module binder
	 * @requires system
	 * @requires knockout
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (system, ko) {
	    var binder,
	        insufficientInfoMessage = 'Insufficient Information to Bind',
	        unexpectedViewMessage = 'Unexpected View Type',
	        bindingInstructionKey = 'durandal-binding-instruction',
	        koBindingContextKey = '__ko_bindingContext__';

	    function normalizeBindingInstruction(result){
	        if(result === undefined){
	            return { applyBindings: true };
	        }

	        if(system.isBoolean(result)){
	            return { applyBindings:result };
	        }

	        if(result.applyBindings === undefined){
	            result.applyBindings = true;
	        }

	        return result;
	    }

	    function doBind(obj, view, bindingTarget, data){
	        if (!view || !bindingTarget) {
	            if (binder.throwOnErrors) {
	                system.error(insufficientInfoMessage);
	            } else {
	                system.log(insufficientInfoMessage, view, data);
	            }
	            return;
	        }

	        if (!view.getAttribute) {
	            if (binder.throwOnErrors) {
	                system.error(unexpectedViewMessage);
	            } else {
	                system.log(unexpectedViewMessage, view, data);
	            }
	            return;
	        }

	        var viewName = view.getAttribute('data-view');

	        try {
	            var instruction;

	            if (obj && obj.binding) {
	                instruction = obj.binding(view);
	            }

	            instruction = normalizeBindingInstruction(instruction);
	            binder.binding(data, view, instruction);

	            if(instruction.applyBindings){
	                system.log('Binding', viewName, data);
	                ko.applyBindings(bindingTarget, view);
	            }else if(obj){
	                ko.utils.domData.set(view, koBindingContextKey, { $data:obj });
	            }

	            binder.bindingComplete(data, view, instruction);

	            if (obj && obj.bindingComplete) {
	                obj.bindingComplete(view);
	            }

	            ko.utils.domData.set(view, bindingInstructionKey, instruction);
	            return instruction;
	        } catch (e) {
	            e.message = e.message + ';\nView: ' + viewName + ";\nModuleId: " + system.getModuleId(data);
	            if (binder.throwOnErrors) {
	                system.error(e);
	            } else {
	                system.log(e.message);
	            }
	        }
	    }

	    /**
	     * @class BinderModule
	     * @static
	     */
	    return binder = {
	        /**
	         * Called before every binding operation. Does nothing by default.
	         * @method binding
	         * @param {object} data The data that is about to be bound.
	         * @param {DOMElement} view The view that is about to be bound.
	         * @param {object} instruction The object that carries the binding instructions.
	         */
	        binding: system.noop,
	        /**
	         * Called after every binding operation. Does nothing by default.
	         * @method bindingComplete
	         * @param {object} data The data that has just been bound.
	         * @param {DOMElement} view The view that has just been bound.
	         * @param {object} instruction The object that carries the binding instructions.
	         */
	        bindingComplete: system.noop,
	        /**
	         * Indicates whether or not the binding system should throw errors or not.
	         * @property {boolean} throwOnErrors
	         * @default false The binding system will not throw errors by default. Instead it will log them.
	         */
	        throwOnErrors: false,
	        /**
	         * Gets the binding instruction that was associated with a view when it was bound.
	         * @method getBindingInstruction
	         * @param {DOMElement} view The view that was previously bound.
	         * @return {object} The object that carries the binding instructions.
	         */
	        getBindingInstruction:function(view){
	            return ko.utils.domData.get(view, bindingInstructionKey);
	        },
	        /**
	         * Binds the view, preserving the existing binding context. Optionally, a new context can be created, parented to the previous context.
	         * @method bindContext
	         * @param {KnockoutBindingContext} bindingContext The current binding context.
	         * @param {DOMElement} view The view to bind.
	         * @param {object} [obj] The data to bind to, causing the creation of a child binding context if present.
	         * @param {string} [dataAlias] An alias for $data if present.
	         */
	        bindContext: function(bindingContext, view, obj, dataAlias) {
	            if (obj && bindingContext) {
	                bindingContext = bindingContext.createChildContext(obj, typeof(dataAlias) === 'string' ? dataAlias : null);
	            }

	            return doBind(obj, view, bindingContext, obj || (bindingContext ? bindingContext.$data : null));
	        },
	        /**
	         * Binds the view, preserving the existing binding context. Optionally, a new context can be created, parented to the previous context.
	         * @method bind
	         * @param {object} obj The data to bind to.
	         * @param {DOMElement} view The view to bind.
	         */
	        bind: function(obj, view) {
	            return doBind(obj, view, obj, obj);
	        }
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.1.0 Copyright (c) 2012 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * Durandal events originate from backbone.js but also combine some ideas from signals.js as well as some additional improvements.
	 * Events can be installed into any object and are installed into the `app` module by default for convenient app-wide eventing.
	 * @module events
	 * @requires system
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (system) {
	    var eventSplitter = /\s+/;
	    var Events = function() { };

	    /**
	     * Represents an event subscription.
	     * @class Subscription
	     */
	    var Subscription = function(owner, events) {
	        this.owner = owner;
	        this.events = events;
	    };

	    /**
	     * Attaches a callback to the event subscription.
	     * @method then
	     * @param {function} callback The callback function to invoke when the event is triggered.
	     * @param {object} [context] An object to use as `this` when invoking the `callback`.
	     * @chainable
	     */
	    Subscription.prototype.then = function (callback, context) {
	        this.callback = callback || this.callback;
	        this.context = context || this.context;
	        
	        if (!this.callback) {
	            return this;
	        }

	        this.owner.on(this.events, this.callback, this.context);
	        return this;
	    };

	    /**
	     * Attaches a callback to the event subscription.
	     * @method on
	     * @param {function} [callback] The callback function to invoke when the event is triggered. If `callback` is not provided, the previous callback will be re-activated.
	     * @param {object} [context] An object to use as `this` when invoking the `callback`.
	     * @chainable
	     */
	    Subscription.prototype.on = Subscription.prototype.then;

	    /**
	     * Cancels the subscription.
	     * @method off
	     * @chainable
	     */
	    Subscription.prototype.off = function () {
	        this.owner.off(this.events, this.callback, this.context);
	        return this;
	    };

	    /**
	     * Creates an object with eventing capabilities.
	     * @class Events
	     */

	    /**
	     * Creates a subscription or registers a callback for the specified event.
	     * @method on
	     * @param {string} events One or more events, separated by white space.
	     * @param {function} [callback] The callback function to invoke when the event is triggered. If `callback` is not provided, a subscription instance is returned.
	     * @param {object} [context] An object to use as `this` when invoking the `callback`.
	     * @return {Subscription|Events} A subscription is returned if no callback is supplied, otherwise the events object is returned for chaining.
	     */
	    Events.prototype.on = function(events, callback, context) {
	        var calls, event, list;

	        if (!callback) {
	            return new Subscription(this, events);
	        } else {
	            calls = this.callbacks || (this.callbacks = {});
	            events = events.split(eventSplitter);

	            while (event = events.shift()) {
	                list = calls[event] || (calls[event] = []);
	                list.push(callback, context);
	            }

	            return this;
	        }
	    };

	    /**
	     * Removes the callbacks for the specified events.
	     * @method off
	     * @param {string} [events] One or more events, separated by white space to turn off. If no events are specified, then the callbacks will be removed.
	     * @param {function} [callback] The callback function to remove. If `callback` is not provided, all callbacks for the specified events will be removed.
	     * @param {object} [context] The object that was used as `this`. Callbacks with this context will be removed.
	     * @chainable
	     */
	    Events.prototype.off = function(events, callback, context) {
	        var event, calls, list, i;

	        // No events
	        if (!(calls = this.callbacks)) {
	            return this;
	        }

	        //removing all
	        if (!(events || callback || context)) {
	            delete this.callbacks;
	            return this;
	        }

	        events = events ? events.split(eventSplitter) : system.keys(calls);

	        // Loop through the callback list, splicing where appropriate.
	        while (event = events.shift()) {
	            if (!(list = calls[event]) || !(callback || context)) {
	                delete calls[event];
	                continue;
	            }

	            for (i = list.length - 2; i >= 0; i -= 2) {
	                if (!(callback && list[i] !== callback || context && list[i + 1] !== context)) {
	                    list.splice(i, 2);
	                }
	            }
	        }

	        return this;
	    };

	    /**
	     * Triggers the specified events.
	     * @method trigger
	     * @param {string} [events] One or more events, separated by white space to trigger.
	     * @chainable
	     */
	    Events.prototype.trigger = function(events) {
	        var event, calls, list, i, length, args, all, rest;
	        if (!(calls = this.callbacks)) {
	            return this;
	        }

	        rest = [];
	        events = events.split(eventSplitter);
	        for (i = 1, length = arguments.length; i < length; i++) {
	            rest[i - 1] = arguments[i];
	        }

	        // For each event, walk through the list of callbacks twice, first to
	        // trigger the event, then to trigger any `"all"` callbacks.
	        while (event = events.shift()) {
	            // Copy callback lists to prevent modification.
	            if (all = calls.all) {
	                all = all.slice();
	            }

	            if (list = calls[event]) {
	                list = list.slice();
	            }

	            // Execute event callbacks.
	            if (list) {
	                for (i = 0, length = list.length; i < length; i += 2) {
	                    list[i].apply(list[i + 1] || this, rest);
	                }
	            }

	            // Execute "all" callbacks.
	            if (all) {
	                args = [event].concat(rest);
	                for (i = 0, length = all.length; i < length; i += 2) {
	                    all[i].apply(all[i + 1] || this, args);
	                }
	            }
	        }

	        return this;
	    };

	    /**
	     * Creates a function that will trigger the specified events when called. Simplifies proxying jQuery (or other) events through to the events object.
	     * @method proxy
	     * @param {string} events One or more events, separated by white space to trigger by invoking the returned function.
	     * @return {function} Calling the function will invoke the previously specified events on the events object.
	     */
	    Events.prototype.proxy = function(events) {
	        var that = this;
	        return (function(arg) {
	            that.trigger(events, arg);
	        });
	    };

	    /**
	     * Creates an object with eventing capabilities.
	     * @class EventsModule
	     * @static
	     */

	    /**
	     * Adds eventing capabilities to the specified object.
	     * @method includeIn
	     * @param {object} targetObject The object to add eventing capabilities to.
	     */
	    Events.includeIn = function(targetObject) {
	        targetObject.on = Events.prototype.on;
	        targetObject.off = Events.prototype.off;
	        targetObject.trigger = Events.prototype.trigger;
	        targetObject.proxy = Events.prototype.proxy;
	    };

	    return Events;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.1.0 Copyright (c) 2012 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * Layers the widget sugar on top of the composition system.
	 * @module widget
	 * @requires system
	 * @requires composition
	 * @requires jquery
	 * @requires knockout
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(5), __webpack_require__(3), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(system, composition, $, ko) {
	    var kindModuleMaps = {},
	        kindViewMaps = {},
	        bindableSettings = ['model', 'view', 'kind'],
	        widgetDataKey = 'durandal-widget-data';

	    function extractParts(element, settings){
	        var data = ko.utils.domData.get(element, widgetDataKey);

	        if(!data){
	            data = {
	                parts:composition.cloneNodes(ko.virtualElements.childNodes(element))
	            };

	            ko.virtualElements.emptyNode(element);
	            ko.utils.domData.set(element, widgetDataKey, data);
	        }

	        settings.parts = data.parts;
	    }

	    /**
	     * @class WidgetModule
	     * @static
	     */
	    var widget = {
	        getSettings: function(valueAccessor) {
	            var settings = ko.utils.unwrapObservable(valueAccessor()) || {};

	            if (system.isString(settings)) {
	                return { kind: settings };
	            }

	            for (var attrName in settings) {
	                if (ko.utils.arrayIndexOf(bindableSettings, attrName) != -1) {
	                    settings[attrName] = ko.utils.unwrapObservable(settings[attrName]);
	                } else {
	                    settings[attrName] = settings[attrName];
	                }
	            }

	            return settings;
	        },
	        /**
	         * Creates a ko binding handler for the specified kind.
	         * @method registerKind
	         * @param {string} kind The kind to create a custom binding handler for.
	         */
	        registerKind: function(kind) {
	            ko.bindingHandlers[kind] = {
	                init: function() {
	                    return { controlsDescendantBindings: true };
	                },
	                update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
	                    var settings = widget.getSettings(valueAccessor);
	                    settings.kind = kind;
	                    extractParts(element, settings);
	                    widget.create(element, settings, bindingContext, true);
	                }
	            };

	            ko.virtualElements.allowedBindings[kind] = true;
	            composition.composeBindings.push(kind + ':');
	        },
	        /**
	         * Maps views and module to the kind identifier if a non-standard pattern is desired.
	         * @method mapKind
	         * @param {string} kind The kind name.
	         * @param {string} [viewId] The unconventional view id to map the kind to.
	         * @param {string} [moduleId] The unconventional module id to map the kind to.
	         */
	        mapKind: function(kind, viewId, moduleId) {
	            if (viewId) {
	                kindViewMaps[kind] = viewId;
	            }

	            if (moduleId) {
	                kindModuleMaps[kind] = moduleId;
	            }
	        },
	        /**
	         * Maps a kind name to it's module id. First it looks up a custom mapped kind, then falls back to `convertKindToModulePath`.
	         * @method mapKindToModuleId
	         * @param {string} kind The kind name.
	         * @return {string} The module id.
	         */
	        mapKindToModuleId: function(kind) {
	            return kindModuleMaps[kind] || widget.convertKindToModulePath(kind);
	        },
	        /**
	         * Converts a kind name to it's module path. Used to conventionally map kinds who aren't explicitly mapped through `mapKind`.
	         * @method convertKindToModulePath
	         * @param {string} kind The kind name.
	         * @return {string} The module path.
	         */
	        convertKindToModulePath: function(kind) {
	            return 'widgets/' + kind + '/viewmodel';
	        },
	        /**
	         * Maps a kind name to it's view id. First it looks up a custom mapped kind, then falls back to `convertKindToViewPath`.
	         * @method mapKindToViewId
	         * @param {string} kind The kind name.
	         * @return {string} The view id.
	         */
	        mapKindToViewId: function(kind) {
	            return kindViewMaps[kind] || widget.convertKindToViewPath(kind);
	        },
	        /**
	         * Converts a kind name to it's view id. Used to conventionally map kinds who aren't explicitly mapped through `mapKind`.
	         * @method convertKindToViewPath
	         * @param {string} kind The kind name.
	         * @return {string} The view id.
	         */
	        convertKindToViewPath: function(kind) {
	            return 'widgets/' + kind + '/view';
	        },
	        createCompositionSettings: function(element, settings) {
	            if (!settings.model) {
	                settings.model = this.mapKindToModuleId(settings.kind);
	            }

	            if (!settings.view) {
	                settings.view = this.mapKindToViewId(settings.kind);
	            }

	            settings.preserveContext = true;
	            settings.activate = true;
	            settings.activationData = settings;
	            settings.mode = 'templated';

	            return settings;
	        },
	        /**
	         * Creates a widget.
	         * @method create
	         * @param {DOMElement} element The DOMElement or knockout virtual element that serves as the target element for the widget.
	         * @param {object} settings The widget settings.
	         * @param {object} [bindingContext] The current binding context.
	         */
	        create: function(element, settings, bindingContext, fromBinding) {
	            if(!fromBinding){
	                settings = widget.getSettings(function() { return settings; }, element);
	            }

	            var compositionSettings = widget.createCompositionSettings(element, settings);

	            composition.compose(element, compositionSettings, bindingContext);
	        },
	        /**
	         * Installs the widget module by adding the widget binding handler and optionally registering kinds.
	         * @method install
	         * @param {object} config The module config. Add a `kinds` array with the names of widgets to automatically register. You can also specify a `bindingName` if you wish to use another name for the widget binding, such as "control" for example.
	         */
	        install:function(config){
	            config.bindingName = config.bindingName || 'widget';

	            if(config.kinds){
	                var toRegister = config.kinds;

	                for(var i = 0; i < toRegister.length; i++){
	                    widget.registerKind(toRegister[i]);
	                }
	            }

	            ko.bindingHandlers[config.bindingName] = {
	                init: function() {
	                    return { controlsDescendantBindings: true };
	                },
	                update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
	                    var settings = widget.getSettings(valueAccessor);
	                    extractParts(element, settings);
	                    widget.create(element, settings, bindingContext, true);
	                }
	            };

	            composition.composeBindings.push(config.bindingName + ':');
	            ko.virtualElements.allowedBindings[config.bindingName] = true;
	        }
	    };

	    return widget;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.1.0 Copyright (c) 2012 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * The viewLocator module collaborates with the viewEngine module to provide views (literally dom sub-trees) to other parts of the framework as needed. The primary consumer of the viewLocator is the composition module.
	 * @module viewLocator
	 * @requires system
	 * @requires viewEngine
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function (system, viewEngine) {
	    function findInElements(nodes, url) {
	        for (var i = 0; i < nodes.length; i++) {
	            var current = nodes[i];
	            var existingUrl = current.getAttribute('data-view');
	            if (existingUrl == url) {
	                return current;
	            }
	        }
	    }
	    
	    function escape(str) {
	        return (str + '').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
	    }

	    /**
	     * @class ViewLocatorModule
	     * @static
	     */
	    return {
	        /**
	         * Allows you to set up a convention for mapping module folders to view folders. It is a convenience method that customizes `convertModuleIdToViewId` and `translateViewIdToArea` under the covers.
	         * @method useConvention
	         * @param {string} [modulesPath] A string to match in the path and replace with the viewsPath. If not specified, the match is 'viewmodels'.
	         * @param {string} [viewsPath] The replacement for the modulesPath. If not specified, the replacement is 'views'.
	         * @param {string} [areasPath] Partial views are mapped to the "views" folder if not specified. Use this parameter to change their location.
	         */
	        useConvention: function(modulesPath, viewsPath, areasPath) {
	            modulesPath = modulesPath || 'viewmodels';
	            viewsPath = viewsPath || 'views';
	            areasPath = areasPath || viewsPath;

	            var reg = new RegExp(escape(modulesPath), 'gi');

	            this.convertModuleIdToViewId = function (moduleId) {
	                return moduleId.replace(reg, viewsPath);
	            };

	            this.translateViewIdToArea = function (viewId, area) {
	                if (!area || area == 'partial') {
	                    return areasPath + '/' + viewId;
	                }
	                
	                return areasPath + '/' + area + '/' + viewId;
	            };
	        },
	        /**
	         * Maps an object instance to a view instance.
	         * @method locateViewForObject
	         * @param {object} obj The object to locate the view for.
	         * @param {string} [area] The area to translate the view to.
	         * @param {DOMElement[]} [elementsToSearch] An existing set of elements to search first.
	         * @return {Promise} A promise of the view.
	         */
	        locateViewForObject: function(obj, area, elementsToSearch) {
	            var view;

	            if (obj.getView) {
	                view = obj.getView();
	                if (view) {
	                    return this.locateView(view, area, elementsToSearch);
	                }
	            }

	            if (obj.viewUrl) {
	                return this.locateView(obj.viewUrl, area, elementsToSearch);
	            }

	            var id = system.getModuleId(obj);
	            if (id) {
	                return this.locateView(this.convertModuleIdToViewId(id), area, elementsToSearch);
	            }

	            return this.locateView(this.determineFallbackViewId(obj), area, elementsToSearch);
	        },
	        /**
	         * Converts a module id into a view id. By default the ids are the same.
	         * @method convertModuleIdToViewId
	         * @param {string} moduleId The module id.
	         * @return {string} The view id.
	         */
	        convertModuleIdToViewId: function(moduleId) {
	            return moduleId;
	        },
	        /**
	         * If no view id can be determined, this function is called to genreate one. By default it attempts to determine the object's type and use that.
	         * @method determineFallbackViewId
	         * @param {object} obj The object to determine the fallback id for.
	         * @return {string} The view id.
	         */
	        determineFallbackViewId: function (obj) {
	            var funcNameRegex = /function (.{1,})\(/;
	            var results = (funcNameRegex).exec((obj).constructor.toString());
	            var typeName = (results && results.length > 1) ? results[1] : "";
	            typeName = typeName.trim();
	            return 'views/' + typeName;
	        },
	        /**
	         * Takes a view id and translates it into a particular area. By default, no translation occurs.
	         * @method translateViewIdToArea
	         * @param {string} viewId The view id.
	         * @param {string} area The area to translate the view to.
	         * @return {string} The translated view id.
	         */
	        translateViewIdToArea: function (viewId, area) {
	            return viewId;
	        },
	        /**
	         * Locates the specified view.
	         * @method locateView
	         * @param {string|DOMElement} viewOrUrlOrId A view, view url or view id to locate.
	         * @param {string} [area] The area to translate the view to.
	         * @param {DOMElement[]} [elementsToSearch] An existing set of elements to search first.
	         * @return {Promise} A promise of the view.
	         */
	        locateView: function(viewOrUrlOrId, area, elementsToSearch) {
	            if (typeof viewOrUrlOrId === 'string') {
	                var viewId;

	                if (viewEngine.isViewUrl(viewOrUrlOrId)) {
	                    viewId = viewEngine.convertViewUrlToViewId(viewOrUrlOrId);
	                } else {
	                    viewId = viewOrUrlOrId;
	                }

	                if (area) {
	                    viewId = this.translateViewIdToArea(viewId, area);
	                }

	                if (elementsToSearch) {
	                    var existing = findInElements(elementsToSearch, viewId);
	                    if (existing) {
	                        return system.defer(function(dfd) {
	                            dfd.resolve(existing);
	                        }).promise();
	                    }
	                }

	                return viewEngine.createView(viewId);
	            }

	            return system.defer(function(dfd) {
	                dfd.resolve(viewOrUrlOrId);
	            }).promise();
	        }
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./activator": 8,
		"./activator.js": 8,
		"./app": 9,
		"./app.js": 9,
		"./binder": 11,
		"./binder.js": 11,
		"./composition": 5,
		"./composition.js": 5,
		"./events": 12,
		"./events.js": 12,
		"./plugins/dialog": 10,
		"./plugins/dialog.js": 10,
		"./plugins/history": 17,
		"./plugins/history.js": 17,
		"./plugins/http": 19,
		"./plugins/http.js": 19,
		"./plugins/observable": 20,
		"./plugins/observable.js": 20,
		"./plugins/router": 6,
		"./plugins/router.js": 6,
		"./plugins/serializer": 21,
		"./plugins/serializer.js": 21,
		"./plugins/widget": 13,
		"./plugins/widget.js": 13,
		"./system": 1,
		"./system.js": 1,
		"./transitions/entrance": 22,
		"./transitions/entrance.js": 22,
		"./viewEngine": 7,
		"./viewEngine.js": 7,
		"./viewLocator": 14,
		"./viewLocator.js": 14
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 16;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.1.0 Copyright (c) 2012 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * This module is based on Backbone's core history support. It abstracts away the low level details of working with browser history and url changes in order to provide a solid foundation for a router.
	 * @module history
	 * @requires system
	 * @requires jquery
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (system, $) {
	    // Cached regex for stripping a leading hash/slash and trailing space.
	    var routeStripper = /^[#\/]|\s+$/g;

	    // Cached regex for stripping leading and trailing slashes.
	    var rootStripper = /^\/+|\/+$/g;

	    // Cached regex for detecting MSIE.
	    var isExplorer = /msie [\w.]+/;

	    // Cached regex for removing a trailing slash.
	    var trailingSlash = /\/$/;

	    // Update the hash location, either replacing the current entry, or adding
	    // a new one to the browser history.
	    function updateHash(location, fragment, replace) {
	        if (replace) {
	            var href = location.href.replace(/(javascript:|#).*$/, '');

	            if (history.history.replaceState) {
	                history.history.replaceState({}, document.title, href + '#' + fragment); // using history.replaceState instead of location.replace to work around chrom bug
	            } else {
	                location.replace(href + '#' + fragment);
	            }
	        } else {
	            // Some browsers require that `hash` contains a leading #.
	            location.hash = '#' + fragment;
	        }
	    };

	    /**
	     * @class HistoryModule
	     * @static
	     */
	    var history = {
	        /**
	         * The setTimeout interval used when the browser does not support hash change events.
	         * @property {string} interval
	         * @default 50
	         */
	        interval: 50,
	        /**
	         * Indicates whether or not the history module is actively tracking history.
	         * @property {string} active
	         */
	        active: false
	    };
	    
	    // Ensure that `History` can be used outside of the browser.
	    if (typeof window !== 'undefined') {
	        history.location = window.location;
	        history.history = window.history;
	    }

	    /**
	     * Gets the true hash value. Cannot use location.hash directly due to a bug in Firefox where location.hash will always be decoded.
	     * @method getHash
	     * @param {string} [window] The optional window instance
	     * @return {string} The hash.
	     */
	    history.getHash = function(window) {
	        var match = (window || history).location.href.match(/#(.*)$/);
	        return match ? match[1] : '';
	    };
	    
	    /**
	     * Get the cross-browser normalized URL fragment, either from the URL, the hash, or the override.
	     * @method getFragment
	     * @param {string} fragment The fragment.
	     * @param {boolean} forcePushState Should we force push state?
	     * @return {string} he fragment.
	     */
	    history.getFragment = function(fragment, forcePushState) {
	        if (fragment == null) {
	            if (history._hasPushState || !history._wantsHashChange || forcePushState) {
	                fragment = history.location.pathname + history.location.search;
	                var root = history.root.replace(trailingSlash, '');
	                if (!fragment.indexOf(root)) {
	                    fragment = fragment.substr(root.length);
	                }
	            } else {
	                fragment = history.getHash();
	            }
	        }
	        
	        return fragment.replace(routeStripper, '');
	    };

	    /**
	     * Activate the hash change handling, returning `true` if the current URL matches an existing route, and `false` otherwise.
	     * @method activate
	     * @param {HistoryOptions} options.
	     * @return {boolean|undefined} Returns true/false from loading the url unless the silent option was selected.
	     */
	    history.activate = function(options) {
	        if (history.active) {
	            system.error("History has already been activated.");
	        }

	        history.active = true;

	        // Figure out the initial configuration. Do we need an iframe?
	        // Is pushState desired ... is it available?
	        history.options = system.extend({}, { root: '/' }, history.options, options);
	        history.root = history.options.root;
	        history._wantsHashChange = history.options.hashChange !== false;
	        history._wantsPushState = !!history.options.pushState;
	        history._hasPushState = !!(history.options.pushState && history.history && history.history.pushState);

	        var fragment = history.getFragment();
	        var docMode = document.documentMode;
	        var oldIE = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

	        // Normalize root to always include a leading and trailing slash.
	        history.root = ('/' + history.root + '/').replace(rootStripper, '/');

	        if (oldIE && history._wantsHashChange) {
	            history.iframe = $('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
	            history.navigate(fragment, false);
	        }

	        // Depending on whether we're using pushState or hashes, and whether
	        // 'onhashchange' is supported, determine how we check the URL state.
	        if (history._hasPushState) {
	            $(window).on('popstate', history.checkUrl);
	        } else if (history._wantsHashChange && ('onhashchange' in window) && !oldIE) {
	            $(window).on('hashchange', history.checkUrl);
	        } else if (history._wantsHashChange) {
	            history._checkUrlInterval = setInterval(history.checkUrl, history.interval);
	        }

	        // Determine if we need to change the base url, for a pushState link
	        // opened by a non-pushState browser.
	        history.fragment = fragment;
	        var loc = history.location;
	        var atRoot = loc.pathname.replace(/[^\/]$/, '$&/') === history.root;

	        // Transition from hashChange to pushState or vice versa if both are requested.
	        if (history._wantsHashChange && history._wantsPushState) {
	            // If we've started off with a route from a `pushState`-enabled
	            // browser, but we're currently in a browser that doesn't support it...
	            if (!history._hasPushState && !atRoot) {
	                history.fragment = history.getFragment(null, true);
	                history.location.replace(history.root + history.location.search + '#' + history.fragment);
	                // Return immediately as browser will do redirect to new url
	                return true;

	            // Or if we've started out with a hash-based route, but we're currently
	            // in a browser where it could be `pushState`-based instead...
	            } else if (history._hasPushState && atRoot && loc.hash) {
	                this.fragment = history.getHash().replace(routeStripper, '');
	                this.history.replaceState({}, document.title, history.root + history.fragment + loc.search);
	            }
	        }

	        if (!history.options.silent) {
	            return history.loadUrl(options.startRoute);
	        }
	    };

	    /**
	     * Disable history, perhaps temporarily. Not useful in a real app, but possibly useful for unit testing Routers.
	     * @method deactivate
	     */
	    history.deactivate = function() {
	        $(window).off('popstate', history.checkUrl).off('hashchange', history.checkUrl);
	        clearInterval(history._checkUrlInterval);
	        history.active = false;
	    };

	    /**
	     * Checks the current URL to see if it has changed, and if it has, calls `loadUrl`, normalizing across the hidden iframe.
	     * @method checkUrl
	     * @return {boolean} Returns true/false from loading the url.
	     */
	    history.checkUrl = function() {
	        var current = history.getFragment();
	        if (current === history.fragment && history.iframe) {
	            current = history.getFragment(history.getHash(history.iframe));
	        }

	        if (current === history.fragment) {
	            return false;
	        }

	        if (history.iframe) {
	            history.navigate(current, false);
	        }
	        
	        history.loadUrl();
	    };
	    
	    /**
	     * Attempts to load the current URL fragment. A pass-through to options.routeHandler.
	     * @method loadUrl
	     * @return {boolean} Returns true/false from the route handler.
	     */
	    history.loadUrl = function(fragmentOverride) {
	        var fragment = history.fragment = history.getFragment(fragmentOverride);

	        return history.options.routeHandler ?
	            history.options.routeHandler(fragment) :
	            false;
	    };

	    /**
	     * Save a fragment into the hash history, or replace the URL state if the
	     * 'replace' option is passed. You are responsible for properly URL-encoding
	     * the fragment in advance.
	     * The options object can contain `trigger: false` if you wish to not have the
	     * route callback be fired, or `replace: true`, if
	     * you wish to modify the current URL without adding an entry to the history.
	     * @method navigate
	     * @param {string} fragment The url fragment to navigate to.
	     * @param {object|boolean} options An options object with optional trigger and replace flags. You can also pass a boolean directly to set the trigger option. Trigger is `true` by default.
	     * @return {boolean} Returns true/false from loading the url.
	     */
	    history.navigate = function(fragment, options) {
	        if (!history.active) {
	            return false;
	        }

	        if(options === undefined) {
	            options = {
	                trigger: true
	            };
	        }else if(system.isBoolean(options)) {
	            options = {
	                trigger: options
	            };
	        }

	        fragment = history.getFragment(fragment || '');

	        if (history.fragment === fragment) {
	            return;
	        }

	        history.fragment = fragment;

	        var url = history.root + fragment;

	        // Don't include a trailing slash on the root.
	        if(fragment === '' && url !== '/') {
	            url = url.slice(0, -1);
	        }

	        // If pushState is available, we use it to set the fragment as a real URL.
	        if (history._hasPushState) {
	            history.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

	            // If hash changes haven't been explicitly disabled, update the hash
	            // fragment to store history.
	        } else if (history._wantsHashChange) {
	            updateHash(history.location, fragment, options.replace);
	            
	            if (history.iframe && (fragment !== history.getFragment(history.getHash(history.iframe)))) {
	                // Opening and closing the iframe tricks IE7 and earlier to push a
	                // history entry on hash-tag change.  When replace is true, we don't
	                // want history.
	                if (!options.replace) {
	                    history.iframe.document.open().close();
	                }
	                
	                updateHash(history.iframe.location, fragment, options.replace);
	            }

	            // If you've told us that you explicitly don't want fallback hashchange-
	            // based history, then `navigate` becomes a page refresh.
	        } else {
	            return history.location.assign(url);
	        }

	        if (options.trigger) {
	            return history.loadUrl(fragment);
	        }
	    };

	    /**
	     * Navigates back in the browser history.
	     * @method navigateBack
	     */
	    history.navigateBack = function() {
	        history.history.back();
	    };

	    /**
	     * @class HistoryOptions
	     * @static
	     */

	    /**
	     * The function that will be called back when the fragment changes.
	     * @property {function} routeHandler
	     */

	    /**
	     * The url root used to extract the fragment when using push state.
	     * @property {string} root
	     */

	    /**
	     * Use hash change when present.
	     * @property {boolean} hashChange
	     * @default true
	     */

	    /**
	     * Use push state when present.
	     * @property {boolean} pushState
	     * @default false
	     */

	    /**
	     * Prevents loading of the current url when activating history.
	     * @property {boolean} silent
	     * @default false
	     */

	    return history;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// Note the capitalisation here for widget names. We do this so can 
	// easily distinguish between normal binding handlers and widgets.
	module.exports = {
		Alert: __webpack_require__(39)
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.1.0 Copyright (c) 2012 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * Enables common http request scenarios.
	 * @module http
	 * @requires jquery
	 * @requires knockout
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($, ko) {
	    /**
	     * @class HTTPModule
	     * @static
	     */
	    return {
	        /**
	         * The name of the callback parameter to inject into jsonp requests by default.
	         * @property {string} callbackParam
	         * @default callback
	         */
	        callbackParam: 'callback',
	        /**
	         * Converts the data to JSON.
	         * @method toJSON
	         * @param {object} data The data to convert to JSON.
	         * @return {string} JSON.
	         */
	        toJSON: function(data) {
	            return ko.toJSON(data);
	        },
	        /**
	         * Makes an HTTP GET request.
	         * @method get
	         * @param {string} url The url to send the get request to.
	         * @param {object} [query] An optional key/value object to transform into query string parameters.
	         * @param {object} [headers] The data to add to the request header.  It will be converted to JSON. If the data contains Knockout observables, they will be converted into normal properties before serialization.
	         * @return {Promise} A promise of the get response data.
	         */
	        get: function (url, query, headers) {
	            return $.ajax(url, { data: query, headers: ko.toJS(headers) });
	        },
	        /**
	         * Makes an JSONP request.
	         * @method jsonp
	         * @param {string} url The url to send the get request to.
	         * @param {object} [query] An optional key/value object to transform into query string parameters.
	         * @param {string} [callbackParam] The name of the callback parameter the api expects (overrides the default callbackParam).
	         * @param {object} [headers] The data to add to the request header.  It will be converted to JSON. If the data contains Knockout observables, they will be converted into normal properties before serialization.
	         * @return {Promise} A promise of the response data.
	         */
	        jsonp: function (url, query, callbackParam, headers) {
	            if (url.indexOf('=?') == -1) {
	                callbackParam = callbackParam || this.callbackParam;

	                if (url.indexOf('?') == -1) {
	                    url += '?';
	                } else {
	                    url += '&';
	                }

	                url += callbackParam + '=?';
	            }

	            return $.ajax({
	                url: url,
	                dataType: 'jsonp',
	                data: query,
	                headers: ko.toJS(headers)
	            });
	        },
	        /**
	         * Makes an HTTP PUT request.
	         * @method put
	         * @param {string} url The url to send the put request to.
	         * @param {object} data The data to put. It will be converted to JSON. If the data contains Knockout observables, they will be converted into normal properties before serialization.
	         * @param {object} [headers] The data to add to the request header.  It will be converted to JSON. If the data contains Knockout observables, they will be converted into normal properties before serialization.
	         * @return {Promise} A promise of the response data.
	         */
	        put:function(url, data, headers) {
	            return $.ajax({
	                url: url,
	                data: this.toJSON(data),
	                type: 'PUT',
	                contentType: 'application/json',
	                dataType: 'json',
	                headers: ko.toJS(headers)
	            });
	        },
	        /**
	         * Makes an HTTP POST request.
	         * @method post
	         * @param {string} url The url to send the post request to.
	         * @param {object} data The data to post. It will be converted to JSON. If the data contains Knockout observables, they will be converted into normal properties before serialization.
	         * @param {object} [headers] The data to add to the request header.  It will be converted to JSON. If the data contains Knockout observables, they will be converted into normal properties before serialization.
	         * @return {Promise} A promise of the response data.
	         */
	        post: function (url, data, headers) {
	            return $.ajax({
	                url: url,
	                data: this.toJSON(data),
	                type: 'POST',
	                contentType: 'application/json',
	                dataType: 'json',
	                headers: ko.toJS(headers)
	            });
	        },
	        /**
	         * Makes an HTTP DELETE request.
	         * @method remove
	         * @param {string} url The url to send the delete request to.
	         * @param {object} [query] An optional key/value object to transform into query string parameters.
	         * @param {object} [headers] The data to add to the request header.  It will be converted to JSON. If the data contains Knockout observables, they will be converted into normal properties before serialization.
	         * @return {Promise} A promise of the get response data.
	         */
	        remove:function(url, query, headers) {
	            return $.ajax({
	                url: url,
	                data: query,
	                type: 'DELETE',
	                headers: ko.toJS(headers)
	            });
	        }
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.1.0 Copyright (c) 2012 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * Enables automatic observability of plain javascript object for ES5 compatible browsers. Also, converts promise properties into observables that are updated when the promise resolves.
	 * @module observable
	 * @requires system
	 * @requires binder
	 * @requires knockout
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(11), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(system, binder, ko) {
	    var observableModule,
	        toString = Object.prototype.toString,
	        nonObservableTypes = ['[object Function]', '[object String]', '[object Boolean]', '[object Number]', '[object Date]', '[object RegExp]'],
	        observableArrayMethods = ['remove', 'removeAll', 'destroy', 'destroyAll', 'replace'],
	        arrayMethods = ['pop', 'reverse', 'sort', 'shift', 'slice'],
	        additiveArrayFunctions = ['push', 'unshift'],
	        es5Functions = ['filter', 'map', 'reduce', 'reduceRight', 'forEach', 'every', 'some'],
	        arrayProto = Array.prototype,
	        observableArrayFunctions = ko.observableArray.fn,
	        logConversion = false,
	        changeDetectionMethod = undefined,
	        skipPromises = false,
	        shouldIgnorePropertyName;

	    /**
	     * You can call observable(obj, propertyName) to get the observable function for the specified property on the object.
	     * @class ObservableModule
	     */

	    if (!('getPropertyDescriptor' in Object)) {
	        var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	        var getPrototypeOf = Object.getPrototypeOf;

	        Object['getPropertyDescriptor'] = function(o, name) {
	            var proto = o, descriptor;

	            while(proto && !(descriptor = getOwnPropertyDescriptor(proto, name))) {
	                proto = getPrototypeOf(proto);
	            }

	            return descriptor;
	        };
	    }

	    function defaultShouldIgnorePropertyName(propertyName){
	        var first = propertyName[0];
	        return first === '_' || first === '$' || (changeDetectionMethod && propertyName === changeDetectionMethod);
	    }

	    function isNode(obj) {
	        return !!(obj && obj.nodeType !== undefined && system.isNumber(obj.nodeType));
	    }

	    function canConvertType(value) {
	        if (!value || isNode(value) || value.ko === ko || value.jquery) {
	            return false;
	        }

	        var type = toString.call(value);

	        return nonObservableTypes.indexOf(type) == -1 && !(value === true || value === false);
	    }

	    function createLookup(obj) {
	        var value = {};

	        Object.defineProperty(obj, "__observable__", {
	            enumerable: false,
	            configurable: false,
	            writable: false,
	            value: value
	        });

	        return value;
	    }

	    function makeObservableArray(original, observable, hasChanged) {
	        var lookup = original.__observable__, notify = true;

	        if(lookup && lookup.__full__){
	            return;
	        }

	        lookup = lookup || createLookup(original);
	        lookup.__full__ = true;

	        es5Functions.forEach(function (methodName) {
	            observable[methodName] = function () {
	                return arrayProto[methodName].apply(original, arguments);
	            };
	        });

	        observableArrayMethods.forEach(function(methodName) {
	            original[methodName] = function() {
	                notify = false;
	                var methodCallResult = observableArrayFunctions[methodName].apply(observable, arguments);
	                notify = true;
	                return methodCallResult;
	            };
	        });

	        arrayMethods.forEach(function(methodName) {
	            original[methodName] = function() {
	                if(notify){
	                    observable.valueWillMutate();
	                }

	                var methodCallResult = arrayProto[methodName].apply(original, arguments);

	                if(notify){
	                    observable.valueHasMutated();
	                }

	                return methodCallResult;
	            };
	        });

	        additiveArrayFunctions.forEach(function(methodName){
	            original[methodName] = function() {
	                for (var i = 0, len = arguments.length; i < len; i++) {
	                    convertObject(arguments[i], hasChanged);
	                }

	                if(notify){
	                    observable.valueWillMutate();
	                }

	                var methodCallResult = arrayProto[methodName].apply(original, arguments);

	                if(notify){
	                    observable.valueHasMutated();
	                }

	                return methodCallResult;
	            };
	        });

	        original['splice'] = function() {
	            for (var i = 2, len = arguments.length; i < len; i++) {
	                convertObject(arguments[i], hasChanged);
	            }

	            if(notify){
	                observable.valueWillMutate();
	            }

	            var methodCallResult = arrayProto['splice'].apply(original, arguments);

	            if(notify){
	                observable.valueHasMutated();
	            }

	            return methodCallResult;
	        };

	        for (var i = 0, len = original.length; i < len; i++) {
	            convertObject(original[i], hasChanged);
	        }
	    }

	    /**
	     * Converts an entire object into an observable object by re-writing its attributes using ES5 getters and setters. Attributes beginning with '_' or '$' are ignored.
	     * @method convertObject
	     * @param {object} obj The target object to convert.
	     */
	    function convertObject(obj, hasChanged) {
	        var lookup, value;

	        if (changeDetectionMethod) {
	            if(obj && obj[changeDetectionMethod]) {
	                if (hasChanged) {
	                    hasChanged = hasChanged.slice(0);
	                } else {
	                    hasChanged = [];
	                }
	                hasChanged.push(obj[changeDetectionMethod]);
	            }
	        }

	        if(!canConvertType(obj)){
	            return;
	        }

	        lookup = obj.__observable__;

	        if(lookup && lookup.__full__){
	            return;
	        }

	        lookup = lookup || createLookup(obj);
	        lookup.__full__ = true;

	        if (system.isArray(obj)) {
	            var observable = ko.observableArray(obj);
	            makeObservableArray(obj, observable, hasChanged);
	        } else {
	            for (var propertyName in obj) {
	                if(shouldIgnorePropertyName(propertyName)){
	                    continue;
	                }

	                if (!lookup[propertyName]) {
	                    var descriptor = Object.getPropertyDescriptor(obj, propertyName);
	                    if (descriptor && (descriptor.get || descriptor.set)) {
	                        defineProperty(obj, propertyName, {
	                            get:descriptor.get,
	                            set:descriptor.set
	                        });
	                    } else {
	                        value = obj[propertyName];

	                        if(!system.isFunction(value)) {
	                            convertProperty(obj, propertyName, value, hasChanged);
	                        }
	                    }
	                }
	            }
	        }

	        if(logConversion) {
	            system.log('Converted', obj);
	        }
	    }

	    function innerSetter(observable, newValue, isArray) {
	        //if this was originally an observableArray, then always check to see if we need to add/replace the array methods (if newValue was an entirely new array)
	        if (isArray) {
	            if (!newValue) {
	                //don't allow null, force to an empty array
	                newValue = [];
	                makeObservableArray(newValue, observable);
	            }
	            else if (!newValue.destroyAll) {
	                makeObservableArray(newValue, observable);
	            }
	        } else {
	            convertObject(newValue);
	        }

	        //call the update to the observable after the array as been updated.
	        observable(newValue);
	    }

	    /**
	     * Converts a normal property into an observable property using ES5 getters and setters.
	     * @method convertProperty
	     * @param {object} obj The target object on which the property to convert lives.
	     * @param {string} propertyName The name of the property to convert.
	     * @param {object} [original] The original value of the property. If not specified, it will be retrieved from the object.
	     * @return {KnockoutObservable} The underlying observable.
	     */
	    function convertProperty(obj, propertyName, original, hasChanged) {
	        var observable,
	            isArray,
	            lookup = obj.__observable__ || createLookup(obj);

	        if(original === undefined){
	            original = obj[propertyName];
	        }

	        if (system.isArray(original)) {
	            observable = ko.observableArray(original);
	            makeObservableArray(original, observable, hasChanged);
	            isArray = true;
	        } else if (typeof original == "function") {
	            if(ko.isObservable(original)){
	                observable = original;
	            }else{
	                return null;
	            }
	        } else if(!skipPromises && system.isPromise(original)) {
	            observable = ko.observable();

	            original.then(function (result) {
	                if(system.isArray(result)) {
	                    var oa = ko.observableArray(result);
	                    makeObservableArray(result, oa, hasChanged);
	                    result = oa;
	                }

	                observable(result);
	            });
	        } else {
	            observable = ko.observable(original);
	            convertObject(original, hasChanged);
	        }

	        if (hasChanged && hasChanged.length > 0) {
	            hasChanged.forEach(function (func) {
	                if (system.isArray(original)) {
	                    observable.subscribe(function (arrayChanges) {
	                        func(obj, propertyName, null, arrayChanges);
	                    }, null, "arrayChange");
	                } else {
	                    observable.subscribe(function (newValue) {
	                        func(obj, propertyName, newValue, null);
	                    });
	                }
	            });
	        }

	        Object.defineProperty(obj, propertyName, {
	            configurable: true,
	            enumerable: true,
	            get: observable,
	            set: ko.isWriteableObservable(observable) ? (function (newValue) {
	                if (newValue && system.isPromise(newValue) && !skipPromises) {
	                    newValue.then(function (result) {
	                        innerSetter(observable, result, system.isArray(result));
	                    });
	                } else {
	                    innerSetter(observable, newValue, isArray);
	                }
	            }) : undefined
	        });

	        lookup[propertyName] = observable;
	        return observable;
	    }

	    /**
	     * Defines a computed property using ES5 getters and setters.
	     * @method defineProperty
	     * @param {object} obj The target object on which to create the property.
	     * @param {string} propertyName The name of the property to define.
	     * @param {function|object} evaluatorOrOptions The Knockout computed function or computed options object.
	     * @return {KnockoutObservable} The underlying computed observable.
	     */
	    function defineProperty(obj, propertyName, evaluatorOrOptions) {
	        var computedOptions = { owner: obj, deferEvaluation: true },
	            computed;

	        if (typeof evaluatorOrOptions === 'function') {
	            computedOptions.read = evaluatorOrOptions;
	        } else {
	            if ('value' in evaluatorOrOptions) {
	                system.error('For defineProperty, you must not specify a "value" for the property. You must provide a "get" function.');
	            }

	            if (typeof evaluatorOrOptions.get !== 'function' && typeof evaluatorOrOptions.read !== 'function') {
	                system.error('For defineProperty, the third parameter must be either an evaluator function, or an options object containing a function called "get".');
	            }

	            computedOptions.read = evaluatorOrOptions.get || evaluatorOrOptions.read;
	            computedOptions.write = evaluatorOrOptions.set || evaluatorOrOptions.write;
	        }

	        computed = ko.computed(computedOptions);
	        obj[propertyName] = computed;

	        return convertProperty(obj, propertyName, computed);
	    }

	    observableModule = function(obj, propertyName){
	        var lookup, observable, value;

	        if (!obj) {
	            return null;
	        }

	        lookup = obj.__observable__;
	        if(lookup){
	            observable = lookup[propertyName];
	            if(observable){
	                return observable;
	            }
	        }

	        value = obj[propertyName];

	        if(ko.isObservable(value)){
	            return value;
	        }

	        return convertProperty(obj, propertyName, value);
	    };

	    observableModule.defineProperty = defineProperty;
	    observableModule.convertProperty = convertProperty;
	    observableModule.convertObject = convertObject;

	    /**
	     * Installs the plugin into the view model binder's `beforeBind` hook so that objects are automatically converted before being bound.
	     * @method install
	     */
	    observableModule.install = function(options) {
	        var original = binder.binding;

	        binder.binding = function(obj, view, instruction) {
	            if(instruction.applyBindings && !instruction.skipConversion){
	                convertObject(obj);
	            }

	            original(obj, view);
	        };

	        logConversion = options.logConversion;
	        if (options.changeDetection) {
	            changeDetectionMethod = options.changeDetection;
	        }

	        skipPromises = options.skipPromises;
	        shouldIgnorePropertyName = options.shouldIgnorePropertyName || defaultShouldIgnorePropertyName;
	    };

	    return observableModule;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.1.0 Copyright (c) 2012 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * Serializes and deserializes data to/from JSON.
	 * @module serializer
	 * @requires system
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function(system) {
	    /**
	     * @class SerializerModule
	     * @static
	     */
	    return {
	        /**
	         * The name of the attribute that the serializer should use to identify an object's type.
	         * @property {string} typeAttribute
	         * @default type
	         */
	        typeAttribute: 'type',
	        /**
	         * The amount of space to use for indentation when writing out JSON.
	         * @property {string|number} space
	         * @default undefined
	         */
	        space:undefined,
	        /**
	         * The default replacer function used during serialization. By default properties starting with '_' or '$' are removed from the serialized object.
	         * @method replacer
	         * @param {string} key The object key to check.
	         * @param {object} value The object value to check.
	         * @return {object} The value to serialize.
	         */
	        replacer: function(key, value) {
	            if(key){
	                var first = key[0];
	                if(first === '_' || first === '$'){
	                    return undefined;
	                }
	            }

	            return value;
	        },
	        /**
	         * Serializes the object.
	         * @method serialize
	         * @param {object} object The object to serialize.
	         * @param {object} [settings] Settings can specify a replacer or space to override the serializer defaults.
	         * @return {string} The JSON string.
	         */
	        serialize: function(object, settings) {
	            settings = (settings === undefined) ? {} : settings;

	            if(system.isString(settings) || system.isNumber(settings)) {
	                settings = { space: settings };
	            }

	            return JSON.stringify(object, settings.replacer || this.replacer, settings.space || this.space);
	        },
	        /**
	         * Gets the type id for an object instance, using the configured `typeAttribute`.
	         * @method getTypeId
	         * @param {object} object The object to serialize.
	         * @return {string} The type.
	         */
	        getTypeId: function(object) {
	            if (object) {
	                return object[this.typeAttribute];
	            }

	            return undefined;
	        },
	        /**
	         * Maps type ids to object constructor functions. Keys are type ids and values are functions.
	         * @property {object} typeMap.
	         */
	        typeMap: {},
	        /**
	         * Adds a type id/constructor function mampping to the `typeMap`.
	         * @method registerType
	         * @param {string} typeId The type id.
	         * @param {function} constructor The constructor.
	         */
	        registerType: function() {
	            var first = arguments[0];

	            if (arguments.length == 1) {
	                var id = first[this.typeAttribute] || system.getModuleId(first);
	                this.typeMap[id] = first;
	            } else {
	                this.typeMap[first] = arguments[1];
	            }
	        },
	        /**
	         * The default reviver function used during deserialization. By default is detects type properties on objects and uses them to re-construct the correct object using the provided constructor mapping.
	         * @method reviver
	         * @param {string} key The attribute key.
	         * @param {object} value The object value associated with the key.
	         * @param {function} getTypeId A custom function used to get the type id from a value.
	         * @param {object} getConstructor A custom function used to get the constructor function associated with a type id.
	         * @return {object} The value.
	         */
	        reviver: function(key, value, getTypeId, getConstructor) {
	            var typeId = getTypeId(value);
	            if (typeId) {
	                var ctor = getConstructor(typeId);
	                if (ctor) {
	                    if (ctor.fromJSON) {
	                        return ctor.fromJSON(value);
	                    }

	                    return new ctor(value);
	                }
	            }

	            return value;
	        },
	        /**
	         * Deserialize the JSON.
	         * @method deserialize
	         * @param {string} text The JSON string.
	         * @param {object} [settings] Settings can specify a reviver, getTypeId function or getConstructor function.
	         * @return {object} The deserialized object.
	         */
	        deserialize: function(text, settings) {
	            var that = this;
	            settings = settings || {};

	            var getTypeId = settings.getTypeId || function(object) { return that.getTypeId(object); };
	            var getConstructor = settings.getConstructor || function(id) { return that.typeMap[id]; };
	            var reviver = settings.reviver || function(key, value) { return that.reviver(key, value, getTypeId, getConstructor); };

	            return JSON.parse(text, reviver);
	        },
	        /**
	         * Clone the object.
	         * @method clone
	         * @param {object} obj The object to clone.
	         * @param {object} [settings] Settings can specify any of the options allowed by the serialize or deserialize methods.
	         * @return {object} The new clone.
	         */
	        clone:function(obj, settings) {
	            return this.deserialize(this.serialize(obj, settings), settings);
	        }
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.1.0 Copyright (c) 2012 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * The entrance transition module.
	 * @module entrance
	 * @requires system
	 * @requires composition
	 * @requires jquery
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(5), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function(system, composition, $) {
	    var fadeOutDuration = 100;
	    var endValues = {
	        left: '0px',
	        opacity: 1
	    };
	    var clearValues = {
	        left: '',
	        top: '',
	        right: '',
	        bottom:'',
	        position:'',
	        opacity: ''
	    };

	    var isIE = navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/MSIE/);

	    var animation = false,
	        domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
	        elm = document.createElement('div');

	    if(elm.style.animationName !== undefined) {
	        animation = true;
	    }

	    if(!animation) {
	        for(var i = 0; i < domPrefixes.length; i++) {
	            if(elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
	                animation = true;
	                break;
	            }
	        }
	    }

	    if(animation) {
	        if(isIE){
	            system.log('Using CSS3/jQuery mixed animations.');
	        }else{
	            system.log('Using CSS3 animations.');
	        }
	    } else {
	        system.log('Using jQuery animations.');
	    }

	    function removeAnimationClasses(ele, fadeOnly){
	        ele.classList.remove(fadeOnly ? 'entrance-in-fade' : 'entrance-in');
	        ele.classList.remove('entrance-out');
	    }

	    /**
	     * @class EntranceModule
	     * @constructor
	     */
	    var entrance = function(context) {
	        return system.defer(function(dfd) {
	            function endTransition() {
	                dfd.resolve();
	            }

	            function scrollIfNeeded() {
	                if (!context.keepScrollPosition) {
	                    $(document).scrollTop(0);
	                }
	            }

	            if (!context.child) {
	                $(context.activeView).fadeOut(fadeOutDuration, endTransition);
	            } else {
	                var duration = context.duration || 500;
	                var $child = $(context.child);
	                var fadeOnly = !!context.fadeOnly;
	                var startValues = {
	                    display: 'block',
	                    opacity: 0,
	                    position: 'absolute',
	                    left: fadeOnly || animation ? '0px' : '20px',
	                    right: 0,
	                    top: 0,
	                    bottom: 0
	                };

	                function startTransition() {
	                    scrollIfNeeded();
	                    context.triggerAttach();

	                    if (animation) {
	                        removeAnimationClasses(context.child, fadeOnly);
	                        context.child.classList.add(fadeOnly ? 'entrance-in-fade' : 'entrance-in');
	                        setTimeout(function () {
	                            removeAnimationClasses(context.child, fadeOnly);
	                            if(context.activeView){
	                                removeAnimationClasses(context.activeView, fadeOnly);
	                            }
	                            $child.css(clearValues);
	                            endTransition();
	                        }, duration);
	                    } else {
	                        $child.animate(endValues, {
	                            duration: duration,
	                            easing: 'swing',
	                            always: function() {
	                                $child.css(clearValues);
	                                endTransition();
	                            }
	                        });
	                    }
	                }

	                $child.css(startValues);

	                if(context.activeView) {
	                    if (animation && !isIE) {
	                        removeAnimationClasses(context.activeView, fadeOnly);
	                        context.activeView.classList.add('entrance-out');
	                        setTimeout(startTransition, fadeOutDuration);
	                    } else {
	                        $(context.activeView).fadeOut({ duration: fadeOutDuration, always: startTransition });
	                    }
	                } else {
	                    startTransition();
	                }
	            }
	        }).promise();
	    };

	    return entrance;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var ko = __webpack_require__(2);
	var app = __webpack_require__(9);
	var system = __webpack_require__(1);
	var widget = __webpack_require__(13);

	// Durandal core overrides - Required for Webpack
	__webpack_require__(25);
	__webpack_require__(24);
	__webpack_require__(26);
	__webpack_require__(27);

	// Webpack sets this __DEV__ variable. See `webpack.config.js` file
	if(true) {
		system.debug(true);

		window.ko = ko;
		window.app = app;
		window.router = router;
	}

	// Install the router
	var router = __webpack_require__(6);
	router.install({});


	// Install widgets
	var widgets = __webpack_require__(18);
	widget.install({
		kinds: Object.keys(widgets)
	});

	// Start the appliction
	app.start().then(function () {
		// Set the title
		app.title = 'Durandal + Webpack';

		// Show the app by setting the root view model for our application with a transition.
		var shell = __webpack_require__(29);
		return app.setRoot(shell);
	});


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var system = __webpack_require__(1);
	var composition = __webpack_require__(5);

	var compose = composition.compose;
	composition.compose = function(element, settings) {
		// If the `model` isn't a `moduleId` string, assume it's the module
		// itself and resolve it using the `system` module
		if('string' !== typeof settings.model) {
			settings.model = system.resolveObject(settings.model);
		}

		// super()
		return compose.apply(this, arguments);
	};



/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var system = __webpack_require__(1);

	var acquire = system.acquire;
	system.acquire = function(moduleIdOrModule) {
		var moduleType = typeof moduleIdOrModule;

		if(moduleType !== 'string') {
			return system.defer(function(dfd) {
				// If the moduleId is a funcction...
				if(moduleIdOrModule instanceof Function) {
					// Execute the function, passing a callback that should be 
					// called when the (possibly) async operation is finished
					var result = moduleIdOrModule(function(err, module) {
						if(err) { dfd.reject(err); }
						dfd.resolve(module);
					});

					// Also allow shorthand `return` from the funcction, which 
					// resolves the Promise with whatever was immediately returned
					if(result !== undefined) {
						dfd.resolve(result);
					}
				}

				// If the moduleId is actually an object, simply resolve with it
				else {
					dfd.resolve(moduleIdOrModule);
				}
			});
		}

		// super()
		return acquire.apply(this, arguments);
	};


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(3);
	var system = __webpack_require__(1);
	var viewLocator = __webpack_require__(14);

	// Allow using `function` or bare HTML string as a view
	var locateView = viewLocator.locateView;
	viewLocator.locateView = function(viewOrUrlOrId, area) {
		var viewId;

		// HTML here will be passed into `processMarkup`
		if('string' === typeof viewOrUrlOrId && $.trim(viewOrUrlOrId).charAt(0) === '<') {
			return system.defer(function(dfd) {
				dfd.resolve(viewOrUrlOrId);
			});
		}

		// super()
		return locateView.apply(this, arguments);
	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var widget = __webpack_require__(13);

	// Import the widgets index module, which should export an object
	// whose keys are the names of the Widgets to register and the
	// values the Widget modules
	var widgets = __webpack_require__(18);

	// Widgets usually require a `moduleId` to resolve. We'll override this so
	// we return the ViewModel class directly, by looking it up in the `widgets/index`
	// file by key. 
	widget.convertKindToModulePath = function(name) {
		var widget = widgets[ name ];
		if(!widget) {
			console.error('Missing or invalid widget requested: ' + name);
		}
		
		return widget;
	};

	// By default, Durandal will attempt to retrieve the view for a widget using
	// the `mapKindToViewId` and pass it along to the `composition` engine. We'll
	// do away with this, and force it to use the notmal `getView` method instead.
	widget.mapKindToViewId = function() { };

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var system = __webpack_require__(1);

	module.exports = [
		// Here we define our routes as usual, but with one important distinction.
		// Our `moduleId` is no longer a string that points to the module, but rather 
		// the module itself, as an inline, static dependency. This will bundle the
		// modules into your main app, but still work as expected in Durandal!
		{
			route: '', 
			title: 'About',
			moduleId: function() {
				return __webpack_require__(30);
			},
			nav: true
		},
		{
			route: 'dialogs',
			title: 'Dailogs',
			moduleId: function() {
				return __webpack_require__(31);
			},
			nav: true
		},
		{
			route: 'widgets',
			title: 'Widgets',
			moduleId: function() {
				return __webpack_require__(38);
			},
			nav: true
		},

		// An async route, which lets us define certain "Code Splitting" points
		// which shouldn't be distributed in the main app.js file, but bundled
		// alongside it to be fetched once the user actually goes to this route
		//
		// Check the Network tab when navigating to this page, you'll see it load
		// asynchronously, just like your old Require.js setup.
		{
			route: 'router*details',
			hash: '#router',
			title: 'Router',
			moduleId: function(cb) {
				__webpack_require__.e/* require */(1, function(__webpack_require__) { /* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(34)]; (function(module) {
					cb(null, module);
				}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));
	/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(15)(module)))});
			},
			nav: true
		}
	];


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var router = __webpack_require__(6);
	var ViewModel = __webpack_require__(4);

	var Shell = new ViewModel({
		view: __webpack_require__(40)
	});

	Shell.router = router.map(
		__webpack_require__(28)
	)
	.buildNavigationModel();

	Shell.activate = function() {
		return router.activate();
	};

	module.exports = Shell;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var ViewModel = __webpack_require__(4);

	var Home = new ViewModel({
		view: __webpack_require__(41)
	});

	module.exports = Home;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var system = __webpack_require__(1);
	var dialog = __webpack_require__(10);
	var ViewModel = __webpack_require__(4);

	var Dialogs = new ViewModel({
		view: __webpack_require__(42)
	});

	Dialogs.alert = function() {
		return dialog.showMessage('Sample alert message', 'Alert!');
	};

	Dialogs.confirm = function() {
		return dialog.showMessage('Sample confirmation dialog', 'Confirm', ['OK', 'Cancel']);
	};

	Dialogs.prompt = function() {
		var Dialog = __webpack_require__(33);

		return dialog.show( new Dialog(), [
			'Enter some text'
		])

		.then(function(result) {
			console.info('User entered: ', result);
		});
	};

	Dialogs.hello = function() {
		return system.defer(function(dfd) {
			__webpack_require__.e/* require */(2, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(32)]; (dfd.resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});
		})

		.then(function(Dialog) {
			return dialog.show( new Dialog(), [
				'Enter some text'
			]);
		})

		.then(function(result) {
			console.info('User entered: ', result);
		});
	};

	module.exports = Dialogs;


/***/ },
/* 32 */,
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var ko = __webpack_require__(2);
	var dialog = __webpack_require__(10);
	var ViewModel = __webpack_require__(4);

	function Prompt() {
		this.message = ko.observable('');
		this.text = ko.observable('');
		this.title = ko.observable('');
		this.canClose = ko.observable(true);
	};

	Prompt.prototype.view = __webpack_require__(44);

	Prompt.prototype.getView = ViewModel.prototype.getView;

	Prompt.prototype.activate = function(message, initialText, canClose) {
		this.message(message);
		this.text(initialText);
		this.canClose(canClose !== false);
	};

	Prompt.prototype.selectOption = function(result) { 
		if(result === true) {
			result = this.text();
		}

		return dialog.close(this, result);
	};

	Prompt.prototype.close = function() {
		return dialog.close(this, null);
	};

	module.exports = Prompt;

/***/ },
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var ViewModel = __webpack_require__(4);

	var Widgets = new ViewModel({
		view: __webpack_require__(48)
	});

	module.exports = Widgets;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var ko = __webpack_require__(2);
	var ViewModel = __webpack_require__(4);

	var Alert = function() {
		this.variant = ko.observable('');
		this.text = ko.observable('');
		this.title = ko.observable('');
		this.canClose = ko.observable(true);

		this.className = ko.pureComputed(function() {
			var classes = [
				'alert-' + this.variant()
			];

			if(this.canClose()) {
				classes.push('alert-dismissable');
			}

			return classes.join(' ');
		},
		this);
	};

	Alert.prototype.view = __webpack_require__(49);

	Alert.prototype.getView = ViewModel.prototype.getView;

	Alert.prototype.activate = function(settings) {
		this.variant(settings.variant || 'danger');
		this.text(settings.text);
		this.title(settings.title);
		this.canClose(settings.canClose !== false);
	};

	module.exports = Alert;

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = "<main id=\"shell\">\n\t<div class=\"navbar navbar-default\">\n\t\t<div class=\"container-fluid\">\n\t\t\t<div class=\"navbar-header\">\n\t\t\t\t<a class=\"navbar-brand\" data-bind=\"attr: { href: router.navigationModel()[0].hash }\">\n\t\t\t\t\t<i class=\"icon-home\"></i>\n\t\t\t\t\t<span>Durandal + Webpack</span>\n\t\t\t\t</a>\n\t\t\t</div>\n\n\t\t\t<ul class=\"nav navbar-nav\" data-bind=\"foreach: router.navigationModel\">\n\t\t\t\t<li data-bind=\"css: { active: isActive }\">\n\t\t\t\t\t<a data-bind=\"attr: { href: hash }, html: title\"></a>\n\t\t\t\t</li>\n\t\t\t</ul>\n\n\t\t\t<ul class=\"nav navbar-nav navbar-right\">\n\t\t\t\t<li><a href=\"http://blog.craigsworks.com/durandal-and-webpack-introduction\" target=\"_blank\">Read the article</a></li>\n\t\t\t</ul>\n\n\t\t\t<div class=\"loader navbar-right\" data-bind=\"css: { active: router.isNavigating }\">\n\t\t\t\t<i class=\"icon-spinner icon-2x icon-spin\"></i>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div id=\"page\" class=\"container\" data-bind=\"router: {}\"></div>\n</main>";

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = "<section id=\"about\">\n\t<header><h3>What is this?</h3></header>\n\t<p>\n\t\tThis is a sample project that demonstrates the use of Webpack with Durandal together to bundle your SPA.\n\t</p>\n\t<br />\n\n\t<article>\n\t\t<header><h4>Why would I use it?</h4></header>\n\t\t<p>\n\t\t\tDurandal is a SPA framework\n\t\t\tbuilt atop the popular Require.js specification, allowing users to modularise their code and asynchronously\n\t\t\tfetch their dependenices on request.\n\t\t</p>\n\t\t<p>\n\t\t\tUtilising Webpack in place of Require.js provides many benefits, including allowing us to smarly bundle our application\n\t\t\tinto distinct chunks, as opposed to completely individual files. This is great for caching, and can give a good boost\n\t\t\tto performance, especially on high latency networks.\n\t\t</p>\n\t\t<p>\n\t\t\tThere are plenty of other benefits, including transpilation support, CSS bundling and more!\n\t\t</p>\n\t</article>\n\t<br />\n\n\t<article>\n\t\t<header><h4>How do you do it?</h4></header>\n\n\t\t<p>\n\t\t\tThis project is supported by an in-depth Blog series title \"Durandal + Webpack\", which should answer any questions\n\t\t\tyou have about how this was achieved. Make sure to check-out the source for a technical view of what's going on.\n\t\t</p>\n\n\t\t<a class=\"btn btn-primary\" href=\"http://blog.craigsworks.com/durandal-and-webpack-introduction\">Read the Guide</a>\n\t\t<a class=\"btn btn-primary\" href=\"http://bgithub.com/Craga89/durandal-webpack\">View Source</a>\n\n\t</article>\n\n</section>";

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = "<section id=\"dialogs\">\n\t<header><h3>Dialogs</h3></header>\n\t<p>\n\t\tDialogs can be easily integrate into the Webpack build by referencing the ViewModel\n\t\tas a direct dependency, and passing it to <code>dialog.show</code> as the first\n\t\tparameter, instead of the usual <code>moduleId</code>.\n\t</p>\n\t<br />\n\n\t<article>\n\t\t<header><h4>Examples</h4></header>\n\t\t<p>\n\t\t\t<a class=\"btn btn-danger\" data-bind=\"click: alert\">Alert</a>\n\t\t\t<a class=\"btn btn-warning\" data-bind=\"click: alert\">Confirm</a>\n\t\t\t<a class=\"btn btn-info\" data-bind=\"click: prompt\">Prompt</a>\n\t\t</p>\n\t</article>\n\t<br />\n\n\t<article>\n\t\t<header><h4>Asynchronous</h4></header>\n\t\t<p>\n\t\t\tWe can also fetch dialogs on request using Webpacks <code>require.ensure</code> Code Splitting\n\t\t\tfunctionality!\n\t\t</p>\n\t\t<p>\n\t\t\t<a class=\"btn btn-danger\" data-bind=\"click: hello\">Alert</a>\n\t\t</p>\n\t</article>\n</div>";

/***/ },
/* 43 */,
/* 44 */
/***/ function(module, exports) {

	module.exports = "<div class=\"modal-dialog\">\n\t<div class=\"modal-content\">\n\t\t<div class=\"modal-header\">\n\t\t\t<!-- ko if: canClose -->\n\t\t\t\t<a role=\"button\" title=\"Close Dialog\" class=\"close\" data-bind=\"click: close\">\n\t\t\t\t\t&times;\n\t\t\t\t</a>\n\t\t\t<!-- /ko-->\n\n\t\t\t<h4 class=\"modal-title\">Prompt</h4>\n\t\t</div>\n\n\t\t<div class=\"modal-body\">\n\t\t\t<p class=\"message\" data-bind=\"text: message\"></p>\n\n\t\t\t<input type=\"text\" class=\"form-control\" data-bind=\"value: text\" />\n\t\t</div>\n\n\t\t<div class=\"modal-footer\">\n\t\t\t<a class=\"btn btn-primary\" data-bind=\"click: function() { selectOption(true); }\">OK</a>\n\t\t\t<a class=\"btn btn-default\" data-bind=\"click: close\">Cancel</a>\n\t\t</div>\n\t</div>\n</div>";

/***/ },
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */
/***/ function(module, exports) {

	module.exports = "<section id=\"widgets\">\n\t<header><h3>Widgets</h3></header>\n\t<p>\n\t\tUtilising Durandals <code>widget</code> functionality is simply a case of re-using the same\n\t\t<code>getView</code> logic discussed in the <code>Composition</code> section!\n\t</p>\n\t<br />\n\n\t<article>\n\t\t<header><h4>Alerts</h4></header>\n\n\t\t<!-- ko Alert: {\n\t\t\ttitle: \"Reusable, bundled widgets!\",\n\t\t\ttext: \"This widget is re-usable, and uses the same `getView` functionality as the ViewModels!\",\n\t\t\tvariant: \"info\"\n\t\t} \n\t\t--> <!-- /ko -->\n\n\t\t<!-- ko Alert: {\n\t\t\ttitle: \"Same Widget, different options\",\n\t\t\ttext: \"So swish\",\n\t\t\tvariant: \"warning\"\n\t\t} \n\t\t--> <!-- /ko -->\n\t</article>\n</div>";

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = "<div class=\"alert fade in\" role=\"alert\" data-bind=\"css: className\">\n\t<!-- ko if: canClose -->\n\t<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n\t\t<span aria-hidden=\"true\">×</span>\n\t</button>\n\t<!-- /ko -->\n\n\t<h4 data-bind=\"text: title\"></h4>\n\t<p data-bind=\"text: text\"></p>\n</div>";

/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ }
/******/ ]);