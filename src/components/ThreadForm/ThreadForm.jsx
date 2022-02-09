import { useState } from 'react';
import * as threadsAPI from '../../utilities/threads-api';
import './ThreadForm.css';

export default function ThreadForm({ user, topic, threads, setThreads }) {
    const [threadData, setThreadData] = useState({
        title: '',
        content: ''
    });
    const [error, setError] = useState('');

    function handleChange(evt) {
        setThreadData({ ...threadData, [evt.target.name]: evt.target.value });
        setError('');
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            threadData.topicId = topic._id
            const newThread = await threadsAPI.createThread(threadData);
            setThreads([...threads, newThread]);
        } catch {
            setError('Post Failed')
        }
    }
    return (
        <div className="form-container">
            <form autoComplete='off' onSubmit={handleSubmit}>
                <label>Title: </label>
                <input name="title" onChange={handleChange} required value={threadData.title} type="text" />
                <label>Content: </label>
                <textarea
                    value={threadData.content}
                    name="content"
                    cols="30" rows="10"
                    onChange={handleChange}
                    required
                />
                <button type="submit">SUBMIT</button>
            </form>
            <p>{error}</p>
        </div>
    )
}