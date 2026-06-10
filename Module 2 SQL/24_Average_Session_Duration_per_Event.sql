SELECT 
    e.event_id,
    e.title,
    e.city,
    COUNT(s.session_id) AS total_sessions,
    ROUND(AVG(TIMESTAMPDIFF(MINUTE, s.start_time, s.end_time)), 2) AS avg_duration_minutes,
    MIN(TIMESTAMPDIFF(MINUTE, s.start_time, s.end_time)) AS min_duration_minutes,
    MAX(TIMESTAMPDIFF(MINUTE, s.start_time, s.end_time)) AS max_duration_minutes
FROM events e
LEFT JOIN sessions s ON e.event_id = s.event_id
GROUP BY e.event_id, e.title, e.city
ORDER BY avg_duration_minutes DESC, e.event_id ASC;
