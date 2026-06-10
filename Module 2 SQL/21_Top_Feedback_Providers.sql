
SELECT 
    u.user_id,
    u.full_name,
    u.email,
    u.city,
    COUNT(f.feedback_id) AS feedback_count,
    AVG(f.rating) AS average_rating_given
FROM users u
INNER JOIN feedback f ON u.user_id = f.user_id
GROUP BY u.user_id, u.full_name, u.email, u.city
ORDER BY feedback_count DESC
LIMIT 5;
