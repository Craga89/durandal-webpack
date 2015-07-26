var ko = require('knockout');
var dialog = require('plugins/dialog');
var ViewModel = require('viewModels/class');

function Prompt() {
	this.message = ko.observable('');
	this.text = ko.observable('');
	this.title = ko.observable('');
	this.canClose = ko.observable(true);
};

Prompt.prototype.view = require('./prompt.html');

Prompt.prototype.getView = ViewModel.prototype.getView;

Prompt.prototype.activate = function(message, initialText, canClose) {
	this.message(message);
	this.text(initialText);
	this.canClose(canClose !== false);
};

Prompt.prototype.selectOption = function(result) { 
	if(result === true) {
		result = this.text();
	}

	return dialog.close(this, result);
};

Prompt.prototype.close = function() {
	return dialog.close(this, null);
};

module.exports = Prompt;