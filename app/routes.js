var system = require('durandal/system');

module.exports = [
	// Here we define our routes as usual, but with one important distinction.
	// Our `moduleId` is no longer a string that points to the module, but rather 
	// the module itself, as an inline, static dependency. This will bundle the
	// modules into your main app, but still work as expected in Durandal!
	{
		route: '', 
		title: 'About',
		moduleId: function() {
			return require('viewModels/about/about');
		},
		nav: true
	},

	// An async route, which lets us define certain "Code Splitting" points
	// which shouldn't be distributed in the main app.js file, but bundled
	// alongside it to be fetched once the user actually goes to this route
	//
	// Check the Network tab when navigating to this page, you'll see it load
	// asynchronously, just like your old Require.js setup.
	{
		route: 'router*details',
		hash: '#router',
		title: 'Router',
		moduleId: function(cb) {
			require(['viewModels/router/index'], function(module) {
				cb(null, module);
			});
		},
		nav: true
	},

	{
		route: 'dialogs',
		title: 'Dialogs',
		moduleId: function() {
			return require('viewModels/dialogs/dialogs');
		},
		nav: true
	},
	
	{
		route: 'widgets',
		title: 'Widgets',
		moduleId: function() {
			return require('viewModels/widgets/widgets');
		},
		nav: true
	}
];
