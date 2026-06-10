SELECT 
    e.event_id,
    e.title,
    e.description,
    e.city,
    e.start_date,
    e.end_date,
    e.status,
    u.full_name AS organizer_name,
    COUNT(s.session_id) AS session_count
FROM events e
LEFT JOIN users u ON e.organizer_id = u.user_id
LEFT JOIN sessions s ON e.event_id = s.event_id
GROUP BY e.event_id, e.title, e.description, e.city, e.start_date, e.end_date, e.status, u.full_name
HAVING COUNT(s.session_id) = 0
ORDER BY e.event_id ASC;
