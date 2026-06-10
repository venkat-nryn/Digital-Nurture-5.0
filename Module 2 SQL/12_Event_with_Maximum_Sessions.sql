SELECT 
    e.event_id,
    e.title,
    e.city,
    COUNT(s.session_id) AS session_count
FROM events e
LEFT JOIN sessions s ON e.event_id = s.event_id
GROUP BY e.event_id, e.title, e.city
HAVING COUNT(s.session_id) = (
    SELECT COUNT(s2.session_id)
    FROM sessions s2
    GROUP BY s2.event_id
    ORDER BY COUNT(s2.session_id) DESC
    LIMIT 1
)
ORDER BY e.event_id ASC;
