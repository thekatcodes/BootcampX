const { Pool } = require("pg");

const pool = new Pool({
	user: "vagrant",
	password: "123",
	host: "localhost",
	database: "bootcampx",
});
const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
const values = [`%${cohortName}%`, limit];

const queryString = `
SELECT students.id as student_id, students.name as name, cohorts.name as cohort_name
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;

pool.query(queryString, values)
.then(res => {
    res.rows.forEach(user => {
        console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort_name} cohort`); //Armand Hilll has an id of 1 and was in the 1 cohort
        console.log(user); //{ id: 1, name: 'Armand Hilll', cohort_id: 1 }
  });
})
    //^^^ once the .then(res => {}) gets executed, we're not dealing with SQL or the database any more, we're just dealing with JavaScript objects
.catch(err => console.error('query error', err.stack));