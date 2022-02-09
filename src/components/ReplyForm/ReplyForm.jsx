import { useState } from 'react';
import * as threadsAPI from '../../utilities/threads-api';
import './ReplyForm.css';

export default function ReplyForm({ thread, setThread }) {
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
        } catch {
            setError('Post Failed')
        }
    }
    return (
        <div className="form-container">
            <form autoComplete='off' onSubmit={handleSubmit}>
                <label>Content: </label>
                <textarea 
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