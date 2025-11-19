import React, { useState, useEffect } from 'react';

const ConnectionsPage = ({ token }) => {
    const [connections, setConnections] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchConnections();
        fetchPendingRequests();
    }, [token]);

    const fetchConnections = async () => {
        try {
            const response = await fetch('/connections', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setConnections(data);
            } else {
                setError('Failed to fetch connections.');
            }
        } catch (err) {
            setError('An error occurred while fetching connections.');
        }
    };

    const fetchPendingRequests = async () => {
        try {
            const response = await fetch('/connections/pending', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setPendingRequests(data);
            } else {
                setError('Failed to fetch pending requests.');
            }
        } catch (err) {
            setError('An error occurred while fetching pending requests.');
        }
    };

    const handleAccept = async (connectionId) => {
        try {
            const response = await fetch(`/connections/accept/${connectionId}`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                fetchConnections();
                fetchPendingRequests();
            } else {
                setError('Failed to accept request.');
            }
        } catch (err) {
            setError('An error occurred while accepting the request.');
        }
    };

    const handleReject = async (connectionId) => {
        try {
            const response = await fetch(`/connections/reject/${connectionId}`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                fetchPendingRequests();
            } else {
                setError('Failed to reject request.');
            }
        } catch (err) {
            setError('An error occurred while rejecting the request.');
        }
    };

    // A simple form to send a connection request.
    // In a real app, this would be a user search feature.
    const ConnectionRequestForm = () => {
        const [recipientId, setRecipientId] = useState('');

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const response = await fetch(`/connections/request/${recipientId}`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!response.ok) {
                    setError('Failed to send connection request.');
                }
            } catch (err) {
                setError('An error occurred while sending the request.');
            }
        };

        return (
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={recipientId}
                    onChange={(e) => setRecipientId(e.target.value)}
                    placeholder="Enter user ID to connect"
                />
                <button type="submit">Send Request</button>
            </form>
        );
    };

    return (
        <div>
            <h2>My Connections</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <h3>Add a New Connection</h3>
            <ConnectionRequestForm />

            <h3>Pending Requests</h3>
            <ul>
                {pendingRequests.map(req => (
                    <li key={req.id}>
                        {req.requesterUserId}
                        <button onClick={() => handleAccept(req.id)}>Accept</button>
                        <button onClick={() => handleReject(req.id)}>Reject</button>
                    </li>
                ))}
            </ul>

            <h3>Accepted Connections</h3>
            <ul>
                {connections.map(conn => (
                    <li key={conn.id}>{conn.requesterUserId} / {conn.recipientUserId}</li>
                ))}
            </ul>
        </div>
    );
};

export default ConnectionsPage;
