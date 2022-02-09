import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as threadsAPI from '../../utilities/threads-api';
import './ThreadForm.css';

export default function ThreadForm({ user, topic, threads, setThreads }) {
    const [threadData, setThreadData] = useState({
        title: '',
        content: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function handleChange(evt) {
        setThreadData({ ...threadData, [evt.target.name]: evt.target.value });
        setError('');
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            threadData.topicId = topic._id
            const newThread = await threadsAPI.createThread(threadData);
            // setThreads([...threads, newThread]);
            navigate(`/${topic._id}/${newThread._id}`)
        } catch {
            setError('Post Failed')
        }
    }
    return (
        <div className="form-container thread-form">
            <form autoComplete='off' onSubmit={handleSubmit}>
                <label>Title: </label>
                <input className='thread-form-input' name="title" onChange={handleChange} required value={threadData.title} type="text" />
                <label>Content: </label>
                <textarea
                    className='thread-form-input'
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