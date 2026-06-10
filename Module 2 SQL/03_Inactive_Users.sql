SELECT 
    u.user_id,
    u.full_name,
    u.email,
    u.city,
    u.registration_date,
    MAX(r.registration_date) AS last_event_registration
FROM users u
LEFT JOIN registrations r ON u.user_id = r.user_id
GROUP BY u.user_id, u.full_name, u.email, u.city, u.registration_date
HAVING MAX(r.registration_date) IS NULL 
    OR MAX(r.registration_date) < DATE_SUB(CURDATE(), INTERVAL 90 DAY)
ORDER BY u.user_id ASC;
