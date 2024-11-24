const sql = require("mssql");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const config = {
  user: process.env.NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  server: process.env.SERVER,
  //   driver: process.env.DRIVER,
  options: {
    // Ignore SSL certificate validation (for testing only)
    encrypt: true,
    trustServerCertificate: true,
},
};

// Database connection
function dbConnection() {
  // Connecting to Ms Sql database
  return new Promise((resolve, reject) => {
    try {
      sql.connect(config, (err) => {
        if (err) { 
          console.log(err);
          reject("Failed to open a SQL Database connection.", err.stack);
        }
        resolve("SQL connected");
      });
    } catch (err) {
      console.log(err);
      reject("Failed to connect to a SQL Database connection.", err.message);
    }
  });
}

module.exports = dbConnection;
