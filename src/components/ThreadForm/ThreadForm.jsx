import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as threadsAPI from '../../utilities/threads-api';


export default function ThreadForm({ topic }) {
    const [threadData, setThreadData] = useState({
        title: '',
        content: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function handleChange(evt) {
        setThreadData({ ...threadData, [evt.target.name]: evt.target.value });
        evt.target.style.height = 'auto';
        evt.target.style.height = `${evt.target.scrollHeight}px`;
        setError('');
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            threadData.topicId = topic._id
            const newThread = await threadsAPI.createThread(threadData);
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
                <br />
                <label>Content: Markdown is supported!</label>
                <br />
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