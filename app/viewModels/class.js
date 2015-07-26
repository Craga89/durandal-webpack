var $ = require('jquery');

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
