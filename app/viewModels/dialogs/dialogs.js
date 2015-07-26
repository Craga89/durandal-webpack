var system = require('durandal/system');
var dialog = require('plugins/dialog');
var ViewModel = require('viewModels/class');

var Dialogs = new ViewModel({
	view: require('./dialogs.html')
});

Dialogs.alert = function() {
	return dialog.showMessage('Sample alert message', 'Alert!');
};

Dialogs.confirm = function() {
	return dialog.showMessage('Sample confirmation dialog', 'Confirm', ['OK', 'Cancel']);
};

Dialogs.prompt = function() {
	var Dialog = require('./viewModels/prompt/prompt');

	return dialog.show( new Dialog(), [
		'Enter some text'
	])

	.then(function(result) {
		console.info('User entered: ', result);
	});
};

Dialogs.hello = function() {
	return system.defer(function(dfd) {
		require(['./viewModels/hello/hello'], dfd.resolve);
	})

	.then(function(Dialog) {
		return dialog.show( new Dialog(), [
			'Enter some text'
		]);
	})

	.then(function(result) {
		console.info('User entered: ', result);
	});
};

module.exports = Dialogs;
