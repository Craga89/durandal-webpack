var router = require('plugins/router');
var ViewModel = require('viewModels/class');

var Index = new ViewModel({
	view: require('./index.html')
});

Index.router  = router.createChildRouter()
	.makeRelative({ fromParent: true })
	.map(
		require('./routes')
	)
	.buildNavigationModel();

module.exports = Index;
