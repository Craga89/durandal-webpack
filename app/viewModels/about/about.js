var ViewModel = require('viewModels/class');

var Home = new ViewModel({
	view: require('./about.html')
});

module.exports = Home;
