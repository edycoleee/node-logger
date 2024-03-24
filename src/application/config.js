//src/application/config.js

export const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    host: "localhost",
    user: "root",
    password: "760410",
    database: "dbsiswa",
    connectTimeout: 60000
  },
  listPerPage: 10,
};
