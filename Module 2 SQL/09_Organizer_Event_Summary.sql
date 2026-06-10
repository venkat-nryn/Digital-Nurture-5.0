SELECT 
    u.user_id,
    u.full_name,
    u.email,
    SUM(CASE WHEN e.status = 'upcoming' THEN 1 ELSE 0 END) AS upcoming_events,
    SUM(CASE WHEN e.status = 'completed' THEN 1 ELSE 0 END) AS completed_events,
    SUM(CASE WHEN e.status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_events,
    COUNT(e.event_id) AS total_events
FROM users u
LEFT JOIN events e ON u.user_id = e.organizer_id
GROUP BY u.user_id, u.full_name, u.email
HAVING COUNT(e.event_id) > 0
ORDER BY total_events DESC, u.user_id ASC;
