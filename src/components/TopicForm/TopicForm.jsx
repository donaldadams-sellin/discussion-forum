import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as topicAPI from '../../utilities/topics-api';


export default function ThreadForm({ setTopics }) {
    const [topicData, setTopicData] = useState({
        name: '',
        description: '',
        sortOrder: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function handleChange(evt) {
        setTopicData({ ...topicData, [evt.target.name]: evt.target.value });
        setError('');
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const update = await topicAPI.createTopic(topicData);
            setTopics(update.topics)
            navigate(`/${update.topic._id}`)
        } catch (e) {
            console.log(e);
            setError(e.message);
        }
    }
    return (
        <div className="form-container thread-form">
            <h3>Enter Information for a New Topic</h3>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <label>Topic Name:</label>
                <input className="thread-form-input" name="name" onChange={handleChange} required value={topicData.name} type="text" />
                <label>Enter a short description</label>
                <input className="thread-form-input" name="description" onChange={handleChange} required value={topicData.description} type="text" />
                <label>Enter a number, topics are sorted by this number from least to greatest</label>
                <input className="thread-form-input" name="sortOrder" onChange={handleChange} required value={topicData.sortOrder} type="number" />
                <button type="submit">SUBMIT</button>
            </form>
            <p>{error}</p>
        </div>
    )
}