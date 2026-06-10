SELECT 
    e.event_id,
    e.title,
    s1.session_id AS session_1_id,
    s1.title AS session_1_title,
    s1.speaker_name AS speaker_1,
    s1.start_time AS session_1_start,
    s1.end_time AS session_1_end,
    s2.session_id AS session_2_id,
    s2.title AS session_2_title,
    s2.speaker_name AS speaker_2,
    s2.start_time AS session_2_start,
    s2.end_time AS session_2_end
FROM events e
INNER JOIN sessions s1 ON e.event_id = s1.event_id
INNER JOIN sessions s2 ON e.event_id = s2.event_id
WHERE s1.session_id < s2.session_id
    AND (
        (s1.start_time < s2.end_time AND s1.end_time > s2.start_time)
    )
ORDER BY e.event_id ASC, s1.session_id ASC;
