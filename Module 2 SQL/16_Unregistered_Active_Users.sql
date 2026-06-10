SELECT 
    u.user_id,
    u.full_name,
    u.email,
    u.city,
    u.registration_date,
    COUNT(r.registration_id) AS event_registrations
FROM users u
LEFT JOIN registrations r ON u.user_id = r.user_id
WHERE u.registration_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    AND u.registration_date <= CURDATE()
GROUP BY u.user_id, u.full_name, u.email, u.city, u.registration_date
HAVING COUNT(r.registration_id) = 0
ORDER BY u.registration_date DESC;
