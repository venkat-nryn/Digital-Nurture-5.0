SELECT 
    u.registration_date,
    COUNT(u.user_id) AS new_users_count
FROM users u
WHERE u.registration_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
    AND u.registration_date <= CURDATE()
GROUP BY u.registration_date
ORDER BY u.registration_date DESC;
