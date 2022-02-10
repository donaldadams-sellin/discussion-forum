import { useState } from 'react';
import * as threadsAPI from '../../utilities/threads-api';
import './ReplyForm.css';

export default function ReplyForm({ thread, setThread, setShowForm }) {
    const [replyData, setReplyData] = useState({
        content: ''
    });
    const [error, setError] = useState('')

    function handleChange(evt) {
        setReplyData({ ...replyData, [evt.target.name]: evt.target.value })
        setError('');
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try{
        const threadId = thread._id
        const updatedThread = await threadsAPI.addReply(replyData, threadId);
        setThread(updatedThread);
        setShowForm(false)
        } catch {
            setError('Post Failed')
        }
    }
    return (
        <div className="form-container thread-form">
            <form autoComplete='off' onSubmit={handleSubmit}>
                <label>Content: </label>
                <textarea
                className='thread-form-input'
                value={replyData.content} 
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