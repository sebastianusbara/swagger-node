const DEFAULT_DATASOURCE = 'jenius';

module.exports = function getDataSource(app, name=DEFAULT_DATASOURCE) {
	return app.dataSources[name].connector;
};
