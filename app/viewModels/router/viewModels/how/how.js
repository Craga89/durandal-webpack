var router = require('plugins/router');
var ViewModel = require('viewModels/class');

var How = new ViewModel({
	view: require('./how.html')
});

module.exports = How;
