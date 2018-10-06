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

const addCuisine = function (app, name, desc) {
	return new Promise((resolve, reject) => {
		let source = getDataSource(app);
		let now = new Date();
		let query = `
    INSERT INTO food(name,description,created_date)
    VALUES(?,?,?)`;

		source.execute(query, [name, desc, now], (err, result) => {
			if(err) return reject(err);
			return resolve(result);
		});
	});
};

const deleteCuisine = function (app, id) {
	return new Promise((resolve, reject) => {
		let source = getDataSource(app);
		let query = `DELETE FROM food WHERE id = ?`;

		source.execute(query, [id], (err, result) => {
			if(err) return reject(err);
			return resolve(result);
		});
	});
};

const editCuisine = function (app, id, name, desc) {
	return new Promise((resolve, reject) => {
		let source = getDataSource(app);
		let query = `UPDATE food SET name=?,description=? WHERE id=?`;

		source.execute(query, [name, desc, id], (err, result) => {
			if(err) return reject(err);
			return resolve(result);
		});
	});
};

/**
 * @swagger
 * /cuisine:
 *   get:
 *     responses:
 *       200:
 *         description: success
 *
 *     tags:
 *        - Cuisine
 */
router.get("/cuisine",
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

/**
 * @swagger
 * /cuisine:
 *    post:
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: name
 *         description: E.g. -> Soto, Karedok, etc
 *         schema:
 *           type: string
 *         required: true
 *       - in: formData
 *         name: description
 *         description: E.g. -> Soto adalah makanan nikmat khas Jawa
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: success
 *
 *     tags:
 *        - Cuisine
 */
router.post("/cuisine",
	(req, res) => {
		let name = req.body.name;
		let desc = req.body.description;

		Promise.all([
			addCuisine(req.app, name, desc)
		]).then(result => {
			return res.send({
				data: result[0]
			})
		}).catch(e =>{
			res.status(500).send(e.message);
		});
	});

/**
 * @swagger
 * /cuisine/{id}:
 *    delete:
 *     parameters:
 *       - in: path
 *         name: id
 *         description: E.g. -> 1, 15
 *         schema:
 *           type: int
 *         required: true
 *     responses:
 *       200:
 *         description: success
 *
 *     tags:
 *        - Cuisine
 */
router.delete("/cuisine/:id",
	(req, res) => {
		let id = req.params.id;

		Promise.all([
			deleteCuisine(req.app, id)
		]).then(result => {
			return res.send({
				message: "Delete Success"
			})
		}).catch(e =>{
			res.status(500).send(e.message);
		});
	});

/**
 * @swagger
 * /cuisine/{id}:
 *   patch:
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: path
 *         name: id
 *         description: E.g. -> 1, 5
 *         schema:
 *           type: integer
 *         required: true
 *       - in: formData
 *         name: name
 *         description: E.g. -> Soto, Karedok, etc
 *         schema:
 *           type: string
 *         required: true
 *       - in: formData
 *         name: description
 *         description: E.g. -> Soto adalah makanan nikmat khas Jawa
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: success
 *
 *     tags:
 *        - Cuisine
 */
router.patch("/cuisine/:id",
	(req, res) => {
		let id = req.params.id;
		let name = req.body.name;
		let desc = req.body.description;

		Promise.all([
			editCuisine(req.app, id, name, desc)
		]).then(result => {
			return res.send({
				message: "Edit Success"
			})
		}).catch(e =>{
			res.status(500).send(e.message);
		});
	});

module.exports = router;
