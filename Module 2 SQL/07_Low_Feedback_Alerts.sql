SELECT 
    u.user_id,
    u.full_name,
    u.email,
    e.event_id,
    e.title AS event_name,
    f.rating,
    f.comments,
    f.feedback_date
FROM users u
INNER JOIN feedback f ON u.user_id = f.user_id
INNER JOIN events e ON f.event_id = e.event_id
WHERE f.rating < 3
ORDER BY f.rating ASC, u.user_id ASC;
