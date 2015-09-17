var system = require('durandal/system');

var acquire = system.acquire;
system.acquire = function(moduleIdOrModule) {
	var isModule = typeof moduleIdOrModule !== 'string' && !(moduleIdOrModule instanceof Array);
	if(isModule) {
		return system.defer(function(dfd) {
			// If the moduleId is a function...
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
