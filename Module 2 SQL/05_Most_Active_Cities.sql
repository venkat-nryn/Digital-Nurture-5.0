SELECT 
    u.city,
    COUNT(DISTINCT u.user_id) AS distinct_users_registered
FROM users u
INNER JOIN registrations r ON u.user_id = r.user_id
GROUP BY u.city
ORDER BY distinct_users_registered DESC
LIMIT 5;
