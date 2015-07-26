webpackJsonp([1],{

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	var router = __webpack_require__(6);
	var ViewModel = __webpack_require__(4);

	var Index = new ViewModel({
		view: __webpack_require__(45)
	});

	Index.router  = router.createChildRouter()
		.makeRelative({ fromParent: true })
		.map(
			__webpack_require__(35)
		)
		.buildNavigationModel();

	module.exports = Index;


/***/ },

/***/ 35:
/***/ function(module, exports, __webpack_require__) {

	module.exports = [
		{
			route: '', 
			title: 'What?',
			moduleId: function() {
				return __webpack_require__(36);
			},
			nav: true
		},

		// We can nest async routes, too, allowing us to conviniently
		// separate out various parts of our application into distinct,
		// async loaded parts. Beautiful!
		{
			route: 'nested', 
			title: 'One other thing...',
			moduleId: function(cb) {
				__webpack_require__.e/* require */(3, function(__webpack_require__) { /* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(37)]; (function(module) {
					cb(null, module);
				}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));
	/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(15)(module)))});
			},
			nav: true
		}
	];


/***/ },

/***/ 36:
/***/ function(module, exports, __webpack_require__) {

	var router = __webpack_require__(6);
	var ViewModel = __webpack_require__(4);

	var How = new ViewModel({
		view: __webpack_require__(46)
	});

	module.exports = How;


/***/ },

/***/ 45:
/***/ function(module, exports) {

	module.exports = "<section id=\"async\">\n\t<header><h3>Router</h3></header>\n\t<p>\n\t\tWe can interface nicely with the <code>router</code> component, too. You're seeing that in action now!\n\t</p>\n\t<br />\n\n\t<article>\n\t\t<header><h4>How?</h4></header>\n\t\t<p>\n\t\t\tTypically Durandals <code>router</code> module requires you to specify a <code>moduleId</code>\n\t\t\tfor each route.\n\t\t</p>\n\n\t\t<p>\n\t\t\tTo allow Webpack to know these are actual dependencies, we instead set each\n\t\t\t<code>moduleId</code> to the actual ViewModel module instance instead, and override the core\n\t\t\tDurandal <code>composition</code> and <code>system</code> modules to handle it.\n\t\t</p>\n\t</article>\n\t<br />\n\n\t<article>\n\t\t<header><h4>Asynchronous Routes!</h4></header>\n\n\t\t<ul class=\"nav nav-tabs\" data-bind=\"foreach: router.navigationModel\">\n\t\t\t<li data-bind=\"css: { active: isActive }\">\n\t\t\t\t<a data-bind=\"attr: { href: hash }, html: title\"></a>\n\t\t\t</li>\n\t\t</ul>\n\n\t\t<div class=\"container\" style=\"padding-top: 20px;\" data-bind=\"router: {}\"></div>\t\n\t</article>\n</section>";

/***/ },

/***/ 46:
/***/ function(module, exports) {

	module.exports = "<div>\n\t<p>\n\t\tAlong with the ability to bundle all the routes together, we can also optionally bundle specific\n\t\tparts of the application together into chucks we can grab on-the-fly when the user goes to\n\t\tspecific routes!\n\t</p>\n\t<p>\n\t\tIn fact... <b>this very page was requested separately from the main <code>app.js</code></b>.\n\t\tCheck the network tab to see this in action (look for the <code>1.chunk.js</code> file)!\n\t</b>\n\t<p>\n\t\tThis is great for large apps where we don't need or want the user to download the entirety of\n\t\tthe application code at once.\n\t</p>\n</div>";

/***/ }

});