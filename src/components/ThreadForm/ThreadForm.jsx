import { useState } from 'react';
import * as threadsAPI from '../../utilities/threads-api';
import './ThreadForm.css';

export default function ThreadForm({ user, topic, threads, setThreads }) {
    const [threadData, setThreadData] = useState({
        title: '',
        content: ''
    });

    function handleChange(evt) {
        setThreadData({ ...threadData, [evt.target.name]: evt.target.value })
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        threadData.topicId = topic._id
        const newThread = await threadsAPI.createThread(threadData);
        setThreads([...threads, newThread]);
    }
    return (
        <div className="form-container">
            <form autoComplete='off' onSubmit={handleSubmit}>
                <label>Title: </label>
                <input name="title"  onChange={handleChange} value={threadData.title} type="text" />
                <label>Content: </label>
                <textarea 
                value={threadData.content} 
                name="content" 
                cols="30" rows="10"
                onChange={handleChange}
                />
                <button type="submit">SUBMIT</button>
            </form>
        </div>
    )
}