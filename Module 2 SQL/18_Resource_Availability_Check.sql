SELECT 
    e.event_id,
    e.title,
    e.city,
    e.start_date,
    e.end_date,
    e.status,
    COUNT(r.resource_id) AS resource_count
FROM events e
LEFT JOIN resources r ON e.event_id = r.event_id
GROUP BY e.event_id, e.title, e.city, e.start_date, e.end_date, e.status
HAVING COUNT(r.resource_id) = 0
ORDER BY e.event_id ASC;
