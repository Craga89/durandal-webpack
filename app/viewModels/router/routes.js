module.exports = [
	{
		route: '', 
		title: 'What?',
		moduleId: function() {
			return require('./viewModels/how/how');
		},
		nav: true
	},

	// We can nest async routes, too, allowing us to conviniently
	// separate out various parts of our application into distinct,
	// async loaded parts. Beautiful!
	{
		route: 'nested', 
		title: 'One other thing...',
		moduleId: function(cb) {
			require(['./viewModels/nested/nested'], function(module) {
				cb(null, module);
			});
		},
		nav: true
	}
];
