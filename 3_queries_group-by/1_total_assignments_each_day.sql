SELECT
    day AS day,
    count(chapter) AS total_assignments
FROM
    assignments
GROUP BY
    day
ORDER BY day;
