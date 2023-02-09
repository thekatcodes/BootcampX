const { Pool } = require("pg");

const pool = new Pool({
	user: "vagrant",
	password: "123",
	host: "localhost",
	database: "bootcampx",
});

pool.query(`
SELECT students.id as student_id, students.name as name, cohorts.name as cohort_name
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '%${process.argv[2]}%'
LIMIT ${process.argv[3]};
`)
.then(res => {
    res.rows.forEach(user => {
        console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort_name} cohort`); //Armand Hilll has an id of 1 and was in the 1 cohort
        console.log(user); //{ id: 1, name: 'Armand Hilll', cohort_id: 1 }
  });
})
    //^^^ once the .then(res => {}) gets executed, we're not dealing with SQL or the database any more, we're just dealing with JavaScript objects
.catch(err => console.error('query error', err.stack));