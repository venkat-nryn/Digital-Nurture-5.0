SELECT 
    e.city,
    COUNT(DISTINCT e.event_id) AS total_events,
    COUNT(f.feedback_id) AS total_feedback,
    AVG(f.rating) AS average_rating
FROM events e
LEFT JOIN feedback f ON e.event_id = f.event_id
GROUP BY e.city
ORDER BY average_rating DESC, e.city ASC;
