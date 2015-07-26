var system = require('durandal/system');
var composition = require('durandal/composition');

// Allow passing of a bare `function` as `model` property in a `compose` binding, which will
// resolve it via `system.resolveObject` just like a dynamically resolved module. This will
// only happen however if the function has a valid `__moduleId__` property as assigned by `system`.
var compose = composition.compose;
composition.compose = function(element, settings) {
	if(settings.model instanceof Function) {
		settings.model = system.resolveObject(settings.model);
	}

	// super()
	return compose.apply(this, arguments);
};

