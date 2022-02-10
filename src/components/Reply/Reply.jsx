import { useState } from 'react';
import './Reply.css';

export default function Reply({ user, reply, deleteReply, editReply, idx, last }) {
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState({ content: reply.content });

    function handleChange(evt) {
        setEditData({ [evt.target.name]: evt.target.value })
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        setEditMode(false);
        editReply(reply._id, editData);
    }

    return (
        <>
            {editMode ?
                <div className='form-container thread-form'>
                    <form onSubmit={handleSubmit}>
                        <textarea className='thread-form-input' name="content" onChange={handleChange} value={editData.content} />
                        <button type="submit">EDIT</button>
                        <button onClick={() => setEditMode(!editMode)} >Cancel</button>
                    </form>
                </div>
                :
                <div className={`Reply ${idx % 2 === 0 ? 'even' : 'odd'} ${idx === 0 && 'top'} ${idx === last && 'bottom'}`}>
                    <>
                        <p className='reply-content' style={{ whiteSpace: 'pre-wrap' }}>{reply.content}</p>
                        <div className='reply-box align-end'>
                            <div className="info">
                                <p> Poster: {reply.user.name}</p>
                                <p>{reply.createdAt.slice(0, 10)}</p>
                            </div>
                            {user && ((user._id === reply.user._id || user.isAdmin) &&
                                <>
                                    <button onClick={() => setEditMode(!editMode)} >Edit</button>
                                    <button className='delete-btn' onClick={() => deleteReply(reply._id)} >DELETE</button>
                                </>)}
                        </div>
                    </>
                </div>
            }
        </>
    )
}