var widget = require('plugins/widget');

// Import the widgets index module, which should export an object
// whose keys are the names of the Widgets to register and the
// values the Widget modules
var widgets = require('widgets/index');

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