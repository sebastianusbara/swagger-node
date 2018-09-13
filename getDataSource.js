const DEFAULT_DATASOURCE = 'sys';

module.exports = function getDataSource(app, name=DEFAULT_DATASOURCE) {
	return app.dataSources[name].connector;
};
