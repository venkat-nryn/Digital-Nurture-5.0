SELECT 
    u.user_id,
    u.full_name,
    u.city,
    e.event_id,
    e.title,
    e.start_date,
    e.end_date,
    e.city AS event_city
FROM users u
INNER JOIN registrations r ON u.user_id = r.user_id
INNER JOIN events e ON r.event_id = e.event_id
WHERE e.status = 'upcoming' 
    AND u.city = e.city
ORDER BY e.start_date ASC;
