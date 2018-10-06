const express = require("express");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const path = require('path');

//api routes
const cuisine = require('./cuisine');

let router = express.Router();
router.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
router.use(bodyParser.json({limit: '50mb'}));
router.use(expressValidator({
	errorFormatter: (param, msg, value, location) => {
		return msg;
	}
}));

//router use for api
router.use(cuisine);
const swaggerSpec = swaggerJSDoc({
	swaggerDefinition: {
		info: {
			title: "Cuisine Bucket List - Sebastianus Bara",
			version: "v2.0",
		}
	},
	apis: [
		path.resolve(__dirname+'/*'),
	],
});

const showExplorer = false;
const options = {};
const customCss = '';
const customFavicon = '';
const swaggerUrl = '';

router.use(
	'/explorer',
	swaggerUi.serve,
	swaggerUi.setup(
		swaggerSpec,
		showExplorer,
		options,
		customCss,
		customFavicon,
		swaggerUrl,
		"Food API",
		(req, res, next) => {
			next();
		}
	)
);

router.get('/api-docs.json', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerSpec);
});

router.use((err, req, res, next) => {
	throw  err;
});

module.exports = router;
