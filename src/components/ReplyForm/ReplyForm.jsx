import { useState } from 'react';
import * as threadsAPI from '../../utilities/threads-api';
import './ReplyForm.css';

export default function ReplyForm({ thread, setThread }) {
    const [replyData, setReplyData] = useState({
        content: ''
    });

    function handleChange(evt) {
        setReplyData({ ...replyData, [evt.target.name]: evt.target.value })
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        const threadId = thread._id
        const updatedThread = await threadsAPI.addReply(replyData, threadId);
        setThread(updatedThread);
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
                />
                <button type="submit">SUBMIT</button>
            </form>
        </div>
    )
}