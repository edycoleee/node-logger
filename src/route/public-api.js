//src/route/public-api/js
import express from "express";
import Joi from "joi";
import { logger } from "../application/logging.js";
import { query } from "../service/db.js";


const publicRouter = new express.Router();

// publicRouter.get('/ping', healthController.ping);

// Endpoint untuk contoh API
publicRouter.get('/', (req, res) => {
  logger.info('Hello World requested');
  res.send('Hello World!');
});

// Users API
//GET ALL DATA
publicRouter.get('/api/users', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM users')
    //console.log(rows);
    logger.info(`GET DATA: ${rows}`);
    res.status(200).json(rows)
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }

});


// Skema validasi POST NEW DATA users menggunakan Joi
const schemaPostUser = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
});


//POST NEW DATA
publicRouter.post('/api/users', async (req, res) => {
  try {

    // Validasi data masukan
    const { error } = schemaPostUser.validate(req.body);
    if (error) {
      logger.error(`Validation Error: ${error.message}`);
      return res.status(400).send(error.details[0].message);
    }

    // Data valid, lanjutkan proses
    const { username, password, name } = req.body;
    await query('INSERT INTO users (username,password,name) VALUES (?, ?, ?)', [username, password, name]);
    const rows = await query('SELECT * FROM users WHERE username = ?', [username]);
    logger.info(`POST NEW DATA: ${JSON.stringify(rows)}`);
    res.status(201).send('Data inserted successfully');
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
});

// Skema validasi POST NEW DATA users menggunakan Joi
const schemaDeleteUser = Joi.object({
  username: Joi.string().required()
});

// Endpoint untuk menghapus data dari MySQL berdasarkan username
publicRouter.delete('/api/users/:username', async (req, res) => {
  try {
    // Validasi data username
    const { error } = schemaDeleteUser.validate(req.params);
    if (error) {
      logger.error(`Validation Error: ${error.message}`);
      return res.status(400).send(error.details[0].message);
    }

    const { username } = req.params;
    //check data jika ada
    const rowsExist = await query('SELECT * FROM users WHERE username = ?', [username]);
    logger.info(`GET DATA: ${JSON.stringify(rowsExist)}`);
    if (rowsExist !== 1) res.status(404).send('Data Not Found');

    //delete data
    const result = await query('DELETE FROM users WHERE username = ?', [username]);
    let message = 'Error in delete';
    if (result.affectedRows) {
      message = 'deleted successfully';
    }
    console.log("username :", username);
    console.log("result :", result.affectedRows);
    logger.info(`DELETE DATA: ${username}`);
    res.status(200).send('Data deleted successfully');
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
});

// publicRouter.post('/api/users', userController.register);

export {
  publicRouter
}