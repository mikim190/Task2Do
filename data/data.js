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

const updateTask = (id, newData) => new Promise ((resolve,reject) => {
  pool.query('UPDATE tasks SET "completedAt" = $1 WHERE id=$2', [newData, id], (error, results) => {
    if (error) {
			reject(error)
    } else {
    	resolve(results)
    }
  })
});
 

module.exports = {
  getAllTasks,
  updateTask
}