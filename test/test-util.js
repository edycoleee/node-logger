//test/test-util.js

import { logger } from "../src/application/logging";
import { query } from "../src/service/db";

export const removeTestUser = async (username) => {
  await query('DELETE FROM users WHERE username = ?', [username]);
  const rows = await query('SELECT * FROM users WHERE username = ?', [username]);
  logger.info(`DELETE NEW DATA: ${JSON.stringify(rows)}`);
}

export const createTestUser = async (username, password, name) => {
  await query('INSERT INTO users (username,password,name) VALUES (?, ?, ?)', [username, password, name]);
  const rows = await query('SELECT * FROM users WHERE username = ?', [username]);
  logger.info(`INSERT NEW DATA: ${JSON.stringify(rows)}`);
}