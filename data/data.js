const Pool = require('pg').Pool

const pool = new Pool({
  user: 'kim200',
  host: '127.0.0.1',
  database: 'tasklist',
  port: 5432, //default TCP for PostgreSQL
});


const getAllTasks = () => new Promise ((resolve,reject) => {
  pool.query('SELECT * FROM tasks', (error, results) => {
    if (error) {
			reject(error)
    } else {
    	resolve(results.rows)
    }
  })
});
 

module.exports = {
	getAllTasks,
}