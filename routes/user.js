const express = require("express");
const validateRequest = require('../middlewares/validateRequest');
let router = express.Router();
let getDataSource = require("../getDataSource");

const getUser = function (app, userId) {
	return new Promise((resolve, reject) => {
		let source = getDataSource(app);
		let query = `
    SELECT
	  *
    FROM user
    WHERE user_id=?`;

		source.execute(query, [userId], (err, result) => {
			if(err) return reject(err);
			return resolve(result);
		});
	});
};

/**
 * @swagger
 * /user/getUser:
 *   get:
 *     parameters:
 *       - in: query
 *         name: user_id
 *         description: User ID
 *         schema:
 *           type: string
 *         required: true
 *
 *     responses:
 *       200:
 *         description: success
 *
 *     tags:
 *        - User
 */
router.post("/user/getUser",
	validateRequest({
		user_id: {
			notEmpty: true,
			errorMessage: "user_id cannot be empty"
		},
	}),
	(req, res) => {
		let userId = req.query.user_id;
		console.log("konsisten");

		Promise.all([
			getUser(req.app, userId)
		]).then(result => {
			console.log(result);
			return res.send({
				data: responseList[0]
			})
		}).catch(e =>{
			res.status(500).send(e.message);
		});
	});


module.exports = router;
