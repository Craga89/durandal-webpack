var ko = require('knockout');
var ViewModel = require('viewModels/class');

var Alert = function() {
	this.variant = ko.observable('');
	this.text = ko.observable('');
	this.title = ko.observable('');
	this.canClose = ko.observable(true);

	this.className = ko.pureComputed(function() {
		var classes = [
			'alert-' + this.variant()
		];

		if(this.canClose()) {
			classes.push('alert-dismissable');
		}

		return classes.join(' ');
	},
	this);
};

Alert.prototype.view = require('./alert.html');

Alert.prototype.getView = ViewModel.prototype.getView;

Alert.prototype.activate = function(settings) {
	this.variant(settings.variant || 'danger');
	this.text(settings.text);
	this.title(settings.title);
	this.canClose(settings.canClose !== false);
};

module.exports = Alert;