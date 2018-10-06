const express = require("express");
const validateRequest = require('../middlewares/validateRequest');
let router = express.Router();
let getDataSource = require("../getDataSource");

const getCuisine = function (app, userId) {
	return new Promise((resolve, reject) => {
		let source = getDataSource(app);
		let query = `
    SELECT
	  *
    FROM food`;

		source.execute(query, [userId], (err, result) => {
			if(err) return reject(err);
			return resolve(result);
		});
	});
};

/**
 * @swagger
 * /cuisine/getCuisine:
 *   get:
 *     responses:
 *       200:
 *         description: success
 *
 *     tags:
 *        - Cuisine
 */
router.get("/cuisine/getCuisine",
	(req, res) => {

		Promise.all([
			getCuisine(req.app)
		]).then(result => {
			return res.send({
				data: result[0]
			})
		}).catch(e =>{
			res.status(500).send(e.message);
		});
	});


module.exports = router;
