SELECT 
    s.speaker_name,
    COUNT(s.session_id) AS total_sessions,
    COUNT(DISTINCT s.event_id) AS distinct_events,
    GROUP_CONCAT(DISTINCT e.title ORDER BY e.title) AS events_involved
FROM sessions s
INNER JOIN events e ON s.event_id = e.event_id
GROUP BY s.speaker_name
HAVING COUNT(s.session_id) > 1
ORDER BY total_sessions DESC, s.speaker_name ASC;
