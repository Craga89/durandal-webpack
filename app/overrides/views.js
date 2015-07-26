var $ = require('jquery');
var system = require('durandal/system');
var viewLocator = require('durandal/viewLocator');

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
