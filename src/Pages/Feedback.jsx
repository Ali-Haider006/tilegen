import React, { useState } from 'react';
import axios from 'axios';
import './Feedback.css';
const Feedback = () => {
    const [feedback, setFeedback] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!feedback || !name || !email) {
            setResponseMessage('All fields are required.');
            return;
        }

        try {
            const response = await axios.post('/api/feedback', {
                name,
                email,
                feedback
            });

            setResponseMessage('Thank you for your feedback!');
            setFeedback('');
            setName('');
            setEmail('');
        } catch (error) {
            setResponseMessage('Something went wrong. Please try again later.');
        }
    };

    return (
        <div>
            <h2>Submit your Feedback</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Feedback:</label>
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default Feedback;
