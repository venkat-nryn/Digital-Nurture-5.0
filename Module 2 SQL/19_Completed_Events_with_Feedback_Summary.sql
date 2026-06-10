SELECT 
    e.event_id,
    e.title,
    e.city,
    e.start_date,
    e.end_date,
    COUNT(DISTINCT r.registration_id) AS total_registrations,
    COUNT(f.feedback_id) AS feedback_count,
    AVG(f.rating) AS average_rating,
    MIN(f.rating) AS min_rating,
    MAX(f.rating) AS max_rating
FROM events e
LEFT JOIN registrations r ON e.event_id = r.event_id
LEFT JOIN feedback f ON e.event_id = f.event_id
WHERE e.status = 'completed'
GROUP BY e.event_id, e.title, e.city, e.start_date, e.end_date
ORDER BY average_rating DESC, e.event_id ASC;
