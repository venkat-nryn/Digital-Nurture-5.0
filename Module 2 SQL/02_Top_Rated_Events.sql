SELECT 
    e.event_id,
    e.title,
    e.city,
    COUNT(f.feedback_id) AS total_feedback,
    AVG(f.rating) AS average_rating
FROM events e
LEFT JOIN feedback f ON e.event_id = f.event_id
GROUP BY e.event_id, e.title, e.city
HAVING COUNT(f.feedback_id) >= 10
ORDER BY average_rating DESC;
