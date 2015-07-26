webpackJsonp([2],{

/***/ 32:
/***/ function(module, exports, __webpack_require__) {

	var ko = __webpack_require__(2);
	var dialog = __webpack_require__(10);
	var ViewModel = __webpack_require__(4);

	function Hello() {
		this.message = ko.observable('');
		this.text = ko.observable('');
		this.title = ko.observable('');
		this.canClose = ko.observable(true);
	};

	Hello.prototype.view = __webpack_require__(43);

	Hello.prototype.getView = ViewModel.prototype.getView;

	Hello.prototype.close = function() {
		return dialog.close(this, null);
	};

	module.exports = Hello;

/***/ },

/***/ 43:
/***/ function(module, exports) {

	module.exports = "<div class=\"modal-dialog\">\n\t<div class=\"modal-content\">\n\t\t<div class=\"modal-header\">\n\t\t\t<!-- ko if: canClose -->\n\t\t\t\t<a role=\"button\" title=\"Close Dialog\" class=\"close\" data-bind=\"click: close\">\n\t\t\t\t\t&times;\n\t\t\t\t</a>\n\t\t\t<!-- /ko-->\n\n\t\t\t<h4 class=\"modal-title\">Hello world!</h4>\n\t\t</div>\n\n\t\t<div class=\"modal-body\">\n\t\t\t<p>\n\t\t\t\tI was loaded in a separate network request to the rest of the application. I'm not\n\t\t\t\topened that much, so it's probably for the best... :(\n\t\t\t</p>\n\t\t</div>\n\n\t\t<div class=\"modal-footer\">\n\t\t\t<a class=\"btn btn-default\" data-bind=\"click: close\">Bye!</a>\n\t\t</div>\n\t</div>\n</div>";

/***/ }

});