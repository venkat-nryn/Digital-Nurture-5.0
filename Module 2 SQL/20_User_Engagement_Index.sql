SELECT 
    u.user_id,
    u.full_name,
    u.email,
    u.city,
    COUNT(DISTINCT r.event_id) AS events_registered,
    COUNT(f.feedback_id) AS feedbacks_submitted,
    CASE 
        WHEN COUNT(DISTINCT r.event_id) = 0 THEN 'Inactive'
        WHEN COUNT(f.feedback_id) = 0 THEN 'Low Engagement'
        WHEN COUNT(f.feedback_id) = COUNT(DISTINCT r.event_id) THEN 'Highly Engaged'
        ELSE 'Moderately Engaged'
    END AS engagement_level
FROM users u
LEFT JOIN registrations r ON u.user_id = r.user_id
LEFT JOIN feedback f ON u.user_id = f.user_id
GROUP BY u.user_id, u.full_name, u.email, u.city
ORDER BY feedbacks_submitted DESC, events_registered DESC, u.user_id ASC;
