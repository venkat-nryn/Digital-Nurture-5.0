SELECT 
    r.user_id,
    u.full_name,
    u.email,
    r.event_id,
    e.title,
    COUNT(r.registration_id) AS registration_count,
    GROUP_CONCAT(r.registration_id ORDER BY r.registration_id) AS registration_ids,
    GROUP_CONCAT(r.registration_date ORDER BY r.registration_date) AS registration_dates
FROM registrations r
INNER JOIN users u ON r.user_id = u.user_id
INNER JOIN events e ON r.event_id = e.event_id
GROUP BY r.user_id, u.full_name, u.email, r.event_id, e.title
HAVING COUNT(r.registration_id) > 1
ORDER BY r.user_id ASC, r.event_id ASC;
