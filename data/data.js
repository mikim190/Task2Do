const Pool = require('pg').Pool

const pool = new Pool({
  user: 'kim200',
  host: '127.0.0.1',
  database: 'tasklist',
  port: 5432, //default TCP for PostgreSQL
});

const getAllTasks = (request, response) => {
  pool.query('SELECT * FROM restaurant FETCH FIRST 10 ROW ONLY', (error, results) => {
    if (error) {
			console.log(error);
			response.status(400).send(error)
    }
    	response.status(200).json(results.rows)
    })
  };

 
module.exports = {
	getAllTasks,
 
}