var router = require('plugins/router');
var ViewModel = require('viewModels/class');

var Shell = new ViewModel({
	view: require('./shell.html')
});

Shell.router = router.map(
	require('./routes')
)
.buildNavigationModel();

Shell.activate = function() {
	return router.activate();
};

module.exports = Shell;
