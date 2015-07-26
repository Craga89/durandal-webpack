var system = require('durandal/system');

// Allow actual modules to passed through instead of IDs, which simply
// returns a resolved promise containing the given module definition
var acquire = system.acquire;
system.acquire = function(moduleIdOrModule) {
	// If the moduleId is a callback, allow async operations by executing
	// it, and passing along a callback to execute when async op is finished
	if(moduleIdOrModule instanceof Function) {
		return system.defer(function(dfd) {
			moduleIdOrModule(function(err, module) {
				if(err) { dfd.reject(err); }
				dfd.resolve(module);
			});
		});
	}

	// If the moduleId is actually an object, simply resolve with it
	else if(typeof moduleIdOrModule === 'object') {
		return system.defer(function(dfd) {
			dfd.resolve(moduleIdOrModule);
		});
	}

	// super()
	return acquire.apply(this, arguments);
};
