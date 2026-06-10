SELECT 
    e.event_id,
    e.title,
    e.city,
    e.start_date,
    e.end_date,
    COUNT(s.session_id) AS session_count
FROM events e
LEFT JOIN sessions s ON e.event_id = s.event_id
WHERE e.status = 'upcoming'
GROUP BY e.event_id, e.title, e.city, e.start_date, e.end_date
ORDER BY session_count DESC, e.event_id ASC;
