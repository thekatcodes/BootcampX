const { Pool } = require("pg");

const pool = new Pool({
	user: "vagrant",
	password: "123",
	host: "localhost",
	database: "bootcampx",
});

pool.query(`
SELECT DISTINCT 
    teachers.name AS teacher,
    cohorts.name AS cohort
FROM
    assistance_requests
    JOIN teachers ON teachers.id = teacher_id
    JOIN students ON students.id = student_id
    JOIN cohorts ON cohorts.id = cohort_id
WHERE
    cohorts.name = '${process.argv[2]}'
ORDER BY
    teacher;
`)
.then(res => {
    res.rows.forEach(row => {
        console.log(`${row.cohort}: ${row.teacher}`)
        // console.log(row); //{ teacher: 'Cheyanne Powlowski', cohort: 'JUL02' }
  });
})
    //^^^ once the .then(res => {}) gets executed, we're not dealing with SQL or the database any more, we're just dealing with JavaScript objects
.catch(err => console.error('query error', err.stack));