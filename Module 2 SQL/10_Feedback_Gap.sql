SELECT 
    e.event_id,
    e.title,
    e.city,
    e.start_date,
    e.end_date,
    COUNT(DISTINCT r.user_id) AS total_registrations,
    COUNT(f.feedback_id) AS feedback_count
FROM events e
INNER JOIN registrations r ON e.event_id = r.event_id
LEFT JOIN feedback f ON e.event_id = f.event_id
GROUP BY e.event_id, e.title, e.city, e.start_date, e.end_date
HAVING COUNT(f.feedback_id) = 0
ORDER BY total_registrations DESC, e.event_id ASC;
