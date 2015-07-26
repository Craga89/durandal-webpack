var ko = require('knockout');
var dialog = require('plugins/dialog');
var ViewModel = require('viewModels/class');

function Hello() {
	this.message = ko.observable('');
	this.text = ko.observable('');
	this.title = ko.observable('');
	this.canClose = ko.observable(true);
};

Hello.prototype.view = require('./hello.html');

Hello.prototype.getView = ViewModel.prototype.getView;

Hello.prototype.close = function() {
	return dialog.close(this, null);
};

module.exports = Hello;