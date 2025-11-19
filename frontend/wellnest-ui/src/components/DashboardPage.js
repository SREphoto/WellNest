import React, { useState, useEffect } from 'react';

const DashboardPage = ({ token }) => {
    const [moodFeed, setMoodFeed] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchMoodFeed();
    }, [token]);

    const fetchMoodFeed = async () => {
        try {
            const response = await fetch('/mood-status/feed', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setMoodFeed(data);
            } else {
                setError('Failed to fetch mood feed.');
            }
        } catch (err) {
            setError('An error occurred while fetching the mood feed.');
        }
    };

    // Form for posting a new mood status
    const MoodStatusForm = () => {
        const [moodieType, setMoodieType] = useState('Happy');
        const [actualScore, setActualScore] = useState(100);
        const [optionalContextText, setOptionalContextText] = useState('');

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const response = await fetch('/mood-status', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ moodieType, actualScore, optionalContextText })
                });
                if (response.ok) {
                    fetchMoodFeed(); // Refresh the feed after posting
                } else {
                    setError('Failed to post mood status.');
                }
            } catch (err) {
                setError('An error occurred while posting the mood status.');
            }
        };

        return (
            <form onSubmit={handleSubmit}>
                <h3>How are you feeling?</h3>
                <select value={moodieType} onChange={(e) => setMoodieType(e.target.value)}>
                    <option value="Joyful">Joyful</option>
                    <option value="Sad">Sad</option>
                    <option value="Crisis">Crisis</option>
                </select>
                <input
                    type="number"
                    value={actualScore}
                    onChange={(e) => setActualScore(parseInt(e.target.value, 10))}
                    min="0"
                    max="100"
                />
                <input
                    type="text"
                    value={optionalContextText}
                    onChange={(e) => setOptionalContextText(e.target.value)}
                    placeholder="Add a note (optional)"
                />
                <button type="submit">Post Mood</button>
            </form>
        );
    };

    return (
        <div>
            <h2>Dashboard</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <MoodStatusForm />

            <h3>Connections' Moods</h3>
            {moodFeed.length > 0 ? (
                <ul>
                    {moodFeed.map(status => (
                        <li key={status.id}>
                            <strong>{status.userId}</strong>: {status.moodieType} ({status.actualScore})
                            <p>{status.optionalContextText}</p>
                            <small>{new Date(status.timestamp).toLocaleString()}</small>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No mood updates from your connections yet.</p>
            )}
        </div>
    );
};

export default DashboardPage;
