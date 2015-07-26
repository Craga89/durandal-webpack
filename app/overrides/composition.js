var system = require('durandal/system');
var composition = require('durandal/composition');

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

