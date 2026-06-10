SELECT 
    e.event_id,
    e.title,
    e.city,
    e.start_date,
    e.status,
    COUNT(r.registration_id) AS total_registrations
FROM events e
LEFT JOIN registrations r ON e.event_id = r.event_id
GROUP BY e.event_id, e.title, e.city, e.start_date, e.status
ORDER BY total_registrations DESC
LIMIT 3;
