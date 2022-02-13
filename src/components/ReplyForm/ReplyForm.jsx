import { useState } from 'react';
import * as threadsAPI from '../../utilities/threads-api';


export default function ReplyForm({ thread, setThread, setShowForm, replyData, setReplyData }) {

    const [error, setError] = useState('')

    function handleChange(evt) {
        setReplyData({ ...replyData, [evt.target.name]: evt.target.value });
        evt.target.style.height = 'auto';
        evt.target.style.height = `${evt.target.scrollHeight}px`;
        setError('');
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const threadId = thread._id
            const updatedThread = await threadsAPI.addReply(replyData, threadId);
            setThread(updatedThread);
            setShowForm(false)
            setReplyData({ ...replyData, [evt.target.name]: '' });
        } catch (e) {
            console.log(e);
            setError(e.message);
        }
    }

    function focus(evt) {
        evt.target.setSelectionRange(replyData.content.length, replyData.content.length);
        evt.target.scrollTop = evt.target.scrollHeight;
        evt.target.style.height = `${evt.target.scrollHeight}px`;
    }

    return (
        <div className="form-container thread-form">
            <form autoComplete='off' onSubmit={handleSubmit}>
                <label>Markdown is supported in replies!</label>
                <br />
                <textarea
                    className="thread-form-input"
                    value={replyData.content}
                    name="content"
                    cols="30" rows="10"
                    onChange={handleChange}
                    maxLength="5000"
                    required
                    autoFocus
                    onFocus={focus}
                />
                <button type="submit">SUBMIT</button>
            </form>
            <p>{error}</p>
        </div>
    )
}