SELECT
    count(assistance_requests.*) AS total_asssistances,
    students.name AS name
FROM
    assistance_requests
    JOIN students ON students.id = student_id
WHERE
    students.name = 'Elliot Dickinson'
GROUP BY
    students.name;

