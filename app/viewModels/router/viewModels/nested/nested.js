var ViewModel = require('viewModels/class');

var Nested = new ViewModel({
	view: require('./nested.html')
});

module.exports = Nested;