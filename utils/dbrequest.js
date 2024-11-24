const sql = require("mssql");
const dbrequest = async (query) => {
  // sending request to the database
  return new Promise((resolve, reject) => { 
    try {
      const request = new sql.Request();
      request.query(query, async (err, recordset) => {
        if (err) {
            
          reject(err.originalError.info.message || err);
        } else {
          resolve(recordset.recordset);
        }
      });
    } catch (error) {
      reject(error.message);
    }
  });
};

module.exports = dbrequest;
