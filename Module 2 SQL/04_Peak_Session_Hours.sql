SELECT 
    e.event_id,
    e.title,
    COUNT(s.session_id) AS sessions_10am_to_12pm
FROM events e
LEFT JOIN sessions s ON e.event_id = s.event_id
WHERE HOUR(s.start_time) >= 10 
    AND HOUR(s.start_time) < 12
GROUP BY e.event_id, e.title
ORDER BY sessions_10am_to_12pm DESC, e.event_id ASC;
